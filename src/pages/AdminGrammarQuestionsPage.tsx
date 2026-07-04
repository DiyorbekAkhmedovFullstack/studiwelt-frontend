import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lessonService } from '../services/lessonService';
import {
  grammarService,
  type GrammarQuizQuestionsResponse,
} from '../services/grammarService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import type { GrammarTopic, GrammarQuizQuestion, LessonSummary } from '../types/api';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

type Params = {
  lessonNumber?: string;
};

export function AdminGrammarQuestionsPage() {
  const { t } = useTranslation();
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonSummary | null>(null);
  const [topic, setTopic] = useState<GrammarTopic | null>(null);
  const [questions, setQuestions] = useState<GrammarQuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

        const topics = await grammarService.getTopicsByLesson(
          lessonData.lesson.id,
        );
        if (!active) return;

        const selectedTopic = topics[0] ?? null;
        setTopic(selectedTopic ?? null);

        if (!selectedTopic) {
          setQuestions([]);
          return;
        }

        const questionList: GrammarQuizQuestionsResponse =
          await grammarService.getQuestionsWithAnswers(selectedTopic.topicKey);
        if (!active) return;

        setQuestions(questionList);
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
  }, [lessonNumber]);

  const handleDelete = async (question: GrammarQuizQuestion) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the question: "${question.questionText}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setDeletingId(question.questionId);
    try {
      await grammarService.deleteQuestion(question.questionId);
      setQuestions((prev) =>
        prev.filter((q) => q.questionId !== question.questionId),
      );
      toastService.success(t('toast.grammarQuestionDeleted'));
    } catch (err) {
      toastService.error(t('toast.grammarQuestionDeleteFailed'));
    } finally {
      setDeletingId(null);
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

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
          <p className="mb-4 text-[15px] text-text-main">
            No grammar topic is configured for this lesson yet.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lesson.lessonNumber}`)}
            className="rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Back to lesson detail
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lessonNumber}`)}
            className="mb-4 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
          >
            ← Back to lesson detail
          </button>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Day {lesson.lessonNumber} – Admin
              </p>
              <h1 className="text-[2rem] font-serif font-bold text-text-main">
                Manage Grammar
              </h1>
              <p className="mt-2 text-[15px] text-text-main leading-relaxed">
                {topic.title}
              </p>
              {topic.description && (
                <p className="mt-1 text-[14px] text-text-muted leading-relaxed">
                  {topic.description}
                </p>
              )}
            </div>
            <Link
              to={`/admin/lessons/${lessonNumber}/grammar/questions/new`}
              className="rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors whitespace-nowrap"
            >
              + Create Question
            </Link>
          </div>
        </header>

        {questions.length === 0 && (
          <div className="rounded-[24px] bg-surface p-12 text-center shadow-card border border-[rgba(0,0,0,0.02)]">
            <p className="text-[15px] text-text-muted mb-6">
              No grammar questions created yet for this topic.
            </p>
            <Link
              to={`/admin/lessons/${lessonNumber}/grammar/questions/new`}
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Create First Question
            </Link>
          </div>
        )}

        {questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((question) => {
              const correctOption = question.options.find(
                (opt) => opt.isCorrect,
              );
              const hasExplanation =
                question.explanation !== null &&
                question.explanation !== undefined &&
                question.explanation.trim() !== '';

              return (
                <div
                  key={question.questionId}
                  className="rounded-[24px] bg-surface p-6 shadow-card border border-[rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-text-muted">
                        Question {question.questionOrder ?? ''}
                      </p>
                      <p className="mt-1 text-[1.2rem] font-serif font-bold text-text-main">
                        {question.questionText}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {question.options.map((opt) => (
                          <span
                            key={opt.optionLetter}
                            className={`inline-flex items-center rounded-lg px-3 py-1.5 text-[13px] ${
                              opt.isCorrect
                                ? 'bg-[#E8F5ED] text-success border border-success/20'
                                : 'bg-highlight text-text-main border border-border-soft'
                            }`}
                          >
                            <span className="font-semibold">
                              {opt.optionLetter}.
                            </span>
                            <span className="ml-1 line-clamp-1">
                              {opt.optionText}
                            </span>
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
                        {correctOption && (
                          <span className="inline-flex items-center rounded-lg bg-[#E8F5ED] px-3 py-1 text-success border border-success/20 font-medium">
                            Correct: {correctOption.optionLetter}
                          </span>
                        )}
                        <span className="inline-flex items-center rounded-lg bg-highlight px-3 py-1 text-text-muted border border-border-soft">
                          {hasExplanation
                            ? 'Explanation provided'
                            : 'No explanation'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/admin/lessons/${lessonNumber}/grammar/questions/${question.questionId}/edit`}
                        className="rounded-lg border border-border-soft bg-surface px-4 py-2 text-[14px] font-medium text-text-main hover:bg-highlight transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(question)}
                        disabled={deletingId === question.questionId}
                        className="rounded-lg bg-danger px-4 py-2 text-[14px] font-medium text-white hover:bg-[#B93939] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      >
                        {deletingId === question.questionId
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
