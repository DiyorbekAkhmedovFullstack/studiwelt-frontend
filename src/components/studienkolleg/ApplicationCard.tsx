import type { StudienkollegData } from '../../data/studienkollegData';

type ApplicationCardProps = {
  application: StudienkollegData['application'];
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  const isOpen = application.status === 'open';

  return (
    <div className="bg-surface rounded-[24px] shadow-card p-8 mb-8 border border-[rgba(0,0,0,0.02)]">
      <h2 className="font-serif text-2xl font-bold text-text-main mb-5">Application</h2>

      {/* Status Badge */}
      <div
        className={`p-3 rounded-lg text-center font-semibold text-sm mb-6 flex items-center justify-center gap-2 ${
          isOpen
            ? 'bg-[#EBF5EC] text-[#2D4A30]'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {isOpen && <div className="w-2 h-2 bg-current rounded-full animate-pulse" />}
        {application.statusText}
      </div>

      {/* Application Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-dashed border-[rgba(0,0,0,0.1)] text-sm">
          <span className="text-text-muted">Method</span>
          <span
            className={`font-semibold ${
              application.method === 'assist' ? 'text-[#D9A441]' : 'text-text-main'
            }`}
          >
            {application.methodDisplay}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-dashed border-[rgba(0,0,0,0.1)] text-sm">
          <span className="text-text-muted">Deadline (Winter)</span>
          <span className="font-semibold text-text-main">
            {application.winterDeadline}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 text-sm">
          <span className="text-text-muted">Deadline (Summer)</span>
          <span className="font-semibold text-text-main">
            {application.summerDeadline}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <a
        href={application.applicationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 px-4 bg-text-main text-white rounded-xl font-semibold text-center transition-all duration-200 hover:bg-primary hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(62,54,48,0.2)] flex items-center justify-center gap-2 mb-3"
      >
        Start Application
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
      <a
        href={application.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 px-4 bg-surface border border-[rgba(0,0,0,0.1)] text-text-main rounded-xl font-semibold text-center transition-all duration-200 hover:border-text-main flex items-center justify-center gap-2"
      >
        Official Website
      </a>
    </div>
  );
}
