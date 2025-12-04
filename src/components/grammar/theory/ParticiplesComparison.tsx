import type { ReactNode } from 'react';

type ParticipleCardProps = {
  type: 'partizip1' | 'partizip2';
  tag: string;
  verbSource: string;
  arrow: string;
  result: string;
  formula: ReactNode;
};

function ParticipleCard({
  type,
  tag,
  verbSource,
  arrow,
  result,
  formula,
}: ParticipleCardProps) {
  const borderColor = type === 'partizip1' ? 'border-[#6B8C6E]' : 'border-[#C07766]';
  const tagColor = type === 'partizip1' ? 'bg-[#6B8C6E]' : 'bg-[#C07766]';

  return (
    <div
      className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-5 md:p-6 lg:p-8 shadow-card border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${borderColor}`}
    >
      {/* Tag */}
      <div
        className={`inline-block ${tagColor} text-white text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wide font-semibold px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full mb-4 sm:mb-5 md:mb-6`}
      >
        {tag}
      </div>

      {/* Example */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-text-muted text-xs sm:text-sm md:text-base">{verbSource}</span>
          <span className="text-text-muted text-sm sm:text-base md:text-lg">{arrow}</span>
        </div>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">{result}</div>
      </div>

      {/* Formula */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[rgba(0,0,0,0.05)]">
        <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] mb-1 sm:mb-2 uppercase tracking-wide">
          Formel:
        </div>
        <div className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] font-mono font-semibold">
          {formula}
        </div>
      </div>
    </div>
  );
}

export function ParticiplesComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
      <ParticipleCard
        type="partizip1"
        tag="Aktiv / Gleichzeitig"
        verbSource="bellen"
        arrow="→"
        result="der bellende Hund"
        formula={
          <>
            Infinitiv <span className="text-primary">+ d +</span> Endung
          </>
        }
      />
      <ParticipleCard
        type="partizip2"
        tag="Passiv / Fertig"
        verbSource="reparieren"
        arrow="→"
        result="das reparierte Auto"
        formula={
          <>
            ge-Form <span className="text-primary">+</span> Endung
          </>
        }
      />
    </div>
  );
}
