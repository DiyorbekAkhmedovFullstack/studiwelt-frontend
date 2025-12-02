import type { ReactNode } from 'react';

type ConceptTransformationProps = {
  activeExample: {
    label: string;
    sentence: ReactNode;
  };
  passiveExample: {
    label: string;
    sentence: ReactNode;
  };
  explanation?: string;
};

export function ConceptTransformation({
  activeExample,
  passiveExample,
  explanation,
}: ConceptTransformationProps) {
  return (
    <section className="bg-surface rounded-[24px] shadow-card p-10 mb-16 relative">
      <div className="text-xs sm:text-sm md:text-[1.1rem] flex flex-col gap-6 font-serif">
        {/* Active Sentence */}
        <div className="flex items-center justify-between p-4 bg-[#FAF6F3] rounded-2xl">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] font-sans uppercase tracking-wider font-bold w-20">
            {activeExample.label}
          </span>
          <div className="flex-1">{activeExample.sentence}</div>
        </div>

        {/* Arrow */}
        <div className="text-text-muted self-center opacity-50">↓</div>

        {/* Passive Sentence */}
        <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border-2 border-[#FAF6F3]">
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] font-sans uppercase tracking-wider font-bold w-20">
            {passiveExample.label}
          </span>
          <div className="flex-1">{passiveExample.sentence}</div>
        </div>
      </div>

      {explanation && (
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mt-6">
          {explanation}
        </p>
      )}
    </section>
  );
}
