export function ConcessionCard() {
  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">
        „Mögen" als Einräumung (Konzessiv)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-7 lg:p-8 border border-[rgba(0,0,0,0.02)]">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider font-bold mb-3 sm:mb-4 text-primary">
            Subjektiv (C1)
          </span>
          <div className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-3">
            mögen + Infinitiv
          </div>
          <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
            Drückt eine vorsichtige Einräumung aus: „Es ist gut möglich, dass …, aber das ändert nichts."
            Funktioniert wie ein konzessiver Konnektor auf Satzebene.
          </p>
          <p className="text-text-main text-xs sm:text-sm md:text-base italic">
            „Das <strong>mag</strong> stimmen, aber es ist für unsere Entscheidung irrelevant."
          </p>
        </div>

        <div className="bg-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 border border-[rgba(0,0,0,0.03)]">
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider font-bold mb-3 sm:mb-4 text-text-muted">
            Objektiv (B1) — Kontrast
          </span>
          <div className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-3">
            mögen + Akkusativ
          </div>
          <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
            „Mögen" im objektiven Gebrauch bedeutet „gern haben". Im subjektiven Gebrauch verschwindet das Objekt
            und steht ein Infinitiv — das ist das Erkennungsmerkmal.
          </p>
          <p className="text-text-main text-xs sm:text-sm md:text-base italic">
            „Ich <strong>mag</strong> Schokolade." (Objektiv)
          </p>
        </div>
      </div>
    </section>
  );
}
