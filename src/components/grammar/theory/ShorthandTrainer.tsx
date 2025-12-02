type ShorthandSymbol = {
  word: string;
  symbol: string;
};

export function ShorthandTrainer() {
  const symbols: ShorthandSymbol[] = [
    { word: 'steigen / wachsen', symbol: '↑' },
    { word: 'sinken / fallen', symbol: '↓' },
    { word: 'verursacht / führt zu', symbol: '→' },
    { word: 'Gegensatz', symbol: 'vs' },
    { word: 'Durchschnitt', symbol: 'Ø' },
  ];

  return (
    <section className="text-center bg-[#FAF6F3] rounded-[24px] p-12">
      <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-4">Mitschreib-Technik</h2>
      <p className="text-text-muted mb-8">Schreibe nie ganze Sätze. Nutze Symbole für Prozesse.</p>

      <div className="flex justify-center gap-5 flex-wrap">
        {symbols.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[16px] shadow-card w-[140px] cursor-pointer transition-transform hover:-translate-y-1"
          >
            <span className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] block mb-2">{item.word}</span>
            <span className="text-[2rem] block font-mono font-bold">
              {item.symbol}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
