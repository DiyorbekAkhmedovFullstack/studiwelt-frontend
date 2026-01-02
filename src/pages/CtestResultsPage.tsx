import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CTestResult } from '../types/api';
import { DashboardLayout } from '../components/dashboard';
import { MIN_PASSING_SCORE } from '../constants/progress';

type Params = {
  lessonNumber?: string;
};

type LocationState = {
  result?: CTestResult;
};

export function CtestResultsPage() {
  const { lessonNumber } = useParams<Params>();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const result = state?.result;

  // Helper function to render context with bold highlighting
  const renderContextWithHighlight = (context: string) => {
    // Split by **text** pattern to find bold parts
    const parts = context.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and render as bold
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold text-primary">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg border border-border-soft">
          <p className="mb-4 text-sm text-danger" role="alert">
            Keine C-Test-Ergebnisse gefunden. Bitte schließe zuerst den C-Test ab.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}/ctest`)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Zum C-Test
          </button>
        </div>
      </div>
    );
  }

  const passed = result.percentage >= MIN_PASSING_SCORE;

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-0">
        {/* Header */}
        <header className="mb-6 sm:mb-10">
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}`)}
            className="mb-4 text-sm sm:text-[14px] font-medium text-primary hover:text-primary-hover transition-colors"
          >
            ← Zurück zur Lektion
          </button>
          <h1 className="text-3xl sm:text-[40px] font-serif font-bold text-text-main mb-2">
            C-Test-Ergebnisse
          </h1>
          {result.title && (
            <p className="text-text-muted text-sm sm:text-[15px]">{result.title}</p>
          )}
        </header>

        {/* Score Summary Card */}
        <section className="bg-surface rounded-2xl sm:rounded-[24px] shadow-card p-6 sm:p-10 mb-8">
          <div className="text-center">
            {/* Circular Score */}
            <div className="relative w-24 h-24 sm:w-[140px] sm:h-[140px] mx-auto mb-4 sm:mb-6">
              <svg width="100%" height="100%" viewBox="0 0 36 36" className="transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className={`text-2xl sm:text-[36px] font-bold ${passed ? 'text-[#6B8C6E]' : 'text-[#C07766]'}`}>
                  {result.percentage.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Status Message */}
            <h2 className="text-2xl sm:text-[28px] font-serif font-bold mb-2 sm:mb-3">
              {passed ? 'Ausgezeichnete Arbeit!' : 'Weiter üben!'}
            </h2>
            <p className="text-text-muted text-sm sm:text-[15px] mb-4 sm:mb-6">
              Du hast {result.score} von {result.totalGaps} Lücken richtig ausgefüllt.
            </p>

            {/* Pass/Fail Badge */}
            <div className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 ${passed ? 'bg-[#EBF5EC] text-[#6B8C6E]' : 'bg-[#FFF5F5] text-[#C07766]'
              }`}>
              {passed ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wide">Bestanden</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wide">Nicht bestanden</span>
                </>
              )}
              <span className="text-xs sm:text-[13px] opacity-70">(70% erforderlich)</span>
            </div>
          </div>
        </section>

        {/* Gap-by-Gap Review */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-[20px] font-bold mb-4 sm:mb-6">Lücke für Lücke Überprüfung</h2>

          <div className="space-y-4">
            {result.gaps.map((gap) => (
              <div
                key={gap.index}
                className={`bg-surface rounded-xl sm:rounded-[16px] p-4 sm:p-6 shadow-card border-2 transition-all ${gap.isCorrect
                    ? 'border-[#EBF5EC] hover:shadow-[0_8px_24px_rgba(107,140,110,0.15)]'
                    : 'border-[#FFE5E5] hover:shadow-[0_8px_24px_rgba(192,119,102,0.15)]'
                  }`}
              >
                {/* Gap Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <span className="text-xs sm:text-[13px] font-semibold text-text-muted uppercase tracking-wide">
                    Lücke {gap.index}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wide ${gap.isCorrect
                        ? 'bg-[#EBF5EC] text-[#6B8C6E]'
                        : 'bg-[#FFF5F5] text-[#C07766]'
                      }`}
                  >
                    {gap.isCorrect ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Richtig
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Falsch
                      </>
                    )}
                  </span>
                </div>

                {/* Full Sentence Context */}
                <div className="mb-4 p-3 sm:p-4 bg-[#FFFCF8] rounded-lg border border-[rgba(0,0,0,0.05)]">
                  <p className="text-xs sm:text-[13px] font-semibold text-text-muted mb-1 sm:mb-2 uppercase tracking-wide">
                    Satz
                  </p>
                  <p className="text-sm sm:text-[16px] text-text-main font-serif leading-relaxed">
                    {renderContextWithHighlight(gap.context)}
                  </p>
                </div>

                {/* Answers */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border-2 ${gap.isCorrect
                      ? 'border-[#EBF5EC] bg-[#F5FAF6]'
                      : 'border-[#FFE5E5] bg-[#FFF5F5]'
                    }`}>
                    <span className="text-xs sm:text-[13px] font-semibold text-text-muted">Deine Antwort:</span>
                    <span className={`text-sm sm:text-[14px] font-bold ${gap.isCorrect ? 'text-[#6B8C6E]' : 'text-[#C07766]'
                      }`}>
                      {gap.userAnswer ?? '—'}
                    </span>
                  </div>

                  {!gap.isCorrect && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border-2 border-[#EBF5EC] bg-[#F5FAF6]">
                      <span className="text-xs sm:text-[13px] font-semibold text-text-muted">Richtige Antwort:</span>
                      <span className="text-sm sm:text-[14px] font-bold text-[#6B8C6E]">
                        {gap.correctAnswer ?? '—'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}`, { replace: true })}
            className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-[15px] shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover transition-all hover:-translate-y-0.5"
          >
            Zurück zur Lektion
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
