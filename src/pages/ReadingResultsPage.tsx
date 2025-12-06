import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { ReadingAttemptResult } from '../types/api';
import { MIN_PASSING_SCORE } from '../constants/progress';

type Params = {
  lessonNumber?: string;
  readingId?: string;
};

export function ReadingResultsPage() {
  const { lessonNumber, readingId } = useParams<Params>();
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result as ReadingAttemptResult | undefined;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-md rounded-[24px] bg-surface p-8 shadow-card border border-[#E3D4C5]">
          <p className="mb-6 text-base text-text-main" role="alert">
            No results found. Please take the quiz first.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}/reading/${readingId}`)}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-all"
          >
            Take quiz
          </button>
        </div>
      </div>
    );
  }

  const passed = result.percentage >= MIN_PASSING_SCORE;

  return (
    <div className="min-h-screen bg-page">
      {/* Fixed Header */}
      <header className="h-16 bg-surface border-b border-[rgba(0,0,0,0.05)] flex items-center px-4 sm:px-8 sticky top-0 z-[100]">
        <button
          type="button"
          onClick={() => navigate(`/course/${lessonNumber}`)}
          className="flex items-center gap-2 text-text-muted text-sm sm:text-[0.9rem] font-medium transition-colors hover:text-text-main"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Lesson {lessonNumber}
        </button>
      </header>

      {/* Content */}
      <div className="max-w-[900px] mx-auto py-6 sm:py-10 px-4 sm:px-5">
        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-wider font-bold text-primary mb-2 sm:mb-3 block">
            Reading Results
          </span>
          <h1 className="font-serif text-3xl sm:text-[2.5rem] mb-2 text-text-main">Quiz Complete</h1>
        </div>

        {/* Score Card */}
        <section className="bg-surface rounded-2xl sm:rounded-[24px] p-6 sm:p-10 shadow-card mb-8 sm:mb-10">
          <div className="text-center">
            {/* Circular Progress */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
              <svg width="100%" height="100%" viewBox="0 0 36 36" className="transform -rotate-90">
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
                <div className={`text-2xl sm:text-3xl font-bold ${passed ? 'text-[#6B8C6E]' : 'text-[#C07766]'}`}>
                  {result.percentage.toFixed(0)}%
                </div>
              </div>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-text-main">
              {passed ? 'Excellent Work!' : 'Keep Practicing!'}
            </h2>
            <p className="text-sm sm:text-base text-text-muted mb-4 sm:mb-6">
              You scored <strong>{result.score}</strong> out of <strong>{result.totalQuestions}</strong> questions correctly.
            </p>

            <div className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 ${passed ? 'bg-[#EBF5EC] text-[#6B8C6E]' : 'bg-[#FFF5F5] text-[#C07766]'
              }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                {passed ? (
                  <polyline points="20 6 9 17 4 12"></polyline>
                ) : (
                  <path d="M18 6L6 18M6 6l12 12"></path>
                )}
              </svg>
              <span className="text-xs sm:text-sm font-bold">
                {passed ? 'Passed' : 'Not Passed'} (60% required)
              </span>
            </div>
          </div>
        </section>

        {/* Question Review */}
        <div className="mb-6 sm:mb-8">
          <h2 className="font-serif text-xl sm:text-[1.5rem] mb-4 sm:mb-6 text-text-main">Question Review</h2>
        </div>

        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          {result.results.map((questionResult, qIndex) => {
            const isCorrect = questionResult.isCorrect;

            return (
              <section
                key={questionResult.questionId}
                className="bg-surface rounded-xl sm:rounded-[24px] p-5 sm:p-8 shadow-card"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-5">
                  <span className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-wider font-bold text-text-muted">
                    Question {qIndex + 1}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${isCorrect
                        ? 'bg-[#EBF5EC] text-[#6B8C6E]'
                        : 'bg-[#FFF5F5] text-[#C07766]'
                      }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      {isCorrect ? (
                        <polyline points="20 6 9 17 4 12"></polyline>
                      ) : (
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      )}
                    </svg>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                {/* Question Text */}
                <p className="font-serif text-base sm:text-[1.1rem] mb-4 sm:mb-6 text-text-main leading-relaxed">
                  {questionResult.questionText}
                </p>

                {/* Options */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {questionResult.options.map((option) => {
                    const isSelectedAnswer = option.optionLetter === questionResult.selectedAnswer;
                    const isCorrectAnswer = option.optionLetter === questionResult.correctAnswer;

                    let borderColor = 'border-[#F0F0F0]';
                    let bgColor = 'bg-white';
                    let badge = null;

                    if (isCorrectAnswer) {
                      borderColor = 'border-[#6B8C6E]';
                      bgColor = 'bg-[#F4F9F4]';
                      badge = (
                        <span className="ml-auto text-[10px] sm:text-xs font-bold text-[#6B8C6E] flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Correct Answer
                        </span>
                      );
                    } else if (isSelectedAnswer && !isCorrect) {
                      borderColor = 'border-[#C07766]';
                      bgColor = 'bg-[#FFF5F5]';
                      badge = (
                        <span className="ml-auto text-[10px] sm:text-xs font-bold text-[#C07766]">
                          Your Answer
                        </span>
                      );
                    }

                    return (
                      <div
                        key={option.id}
                        className={`flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl border-2 p-3 sm:p-4 transition-all ${borderColor} ${bgColor}`}
                      >
                        <span className="font-bold text-xs sm:text-sm text-text-main font-mono">
                          {option.optionLetter}.
                        </span>
                        <span className="flex-1 text-xs sm:text-sm text-text-main leading-relaxed">
                          {option.optionText}
                        </span>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {questionResult.explanation && (
                  <div className="bg-[#FAF6F3] border-l-4 border-primary px-3 sm:px-4 py-3 sm:py-4 rounded-r-lg">
                    <p className="text-xs sm:text-sm font-bold text-primary mb-1 sm:mb-2">Explanation</p>
                    <p className="text-xs sm:text-sm text-text-main leading-relaxed">
                      {questionResult.explanation}
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-10 sm:mb-20">
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}`, { replace: true })}
            className="bg-text-main text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-[0_12px_40px_rgba(62,54,48,0.08)] transition-all hover:-translate-y-1 hover:bg-primary text-sm sm:text-base"
          >
            Back to Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
