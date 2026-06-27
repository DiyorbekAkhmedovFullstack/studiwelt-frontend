import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingScreen, ErrorState, SectionCompletedState } from '../components/common';
import { toastService } from '../services/toastService';
import { useProgress } from '../contexts/ProgressContext';
import { useReadingForTaking, useSubmitReadingAnswers } from '../hooks/queries/useReadings';
import { Ui } from '../lib/icons';

type Params = {
  lessonNumber?: string;
  readingId?: string;
};

export function ReadingExercisePage() {
  const { lessonNumber, readingId } = useParams<Params>();
  const navigate = useNavigate();
  const { isSectionLocked, refreshProgress } = useProgress();

  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>(
    {},
  );
  const [activeTab, setActiveTab] = useState<'passage' | 'questions'>('passage');

  // Fetch reading data using React Query
  const {
    data: reading,
    isLoading,
    error: readingError,
  } = useReadingForTaking(readingId ?? '');

  // Check if section is locked
  const isLocked = reading ? isSectionLocked(reading.lessonId, 'reading') : false;

  // Submit mutation
  const submitMutation = useSubmitReadingAnswers();

  // Initialize answers when reading changes
  useEffect(() => {
    if (reading && reading.questions && Object.keys(answers).length === 0) {
      const initialAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null> = {};
      reading.questions.forEach((q) => {
        initialAnswers[q.id] = null;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initialization from fetched data
      setAnswers(initialAnswers);
    }
  }, [reading]); // eslint-disable-line react-hooks/exhaustive-deps

  const loading = isLoading;
  const error = readingError
    ? readingError instanceof Error
      ? readingError.message
      : 'Laden fehlgeschlagen.'
    : null;

  const handleAnswerChange = (
    questionId: string,
    letter: 'A' | 'B' | 'C' | 'D',
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const allQuestionsAnswered = () => {
    if (!reading) return false;
    return reading.questions.every((q) => answers[q.id] !== null && answers[q.id] !== undefined);
  };

  const handleSubmit = () => {
    if (!reading || !readingId) return;

    // Filter out null/undefined answers
    const validAnswers = Object.entries(answers).reduce(
      (acc, [qId, letter]) => {
        if (letter !== null && letter !== undefined) {
          acc[qId] = letter;
        }
        return acc;
      },
      {} as Record<string, 'A' | 'B' | 'C' | 'D'>,
    );

    submitMutation.mutate(
      { readingId, answers: validAnswers },
      {
        onSuccess: async (data) => {
          // Refresh progress after successful submission
          await refreshProgress();

          // Check if section just became completed (finished 3 successful attempts)
          if (reading) {
            const nowCompleted = isSectionLocked(reading.lessonId, 'reading');
            if (nowCompleted) {
              toastService.success(
                'Leseverstehen-Bereich abgeschlossen!',
                { duration: 6000 }
              );
            } else {
              toastService.success('Quiz abgesendet.');
            }
          } else {
            toastService.success('Quiz abgesendet.');
          }

          // Navigate to results page, passing result via state
          navigate(`/course/${lessonNumber}/reading/${readingId}/results`, {
            state: { result: data.result },
            replace: true,
          });
        },
        onError: (err) => {
          const message =
            err instanceof Error
              ? err.message
              : 'Absenden fehlgeschlagen.';

          // Check if section was completed (403 Forbidden)
          if (message.includes('locked') || message.includes('403')) {
            toastService.info('Bereich bereits abgeschlossen.');
          } else {
            toastService.error(message);
          }
        },
      }
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Show completion message if section is completed
  if (isLocked && reading) {
    return (
      <SectionCompletedState
        backPath={`/course/${lessonNumber}`}
        backLabel="Zurück zur Lektion"
      />
    );
  }

  if (error || !reading) {
    return (
      <ErrorState
        error={error ?? 'Lesetext nicht gefunden.'}
        backPath={`/course/${lessonNumber}`}
        backLabel="Zurück zur Lektion"
      />
    );
  }

  const answeredCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length;
  const progressPercentage = reading.questions.length > 0
    ? (answeredCount / reading.questions.length) * 100
    : 0;

  return (
    <div className="h-screen overflow-hidden bg-page flex flex-col">
      {/* Header Bar */}
      <header className="h-14 sm:h-16 bg-surface border-b border-[rgba(0,0,0,0.05)] flex items-center justify-between px-3 sm:px-8 fixed top-0 w-full z-50">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}`, { replace: true })}
            className="group flex items-center gap-2 px-3 py-2 -ml-2 rounded-lg text-text-muted hover:text-text-main hover:bg-black/5 transition-all"
          >
            <Ui.ArrowLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="text-sm font-medium">Beenden</span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-text-muted text-[11px] sm:text-sm">
          <span className="hidden sm:inline">Frage {answeredCount} von {reading.questions.length}</span>
          <span className="sm:hidden">{answeredCount}/{reading.questions.length}</span>
          <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#EEE] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden fixed top-14 sm:top-16 left-0 right-0 z-40 bg-surface border-b border-[rgba(0,0,0,0.05)] flex shadow-sm">
        <button
          onClick={() => setActiveTab('passage')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === 'passage' ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
        >
          Lesetext
          {activeTab === 'passage' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === 'questions' ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
        >
          Fragen
          {activeTab === 'questions' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Split View - Stack on Mobile */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1.4fr_1fr] mt-14 sm:mt-16 pt-[45px] lg:pt-0 overflow-hidden">
        {/* LEFT PANE: Reading Material */}
        <section className={`bg-page overflow-y-auto py-4 sm:py-10 px-3 sm:px-12 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.05)] reading-pane h-full ${activeTab === 'passage' ? 'block' : 'hidden lg:block'
          }`}>
          <div className="flex justify-center min-h-min">
            <article className="bg-surface w-full max-w-3xl px-4 sm:px-16 py-6 sm:py-16 shadow-[0_10px_40px_rgba(62,54,48,0.1)] rounded-sm h-fit paper-sheet">
              <div className="text-[11px] sm:text-sm text-text-muted uppercase tracking-wider mb-3 sm:mb-4 font-semibold">
                Lesetext
              </div>
              <h1 className="font-serif text-xl sm:text-2xl md:text-[32px] mb-4 sm:mb-8 leading-tight text-text-main">
                {reading.title}
              </h1>
              <div className="font-serif text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.9] text-[#4A423D]">
                {reading.text.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 sm:mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* RIGHT PANE: Quiz Interface */}
        <aside className={`bg-[#FAF9F7] py-4 sm:py-10 px-3 sm:px-10 overflow-y-auto flex-col gap-4 sm:gap-8 h-full ${activeTab === 'questions' ? 'flex' : 'hidden lg:flex'
          }`}>
          {reading.questions.map((question, qIndex) => (
            <div
              key={question.id}
              className="bg-surface rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-card border border-transparent"
            >
              <span className="block text-[11px] sm:text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                Frage {qIndex + 1}
              </span>
              <p className="text-sm sm:text-base md:text-[17px] font-semibold mb-3 sm:mb-5 leading-relaxed text-text-main">
                {question.questionText}
              </p>

              <div className="flex flex-col gap-2 sm:gap-3">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.optionLetter;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3.5 border-2 rounded-lg cursor-pointer transition-all text-xs sm:text-sm md:text-[15px] ${isSelected
                        ? 'border-primary bg-[#FFFCFA] text-text-main'
                        : 'border-[#F0F0F0] hover:border-[#E3D4C5] hover:bg-[#FFFCFA]'
                        }`}
                      onClick={() => handleAnswerChange(question.id, option.optionLetter)}
                    >
                      <div className={`w-4 sm:w-5 h-4 sm:h-5 border-2 rounded-full mr-3 sm:mr-4 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-primary' : 'border-[#D1D1D1]'
                        }`}>
                        <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary rounded-full transition-transform ${isSelected ? 'scale-100' : 'scale-0'
                          }`} />
                      </div>
                      <span>{option.optionText}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-auto pt-4 sm:pt-6 pb-4 sm:pb-0">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered() || submitMutation.isPending}
              className="w-full bg-primary text-white border-none py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base cursor-pointer transition-all hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? 'Wird gesendet...' : 'Antworten prüfen'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
