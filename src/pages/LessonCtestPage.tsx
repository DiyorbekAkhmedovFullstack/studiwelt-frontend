import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lessonService, type LessonResponse } from '../services/lessonService';
import { ctestService } from '../services/ctestService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toastService } from '../services/toastService';
import type { CTest } from '../types/api';
import { useProgress } from '../contexts/ProgressContext';
import { SectionCompletedState } from '../components/common/SectionCompletedState';
import { GermanKeyboard } from '../components/common/GermanKeyboard';

type Params = {
  lessonNumber?: string;
};

type GapPart =
  | { type: 'text'; value: string }
  | { type: 'gap'; index: number };

type ParsedGapText = {
  parts: GapPart[];
  totalGaps: number;
};

type AnswersMap = Record<string, string>;

function parseGapText(gapText: string): ParsedGapText {
  const parts: GapPart[] = [];
  let currentText = '';
  let gapIndex = 0;

  const isMarker = (ch: string) => ch === '*';

  for (let i = 0; i < gapText.length;) {
    const ch = gapText[i];
    if (isMarker(ch)) {
      if (currentText) {
        parts.push({ type: 'text', value: currentText });
        currentText = '';
      }
      // Consume contiguous marker run as a single gap.
      while (i < gapText.length && isMarker(gapText[i])) {
        i++;
      }
      gapIndex += 1;
      parts.push({ type: 'gap', index: gapIndex });
    } else {
      currentText += ch;
      i++;
    }
  }

  if (currentText) {
    parts.push({ type: 'text', value: currentText });
  }

  return { parts, totalGaps: gapIndex };
}

