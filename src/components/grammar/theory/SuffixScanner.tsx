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
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-surface p-6 rounded-[16px] shadow-card border-t-4 border-t-primary"
          >
            {/* Title */}
            <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-wider font-bold mb-3">
              {card.title}
            </div>

            {/* Suffix Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {card.suffixes.map((suffix, idx) => (
                <span
                  key={idx}
                  className="text-text-main sm:text-[0.5rem] md:text-[0.6rem] bg-[#FAF6F3] px-2.5 py-1.5 rounded-md font-mono border border-[rgba(0,0,0,0.05)]"
                >
                  {suffix}
                </span>
              ))}
            </div>

            {/* Examples */}
            <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem]">{card.examples}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
