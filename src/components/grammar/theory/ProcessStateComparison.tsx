import type { ReactNode } from 'react';

type TypeCardProps = {
  type: 'process' | 'state';
  title: string;
  icon: string;
  formula: string;
  description: ReactNode;
  example: ReactNode;
};

function TypeCard({ type, title, icon, formula, description, example }: TypeCardProps) {
  const borderColor = type === 'process' ? 'border-[#D9A441]' : 'border-[#6B8C6E]';
  const iconBg = type === 'process'
    ? 'bg-[rgba(217,164,65,0.15)] text-[#D9A441]'
    : 'bg-[rgba(107,140,110,0.15)] text-[#6B8C6E]';
  const exampleBg = type === 'process' ? 'bg-[#FFFDF5]' : 'bg-[#F5F9F6]';

  return (
    <div className={`bg-surface rounded-[24px] p-8 shadow-card border-t-[6px] ${borderColor} relative`}>
      <div className="text-xs sm:text-sm md:text-[1.25rem] flex justify-between items-center mb-3 font-serif font-bold">
        {title}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base ${iconBg}`}>
          {icon}
        </div>
      </div>

      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] inline-block font-mono bg-[#F4F4F4] px-2.5 py-1.5 rounded-md mb-4">
        {formula}
      </div>

      <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed mb-4">
        {description}
      </p>

      <div className={`${exampleBg} p-3 rounded-lg text-text-main font-serif`}>
        {example}
      </div>
    </div>
  );
}

type ProcessStateComparisonProps = {
  sectionTitle?: string;
  processCard: Omit<TypeCardProps, 'type'>;
  stateCard: Omit<TypeCardProps, 'type'>;
};

export function ProcessStateComparison({
  sectionTitle = 'Die zwei Arten',
  processCard,
  stateCard,
}: ProcessStateComparisonProps) {
  return (
    <>
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">{sectionTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <TypeCard type="process" {...processCard} />
        <TypeCard type="state" {...stateCard} />
      </div>
    </>
  );
}
