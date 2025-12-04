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
    <div className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card flex flex-col justify-between border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${borderColor}`}>
      <h3 className="font-serif mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">{title}</h3>

      {/* Visual Magnet */}
      <div className="bg-[#FAF6F3] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-bold font-serif shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-white border-2 border-text-main text-sm sm:text-base md:text-lg">
          {leftBlock}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8C8075"
          strokeWidth="2"
          className="sm:w-5 sm:h-5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <div className="text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-bold font-serif shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-text-main text-sm sm:text-base md:text-lg">
          {rightBlock}
        </div>
      </div>

      <div className="text-xs sm:text-sm md:text-base leading-relaxed">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
      {cards.map((card, index) => (
        <MagnetCard key={index} {...card} />
      ))}
    </div>
  );
}
