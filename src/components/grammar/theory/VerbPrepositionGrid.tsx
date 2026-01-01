type BondCardProps = {
  preposition: string;
  caseType: 'Akkusativ' | 'Dativ';
  description: string;
  verbs: string[];
};

function BondCard({ preposition, caseType, description, verbs }: BondCardProps) {
  const isAkkusativ = caseType === 'Akkusativ';
  const borderColor = isAkkusativ ? 'border-[#4A7C8C]' : 'border-[#D9A441]';
  const casePillBg = isAkkusativ ? 'bg-[rgba(74,124,140,0.15)]' : 'bg-[rgba(217,164,65,0.15)]';
  const casePillText = isAkkusativ ? 'text-[#4A7C8C]' : 'text-[#D9A441]';

  return (
    <div className={`bg-surface rounded-xl sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-5 md:p-6 shadow-card border-t-[3px] sm:border-t-[5px] md:border-t-[6px] ${borderColor} transition-transform hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <span className="text-base sm:text-xl md:text-2xl font-serif font-bold">{preposition}</span>
        <span className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.75rem] uppercase font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md tracking-wider ${casePillBg} ${casePillText}`}>
          {caseType}
        </span>
      </div>

      <p className="text-[0.65rem] sm:text-sm md:text-[0.9rem] mb-2 sm:mb-4 text-text-muted leading-relaxed">{description}</p>

      <ul className="list-none p-0 m-0 grid grid-cols-2 sm:grid-cols-1 gap-x-2">
        {verbs.map((verb, index) => (
          <li
            key={index}
            className="text-[0.65rem] sm:text-sm md:text-[0.9rem] py-1 sm:py-2.5 sm:border-b sm:border-dashed sm:border-[rgba(0,0,0,0.05)] sm:last:border-b-0"
          >
            <span className="font-medium">{verb}</span>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-6 sm:mb-12 md:mb-16">
      {cards.map((card, index) => (
        <BondCard key={index} {...card} />
      ))}
    </div>
  );
}
