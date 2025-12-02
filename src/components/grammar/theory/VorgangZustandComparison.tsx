import type { ReactNode } from 'react';

type VorgangZustandComparisonProps = {
  title?: string;
  vorgangCard: {
    title: string;
    formula: string;
    description: ReactNode;
    example: string;
  };
  zustandCard: {
    title: string;
    formula: string;
    description: ReactNode;
    example: string;
  };
};

/**
 * Side-by-side comparison of Vorgangspassiv (process) vs Zustandspassiv (state)
 */
export function VorgangZustandComparison({
  title = 'Vorgang vs. Zustand',
  vorgangCard,
  zustandCard,
}: VorgangZustandComparisonProps) {
  return (
    <div>
      {title && <h3 className="text-xs sm:text-sm md:text-[1.3rem] font-serif mb-5">{title}</h3>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vorgang (Process) */}
        <div className="bg-[#FFF9E5] p-4 rounded-xl">
          <strong className="text-[#B07D00] block mb-2">
            {vorgangCard.title}
          </strong>
          <code className="text-sm block font-mono bg-white px-3 py-2 rounded-lg mb-3">
            {vorgangCard.formula}
          </code>
          <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-3 leading-relaxed">
            {vorgangCard.description}
          </p>
          <em className="text-base block font-serif">
            {vorgangCard.example}
          </em>
        </div>

        {/* Zustand (State) */}
        <div className="bg-[#E6F4EA] p-4 rounded-xl">
          <strong className="text-[#137333] block mb-2">
            {zustandCard.title}
          </strong>
          <code className="text-sm block font-mono bg-white px-3 py-2 rounded-lg mb-3">
            {zustandCard.formula}
          </code>
          <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-3 leading-relaxed">
            {zustandCard.description}
          </p>
          <em className="text-base block font-serif">
            {zustandCard.example}
          </em>
        </div>
      </div>
    </div>
  );
}
