type StudienkollegHeaderProps = {
  name: string;
  location: string;
  institutionType: string;
  badge: string;
};

export function StudienkollegHeader({
  name,
  location,
  institutionType,
  badge,
}: StudienkollegHeaderProps) {
  return (
    <div className="bg-surface rounded-[24px] shadow-card border border-[rgba(0,0,0,0.02)] p-10">
      {/* Badge */}
      <div className="mb-4">
        <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
          {badge}
        </span>
      </div>

      {/* Header Content */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <h1 className="font-serif text-5xl font-bold text-text-main mb-4 leading-tight">
            {name}
          </h1>
          <div className="flex flex-wrap gap-4 text-text-muted text-sm font-medium">
            <span className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </span>
            <span className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h8v4" />
              </svg>
              {institutionType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
