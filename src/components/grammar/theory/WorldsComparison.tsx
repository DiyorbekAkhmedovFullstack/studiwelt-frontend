import type { ReactNode } from 'react';

type WorldsComparisonProps = {
  realityLabel: string;
  realityContent: ReactNode;
  dreamLabel: string;
  dreamContent: ReactNode;
};

export function WorldsComparison({
  realityLabel,
  realityContent,
  dreamLabel,
  dreamContent,
}: WorldsComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[24px] overflow-hidden shadow-card mb-16 relative">
      {/* Magic Wand Icon in the Middle */}
      <div className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center z-10">
        ✨
      </div>

      {/* Reality Side (Left) */}
      <div className="text-text-muted p-10 bg-[#EBE9E6] border-r md:border-r border-b md:border-b-0 border-dashed border-[rgba(0,0,0,0.1)] relative">
        <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-wider font-bold mb-4 block">
          {realityLabel}
        </span>
        <div className="text-xs sm:text-sm md:text-[1.3rem] font-serif leading-relaxed">
          {realityContent}
        </div>
      </div>

      {/* Dream Side (Right) */}
      <div className="text-text-main p-10 bg-surface relative">
        <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-wider font-bold mb-4 block">
          {dreamLabel}
        </span>
        <div className="text-xs sm:text-sm md:text-[1.3rem] font-serif leading-relaxed">
          {dreamContent}
        </div>
      </div>
    </div>
  );
}
