export function EscapeRule() {
  return (
    <section className="bg-[#FAF6F3] rounded-[24px] p-10 mb-16 border border-[rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-white w-6 h-6 bg-[#C07766] rounded-full flex items-center justify-center font-bold">
          !
        </div>
        <h3 className="text-xs sm:text-sm md:text-[1.1rem] font-bold">Die Ersatzregel</h3>
      </div>

      {/* Explanation */}
      <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-4">
        Wenn der Konjunktiv I identisch mit dem Indikativ ist (oft bei "ich" und "wir"), müssen
        wir ausweichen.
      </p>

      {/* Logic Flow */}
      <div className="flex items-center gap-4 font-mono bg-white p-4 rounded-[16px] overflow-x-auto flex-wrap">
        <div className="px-3 py-2 rounded-md border border-[#DDD]">Indikativ: haben</div>
        <span className="text-text-muted">==</span>
        <div className="text-text-muted px-3 py-2 rounded-md border border-[#DDD] line-through">
          K1: haben
        </div>
        <span className="text-text-muted">→</span>
        <div className="text-[#C07766] px-3 py-2 rounded-md border border-primary bg-[#FFF5F5] font-bold">
          K2: hätten
        </div>
      </div>
    </section>
  );
}
