import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  grammarService,
  type GrammarQuestionPayload,
} from "../services/grammarService";
import { lessonService } from "../services/lessonService";
import { toastService } from "../services/toastService";
import type {
  GrammarQuizQuestion,
  GrammarTopic,
  LessonSummary,
} from "../types/api";

type Params = {
  lessonNumber?: string;
  questionId?: string;
};

type OptionForm = {
  optionLetter: "A" | "B" | "C" | "D";
  optionText: string;
  isCorrect: boolean;
};

export function AdminGrammarQuestionFormPage() {
  const { t } = useTranslation();
  const { lessonNumber, questionId } = useParams<Params>();
  const navigate = useNavigate();
  const isEdit = Boolean(questionId);

  const [lesson, setLesson] = useState<LessonSummary | null>(null);
  const [topic, setTopic] = useState<GrammarTopic | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [options, setOptions] = useState<OptionForm[]>([
    { optionLetter: "A", optionText: "", isCorrect: false },
    { optionLetter: "B", optionText: "", isCorrect: false },
    { optionLetter: "C", optionText: "", isCorrect: false },
    { optionLetter: "D", optionText: "", isCorrect: false },
  ]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonNumber) {
      setError("Lesson number is missing.");
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
          setError("No grammar topic configured for this lesson.");
          return;
        }

        if (isEdit && questionId) {
          const questions = await grammarService.getQuestionsWithAnswers(
            selectedTopic.topicKey,
          );
          if (!active) return;

          const found = questions.find(
            (q: GrammarQuizQuestion) => q.questionId === questionId,
          );
          if (!found) {
            setError("Grammar question not found.");
            return;
          }

          setQuestionText(found.questionText);
          setExplanation(found.explanation ?? "");
          setOptions(
            found.options.map((opt) => ({
              optionLetter: opt.optionLetter,
              optionText: opt.optionText,
              isCorrect: Boolean(opt.isCorrect),
            })),
          );
        }
      } catch (err) {
        if (!active) return;
        const message = err instanceof Error ? err.message : "Load failed.";
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
  }, [lessonNumber, isEdit, questionId]);

  const updateOptionText = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, optionText: value } : opt)),
    );
  };

  const markCorrectOption = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      })),
    );
  };

  const validate = (): boolean => {
    if (!questionText.trim()) {
      toastService.error(t("toast.grammarQuestionTextRequired"));
      return false;
    }

    for (let i = 0; i < options.length; i++) {
      if (!options[i].optionText.trim()) {
        toastService.error(t("toast.grammarOptionTextRequired", { letter: options[i].optionLetter }));
        return false;
      }
    }

    const correctCount = options.filter((opt) => opt.isCorrect).length;
    if (correctCount !== 1) {
      toastService.error(t("toast.grammarCorrectOptionRequired"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !lesson) return;

    if (!validate()) return;

    const payload: GrammarQuestionPayload = {
      questionText: questionText.trim(),
      explanation: explanation.trim() || undefined,
      options: options.map((opt) => ({
        optionLetter: opt.optionLetter,
        optionText: opt.optionText.trim(),
        isCorrect: opt.isCorrect,
      })),
    };

    setSubmitting(true);
    try {
      if (isEdit && questionId) {
        await grammarService.updateQuestion(questionId, payload);
        toastService.success(t("toast.grammarQuestionUpdated"));
      } else {
        await grammarService.createQuestion(topic.topicKey, payload);
        toastService.success(t("toast.grammarQuestionCreated"));
      }

      navigate(`/admin/lessons/${lesson.lessonNumber}/grammar`);
    } catch (err) {
      toastService.error(t("toast.grammarQuestionSaveFailed"));
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

  if (error || !lesson || !topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
          <p className="mb-4 text-[15px] text-danger" role="alert">
            {error ?? "Unable to load grammar question form."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/admin/lessons")}
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
        <header>
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lessonNumber}/grammar`)}
            className="mb-4 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
          >
            ← Back to grammar questions
          </button>
          <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Day {lesson.lessonNumber} – Admin
          </p>
          <h1 className="text-[2rem] font-serif font-bold text-text-main">
            {isEdit ? "Edit Grammar Question" : "Create Grammar Question"}
          </h1>
          <p className="mt-2 text-[15px] text-text-muted leading-relaxed">
            {topic.title}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] bg-surface p-8 shadow-card border border-[rgba(0,0,0,0.02)] space-y-6"
        >
          <div>
            <label className="mb-2 block text-[14px] font-medium text-text-main">
              Question text
            </label>
            <textarea
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="min-h-[100px] w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-medium text-text-main">
              Explanation (optional)
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="min-h-20 w-full rounded-lg border border-border-soft px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[1.2rem] font-serif font-bold text-text-main">
                Options (A–D)
              </h2>
              <p className="text-[13px] text-text-muted">
                Mark exactly one option as correct.
              </p>
            </div>
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div
                  key={opt.optionLetter}
                  className="flex items-start gap-3 rounded-xl border border-border-soft bg-highlight p-4"
                >
                  <div className="mt-2 text-[14px] font-semibold text-text-main">
                    {opt.optionLetter}.
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      value={opt.optionText}
                      onChange={(e) => updateOptionText(index, e.target.value)}
                      className="w-full rounded-lg border border-border-soft px-4 py-2 text-[15px] bg-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div className="flex items-center pl-2">
                    <label className="flex cursor-pointer items-center gap-2 text-[13px] text-text-main font-medium">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={opt.isCorrect}
                        onChange={() => markCorrectOption(index)}
                        className="h-4 w-4 text-primary accent-primary cursor-pointer"
                      />
                      Correct
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate(`/admin/lessons/${lesson.lessonNumber}/grammar`)
              }
              className="rounded-lg border border-border-soft bg-surface px-6 py-3 text-[14px] font-semibold text-text-main hover:bg-highlight transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save changes"
                  : "Create question"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
