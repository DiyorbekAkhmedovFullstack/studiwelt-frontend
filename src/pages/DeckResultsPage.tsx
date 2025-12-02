import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Params = {
  lessonNumber?: string;
};

type DeckSessionResult = {
  deckName: string;
  totalCards: number;
  correct: number;
  incorrect: number;
  percentage: number;
};

type LocationState = {
  result?: DeckSessionResult;
};

export function DeckResultsPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[#E3D4C5]">
          <p className="mb-6 text-base text-text-main" role="alert">
            No flashcards results found. Please study the deck first.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}/deck`)}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-all"
          >
            Go to flashcards
          </button>
        </div>
      </div>
    );
  }

  const passed = result.percentage >= 60;

  return (
    <div className="min-h-screen bg-page">
      {/* Fixed Header */}
      <header className="h-16 bg-surface border-b border-[rgba(0,0,0,0.05)] flex items-center px-8 sticky top-0 z-[100]">
        <button
          type="button"
          onClick={() => navigate(`/course/${lessonNumber}`)}
          className="flex items-center gap-2 text-text-muted text-[0.9rem] font-medium transition-colors hover:text-text-main"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Lesson {lessonNumber}
        </button>
      </header>

      {/* Content */}
      <div className="max-w-[900px] mx-auto py-10 px-5">
        {/* Title */}
        <div className="mb-8">
          <span className="text-[0.75rem] uppercase tracking-wider font-bold text-primary mb-3 block">
            Flashcards Results
          </span>
          <h1 className="font-serif text-[2.5rem] mb-2 text-text-main">Session Complete</h1>
          <p className="text-[1.1rem] text-text-muted">{result.deckName}</p>
        </div>

        {/* Score Card */}
        <section className="bg-surface rounded-[24px] p-10 shadow-card mb-10">
          <div className="text-center">
            {/* Circular Progress */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg width="128" height="128" viewBox="0 0 36 36" className="transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EEE"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={passed ? '#6B8C6E' : '#C07766'}
                  strokeWidth="3"
                  strokeDasharray={`${result.percentage}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`text-3xl font-bold ${passed ? 'text-[#6B8C6E]' : 'text-[#C07766]'}`}>
                  {result.percentage.toFixed(0)}%
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold mb-3 text-text-main">
              {passed ? 'Excellent Work!' : 'Keep Practicing!'}
            </h2>
            <p className="text-base text-text-muted mb-6">
              You marked <strong>{result.correct}</strong> out of <strong>{result.totalCards}</strong> cards as "I knew this".
            </p>

            {/* Statistics Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF6F3] px-5 py-2.5 border border-[#E3D4C5]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span className="text-sm text-text-muted">
                  Total: <span className="font-bold text-text-main">{result.totalCards}</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF5EC] px-5 py-2.5 border border-[#6B8C6E]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm text-[#6B8C6E]">
                  Knew: <span className="font-bold">{result.correct}</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF5F5] px-5 py-2.5 border border-[#C07766]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v20M2 12h20"></path>
                </svg>
                <span className="text-sm text-[#C07766]">
                  Practice: <span className="font-bold">{result.incorrect}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Encouragement Card */}
        <section className="bg-surface rounded-[24px] p-8 shadow-card mb-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#FAF6F3] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-2 text-text-main">
                {passed ? 'Great Progress!' : 'Keep Going!'}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {passed
                  ? 'You demonstrated strong knowledge of this vocabulary set. Continue reviewing to maintain retention.'
                  : 'Regular practice is key to mastering vocabulary. Review the cards you missed and try again tomorrow.'}
              </p>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-center mb-20">
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}`, { replace: true })}
            className="bg-text-main text-white px-8 py-4 rounded-full font-semibold shadow-[0_12px_40px_rgba(62,54,48,0.08)] transition-all hover:-translate-y-1 hover:bg-primary"
          >
            Back to Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
