import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorState } from '../components/common';
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
      <ErrorState
        error={error ?? undefined}
        title={error ? undefined : 'Lektion nicht gefunden'}
        message={
          error ? undefined : 'Diese Lektion existiert nicht oder ist noch nicht verfügbar.'
        }
        backLabel="Zurück zum Kurs"
        backPath="/course"
      />
    );
  }

  if (!deck) {
    return (
      <ErrorState
        variant="info"
        title="Noch keine Karteikarten"
        message="Diese Lektion hat noch kein Karteikarten-Deck."
        backLabel="Zurück zur Lektion"
        onBack={() => navigate(`/course/${lesson.lessonNumber}`, { replace: true })}
      />
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
