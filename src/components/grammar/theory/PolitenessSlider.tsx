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
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-8">{title}</h2>

      {/* Output Bubble */}
      <div
        className={`bg-[#FAF6F3] p-6 rounded-2xl font-serif text-xs sm:text-sm md:text-[1.2rem] min-h-[80px] flex items-center justify-center mb-4 transition-all ${
          isVeryPolite ? 'text-primary font-bold' : 'text-text-main'
        }`}
        style={{ opacity: isTransitioning ? 0.5 : 1 }}
      >
        {currentData.text}
      </div>

      <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] font-bold uppercase tracking-wider mb-4">
        {currentData.label}
      </div>

      {/* Slider */}
      <div className="max-w-[500px] mx-auto">
        <input
          type="range"
          min="1"
          max="3"
          value={currentLevel}
          step="1"
          onChange={handleChange}
          className="w-full h-1 bg-[#EBE5DA] rounded-sm appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.2)]
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
        />
      </div>
    </section>
  );
}
