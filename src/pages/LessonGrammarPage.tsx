import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ErrorState,
  LoadingScreen,
  SectionCompletedState,
} from "../components/common";
import { LessonGrammarTheory } from "../components/grammar/LessonGrammarTheory";
import { useProgress } from "../contexts/ProgressContext";
import { getGrammarTopicByLessonNumber } from "../data/grammarTopics";
import {
  useGrammarData,
  useSubmitGrammarAnswers,
} from "../hooks/queries/useGrammar";
import { useLessonByNumber } from "../hooks/queries/useLessons";
import { toastService } from "../services/toastService";

type Params = {
  lessonNumber?: string;
};

type AnswerMap = Record<string, "A" | "B" | "C" | "D" | null>;

export function LessonGrammarPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const { isSectionLocked, refreshProgress } = useProgress();

  const [answers, setAnswers] = useState<AnswerMap>({});

  // Get hardcoded topic data based on lesson number
  const hardcodedTopic = lessonNumber
    ? getGrammarTopicByLessonNumber(parseInt(lessonNumber))
    : null;

  // Fetch lesson data using React Query
  const {
    data: lessonData,
    isLoading: lessonLoading,
    error: lessonError,
  } = useLessonByNumber(lessonNumber ? Number(lessonNumber) : 0);

  const lesson = lessonData ?? null;
  const lessonId = lesson?.id ?? 0;

  // Check if section is locked
  const isLocked = lesson ? isSectionLocked(lesson.id, "grammar") : false;

  // Use predictable topic key pattern to start fetching immediately
  // This eliminates the waterfall: we don't need to wait for topics to load
  const predictedTopicKey = lessonNumber ? `topic-${lessonNumber}` : "";

  // Fetch grammar topics AND quiz questions in parallel
  const {
    topics,
    questions,
    isLoading: grammarDataLoading,
  } = useGrammarData(lessonId, predictedTopicKey, isLocked);

  const backendTopic = topics[0] ?? null;
  // Use backend topic key if available, otherwise use predicted key
  const actualTopicKey = backendTopic?.topicKey ?? predictedTopicKey;

  // Initialize answers when questions change
  useEffect(() => {
    if (questions.length > 0 && Object.keys(answers).length === 0) {
      const initialAnswers: AnswerMap = {};
      questions.forEach((q) => {
        initialAnswers[q.questionId] = null;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initialization from fetched data
      setAnswers(initialAnswers);
    }
  }, [questions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Submit mutation
  const submitMutation = useSubmitGrammarAnswers();

  const loading = lessonLoading || (!isLocked && grammarDataLoading);
  const error = lessonError
    ? lessonError instanceof Error
      ? lessonError.message
      : "Load failed."
    : null;

  const handleAnswerChange = (
    questionId: string,
    letter: "A" | "B" | "C" | "D",
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const allQuestionsAnswered = () => {
    if (!questions.length) return false;
    return questions.every(
      (q) =>
        answers[q.questionId] !== null && answers[q.questionId] !== undefined,
    );
  };

  const handleSubmit = async () => {
    if (!questions.length || !lessonNumber) return;

    const validAnswers = Object.entries(answers).reduce(
      (acc, [questionId, letter]) => {
        if (letter !== null && letter !== undefined) {
          acc[questionId] = letter;
        }
        return acc;
      },
      {} as Record<string, "A" | "B" | "C" | "D">,
    );

    submitMutation.mutate(
      {
        topicKey: actualTopicKey,
        answers: validAnswers,
      },
      {
        onSuccess: async (result) => {
          // Refresh progress after successful submission
          await refreshProgress();

          // Check if section just became completed (finished 3 successful attempts)
          if (lesson) {
            const nowCompleted = isSectionLocked(lesson.id, "grammar");
            if (nowCompleted) {
              toastService.success(
                "✓ Grammar section successfully completed! You've finished all 3 attempts with great scores.",
                { duration: 6000 },
              );
            } else {
              toastService.success("Grammar quiz submitted successfully!");
            }
          } else {
            toastService.success("Grammar quiz submitted successfully!");
          }

          navigate(`/course/${lessonNumber}/grammar/results`, {
            state: { result },
            replace: true,
          });
        },
        onError: (err) => {
          const message =
            err instanceof Error
              ? err.message
              : "Failed to submit grammar answers. Please try again.";

          // Check if section was completed (403 Forbidden)
          if (message.includes("locked") || message.includes("403")) {
            toastService.info(
              "This section is already completed. You've used all 3 attempts successfully!",
            );
          } else {
            toastService.error(message);
          }
        },
      },
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !lesson) {
    return (
      <ErrorState
        error={error ?? "Lesson not found."}
        backPath="/course"
        backLabel="Back to course"
      />
    );
  }

  // Show completion message if section is completed
  if (isLocked && lesson) {
    return (
      <SectionCompletedState
        title="Grammar Section Completed"
        backPath={`/course/${lesson.lessonNumber}`}
        backLabel="Back to lesson"
      />
    );
  }

  const displayTopic = backendTopic ?? hardcodedTopic;

  if (!displayTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-text-main">
            This lesson does not have a grammar topic configured yet.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lesson.lessonNumber}`, { replace: true })}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-text-main hover:bg-primary-hover hover:text-page"
          >
            Back to lesson
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Fixed Header */}
      <header className="h-16 bg-surface border-b border-border-soft flex items-center px-8 sticky top-0 z-100">
        <button
          type="button"
          onClick={() => navigate(`/course/${lesson.lessonNumber}`)}
          className="flex items-center gap-2 text-text-muted text-[0.9rem] font-medium transition-colors hover:text-text-main"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Lesson {lesson.lessonNumber}
        </button>
      </header>

      {/* Content Wrapper */}
      <div className="max-w-[800px] mx-auto my-10 px-6 w-full">
        <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] uppercase tracking-wider font-bold text-primary mb-3 sm:mb-4 block">
          Grammar Theory
        </span>
        <h1 className="font-serif text-xl sm:text-2xl md:text-[2.2rem] mb-3 sm:mb-4 leading-tight">
          {displayTopic?.title ?? `Lesson ${lesson.lessonNumber} Grammar`}
        </h1>
        {displayTopic?.description && (
          <p className="text-text-muted text-sm sm:text-base md:text-[1.1rem] mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            {displayTopic.description}
          </p>
        )}

        {/* Theory Section */}
        <LessonGrammarTheory lessonNumber={lesson.lessonNumber} />

        {/* Practice Section */}
        <span className="text-[0.75rem] uppercase tracking-wider font-bold text-primary mb-4 block mt-12">
          Practice
        </span>
        <h2 className="font-serif mb-6 text-[1.5rem]">
          Test your understanding
        </h2>

        <section className="space-y-6">
          {questions.length === 0 && (
            <p className="text-sm text-text-muted">
              There are no grammar questions configured for this topic yet.
            </p>
          )}

          {questions.map((question, qIndex) => (
            <div
              key={question.questionId}
              className="bg-surface rounded-[24px] p-8 shadow-card border border-transparent transition-all"
            >
              <p className="font-semibold text-[1.1rem] mb-6">
                {qIndex + 1}. {question.questionText}
              </p>

              <div className="flex flex-col gap-3">
                {question.options.map((option) => {
                  const isSelected =
                    answers[question.questionId] === option.optionLetter;
                  return (
                    <button
                      key={option.optionLetter}
                      type="button"
                      onClick={() =>
                        handleAnswerChange(
                          question.questionId,
                          option.optionLetter,
                        )
                      }
                      className={`text-left bg-white border-2 rounded-xl p-4 text-[1rem] text-text-main cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-[#FFFCFA]"
                          : "border-[#F0F0F0] hover:border-[#E3D4C5] hover:bg-[#FFFCFA]"
                      }`}
                    >
                      {option.optionText}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {questions.length > 0 && (
          <div className="mt-8 mb-20 flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered() || submitMutation.isPending}
              className="bg-text-main text-white px-8 py-4 rounded-[50px] font-semibold shadow-[0_12px_40px_rgba(62,54,48,0.08)] transition-all hover:-translate-y-1 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitMutation.isPending
                ? "Submitting..."
                : "Submit Grammar Quiz"}
            </button>
          </div>
        )}

        {questions.length > 0 && !allQuestionsAnswered() && (
          <p className="text-center text-sm text-text-muted -mt-8 mb-8">
            Please answer all questions before submitting (
            {
              Object.values(answers).filter(
                (answer) => answer !== null && answer !== undefined,
              ).length
            }{" "}
            of {questions.length} answered)
          </p>
        )}
      </div>
    </div>
  );
}
