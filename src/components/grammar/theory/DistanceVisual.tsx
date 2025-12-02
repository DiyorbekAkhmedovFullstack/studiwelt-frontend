export function DistanceVisual() {
  return (
    <section className="mb-16">
      <div className="bg-surface rounded-[24px] shadow-card p-10 flex items-center justify-between gap-5 relative">
        {/* Direct Speech Bubble */}
        <div className="flex-1 bg-[#FAF6F3] p-6 rounded-[16px] rounded-bl-none relative">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider mb-2">
            Quelle (Direkt)
          </span>
          <div className="text-xs sm:text-sm md:text-[1.2rem] font-serif">
            "Die Preise <strong>steigen</strong>."
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="text-text-muted sm:text-[0.55rem] md:text-[0.6rem] flex flex-col items-center gap-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Distanz
        </div>

        {/* Newspaper Report */}
        <div className="flex-1 bg-white border border-[rgba(0,0,0,0.1)] p-6 rounded-sm shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider mb-2">
            Bericht (Indirekt)
          </span>
          <div className="text-xs sm:text-sm md:text-[1.2rem] font-serif">
            Der Experte sagt, die Preise{' '}
            <span className="text-primary bg-[rgba(166,123,91,0.15)] font-bold px-1 rounded">
              steigen
            </span>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
