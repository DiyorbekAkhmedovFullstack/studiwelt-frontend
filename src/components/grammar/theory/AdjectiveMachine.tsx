import { useState } from 'react';

type MachineOption = {
  text: string;
  isCorrect: boolean;
};

type AdjectiveMachineProps = {
  title: string;
  subtitle: string;
  inputSentence: string;
  options: MachineOption[];
};

export function AdjectiveMachine({
  title,
  subtitle,
  inputSentence,
  options,
}: AdjectiveMachineProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (option: MachineOption) => {
    if (isCorrect) return; // Already solved

    if (option.isCorrect) {
      setSelectedAnswer(option.text);
      setIsCorrect(true);
    } else {
      setWrongAttempts((prev) => new Set(prev).add(option.text));
      // Clear the wrong animation after 400ms
      setTimeout(() => {
        setWrongAttempts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(option.text);
          return newSet;
        });
      }, 400);
    }
  };

  return (
    <section className="bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem]">{subtitle}</p>
      </div>

      {/* Machine Container */}
      <div className="bg-[#FAF6F3] rounded-3xl p-8 mb-8 border-2 border-[rgba(0,0,0,0.05)]">
        {/* Input */}
        <div className="mb-6">
          <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-wide mb-2 font-semibold">
            Eingabe:
          </div>
          <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)]">
            <span className="text-xs sm:text-sm md:text-[1.1rem] font-serif">
              {inputSentence}
            </span>
          </div>
        </div>

        {/* Processing Arrow */}
        <div className="flex justify-center my-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C8075"
            strokeWidth="2"
            className="transform rotate-90"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Output */}
        <div>
          <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-wide mb-2 font-semibold">
            Ausgabe:
          </div>
          <div
            className={`bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 transition-all ${
              selectedAnswer
                ? 'border-primary'
                : 'border-[rgba(0,0,0,0.06)] border-dashed'
            }`}
          >
            <span className="text-xs sm:text-sm md:text-[1.1rem] font-serif">
              {selectedAnswer || '???'}
            </span>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="flex justify-center gap-3 flex-wrap">
        {options.map((option, index) => {
          const isWrong = wrongAttempts.has(option.text);
          const isSelected = selectedAnswer === option.text;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleOptionClick(option)}
              disabled={isCorrect}
              className={`bg-white border px-6 py-3 rounded-[50px] cursor-pointer font-semibold transition-all ${
                isSelected
                  ? 'bg-[#6B8C6E] text-white border-[#6B8C6E]'
                  : isWrong
                    ? 'bg-[#C07766] text-white border-[#C07766] animate-shake'
                    : 'border-[rgba(0,0,0,0.1)] text-text-main hover:-translate-y-0.5 hover:border-[#E3D4C5]'
              } ${isCorrect ? 'disabled:cursor-not-allowed disabled:opacity-50' : ''}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </section>
  );
}
