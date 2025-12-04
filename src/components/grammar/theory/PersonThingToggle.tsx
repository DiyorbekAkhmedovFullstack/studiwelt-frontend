import { useState } from 'react';
import type { ReactNode } from 'react';

type ModeData = {
  questionFormula: string;
  questionExample: ReactNode;
  answerFormula: string;
  answerExample: ReactNode;
};

type PersonThingToggleProps = {
  title: string;
  subtitle: string;
  thingMode: ModeData;
  personMode: ModeData;
};

export function PersonThingToggle({
  title,
  subtitle,
  thingMode,
  personMode,
}: PersonThingToggleProps) {
  const [isThing, setIsThing] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentMode = isThing ? thingMode : personMode;

  const handleToggle = (shouldBeThing: boolean) => {
    if (shouldBeThing === isThing) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setIsThing(shouldBeThing);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="bg-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.03)]">
      <div className="mb-6 sm:mb-7 md:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.2rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">{subtitle}</p>
      </div>

      {/* Toggle Switch */}
      <div className="flex bg-[#EBE5DA] p-1 rounded-[50px] w-full sm:w-fit mb-6 sm:mb-7 md:mb-8">
        <button
          type="button"
          onClick={() => handleToggle(true)}
          className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-[50px] cursor-pointer font-semibold transition-all text-xs sm:text-sm md:text-base ${
            isThing
              ? 'bg-white text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
              : 'text-text-muted'
          }`}
        >
          Sache (Thing)
        </button>
        <button
          type="button"
          onClick={() => handleToggle(false)}
          className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-[50px] cursor-pointer font-semibold transition-all text-xs sm:text-sm md:text-base ${
            !isThing
              ? 'bg-white text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
              : 'text-text-muted'
          }`}
        >
          Person
        </button>
      </div>

      {/* Mechanism Display */}
      <div
        className="text-center grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-4 sm:gap-5 md:gap-6 items-stretch md:items-center transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {/* Question Box */}
        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <span className="text-primary block font-mono font-bold mb-2 text-xs sm:text-sm md:text-base">
            {currentMode.questionFormula}
          </span>
          <div className="text-sm sm:text-base md:text-lg lg:text-[1.1rem]">{currentMode.questionExample}</div>
        </div>

        {/* Divider */}
        <div className="bg-[rgba(0,0,0,0.1)] h-[1px] md:h-full w-full md:w-px md:min-h-[100px]" />

        {/* Answer Box */}
        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <span className="text-primary block font-mono font-bold mb-2 text-xs sm:text-sm md:text-base">
            {currentMode.answerFormula}
          </span>
          <div className="text-sm sm:text-base md:text-lg lg:text-[1.1rem]">{currentMode.answerExample}</div>
        </div>
      </div>
    </section>
  );
}
