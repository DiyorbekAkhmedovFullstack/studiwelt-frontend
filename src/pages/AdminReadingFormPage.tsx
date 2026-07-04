import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { readingService } from '../services/readingService';
import { lessonService } from '../services/lessonService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import type { LessonSummary } from '../types/api';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

type Params = {
  lessonNumber?: string;
  readingId?: string;
};

type QuestionForm = {
  questionText: string;
  explanation: string;
  options: Array<{
    optionLetter: 'A' | 'B' | 'C' | 'D';
    optionText: string;
    isCorrect: boolean;
  }>;
};

export function AdminReadingFormPage() {
  const { t } = useTranslation();
  const { lessonNumber, readingId } = useParams<Params>();
  const navigate = useNavigate();
  const isEdit = Boolean(readingId);

  const [lesson, setLesson] = useState<LessonSummary | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<QuestionForm[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonNumber) {
      setError('Lesson number is missing.');
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonData = await lessonService.getLessonByNumber(lessonNumber);
        if (!active) return;

        setLesson(lessonData.lesson);

        // If editing, load existing reading
        if (isEdit && readingId) {
          const readingData = await readingService.getReadingById(readingId);
          if (!active) return;

          const reading = readingData.reading;
          setTitle(reading.title);
          setText(reading.text);
          setQuestions(
            reading.questions.map((q) => ({
              questionText: q.questionText,
              explanation: q.explanation ?? '',
              options: q.options.map((opt) => ({
                optionLetter: opt.optionLetter,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect ?? false,
              })),
            })),
          );
        }
      } catch (err) {
        if (!active) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Load failed.';
        setError(message);
      toastService.error(t('toast.loadFailed'));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [lessonNumber, readingId, isEdit]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: '',
        explanation: '',
        options: [
          { optionLetter: 'A', optionText: '', isCorrect: false },
          { optionLetter: 'B', optionText: '', isCorrect: false },
          { optionLetter: 'C', optionText: '', isCorrect: false },
          { optionLetter: 'D', optionText: '', isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)),
    );
  };

  const updateOption = (
    qIndex: number,
    optIndex: number,
    field: string,
    value: string | boolean,
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        return {
          ...q,
          options: q.options.map((opt, j) => {
            if (j !== optIndex) {
              // If marking this option as correct, unmark others
              if (field === 'isCorrect' && value === true) {
                return { ...opt, isCorrect: false };
              }
              return opt;
            }
            return { ...opt, [field]: value };
          }),
        };
      }),
    );
  };

  const validate = (): boolean => {
    if (!title.trim()) {
      toastService.error(t('toast.readingTitleRequired'));
      return false;
    }
    if (!text.trim()) {
      toastService.error(t('toast.readingTextRequired'));
      return false;
    }
    if (questions.length === 0) {
      toastService.error(t('toast.readingQuestionRequired'));
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        toastService.error(t('toast.readingQuestionTextRequired', { n: i + 1 }));
        return false;
      }

      const hasCorrect = q.options.some((opt) => opt.isCorrect);
      if (!hasCorrect) {
        toastService.error(t('toast.readingCorrectOptionRequired', { n: i + 1 }));
        return false;
      }

      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].optionText.trim()) {
          toastService.error(t('toast.readingOptionTextRequired', { n: i + 1, letter: q.options[j].optionLetter }));
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !lesson) return;

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        text: text.trim(),
        lessonId: lesson.id,
        questions: questions.map((q) => ({
          questionText: q.questionText.trim(),
          explanation: q.explanation.trim() || undefined,
          options: q.options.map((opt) => ({
            optionLetter: opt.optionLetter,
            optionText: opt.optionText.trim(),
            isCorrect: opt.isCorrect,
          })),
        })),
      };

      if (isEdit && readingId) {
        await readingService.updateReading(readingId, payload);
        toastService.success(t('toast.readingUpdated'));
      } else {
        await readingService.createReading(payload);
        toastService.success(t('toast.readingCreated'));
      }

      navigate(`/admin/lessons/${lessonNumber}/readings`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to save reading. Please try again.';
      toastService.error(t('toast.readingSaveFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
          <p className="mb-4 text-[15px] text-danger" role="alert">
            {error ?? 'Lesson not found.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/lessons')}
            className="rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Back to lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <header>
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lessonNumber}/readings`)}
            className="mb-4 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
          >
            ← Back to readings list
          </button>
          <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Day {lesson.lessonNumber} - {lesson.title}
          </p>
          <h1 className="text-[2rem] font-serif font-bold text-text-main">
            {isEdit ? 'Edit Reading' : 'Create Reading'}
          </h1>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
            <h2 className="mb-6 text-[1.2rem] font-serif font-bold text-text-main">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-[14px] font-medium text-text-main mb-2"
                >
                  Reading Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  placeholder="e.g., German Education System"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-[14px] font-medium text-text-main mb-2"
                >
                  Reading Passage *
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={10}
                  className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  placeholder="Enter the reading passage text here. Use line breaks to separate paragraphs."
                  required
                />
                <p className="mt-2 text-[14px] text-text-muted">
                  Tip: Use line breaks to create paragraphs for better
                  readability.
                </p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[1.2rem] font-serif font-bold text-text-main">
                Questions ({questions.length})
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                + Add Question
              </button>
            </div>

            {questions.length === 0 && (
              <p className="text-center text-[15px] text-text-muted py-12">
                No questions added yet. Click "Add Question" to get started.
              </p>
            )}

            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="rounded-xl border-2 border-[rgba(0,0,0,0.08)] p-6 bg-highlight"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[14px] font-semibold text-text-main">
                      Question {qIndex + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-[14px] font-medium text-danger hover:text-[#B93939] transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Question Text */}
                    <div>
                      <label className="block text-[14px] font-medium text-text-main mb-2">
                        Question Text *
                      </label>
                      <input
                        type="text"
                        value={question.questionText}
                        onChange={(e) =>
                          updateQuestion(qIndex, 'questionText', e.target.value)
                        }
                        className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] bg-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        placeholder="Enter the question"
                        required
                      />
                    </div>

                    {/* Options */}
                    <div>
                      <label className="block text-[14px] font-medium text-text-main mb-3">
                        Options * (Select one as correct)
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={option.optionLetter}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}-correct`}
                              checked={option.isCorrect}
                              onChange={() =>
                                updateOption(qIndex, optIndex, 'isCorrect', true)
                              }
                              className="h-4 w-4 text-primary accent-primary cursor-pointer"
                            />
                            <span className="text-[14px] font-semibold text-text-main w-6">
                              {option.optionLetter}.
                            </span>
                            <input
                              type="text"
                              value={option.optionText}
                              onChange={(e) =>
                                updateOption(
                                  qIndex,
                                  optIndex,
                                  'optionText',
                                  e.target.value,
                                )
                              }
                              className="flex-1 rounded-lg border border-border-soft px-4 py-2 text-[15px] bg-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                              placeholder={`Option ${option.optionLetter}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explanation */}
                    <div>
                      <label className="block text-[14px] font-medium text-text-main mb-2">
                        Explanation (Optional)
                      </label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) =>
                          updateQuestion(qIndex, 'explanation', e.target.value)
                        }
                        rows={2}
                        className="w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] bg-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        placeholder="Explain why the correct answer is correct (shown in results)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(`/admin/lessons/${lessonNumber}/readings`)}
              className="rounded-lg border border-border-soft bg-surface px-6 py-3 text-[14px] font-semibold text-text-main hover:bg-highlight transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              {submitting
                ? 'Saving...'
                : isEdit
                  ? 'Update Reading'
                  : 'Create Reading'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
