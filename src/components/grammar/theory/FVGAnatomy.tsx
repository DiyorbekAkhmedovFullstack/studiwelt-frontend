export function FVGAnatomy() {
  return (
    <section className="text-center bg-surface rounded-[24px] shadow-card p-12 mb-16 flex flex-col items-center">
      <h2 className="text-xs sm:text-sm md:text-[1.2rem] mb-8">Die Anatomie</h2>

      {/* Equation */}
      <div className="flex items-center justify-center gap-6 my-8 flex-wrap">
        {/* Nomen */}
        <div className="px-6 py-4 rounded-[16px] bg-[#FAF6F3] border border-[rgba(0,0,0,0.05)]">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider mb-2">
            Nomen (Akk/Präp)
          </span>
          <span className="text-sm sm:text-xs md:text-[1.2rem] font-serif font-bold">
            Die Entscheidung
          </span>
        </div>

        <span className="text-[2rem] font-light">+</span>

        {/* Funktionsverb */}
        <div className="px-6 py-4 rounded-[16px] bg-[#FAF6F3] border border-[rgba(0,0,0,0.05)]">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider mb-2">
            Funktionsverb
          </span>
          <span className="text-sm sm:text-xs md:text-[1.2rem] font-serif font-bold">treffen</span>
        </div>

        <span className="text-[2rem] font-light">=</span>

        {/* Bedeutung */}
        <div className="px-6 py-4 rounded-[16px] bg-white border border-primary">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider mb-2">
            Bedeutung
          </span>
          <span className="text-sm sm:text-xs md:text-[1.2rem] font-serif font-bold">entscheiden</span>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs sm:text-sm md:text-[1rem] max-w-[600px] mx-auto mt-6">
        Das Verb "treffen" hat hier keine eigene Bedeutung (man trifft niemanden). Es dient nur
        dazu, das Nomen "Entscheidung" grammatisch in den Satz einzubauen.
      </p>
    </section>
  );
}
