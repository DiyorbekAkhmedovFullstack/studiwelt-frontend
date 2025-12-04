export function WordOrderComparison() {
  return (
    <div className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-7 lg:p-8 mb-8 sm:mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-6 sm:gap-7 md:gap-8 items-center">
      {/* German Column */}
      <div>
        <h3 className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wider mb-3 sm:mb-4">
          Deutsch (Zeit vor Ort)
        </h3>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif leading-relaxed">
          Ich fahre{' '}
          <span className="text-[#6B8C6E] font-bold px-0.5 rounded bg-[rgba(107,140,110,0.15)]">
            heute
          </span>{' '}
          <span className="text-[#A67B5B] font-bold px-0.5 rounded bg-[rgba(166,123,91,0.15)]">
            nach Berlin
          </span>
          .
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-full bg-[rgba(0,0,0,0.1)]" />

      {/* English Column */}
      <div>
        <h3 className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wider mb-3 sm:mb-4">
          Englisch (Ort vor Zeit)
        </h3>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif leading-relaxed">
          I am going{' '}
          <span className="font-bold underline">to Berlin</span>{' '}
          <span className="font-bold underline">today</span>.
        </div>
      </div>
    </div>
  );
}