export function LessonCtestPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const { isSectionLocked, refreshProgress } = useProgress();

  const [lesson, setLesson] = useState<LessonResponse['lesson'] | null>(null);
  const [ctest, setCtest] = useState<CTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [focusedGapIndex, setFocusedGapIndex] = useState<number | null>(null);

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

        // Check if section is locked
        const locked = isSectionLocked(lessonData.lesson.id, 'ctest');
        setIsLocked(locked);

        if (locked) {
          setLoading(false);
          return;
        }

        const tests = await ctestService.getTestsByLesson(lessonData.lesson.id);
        if (!active) return;

        const test = tests.tests[0] ?? null;
        setCtest(test ?? null);

        if (!test) {
          return;
        }

        const parsed = parseGapText(test.gapText);
        const initialAnswers: AnswersMap = {};
        for (let i = 1; i <= parsed.totalGaps; i++) {
          initialAnswers[String(i)] = '';
        }
        setAnswers(initialAnswers);
      } catch (err) {
        if (!active) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Load failed.';
        setError(message);
        toastService.error('Load failed.');
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
  }, [lessonNumber, isSectionLocked]);

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
    const currentValue = answers[String(focusedGapIndex)] ?? '';
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
    if (key === 'ArrowRight') {
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
    } else if (key === 'ArrowLeft') {
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
    } else if (key === 'ArrowDown') {
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
    } else if (key === 'ArrowUp') {
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


  const handleSubmit = async () => {
    if (!ctest || !lessonNumber) return;

    setSubmitting(true);
    try {
      const { result } = await ctestService.submitAnswers(ctest.id, {
        answers,
      });

      // Refresh progress after successful submission
      await refreshProgress();

      // Check if section just became completed (finished 3 successful attempts)
      const nowCompleted = isSectionLocked(ctest.lessonId, 'ctest');
      if (nowCompleted) {
        toastService.success('C-Test section completed!', { duration: 6000 });
      } else {
        toastService.success('C-Test submitted.');
      }

      navigate(`/course/${lessonNumber}/ctest/results`, {
        state: { result },
        replace: true,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Submit failed.';

      // Check if section was completed (403 Forbidden)
      if (message.includes('locked') || message.includes('403')) {
        toastService.info('Section already completed.');
        setIsLocked(true);
      } else {
        toastService.error(message);
      }
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

  // Show completion message if section is completed
  if (isLocked && lesson) {
    return (
      <SectionCompletedState
        title="Successfully Completed"
        message="You have already completed this section."
        backPath={`/course/${lesson.lessonNumber}`}
        backLabel="Back to lesson"
      />
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-danger" role="alert">
            {error ?? 'Lesson not found.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/course')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Back to course
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
            This lesson does not have a configured C‑Test yet.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lesson.lessonNumber}`)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Back to lesson
          </button>
        </div>
      </div>
    );
  }

  const filledCount = Object.values(answers).filter((value) => value.trim().length > 0).length;

  return (

    <div className="h-screen overflow-hidden bg-page flex flex-col">
      {/* Header Bar */}
      <header className="h-14 sm:h-16 bg-surface border-b border-[rgba(0,0,0,0.05)] flex items-center justify-between px-4 sm:px-8 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate(`/course/${lesson.lessonNumber}`)}
          className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-medium text-sm sm:text-base"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back to Lesson</span>
          <span className="sm:hidden">Exit</span>
        </button>
        <div className="font-semibold text-text-main text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">{ctest.title}</div>
        <div className="w-[60px] sm:w-[80px]"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content - Paper Sheet */}
      <main className="flex-1 flex justify-center overflow-y-auto py-6 sm:py-10 px-3 sm:px-5">
        <div className="bg-surface w-full max-w-[800px] px-5 py-8 sm:px-20 sm:py-20 shadow-[0_10px_40px_rgba(62,54,48,0.1)] rounded-sm h-fit paper-sheet">
          {/* Exercise Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 border-b-2 border-[#F0F0F0] pb-6 gap-4 sm:gap-0">
            <div>
              <h1 className="font-serif text-2xl sm:text-[28px] mb-2 leading-tight">{ctest.title}</h1>
              <p className="text-text-muted text-sm sm:text-[15px]">
                {ctest.description || 'Restore the missing parts of the words (Rule of 2).'}
              </p>
            </div>
            <div className="bg-page px-4 py-2 rounded-[20px] font-semibold text-xs sm:text-[14px] text-text-muted self-start sm:self-auto">
              <span>{filledCount}</span> / {parsed.totalGaps} Gaps Filled
            </div>
          </div>

          {/* C-Test Content */}
          <div className="font-serif text-base sm:text-[20px] leading-[2.2] text-[#4A423D]">
            {parsed.parts.map((part, idx) => {
              if (part.type === 'text') {
                // Get the next part to check if it's a gap
                const nextPart = parsed.parts[idx + 1];
                const nextIsGap = nextPart?.type === 'gap';

                // If next part is a gap, we need to wrap the last word with the gap together
                if (nextIsGap) {
                  const lastSpaceIndex = part.value.lastIndexOf(' ');

                  if (lastSpaceIndex === -1) {
                    // Entire text is one word - it will be wrapped with gap below
                    // Skip rendering here, will be rendered together with gap
                    return null;
                  } else {
                    // Only render the part before the last word
                    const beforeLastWord = part.value.substring(0, lastSpaceIndex + 1);
                    return <span key={idx}>{beforeLastWord}</span>;
                  }
                }

                return <span key={idx}>{part.value}</span>;
              }

              // Gap input
              const index = part.index;
              const value = answers[String(index)] ?? '';
              const width = Math.max(2, value.length || 2);

              // Check if previous part has a word that should be wrapped with this input
              const prevPart = parsed.parts[idx - 1];
              let wordPrefix = '';

              if (prevPart?.type === 'text') {
                const lastSpaceIndex = prevPart.value.lastIndexOf(' ');
                if (lastSpaceIndex === -1) {
                  // Entire previous text is the word
                  wordPrefix = prevPart.value;
                } else {
                  // Get the last word
                  wordPrefix = prevPart.value.substring(lastSpaceIndex + 1);
                }
              }

              return (
                <span key={`gap-${index}-${idx}`} className="inline-block whitespace-nowrap">
                  <span className="tracking-normal">{wordPrefix}</span>
                  <input
                    type="text"
                    aria-label={`Gap ${index}`}
                    data-gap-index={index}
                    value={value}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => setFocusedGapIndex(index)}
                    onBlur={() => setFocusedGapIndex(null)}
                    style={{ width: `${width}ch`, padding: '0', margin: '0' }}
                    className="font-serif text-base sm:text-[20px] text-primary bg-transparent border-none border-b-2 border-[#D1D1D1] outline-none transition-all text-left rounded-none font-semibold tracking-normal focus:border-primary focus:bg-[rgba(166,123,91,0.1)]"
                  />
                </span>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="bg-white border-t border-[#EEE] flex-shrink-0">
        {/* German Keyboard Section */}
        <div className="border-b border-[#F5F5F5] py-3 px-4 sm:px-10">
          <GermanKeyboard onCharacterClick={handleGermanCharacter} />
        </div>

        {/* Main Footer Controls */}
        <div className="py-4 sm:py-5 px-4 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left: Stats and Keyboard Shortcuts */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="text-xs sm:text-[14px] text-text-muted">
              <span className="font-semibold text-text-main">{filledCount}</span> / {parsed.totalGaps} Gaps Filled
            </div>

            {/* Keyboard Shortcuts - Hide on mobile */}
            <div className="text-[12px] text-text-muted hidden lg:flex items-center gap-1">
              <span className="inline-flex items-center bg-surface px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                ←
              </span>
              <span className="inline-flex items-center bg-surface px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                →
              </span>
              <span className="mr-2">Navigate</span>
              <span className="inline-flex items-center bg-surface px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                ↑
              </span>
              <span className="inline-flex items-center bg-surface px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                ↓
              </span>
              <span className="mr-2">Jump</span>
              <span className="inline-flex items-center bg-surface px-1.5 py-0.5 rounded border border-[#ccc] font-mono text-[11px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
                Tab
              </span>
              <span>Next</span>
            </div>
          </div>

          {/* Right: Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allGapsAnswered || submitting}
            className="w-full sm:w-auto bg-primary text-white border-none py-3 sm:py-3.5 px-8 sm:px-12 rounded-xl sm:rounded-[50px] text-sm sm:text-base font-semibold cursor-pointer shadow-[0_4px_12px_rgba(166,123,91,0.3)] transition-all hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {submitting ? 'Submitting...' : 'Check My Answers'}
          </button>
        </div>
      </footer>
    </div>
  );
}
