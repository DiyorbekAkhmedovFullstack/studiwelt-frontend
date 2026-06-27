import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GermanKeyboard } from "../components/common/GermanKeyboard";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { SectionCompletedState } from "../components/common/SectionCompletedState";
import { useProgress } from "../contexts/ProgressContext";
import {
  useCTestsByLesson,
  useSubmitCTestAnswers,
} from "../hooks/queries/useCTests";
import { useLessonByNumber } from "../hooks/queries/useLessons";
import { toastService } from "../services/toastService";
import { Icon, Ui } from "../lib/icons";

type Params = {
  lessonNumber?: string;
};

type GapPart = { type: "text"; value: string } | { type: "gap"; index: number };

type ParsedGapText = {
  parts: GapPart[];
  totalGaps: number;
};

type AnswersMap = Record<string, string>;

function parseGapText(gapText: string): ParsedGapText {
  const parts: GapPart[] = [];
  let currentText = "";
  let gapIndex = 0;

  const isMarker = (ch: string) => ch === "*";

  for (let i = 0; i < gapText.length; ) {
    const ch = gapText[i];
    if (isMarker(ch)) {
      if (currentText) {
        parts.push({ type: "text", value: currentText });
        currentText = "";
      }
      // Consume contiguous marker run as a single gap.
      while (i < gapText.length && isMarker(gapText[i])) {
        i++;
      }
      gapIndex += 1;
      parts.push({ type: "gap", index: gapIndex });
    } else {
      currentText += ch;
      i++;
    }
  }

  if (currentText) {
    parts.push({ type: "text", value: currentText });
  }

  return { parts, totalGaps: gapIndex };
}

