type ShorthandSymbol = {
  word: string;
  symbol: string;
};

export function ShorthandTrainer() {
  const symbols: ShorthandSymbol[] = [
    { word: 'steigen / wachsen', symbol: '↑' },
    { word: 'sinken / fallen', symbol: '↓' },
    { word: 'führt zu / Folge', symbol: '→' },
    { word: 'daraus folgt / Schluss', symbol: '⇒' },
    { word: 'Gegensatz', symbol: 'vs' },
    { word: 'ist gleich / bedeutet', symbol: '=' },
    { word: 'ungefähr / etwa', symbol: '≈' },
    { word: 'zusätzlich / und', symbol: '+' },
    { word: 'wichtig / Kernaussage', symbol: '!' },
    { word: 'unklar / nachprüfen', symbol: '?' },
    { word: 'Anteil / Prozent', symbol: '%' },
    { word: 'Veränderung', symbol: 'Δ' },
    { word: 'Durchschnitt', symbol: 'Ø' },
  ];

  return (
    <section className="text-center bg-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-3 sm:mb-4">Mitschreib-Technik</h2>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8">Schreibe nie ganze Sätze. Nutze Symbole und Stichwörter für Prozesse.</p>

      <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
        {symbols.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-5 md:p-6 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] shadow-card w-[120px] sm:w-[130px] md:w-[140px] cursor-pointer transition-transform hover:-translate-y-1"
          >
            <span className="text-xs sm:text-sm block mb-2">{item.word}</span>
            <span className="text-[1.75rem] sm:text-[1.875rem] md:text-[2rem] block font-mono font-bold">
              {item.symbol}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-7 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-left">
        <div className="bg-white p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border-l-[3px] sm:border-l-4 border-[#E3D4C5]">
          <strong className="text-text-main text-sm sm:text-base block mb-1">Antizipieren</strong>
          <p className="text-xs sm:text-sm md:text-base">Lies die Fragen <em>vor</em> dem Hören. Dann weißt du, worauf du achten musst, und hörst gezielt, nicht jedes Wort.</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border-l-[3px] sm:border-l-4 border-[#E3D4C5]">
          <strong className="text-text-main text-sm sm:text-base block mb-1">Abkürzen</strong>
          <p className="text-xs sm:text-sm md:text-base">Kürze Wörter ab (z.&nbsp;B. "Entw." = Entwicklung, "bzgl." = bezüglich) und notiere nur Schlüsselwörter und Zahlen.</p>
        </div>
      </div>
    </section>
  );
}
