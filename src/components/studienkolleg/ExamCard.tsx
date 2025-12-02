import type { StudienkollegData } from '../../data/studienkollegData';

type ExamCardProps = {
  exam: StudienkollegData['exam'];
};

export function ExamCard({ exam }: ExamCardProps) {
  if (!exam.required) {
    return null;
  }

  return (
    <div className="bg-surface rounded-[24px] shadow-card p-8 border border-[rgba(0,0,0,0.02)]">
      <h2 className="font-serif text-2xl font-bold text-text-main mb-5">
        Entrance Exam
      </h2>
      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {exam.description}
      </p>

      {exam.nextDate && (
        <div className="flex justify-between items-center py-3 border-b border-dashed border-[rgba(0,0,0,0.1)] text-sm mb-6">
          <span className="text-text-muted">Next Date</span>
          <span className="font-semibold text-text-main">{exam.nextDate}</span>
        </div>
      )}

      {exam.exampleTestsUrl && (
        <a
          href={exam.exampleTestsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 bg-surface border border-[rgba(0,0,0,0.1)] text-text-main rounded-xl font-semibold text-center transition-all duration-200 hover:border-text-main flex items-center justify-center gap-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Example Tests
        </a>
      )}
    </div>
  );
}
