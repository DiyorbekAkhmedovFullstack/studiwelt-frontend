import { useState } from 'react';

type PrepositionOption = {
  value: string;
  isCorrect: boolean;
};

type ReactionChamberProps = {
  title: string;
  subtitle: string;
  verb: string;
  sentenceEnding: string;
  options: PrepositionOption[];
  successMessage: string;
  errorMessage: string;
};

export function ReactionChamber({
  title,
  subtitle,
  verb,
  sentenceEnding,
  options,
  successMessage,
  errorMessage,
}: ReactionChamberProps) {
  const [selectedPrep, setSelectedPrep] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());

  const handleSelection = (option: PrepositionOption) => {
    if (isCorrect) return; // Already solved

    if (option.isCorrect) {
      setSelectedPrep(option.value);
      setIsCorrect(true);
      setFeedback(successMessage);
    } else {
      setWrongAttempts((prev) => new Set(prev).add(option.value));
      setIsCorrect(false);
      setFeedback(errorMessage);

      // Clear error state after animation
      setTimeout(() => {
        setIsCorrect(null);
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      <div className="mb-10">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted">{subtitle}</p>
      </div>

      {/* Reaction Chamber */}
      <div className="text-xs sm:text-base md:text-[1.4rem] my-10 mx-auto max-w-[600px] min-h-[120px] flex items-center justify-center gap-3 font-serif">
        <span className="font-bold">{verb}</span>
        <span
          className={`border-b-2 min-w-[80px] text-center transition-all ${
            selectedPrep
              ? 'border-primary text-primary font-bold'
              : 'border-dashed border-text-muted text-text-muted'
          }`}
        >
          {selectedPrep || '___'}
        </span>
        <span>{sentenceEnding}</span>
      </div>

      {/* Element Shelf (Options) */}
      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {options.map((option) => {
          const isWrong = wrongAttempts.has(option.value);
          const isSelected = selectedPrep === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelection(option)}
              disabled={isCorrect === true}
              className={`bg-white border px-5 py-3 rounded-xl font-semibold cursor-pointer transition-all shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:border-[#E3D4C5] disabled:cursor-not-allowed disabled:pointer-events-none ${
                isSelected
                  ? 'bg-[#4A7C8C] text-white border-[#4A7C8C]'
                  : isWrong
                    ? 'bg-[#FFF5F5] text-[#C07766] border-[#C07766] animate-shake'
                    : 'border-[rgba(0,0,0,0.1)]'
              }`}
            >
              {option.value}
            </button>
          );
        })}
      </div>

      {/* Result Message */}
      <div
        className={`mt-6 text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] md:text-[0.95rem] text-text-muted min-h-[24px] transition-opacity ${
          feedback ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isCorrect && (
          <span className="text-[#4A7C8C] font-bold">{feedback}</span>
        )}
        {isCorrect === false && feedback}
      </div>
    </section>
  );
}
