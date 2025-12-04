import { useState } from 'react';
import type { ReactNode } from 'react';

type MergeOption = {
  id: string;
  label: string;
  icon: string;
  type: 'positive' | 'negative' | 'reset';
  result: ReactNode;
};

type SentenceMergerProps = {
  title: string;
  subtitle: string;
  sentence1: string;
  sentence2: string;
  options: MergeOption[];
};

export function SentenceMerger({
  title,
  subtitle,
  sentence1,
  sentence2,
  options,
}: SentenceMergerProps) {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMerge = (option: MergeOption) => {
    if (option.type === 'reset') {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveOption(null);
        setIsTransitioning(false);
      }, 200);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveOption(option.id);
      setIsTransitioning(false);
    }, 300);
  };

  const currentResult = options.find((opt) => opt.id === activeOption)?.result;

  const getButtonColors = (option: MergeOption) => {
    const isActive = activeOption === option.id;

    if (option.type === 'reset') {
      return 'hover:-translate-y-0.5 hover:border-[#E3D4C5] hover:text-text-main';
    }

    switch (option.type) {
      case 'positive':
        return isActive
          ? 'border-[#6B8C6E] text-[#6B8C6E] bg-[#F4F9F5]'
          : 'hover:-translate-y-0.5 hover:border-[#6B8C6E] hover:text-[#6B8C6E] hover:bg-[#F4F9F5]';
      case 'negative':
        return isActive
          ? 'border-[#8C8075] text-[#8C8075] bg-[#F5F5F5]'
          : 'hover:-translate-y-0.5 hover:border-[#8C8075] hover:text-[#8C8075] hover:bg-[#F5F5F5]';
      default:
        return '';
    }
  };

  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0_8px_24px_rgba(62,54,48,0.06)] sm:shadow-[0_10px_32px_rgba(62,54,48,0.07)] md:shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-5 sm:p-8 md:p-10 lg:p-12">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">{subtitle}</p>
      </div>

      {/* The Interactive Stage */}
      <div className="my-6 sm:my-8 md:my-10 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col items-center justify-center relative px-2">
        {/* Before: Simple Sentences */}
        <div
          className="flex gap-3 sm:gap-4 transition-all duration-300 flex-col md:flex-row items-center w-full max-w-full md:max-w-none"
          style={{
            opacity: activeOption && !isTransitioning ? 0 : 1,
            transform: activeOption && !isTransitioning ? 'scale(0.9)' : 'scale(1)',
          }}
        >
          <div className="text-sm sm:text-base md:text-lg text-text-main bg-[#FDFBF9] border border-[#E0E0E0] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] font-sans w-full md:w-auto">
            {sentence1}
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-[1.2rem] self-center md:rotate-0 rotate-90 my-1 md:my-0">+</div>
          <div className="text-sm sm:text-base md:text-lg text-text-main bg-[#FDFBF9] border border-[#E0E0E0] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] font-sans w-full md:w-auto">
            {sentence2}
          </div>
        </div>

        {/* After: Merged Sentence */}
        {activeOption && (
          <div
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.4rem] absolute font-serif transition-all duration-500 px-4"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'scale(0.9)' : 'scale(1)',
            }}
          >
            {currentResult}
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleMerge(option)}
            className={`bg-white border border-[rgba(0,0,0,0.1)] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold cursor-pointer transition-all flex items-center gap-1.5 sm:gap-2 text-text-muted text-xs sm:text-sm md:text-base ${getButtonColors(option)}`}
          >
            <span className="font-black">{option.icon}</span> {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
