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

export function PolitenessSlider({ title, levels }: PolitenessSliderProps) {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(e.target.value) as 1 | 2 | 3;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLevel(newLevel);
      setIsTransitioning(false);
    }, 100);
  };

  const currentData = levels[currentLevel];
  const isVeryPolite = currentLevel === 3;

  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0_8px_24px_rgba(62,54,48,0.06)] sm:shadow-[0_10px_32px_rgba(62,54,48,0.07)] md:shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-5 sm:p-8 md:p-10 lg:p-12">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-6 sm:mb-7 md:mb-8">{title}</h2>

      {/* Output Bubble */}
      <div
        className={`bg-[#FAF6F3] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.2rem] min-h-[70px] sm:min-h-[80px] md:min-h-[90px] flex items-center justify-center mb-3 sm:mb-4 transition-all ${
          isVeryPolite ? 'text-primary font-bold' : 'text-text-main'
        }`}
        style={{ opacity: isTransitioning ? 0.5 : 1 }}
      >
        {currentData.text}
      </div>

      <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] font-bold uppercase tracking-wider mb-6 sm:mb-7 md:mb-8">
        {currentData.label}
      </div>

      {/* Slider */}
      <div className="max-w-full sm:max-w-[400px] md:max-w-[500px] mx-auto px-2 sm:px-0">
        <input
          type="range"
          min="1"
          max="3"
          value={currentLevel}
          step="1"
          onChange={handleChange}
          className="w-full h-1 sm:h-1.5 bg-[#EBE5DA] rounded-sm appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            sm:[&::-webkit-slider-thumb]:w-6
            sm:[&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.2)]
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            sm:[&::-moz-range-thumb]:w-6
            sm:[&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
        />
        <p className="mt-3 text-[0.65rem] sm:text-[0.7rem] text-text-muted italic opacity-80">
          (Verschieben, um die Höflichkeit zu ändern)
        </p>
      </div>
    </section>
  );
}
