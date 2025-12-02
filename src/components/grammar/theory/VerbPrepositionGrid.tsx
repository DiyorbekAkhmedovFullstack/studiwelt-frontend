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
    <div className={`bg-surface rounded-[24px] p-6 shadow-card border-t-[6px] ${borderColor} transition-transform hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs sm:text-sm md:text-[1.2rem] font-serif font-bold">{preposition}</span>
        <span className={`text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] uppercase font-bold px-2 py-1 rounded-md tracking-wider ${casePillBg} ${casePillText}`}>
          {caseType}
        </span>
      </div>

      <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-4">{description}</p>

      <ul className="list-none p-0 m-0">
        {verbs.map((item, index) => (
          <li
            key={index}
            className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] py-2 border-b border-dashed border-[rgba(0,0,0,0.05)] flex justify-between last:border-b-0"
          >
            <span>{item.verb}</span>
            <span className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem] italic">{item.translation}</span>
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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-16">
      {cards.map((card, index) => (
        <BondCard key={index} {...card} />
      ))}
    </div>
  );
}
