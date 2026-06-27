import { useState } from 'react';
import { Ui } from '../../../lib/icons';

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
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0_8px_24px_rgba(62,54,48,0.06)] sm:shadow-[0_10px_32px_rgba(62,54,48,0.07)] md:shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-5 sm:p-8 md:p-10 lg:p-12">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-7 md:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">{subtitle}</p>
      </div>

      {/* Machine Container */}
      <div className="bg-[#FAF6F3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-7 md:mb-8 border sm:border-2 border-[rgba(0,0,0,0.05)]">
        {/* Input */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] uppercase tracking-wide mb-2 font-semibold">
            Eingabe:
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)]">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">
              {inputSentence}
            </span>
          </div>
        </div>

        {/* Processing Arrow */}
        <div className="flex justify-center my-4 sm:my-5 md:my-6">
          <Ui.ArrowRight width={20} height={20} className="transform rotate-90 sm:w-6 sm:h-6 text-[#8C8075]" />
        </div>

        {/* Output */}
        <div>
          <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] uppercase tracking-wide mb-2 font-semibold">
            Ausgabe:
          </div>
          <div
            className={`bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 transition-all ${
              selectedAnswer
                ? 'border-primary'
                : 'border-[rgba(0,0,0,0.06)] border-dashed'
            }`}
          >
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">
              {selectedAnswer || '???'}
            </span>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
        {options.map((option, index) => {
          const isWrong = wrongAttempts.has(option.text);
          const isSelected = selectedAnswer === option.text;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleOptionClick(option)}
              disabled={isCorrect}
              className={`bg-white border px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] cursor-pointer font-semibold transition-all text-xs sm:text-sm md:text-base ${
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
