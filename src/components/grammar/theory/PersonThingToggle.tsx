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
    <section className="bg-[#FAF6F3] rounded-[24px] p-10 mb-16 border border-[rgba(0,0,0,0.03)]">
      <div className="mb-8">
        <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted">{subtitle}</p>
      </div>

      {/* Toggle Switch */}
      <div className="flex bg-[#EBE5DA] p-1 rounded-[50px] w-fit mb-8">
        <button
          type="button"
          onClick={() => handleToggle(true)}
          className={`px-6 py-2.5 rounded-[50px] cursor-pointer font-semibold transition-all ${
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
          className={`px-6 py-2.5 rounded-[50px] cursor-pointer font-semibold transition-all ${
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
        className="text-center grid grid-cols-[1fr_1px_1fr] md:grid-cols-[1fr_1px_1fr] gap-6 items-center transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {/* Question Box */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <span className="text-primary block font-mono font-bold mb-2">
            {currentMode.questionFormula}
          </span>
          <div className="text-xs sm:text-sm md:text-[1.1rem]">{currentMode.questionExample}</div>
        </div>

        {/* Divider */}
        <div className="bg-[rgba(0,0,0,0.1)] h-full w-full md:w-px md:h-auto min-h-[1px] md:min-h-[100px]" />

        {/* Answer Box */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <span className="text-primary block font-mono font-bold mb-2">
            {currentMode.answerFormula}
          </span>
          <div className="text-xs sm:text-sm md:text-[1.1rem]">{currentMode.answerExample}</div>
        </div>
      </div>
    </section>
  );
}
