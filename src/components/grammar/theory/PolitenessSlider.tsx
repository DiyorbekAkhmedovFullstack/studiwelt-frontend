import { useState } from 'react';

type PolitenessLevel = {
  text: string;
  label: string;
};

type PolitenessSliderProps = {
  title: string;
  levels: {
    1: PolitenessLevel;
    2: PolitenessLevel;
    3: PolitenessLevel;
  };
};

const LEVEL_DATA = {
  1: {
    borderColor: 'border-[#C07766]',
    labelBg: 'bg-[rgba(192,119,102,0.1)]',
    labelText: 'text-[#C07766]',
    accentColor: 'text-[#C07766]',
    grammar: 'Imperativ',
    context: 'Nur unter engen Freunden oder Familie',
  },
  2: {
    borderColor: 'border-[#D9A441]',
    labelBg: 'bg-[rgba(217,164,65,0.1)]',
    labelText: 'text-[#8B6914]',
    accentColor: 'text-[#D9A441]',
    grammar: 'Indikativ',
    context: 'Alltägliche Situationen, Bekannte',
  },
  3: {
    borderColor: 'border-[#6B8C6E]',
    labelBg: 'bg-[rgba(107,140,110,0.1)]',
    labelText: 'text-[#2D4A30]',
    accentColor: 'text-[#6B8C6E]',
    grammar: 'Konjunktiv II',
    context: 'Formell, Fremde, TestDaF/DSH',
  },
} as const;

export function PolitenessSlider({ title, levels }: PolitenessSliderProps) {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);

  const currentData = levels[currentLevel];
  const config = LEVEL_DATA[currentLevel];

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-5 sm:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
        {title}
      </h2>

      {/* Level Selector */}
      <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-6">
        {([1, 2, 3] as const).map((level) => {
          const lvlConfig = LEVEL_DATA[level];
          const isSelected = currentLevel === level;

          return (
            <button
              key={level}
              type="button"
              onClick={() => setCurrentLevel(level)}
              className={`
                flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl
                text-[0.65rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider
                transition-all border-2
                ${isSelected
                  ? `${lvlConfig.labelBg} ${lvlConfig.borderColor} ${lvlConfig.labelText}`
                  : 'bg-[#F8F6F4] border-transparent text-text-muted hover:bg-[#F0EEEC]'
                }
              `}
            >
              Level {level}
            </button>
          );
        })}
      </div>

      {/* Output Display */}
      <div className={`bg-[#FAF6F3] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-l-4 ${config.borderColor} mb-5 sm:mb-6`}>
        {/* Label */}
        <div className={`${config.labelBg} ${config.labelText} inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-wider mb-3 sm:mb-4`}>
          {currentData.label}
        </div>

        {/* Sentence */}
        <p className="font-serif text-base sm:text-lg md:text-xl lg:text-[1.3rem] text-text-main leading-relaxed">
          „{currentData.text}"
        </p>

        {/* Grammar Info */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mt-5 pt-5 border-t border-[#E3D4C5]">
          <div className="sm:flex-1">
            <span className="text-[0.65rem] sm:text-[0.7rem] text-text-muted uppercase tracking-wider font-bold block mb-1.5">
              Grammatik
            </span>
            <span className={`text-sm sm:text-base md:text-lg font-semibold ${config.accentColor}`}>
              {config.grammar}
            </span>
          </div>
          <div className="sm:flex-1">
            <span className="text-[0.65rem] sm:text-[0.7rem] text-text-muted uppercase tracking-wider font-bold block mb-1.5">
              Verwendung
            </span>
            <span className="text-sm sm:text-base text-text-main leading-relaxed">
              {config.context}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Scale */}
      <div className="relative pt-2">
        <div className="flex justify-between items-end mb-2">
          {([1, 2, 3] as const).map((level) => {
            const isSelected = currentLevel === level;
            const height = level === 1 ? 'h-4 sm:h-5' : level === 2 ? 'h-6 sm:h-8' : 'h-8 sm:h-11';
            const lvlConfig = LEVEL_DATA[level];

            return (
              <div key={level} className="flex-1 flex justify-center">
                <div
                  className={`
                    w-full max-w-[60px] sm:max-w-[80px] ${height} rounded-t-md transition-all
                    ${isSelected ? lvlConfig.borderColor.replace('border-', 'bg-') : 'bg-[#E3D4C5]'}
                  `}
                />
              </div>
            );
          })}
        </div>
        <div className="h-1 bg-[#E3D4C5] rounded-full" />
        <div className="flex justify-between mt-2">
          <span className="text-[0.55rem] sm:text-[0.6rem] text-text-muted uppercase tracking-wide">unhöflich</span>
          <span className="text-[0.55rem] sm:text-[0.6rem] text-text-muted uppercase tracking-wide">höflich</span>
        </div>
      </div>
    </section>
  );
}
