import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Card, Deck } from '../../types/api';
import { deckService } from '../../services/deckService';
import { toastService } from '../../services/toastService';
import { useProgress } from '../../contexts/ProgressContext';
import { Icon, Ui } from '../../lib/icons';

type LessonDeckPracticeProps = {
  deck: Deck;
};

type Params = {
  lessonNumber?: string;
};

import { SectionCompletedState } from '../common/SectionCompletedState';

export function LessonDeckPractice({ deck }: LessonDeckPracticeProps) {
  const navigate = useNavigate();
  const { lessonNumber } = useParams<Params>();
  const { isSectionLocked, refreshProgress } = useProgress();

  const [currentDeck, setCurrentDeck] = useState<Deck>(deck);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [savingReview, setSavingReview] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionIncorrect, setSessionIncorrect] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const cards = currentDeck.cards;
  const total = cards.length;
  const allReviewed = sessionCorrect + sessionIncorrect >= total;
  const currentCard: Card = cards[currentIndex];

  const handleFlip = () => {
    if (allReviewed) return;
    setIsFlipped((prev) => !prev);
  };

  const handleReview = async (isCorrect: boolean) => {
    if (!isFlipped || allReviewed) {
      return;
    }

    setSavingReview(true);
    try {
      const { card } = await deckService.reviewCard(currentCard.id, isCorrect);

      const nextCorrect = isCorrect ? sessionCorrect + 1 : sessionCorrect;
      const nextIncorrect = !isCorrect ? sessionIncorrect + 1 : sessionIncorrect;

      setCurrentDeck((prev) => ({
        ...prev,
        cards: prev.cards.map((c) =>
          c.id === card.id ? { ...c, ...card } : c,
        ),
      }));

      if (isCorrect) {
        setSessionCorrect((prev) => prev + 1);
      } else {
        setSessionIncorrect((prev) => prev + 1);
      }

      // Advance to next card
      if (currentIndex < total - 1) {
        // Wait for current card to exit before advancing
        setTimeout(() => {
          setCurrentIndex((idx) => idx + 1);
          setIsFlipped(false);
        }, 200);
      }

      const willAllBeReviewed = nextCorrect + nextIncorrect >= total;

      if (willAllBeReviewed && lessonNumber) {
        const percentage = total > 0 ? (nextCorrect / total) * 100 : 0;

        // Complete the session on the backend
        try {
          await deckService.completeSession(currentDeck.id, {
            cardsReviewed: total,
            cardsCorrect: nextCorrect,
            totalCards: total,
          });

          // Refresh progress after completion
          await refreshProgress();

          // Check if flashcard section just became completed
          if (currentDeck.lessonId) {
            const nowCompleted = isSectionLocked(currentDeck.lessonId, 'flashcards');
            if (nowCompleted) {
              toastService.success(
                'Karteikarten-Abschnitt erfolgreich abgeschlossen! Du hast alle 3 Versuche mit tollen Ergebnissen absolviert.',
                { duration: 6000 }
              );
            }
          }
        } catch (sessionErr) {
          console.error('Failed to complete session', sessionErr);
          // Don't block navigation if session completion fails
        }

        navigate(`/course/${lessonNumber}/deck/results`, {
          state: {
            result: {
              deckName: currentDeck.name,
              totalCards: total,
              correct: nextCorrect,
              incorrect: nextIncorrect,
              percentage,
            },
          },
          replace: true,
        });
      }
    } catch (err) {
      console.error('Failed to record card review', err);
      toastService.error('Überprüfung fehlgeschlagen.');
    } finally {
      setSavingReview(false);
    }
  };

  const handleReviewRef = useRef<typeof handleReview>(() => Promise.resolve());
  handleReviewRef.current = handleReview;

  useEffect(() => {
    setCurrentDeck(deck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCorrect(0);
    setSessionIncorrect(0);

    // Check if section is locked
    if (deck.lessonId) {
      const locked = isSectionLocked(deck.lessonId, 'flashcards');
      setIsLocked(locked);
    }
  }, [deck, isSectionLocked]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allReviewed) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight' && isFlipped) {
        void handleReviewRef.current(true);
      } else if (e.code === 'ArrowLeft' && isFlipped) {
        void handleReviewRef.current(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [allReviewed, isFlipped]);

  // Show locked message if section is locked
  if (isLocked && lessonNumber) {
    return (
      <SectionCompletedState
        title="Erfolgreich abgeschlossen"
        message="Du hast diesen Abschnitt bereits abgeschlossen."
        backPath={`/course/${lessonNumber}`}
        backLabel="Zurück zur Lektion"
      />
    );
  }

  if (total === 0) {
    return (
      <p className="mt-2 text-sm text-text-muted">
        Das Deck dieser Lektion enthält noch keine Karten.
      </p>
    );
  }

  const progressPercentage = total > 0 ? ((currentIndex) / total) * 100 : 0;
  const remaining = total - currentIndex;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="bg-surface rounded-xl shadow-card p-5 mb-8 flex items-center justify-between">
        <div>
          <div className="text-[14px] text-text-muted mb-1">Fortschritt</div>
          <div className="text-[24px] font-bold font-serif">
            <span className="text-primary">{currentIndex + 1}</span>
            <span className="text-text-muted"> / {total}</span>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <div className="h-2 bg-[#EEE] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[14px] text-text-muted mb-1">Verbleibend</div>
          <div className="text-[24px] font-bold font-serif text-text-main">{remaining}</div>
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="relative w-full h-[400px] cursor-pointer mb-8"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.12)] border border-[rgba(0,0,0,0.05)] flex flex-col items-center p-8 sm:p-12"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            <div className="w-full text-center text-[14px] uppercase tracking-wider text-text-muted font-semibold mb-auto">
              Frage
            </div>
            <p className="text-[28px] font-serif text-center text-text-main leading-relaxed whitespace-pre-wrap max-w-[90%] my-auto">
              {currentCard.front}
            </p>
            <div className="w-full text-center text-[14px] text-text-muted flex items-center justify-center gap-2 opacity-70 mt-auto">
              <Icon.Reveal size={18} />
              Klicken, um die Antwort anzuzeigen
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 bg-[#FDFAF6] rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.12)] border border-[rgba(0,0,0,0.05)] flex flex-col items-center p-8 sm:p-12"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-full text-center text-[14px] uppercase tracking-wider text-text-muted font-semibold mb-auto">
              Antwort
            </div>
            <p className="text-[22px] font-serif text-center text-text-main leading-relaxed whitespace-pre-wrap max-w-[90%] my-auto">
              {currentCard.back}
            </p>
            {/* Spacer to balance the layout since front has a footer */}
            <div className="mt-auto h-[27px]" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Controls */}
      {!allReviewed && (
        <div className="flex items-center justify-center gap-5 mb-8">
          {/* Missed Button */}
          <button
            type="button"
            onClick={() => void handleReview(false)}
            disabled={savingReview || !isFlipped}
            className="relative w-16 h-16 rounded-full bg-surface shadow-card flex items-center justify-center text-[#C07766] border-2 border-transparent transition-all duration-200 hover:-translate-y-1 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 hover:bg-[#FFF5F5] hover:border-[#C07766]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          >
            <Ui.Close size={24} stroke={2.5} />
          </button>

          {/* Flip Button */}
          <button
            type="button"
            onClick={handleFlip}
            disabled={allReviewed}
            className="relative w-20 h-20 rounded-full bg-text-main text-white shadow-card flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:rotate-180 hover:bg-primary active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          >
            <Icon.Restart size={24} />
          </button>

          {/* Known Button */}
          <button
            type="button"
            onClick={() => void handleReview(true)}
            disabled={savingReview || !isFlipped}
            className="relative w-16 h-16 rounded-full bg-surface shadow-card flex items-center justify-center text-[#6B8C6E] border-2 border-transparent transition-all duration-200 hover:-translate-y-1 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 hover:bg-[#F0F7F1] hover:border-[#6B8C6E]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          >
            <Ui.Check size={24} stroke={2.5} />
          </button>
        </div>
      )}

      {/* Keyboard Shortcuts — only on devices that may have a keyboard (≥ md / iPad and up) */}
      <div className="hidden md:flex justify-center">
        <div className="text-center text-[13px] text-text-muted bg-[rgba(255,255,255,0.5)] px-4 py-2 rounded-full">
          <span className="inline-flex items-center bg-surface px-2 py-1 rounded border border-[#ccc] font-mono text-[14px] shadow-[0_2px_0_rgba(0,0,0,0.1)] mx-1">
            Space
          </span>
          Umdrehen
          <span className="mx-2">•</span>
          <span className="inline-flex items-center bg-surface px-2 py-1 rounded border border-[#ccc] font-mono text-[14px] shadow-[0_2px_0_rgba(0,0,0,0.1)] mx-1">
            ←
          </span>
          Schwer
          <span className="mx-2">•</span>
          <span className="inline-flex items-center bg-surface px-2 py-1 rounded border border-[#ccc] font-mono text-[14px] shadow-[0_2px_0_rgba(0,0,0,0.1)] mx-1">
            →
          </span>
          Leicht
        </div>
      </div>

      {allReviewed && (
        <div className="mt-8 text-center">
          <div className="bg-[#EBF5EC] rounded-xl p-6 inline-block">
            <div className="text-[17px] font-semibold text-[#6B8C6E] mb-2">Sitzung abgeschlossen!</div>
            <p className="text-[14px] text-[#6B8C6E]">
              Du wusstest{' '}
              <span className="font-bold">{sessionCorrect}</span> von{' '}
              <span className="font-bold">{total}</span> Karten
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
