type VerbItem = {
  verb: string;
  translation: string;
};

type BondCardProps = {
  preposition: string;
  caseType: 'Akkusativ' | 'Dativ';
  description: string;
  verbs: VerbItem[];
};

function BondCard({ preposition, caseType, description, verbs }: BondCardProps) {
  const isAkkusativ = caseType === 'Akkusativ';
  const borderColor = isAkkusativ ? 'border-[#4A7C8C]' : 'border-[#D9A441]';
  const casePillBg = isAkkusativ ? 'bg-[rgba(74,124,140,0.15)]' : 'bg-[rgba(217,164,65,0.15)]';
  const casePillText = isAkkusativ ? 'text-[#4A7C8C]' : 'text-[#D9A441]';

  return (
    <div className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-5 md:p-6 shadow-card border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${borderColor} transition-transform hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-[1.2rem] font-serif font-bold">{preposition}</span>
        <span className={`text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase font-bold px-2 sm:px-2.5 py-1 rounded-md tracking-wider ${casePillBg} ${casePillText}`}>
          {caseType}
        </span>
      </div>

      <p className="text-xs sm:text-sm md:text-[0.9rem] lg:text-base mb-3 sm:mb-4 text-text-muted leading-relaxed">{description}</p>

      <ul className="list-none p-0 m-0">
        {verbs.map((item, index) => (
          <li
            key={index}
            className="text-xs sm:text-sm md:text-[0.9rem] lg:text-base py-2 sm:py-2.5 border-b border-dashed border-[rgba(0,0,0,0.05)] flex justify-between gap-2 last:border-b-0"
          >
            <span className="font-medium">{item.verb}</span>
            <span className="text-text-muted text-[0.7rem] sm:text-xs md:text-sm lg:text-[0.9rem] italic text-right">{item.translation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type VerbPrepositionGridProps = {
  cards: BondCardProps[];
};

export function VerbPrepositionGrid({ cards }: VerbPrepositionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16">
      {cards.map((card, index) => (
        <BondCard key={index} {...card} />
      ))}
    </div>
  );
}
