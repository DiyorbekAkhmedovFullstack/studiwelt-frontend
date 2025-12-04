import type { ReactNode } from 'react';

type StrategyType = 'can' | 'must' | 'hybrid';

type StrategyCardProps = {
  type: StrategyType;
  title: string;
  meaningTag: string;
  formula: string;
  example: ReactNode;
};

function StrategyCard({ type, title, meaningTag, formula, example }: StrategyCardProps) {
  const borderColors: Record<StrategyType, string> = {
    can: 'border-[#6B8C6E]',
    must: 'border-[#C07766]',
    hybrid: 'border-t-[6px] border-transparent',
  };

  const tagColors: Record<StrategyType, string> = {
    can: 'text-[#6B8C6E]',
    must: 'text-[#C07766]',
    hybrid: 'bg-gradient-to-r from-[#C07766] to-[#6B8C6E] bg-clip-text text-transparent',
  };

  const gradientBorderStyle = type === 'hybrid'
    ? { borderImage: 'linear-gradient(to right, #C07766 50%, #6B8C6E 50%) 1 0 0 0' }
    : {};

  return (
    <div
      className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${type === 'hybrid' ? 'border-solid' : borderColors[type]} transition-transform hover:-translate-y-1`}
      style={gradientBorderStyle}
    >
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-2">{title}</h3>
      <span className={`text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wider font-semibold block mb-4 sm:mb-5 ${tagColors[type]}`}>
        {meaningTag}
      </span>

      <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] bg-[#FAF6F3] px-3 py-2.5 sm:py-3 rounded-lg font-mono mb-3 sm:mb-4 border border-[rgba(0,0,0,0.05)]">
        {formula}
      </div>

      <div className="text-xs sm:text-sm md:text-base leading-relaxed">{example}</div>
    </div>
  );
}

export function PassiveAlternatives() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16">
      <StrategyCard
        type="can"
        title="Adjektivendung"
        meaningTag="Können + Passiv"
        formula="sein + Adj (-bar / -lich)"
        example={
          <>
            Das Wasser <span className="text-text-main font-semibold">kann</span> getrunken
            werden.
            <br />↓<br />
            Das Wasser ist <span className="text-text-main font-semibold">trinkbar</span>.
          </>
        }
      />

      <StrategyCard
        type="can"
        title="Reflexiv"
        meaningTag="Können + Passiv"
        formula="sich lassen + Infinitiv"
        example={
          <>
            Das Problem <span className="text-text-main font-semibold">kann</span> gelöst werden.
            <br />↓<br />
            Das Problem{' '}
            <span className="text-text-main font-semibold">lässt sich lösen</span>.
          </>
        }
      />

      <StrategyCard
        type="hybrid"
        title='Die "Zu"-Form'
        meaningTag="Müssen / Können + Passiv"
        formula="sein + zu + Infinitiv"
        example={
          <>
            Die Rechnung <span className="text-text-main font-semibold">muss</span> bezahlt
            werden.
            <br />↓<br />
            Die Rechnung ist{' '}
            <span className="text-text-main font-semibold">zu bezahlen</span>.
          </>
        }
      />
    </div>
  );
}
