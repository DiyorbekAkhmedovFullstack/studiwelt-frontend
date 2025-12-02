import type { ReactNode } from 'react';

type MagnetCardProps = {
  type: 'preposition' | 'genitive';
  title: string;
  leftBlock: string;
  rightBlock: string;
  description: ReactNode;
  example: ReactNode;
};

function MagnetCard({ type, title, leftBlock, rightBlock, description, example }: MagnetCardProps) {
  const borderColor = type === 'preposition' ? 'border-[#D9A441]' : 'border-[#C07766]';

  return (
    <div className={`bg-surface rounded-[24px] p-8 shadow-card flex flex-col justify-between border-t-[6px] ${borderColor}`}>
      <h3 className="font-serif mb-4">{title}</h3>

      {/* Visual Magnet */}
      <div className="bg-[#FAF6F3] rounded-2xl p-6 flex items-center justify-center gap-3 mb-5">
        <div className="px-5 py-3 rounded-lg font-bold font-serif shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-white border-2 border-text-main">
          {leftBlock}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8C8075"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <div className="text-white px-5 py-3 rounded-lg font-bold font-serif shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-text-main">
          {rightBlock}
        </div>
      </div>

      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
        {description}
        <br />
        <br />
        {example}
      </div>
    </div>
  );
}

type MagnetCardsProps = {
  cards: MagnetCardProps[];
};

export function MagnetCards({ cards }: MagnetCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {cards.map((card, index) => (
        <MagnetCard key={index} {...card} />
      ))}
    </div>
  );
}
