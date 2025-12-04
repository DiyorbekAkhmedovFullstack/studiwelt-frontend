type SuffixCard = {
  title: string;
  suffixes: string[];
  examples: string;
};

export function SuffixScanner() {
  const cards: SuffixCard[] = [
    {
      title: 'Männliche Personen (e)',
      suffixes: ['-e'],
      examples: 'der Junge, der Kollege, der Experte',
    },
    {
      title: 'Lateinische Endungen',
      suffixes: ['-ist', '-ent', '-ant', '-at'],
      examples: 'der Polizist, der Student, der Diplomat',
    },
    {
      title: 'Griechische Endungen',
      suffixes: ['-oge', '-graph', '-soph'],
      examples: 'der Biologe, der Fotograf, der Philosoph',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-surface p-4 sm:p-5 md:p-6 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] shadow-card border-t-[3px] sm:border-t-4 border-t-primary"
          >
            {/* Title */}
            <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] uppercase tracking-wider font-bold mb-2 sm:mb-3">
              {card.title}
            </div>

            {/* Suffix Tags */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {card.suffixes.map((suffix, idx) => (
                <span
                  key={idx}
                  className="text-text-main text-xs sm:text-sm md:text-base bg-[#FAF6F3] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md font-mono border border-[rgba(0,0,0,0.05)]"
                >
                  {suffix}
                </span>
              ))}
            </div>

            {/* Examples */}
            <div className="text-xs sm:text-sm md:text-base">{card.examples}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
