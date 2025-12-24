import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { LessonDeckPractice } from '../components/lesson/LessonDeckPractice';
import { useLessonByNumber } from '../hooks/queries/useLessons';
import { useDecksByLesson } from '../hooks/queries/useDecks';

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
      : 'Load failed.'
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

  if (!deck) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-2 text-sm text-text-main">
            This lesson does not have a flashcard deck yet.
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

  return (
    <div className="min-h-screen bg-page">
      <main className="pt-10 px-6 pb-10">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <header className="mb-8">
            <button
              type="button"
              onClick={() => navigate(`/course/${lesson.lessonNumber}`)}
              className="text-[14px] text-primary font-semibold mb-3 hover:underline inline-flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Lesson
            </button>
          </header>

          <LessonDeckPractice deck={deck} />
        </div>
      </main>
    </div>
  );
}
