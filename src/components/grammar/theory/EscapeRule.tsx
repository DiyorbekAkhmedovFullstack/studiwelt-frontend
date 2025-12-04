export function EscapeRule() {
  return (
    <section className="bg-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="text-white w-5 h-5 sm:w-6 sm:h-6 bg-[#C07766] rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
          !
        </div>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.1rem] font-bold">Die Ersatzregel</h3>
      </div>

      {/* Explanation */}
      <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
        Wenn der Konjunktiv I identisch mit dem Indikativ ist (oft bei "ich" und "wir"), müssen
        wir ausweichen.
      </p>

      {/* Logic Flow */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 font-mono bg-white p-3 sm:p-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-4 text-xs sm:text-sm md:text-base">
        <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-[#DDD] whitespace-nowrap">Indikativ: haben</div>
        <span className="text-text-muted">==</span>
        <div className="text-text-muted px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-[#DDD] line-through whitespace-nowrap">
          K1: haben
        </div>
        <span className="text-text-muted">→</span>
        <div className="text-[#C07766] px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-primary bg-[#FFF5F5] font-bold whitespace-nowrap">
          K2: hätten
        </div>
      </div>
    </section>
  );
}
