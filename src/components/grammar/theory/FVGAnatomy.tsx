export function FVGAnatomy() {
  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12 md:mb-16 flex flex-col items-center">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] mb-6 sm:mb-7 md:mb-8">Die Anatomie</h2>

      {/* Equation */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 my-6 sm:my-7 md:my-8 flex-wrap">
        {/* Nomen */}
        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] bg-[#FAF6F3] border border-[rgba(0,0,0,0.05)]">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider mb-1 sm:mb-2">
            Nomen (Akk/Präp)
          </span>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold">
            Die Entscheidung
          </span>
        </div>

        <span className="text-xl sm:text-2xl md:text-3xl font-light">+</span>

        {/* Funktionsverb */}
        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] bg-[#FAF6F3] border border-[rgba(0,0,0,0.05)]">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider mb-1 sm:mb-2">
            Funktionsverb
          </span>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold">treffen</span>
        </div>

        <span className="text-xl sm:text-2xl md:text-3xl font-light">=</span>

        {/* Bedeutung */}
        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] bg-white border border-primary">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider mb-1 sm:mb-2">
            Bedeutung
          </span>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold">entscheiden</span>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-full sm:max-w-[500px] md:max-w-[600px] mx-auto mt-4 sm:mt-5 md:mt-6">
        Das Verb "treffen" hat hier keine eigene Bedeutung (man trifft niemanden). Es dient nur
        dazu, das Nomen "Entscheidung" grammatisch in den Satz einzubauen.
      </p>
    </section>
  );
}
