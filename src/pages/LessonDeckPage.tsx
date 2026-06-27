import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { LessonDeckPractice } from '../components/lesson/LessonDeckPractice';
import { useLessonByNumber } from '../hooks/queries/useLessons';
import { useDecksByLesson } from '../hooks/queries/useDecks';
import { Ui } from '../lib/icons';

type Params = {
  lessonNumber?: string;
};

export function LessonDeckPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();

  // Fetch lesson data using React Query
  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useLessonByNumber(lessonNumber ? Number(lessonNumber) : 0);

  const lessonId = lesson?.id;

  // Fetch decks (depends on lesson.id)
  const {
    data: decks = [],
    isLoading: decksLoading,
  } = useDecksByLesson(lessonId ?? 0);

  const deck = decks[0] ?? null;

  const loading = lessonLoading || decksLoading;
  const error = lessonError
    ? lessonError instanceof Error
      ? lessonError.message
      : 'Laden fehlgeschlagen.'
    : null;

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
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-danger" role="alert">
            {error ?? 'Lektion nicht gefunden.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/course')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Zurück zum Kurs
          </button>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-2 text-sm text-text-main">
            Diese Lektion hat noch kein Karteikarten-Deck.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lesson.lessonNumber}`, { replace: true })}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Zurück zur Lektion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <main id="main-content" className="pt-10 px-6 pb-10">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <header className="mb-8">
            <button
              type="button"
              onClick={() => navigate(`/course/${lesson.lessonNumber}`, { replace: true })}
              className="text-[14px] text-primary font-semibold mb-3 hover:underline inline-flex items-center gap-1"
            >
              <Ui.ArrowLeft size={16} />
              Zurück zur Lektion
            </button>
          </header>

          <LessonDeckPractice deck={deck} />
        </div>
      </main>
    </div>
  );
}
