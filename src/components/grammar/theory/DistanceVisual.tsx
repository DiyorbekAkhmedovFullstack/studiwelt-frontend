export function DistanceVisual() {
  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <div className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 relative">
        {/* Direct Speech Bubble */}
        <div className="w-full sm:flex-1 bg-[#FAF6F3] p-4 sm:p-5 md:p-6 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] rounded-bl-none relative">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider mb-2">
            Quelle (Direkt)
          </span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">
            "Die Preise <strong>steigen</strong>."
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="text-text-muted text-xs sm:text-sm md:text-base flex flex-col items-center gap-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="sm:w-6 sm:h-6"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Distanz
        </div>

        {/* Newspaper Report */}
        <div className="w-full sm:flex-1 bg-white border border-[rgba(0,0,0,0.1)] p-4 sm:p-5 md:p-6 rounded-sm shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider mb-2">
            Bericht (Indirekt)
          </span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">
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
