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
      className={`bg-surface rounded-[24px] p-8 shadow-card border-t-[6px] ${borderColor}`}
    >
      {/* Tag */}
      <div
        className={`inline-block ${tagColor} text-white text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] uppercase tracking-wide font-semibold px-3 py-1 rounded-full mb-6`}
      >
        {tag}
      </div>

      {/* Example */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem]">{verbSource}</span>
          <span className="text-text-muted sm:text-sm md:text-[1.2rem]">{arrow}</span>
        </div>
        <div className="text-xs sm:text-sm md:text-[1.3rem] font-serif">{result}</div>
      </div>

      {/* Formula */}
      <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[rgba(0,0,0,0.05)]">
        <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-2 uppercase tracking-wide">
          Formel:
        </div>
        <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] font-mono font-semibold">
          {formula}
        </div>
      </div>
    </div>
  );
}

export function ParticiplesComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
