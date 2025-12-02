type CityInfoCardProps = {
  cityName: string;
  description: string;
  costOfLiving: string;
  transit: string;
};

export function CityInfoCard({
  cityName,
  description,
  costOfLiving,
  transit,
}: CityInfoCardProps) {
  return (
    <div className="bg-surface rounded-[24px] shadow-card p-8 mb-8 border border-[rgba(0,0,0,0.02)]">
      <h2 className="font-serif text-2xl font-bold text-text-main mb-5 flex items-center gap-3">
        Life in {cityName}
      </h2>
      <p className="text-text-muted leading-relaxed mb-5">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cost of Living */}
        <div className="bg-accent-subtle p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-primary shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <strong className="block text-sm text-text-main font-semibold">
              Cost of Living
            </strong>
            <span className="block text-xs text-text-muted">{costOfLiving}</span>
          </div>
        </div>

        {/* Transit */}
        <div className="bg-accent-subtle p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-primary shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </div>
          <div>
            <strong className="block text-sm text-text-main font-semibold">
              Public Transit
            </strong>
            <span className="block text-xs text-text-muted">{transit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