export function LessonCtestPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const { isSectionLocked, refreshProgress } = useProgress();

  const [answers, setAnswers] = useState<AnswersMap>({});
  const [focusedGapIndex, setFocusedGapIndex] = useState<number | null>(null);

  // Fetch lesson data using React Query
  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useLessonByNumber(lessonNumber ? Number(lessonNumber) : 0);

  const lessonId = lesson?.id;

  // Check if section is locked
  const isLocked = lesson ? isSectionLocked(lesson.id, "ctest") : false;

  // Fetch C-tests (only if lesson exists and not locked)
  const { data: ctestsData, isLoading: ctestsLoading } = useCTestsByLesson(
    lessonId ?? 0,
  );

  const ctest = ctestsData?.[0] ?? null;

  // Submit mutation
  const submitMutation = useSubmitCTestAnswers();

  // Initialize answers when ctest changes
  useEffect(() => {
    if (ctest && Object.keys(answers).length === 0) {
      const parsed = parseGapText(ctest.gapText);
      const initialAnswers: AnswersMap = {};
      for (let i = 1; i <= parsed.totalGaps; i++) {
        initialAnswers[String(i)] = "";
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initialization from fetched data
      setAnswers(initialAnswers);
    }
  }, [ctest]); // eslint-disable-line react-hooks/exhaustive-deps

  const loading = lessonLoading || (!isLocked && ctestsLoading);
  const error = lessonError
    ? lessonError instanceof Error
      ? lessonError.message
      : "Laden fehlgeschlagen."
    : null;

  const parsed = useMemo(
    () => (ctest ? parseGapText(ctest.gapText) : { parts: [], totalGaps: 0 }),
    [ctest],
  );

  // Auto-focus first gap when content is loaded
  useEffect(() => {
    if (!loading && ctest && parsed.totalGaps > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const firstInput = document.querySelector<HTMLInputElement>(
          'input[data-gap-index="1"]',
        );
        firstInput?.focus();
      }, 100);
    }
  }, [loading, ctest, parsed.totalGaps]);

  const allGapsAnswered =
    parsed.totalGaps > 0 &&
    Array.from({ length: parsed.totalGaps }, (_, i) => String(i + 1)).every(
      (key) => answers[key]?.trim(),
    );

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [String(index)]: value,
    }));
  };

  const handleGermanCharacter = (char: string) => {
    if (focusedGapIndex === null) return;

    // Get the currently focused input
    const input = document.querySelector<HTMLInputElement>(
      `input[data-gap-index="${focusedGapIndex}"]`,
    );

    if (!input) return;

    // Get cursor position
    const cursorPosition = input.selectionStart ?? input.value.length;

    // Insert character at cursor position
    const currentValue = answers[String(focusedGapIndex)] ?? "";
    const newValue =
      currentValue.substring(0, cursorPosition) +
      char +
      currentValue.substring(cursorPosition);

    handleAnswerChange(focusedGapIndex, newValue);

    // Restore focus and move cursor after inserted character
    setTimeout(() => {
      input.focus();
      const newCursorPosition = cursorPosition + char.length;
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const { key } = e;
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart ?? 0;
    const textLength = input.value.length;

    // Navigate with arrow keys only when cursor is at edge
    if (key === "ArrowRight") {
      // Only navigate to next gap if cursor is at the end
      if (cursorPosition === textLength) {
        e.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex <= parsed.totalGaps) {
          const nextInput = document.querySelector<HTMLInputElement>(
            `input[data-gap-index="${nextIndex}"]`,
          );
          nextInput?.focus();
          // Set cursor to beginning of next input
          nextInput?.setSelectionRange(0, 0);
        }
      }
    } else if (key === "ArrowLeft") {
      // Only navigate to previous gap if cursor is at the beginning
      if (cursorPosition === 0) {
        e.preventDefault();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 1) {
          const prevInput = document.querySelector<HTMLInputElement>(
            `input[data-gap-index="${prevIndex}"]`,
          );
          prevInput?.focus();
          // Set cursor to end of previous input
          const prevLength = prevInput?.value.length ?? 0;
          prevInput?.setSelectionRange(prevLength, prevLength);
        }
      }
    } else if (key === "ArrowDown") {
      // Arrow down always moves to next gap
      e.preventDefault();
      const nextIndex = currentIndex + 1;
      if (nextIndex <= parsed.totalGaps) {
        const nextInput = document.querySelector<HTMLInputElement>(
          `input[data-gap-index="${nextIndex}"]`,
        );
        nextInput?.focus();
        nextInput?.setSelectionRange(0, 0);
      }
    } else if (key === "ArrowUp") {
      // Arrow up always moves to previous gap
      e.preventDefault();
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 1) {
        const prevInput = document.querySelector<HTMLInputElement>(
          `input[data-gap-index="${prevIndex}"]`,
        );
        prevInput?.focus();
        const prevLength = prevInput?.value.length ?? 0;
        prevInput?.setSelectionRange(prevLength, prevLength);
      }
    }
  };

  const getNextEmptyGapIndex = (): number | null => {
    for (let i = 1; i <= parsed.totalGaps; i++) {
      if (!answers[String(i)]?.trim()) {
        return i;
      }
    }
    return null;
  };

  const jumpToNextEmptyGap = () => {
    const nextEmpty = getNextEmptyGapIndex();
    if (nextEmpty !== null) {
      const input = document.querySelector<HTMLInputElement>(
        `input[data-gap-index="${nextEmpty}"]`,
      );
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => input.focus(), 300);
      }
    }
  };

  const handleSubmit = () => {
    if (!ctest || !lessonNumber) return;

    submitMutation.mutate(
      { testId: ctest.id, payload: { answers } },
      {
        onSuccess: async ({ result }) => {
          // Refresh progress after successful submission
          await refreshProgress();

          // Check if section just became completed (finished 3 successful attempts)
          const nowCompleted = isSectionLocked(ctest.lessonId, "ctest");
          if (nowCompleted) {
            toastService.success("C-Test-Abschnitt abgeschlossen!", {
              duration: 6000,
            });
          } else {
            toastService.success("C-Test eingereicht.");
          }

          navigate(`/course/${lessonNumber}/ctest/results`, {
            state: { result },
            replace: true,
          });
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Einreichen fehlgeschlagen.";

          // Check if section was completed (403 Forbidden)
          if (message.includes("locked") || message.includes("403")) {
            toastService.info("Abschnitt bereits abgeschlossen.");
          } else {
            toastService.error(message);
          }
        },
      },
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <LoadingSpinner />
      </div>
    );
  }

  // Show completion message if section is completed
  if (isLocked && lesson) {
    return (
      <SectionCompletedState
        title="Erfolgreich abgeschlossen"
        message="Du hast diesen Abschnitt bereits abgeschlossen."
        backPath={`/course/${lesson.lessonNumber}`}
        backLabel="Zurück zur Lektion"
      />
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-danger" role="alert">
            {error ?? "Lektion nicht gefunden."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/course")}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Zurück zum Kurs
          </button>
        </div>
      </div>
    );
  }

  if (!ctest || parsed.totalGaps === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-text-main">
            Diese Lektion hat noch keinen konfigurierten C-Test.
          </p>
          <button
            type="button"
            onClick={() =>
              navigate(`/course/${lesson.lessonNumber}`, { replace: true })
            }
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Zurück zur Lektion
          </button>
        </div>
      </div>
    );
  }

  const filledCount = Object.values(answers).filter(
    (value) => value.trim().length > 0,
  ).length;

  return (
    <div className="min-h-screen bg-page">
      <main id="main-content" className="pt-10 px-6 pb-10">
        <div className="max-w-[800px] mx-auto">
          {/* Header with Back Button */}
          <header className="mb-4 sm:mb-8">
            <button
              type="button"
              onClick={() =>
                navigate(`/course/${lesson.lessonNumber}`, { replace: true })
              }
              className="text-[14px] text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Ui.ArrowLeft size={16} />
              Zurück zur Lektion
            </button>
          </header>

          {/* Mobile only: Progress and Find Button outside paper */}
          <div className="flex items-center gap-2 mb-4 sm:hidden">
            <div className="bg-surface py-3.5 px-3 rounded-full text-xs text-text-muted shadow-sm inline-flex items-center font-medium leading-none">
              {filledCount} / {parsed.totalGaps} Lücken
            </div>
            {!allGapsAnswered && (
              <button
                type="button"
                onClick={jumpToNextEmptyGap}
                className="inline-flex items-center gap-1 bg-primary text-white py-1.5 px-3 rounded-full text-xs font-medium shadow-sm active:bg-primary-hover transition-all cursor-pointer leading-none"
              >
                <Icon.Search className="shrink-0" size={14} />
                Nächste Lücke finden
              </button>
            )}
          </div>

          {/* Main Content - Paper Sheet */}
          <div className="bg-surface w-full px-5 py-8 sm:px-20 sm:py-20 shadow-[0_10px_40px_rgba(62,54,48,0.1)] rounded-sm">
            {/* Title with controls on desktop */}
            <div className="mb-8 sm:mb-12 border-b-2 border-[#F0F0F0] pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <h1 className="font-serif text-2xl sm:text-[28px] leading-tight">
                  {ctest.title}
                </h1>
                {/* Desktop only: Progress and Find Button inside paper */}
                <div className="hidden sm:flex items-center gap-3">
                  <div className="bg-page py-3.5 px-4 rounded-full text-[13px] text-text-muted inline-flex items-center font-medium leading-none">
                    {filledCount} / {parsed.totalGaps} Lücken ausgefüllt
                  </div>
                  {!allGapsAnswered && (
                    <button
                      type="button"
                      onClick={jumpToNextEmptyGap}
                      className="inline-flex items-center gap-1.5 bg-primary text-white py-2 px-4 rounded-full text-[13px] font-medium hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer leading-none"
                    >
                      <Icon.Search className="shrink-0" size={14} />
                      Nächste Lücke
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* C-Test Content */}
            <div className="font-serif text-base sm:text-[20px] leading-[2.2] text-[#4A423D] mb-8">
              {parsed.parts.map((part, idx) => {
                if (part.type === "text") {
                  // Get the next part to check if it's a gap
                  const nextPart = parsed.parts[idx + 1];
                  const nextIsGap = nextPart?.type === "gap";

                  // If next part is a gap, we need to wrap the last word with the gap together
                  if (nextIsGap) {
                    const lastSpaceIndex = part.value.lastIndexOf(" ");

                    if (lastSpaceIndex === -1) {
                      // Entire text is one word - it will be wrapped with gap below
                      // Skip rendering here, will be rendered together with gap
                      return null;
                    } else {
                      // Only render the part before the last word
                      const beforeLastWord = part.value.substring(
                        0,
                        lastSpaceIndex + 1,
                      );
                      return <span key={idx}>{beforeLastWord}</span>;
                    }
                  }

                  return <span key={idx}>{part.value}</span>;
                }

                // Gap input
                const index = part.index;
                const value = answers[String(index)] ?? "";
                const width = Math.max(2, value.length || 2);

                // Check if previous part has a word that should be wrapped with this input
                const prevPart = parsed.parts[idx - 1];
                let wordPrefix = "";

                if (prevPart?.type === "text") {
                  const lastSpaceIndex = prevPart.value.lastIndexOf(" ");
                  if (lastSpaceIndex === -1) {
                    // Entire previous text is the word
                    wordPrefix = prevPart.value;
                  } else {
                    // Get the last word
                    wordPrefix = prevPart.value.substring(lastSpaceIndex + 1);
                  }
                }

                return (
                  <span
                    key={`gap-${index}-${idx}`}
                    className="inline whitespace-nowrap align-baseline"
                  >
                    <span className="tracking-normal align-baseline">
                      {wordPrefix}
                    </span>
                    <input
                      type="text"
                      aria-label={`Lücke ${index}`}
                      data-gap-index={index}
                      value={value}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={() => setFocusedGapIndex(index)}
                      onBlur={() => setFocusedGapIndex(null)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      style={{ width: `${width}ch`, padding: "0", margin: "0" }}
                      className="font-serif text-base sm:text-[20px] text-primary bg-transparent border-none border-b-2 border-[#D1D1D1] outline-none transition-all text-left rounded-none font-semibold tracking-normal focus:border-primary focus:bg-[rgba(166,123,91,0.1)] align-baseline"
                    />
                  </span>
                );
              })}
            </div>

            {/* German Keyboard */}
            <div className="border-t border-[#F0F0F0] pt-6 mb-6">
              <GermanKeyboard onCharacterClick={handleGermanCharacter} />
            </div>

            {/* Navigation Instructions - Hide on smartphones */}
            <div className="hidden md:flex items-center justify-center gap-4 mb-6 text-[12px] text-text-muted">
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center bg-page px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                  ←
                </span>
                <span className="inline-flex items-center bg-page px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                  →
                </span>
                <span className="ml-1">Navigieren</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center bg-page px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                  ↑
                </span>
                <span className="inline-flex items-center bg-page px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                  ↓
                </span>
                <span className="ml-1">Springen</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center bg-page px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                  Tab
                </span>
                <span className="ml-1">Weiter</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allGapsAnswered || submitMutation.isPending}
              className="w-full bg-primary text-white border-none py-3 sm:py-3.5 px-8 rounded-xl text-sm sm:text-base font-semibold cursor-pointer shadow-[0_4px_12px_rgba(166,123,91,0.3)] transition-all hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitMutation.isPending
                ? "Wird eingereicht..."
                : "Antworten überprüfen"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
