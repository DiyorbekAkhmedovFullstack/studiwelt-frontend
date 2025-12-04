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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden shadow-card mb-8 sm:mb-12 md:mb-16 relative">
      {/* Magic Wand Icon in the Middle */}
      <div className="text-base sm:text-lg md:text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-full shadow-[0_3px_10px_rgba(0,0,0,0.08)] sm:shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center z-10">
        ✨
      </div>

      {/* Reality Side (Left/Top) */}
      <div className="text-text-muted p-5 sm:p-7 md:p-8 lg:p-10 bg-[#EBE9E6] border-r-0 md:border-r border-b md:border-b-0 border-dashed border-[rgba(0,0,0,0.1)] relative">
        <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wider font-bold mb-3 sm:mb-4 block">
          {realityLabel}
        </span>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-serif leading-relaxed">
          {realityContent}
        </div>
      </div>

      {/* Dream Side (Right/Bottom) */}
      <div className="text-text-main p-5 sm:p-7 md:p-8 lg:p-10 bg-surface relative">
        <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wider font-bold mb-3 sm:mb-4 block">
          {dreamLabel}
        </span>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-serif leading-relaxed">
          {dreamContent}
        </div>
      </div>
    </div>
  );
}
