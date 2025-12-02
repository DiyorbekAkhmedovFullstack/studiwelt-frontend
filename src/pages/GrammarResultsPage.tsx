import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { GrammarSubmitResult } from '../types/api';

type Params = {
  lessonNumber?: string;
};

type LocationState = {
  result?: GrammarSubmitResult;
};

export function GrammarResultsPage() {
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
            No grammar results found. Please complete the grammar quiz first.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/course/${lessonNumber}/grammar`)}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-all"
          >
            Go to grammar quiz
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
            Grammar Results
          </span>
          <h1 className="font-serif text-[2.5rem] mb-2 text-text-main">Quiz Complete</h1>
          {result.topicTitle && (
            <p className="text-[1.1rem] text-text-muted">{result.topicTitle}</p>
          )}
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
              You answered <strong>{result.score}</strong> out of <strong>{result.totalQuestions}</strong> questions correctly.
            </p>

            <div className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 ${
              passed ? 'bg-[#EBF5EC] text-[#6B8C6E]' : 'bg-[#FFF5F5] text-[#C07766]'
            }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                {passed ? (
                  <polyline points="20 6 9 17 4 12"></polyline>
                ) : (
                  <path d="M18 6L6 18M6 6l12 12"></path>
                )}
              </svg>
              <span className="text-sm font-bold">
                {passed ? 'Passed' : 'Not Passed'} (60% required)
              </span>
            </div>
          </div>
        </section>

        {/* Question Review */}
        <div className="mb-8">
          <h2 className="font-serif text-[1.5rem] mb-6 text-text-main">Question Review</h2>
        </div>

        <div className="space-y-6 mb-10">
          {result.detailedResults.map((questionResult, qIndex) => (
            <section
              key={questionResult.questionId}
              className="bg-surface rounded-[24px] p-8 shadow-card"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-[0.75rem] uppercase tracking-wider font-bold text-text-muted">
                  Question {qIndex + 1}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${
                    questionResult.isCorrect
                      ? 'bg-[#EBF5EC] text-[#6B8C6E]'
                      : 'bg-[#FFF5F5] text-[#C07766]'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    {questionResult.isCorrect ? (
                      <polyline points="20 6 9 17 4 12"></polyline>
                    ) : (
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    )}
                  </svg>
                  {questionResult.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>

              {/* Question Text */}
              <p className="font-serif text-[1.1rem] mb-6 text-text-main leading-relaxed">
                {questionResult.questionText}
              </p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {questionResult.options.map((option) => {
                  const isSelected = option.optionLetter === questionResult.userAnswer;
                  const isCorrectOption =
                    option.isCorrect === true ||
                    option.optionLetter === questionResult.correctAnswer;

                  let borderColor = 'border-[#F0F0F0]';
                  let bgColor = 'bg-white';
                  let badge = null;

                  if (isCorrectOption) {
                    borderColor = 'border-[#6B8C6E]';
                    bgColor = 'bg-[#F4F9F4]';
                    badge = (
                      <span className="ml-auto text-xs font-bold text-[#6B8C6E] flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Correct Answer
                      </span>
                    );
                  } else if (isSelected && !questionResult.isCorrect) {
                    borderColor = 'border-[#C07766]';
                    bgColor = 'bg-[#FFF5F5]';
                    badge = (
                      <span className="ml-auto text-xs font-bold text-[#C07766]">
                        Your Answer
                      </span>
                    );
                  }

                  return (
                    <div
                      key={option.optionLetter}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 transition-all ${borderColor} ${bgColor}`}
                    >
                      <span className="font-bold text-sm text-text-main font-mono">
                        {option.optionLetter}.
                      </span>
                      <span className="flex-1 text-sm text-text-main leading-relaxed">
                        {option.optionText}
                      </span>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {questionResult.explanation && (
                <div className="bg-[#FAF6F3] border-l-4 border-primary px-4 py-4 rounded-r-lg">
                  <p className="text-sm font-bold text-primary mb-2">Explanation</p>
                  <p className="text-sm text-text-main leading-relaxed">
                    {questionResult.explanation}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

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
