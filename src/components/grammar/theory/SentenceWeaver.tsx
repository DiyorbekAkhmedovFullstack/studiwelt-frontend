import { useState } from 'react';

type WeaverOption = {
  text: string;
  isCorrect: boolean;
};

type SentenceWeaverProps = {
  title: string;
  subtitle: string;
  baseSentences: string[];
  sentencePrefix: string;
  sentenceSuffix: string;
  options: WeaverOption[];
};

export function SentenceWeaver({
  title,
  subtitle,
  baseSentences,
  sentencePrefix,
  sentenceSuffix,
  options,
}: SentenceWeaverProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (option: WeaverOption) => {
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
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      <div className="mb-8">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="text-text-muted">{subtitle}</p>
      </div>

      {/* Base Sentences (faded) */}
      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] flex gap-4 opacity-60 mb-6 justify-center flex-col md:flex-row">
        {baseSentences.map((sentence, index) => (
          <span key={index}>
            {index + 1}. {sentence}
          </span>
        ))}
      </div>

      {/* Target Sentence with Gap */}
      <div className="my-8">
        <div className="text-xs sm:text-base md:text-[1.4rem] font-serif flex flex-wrap justify-center items-center gap-3">
          <span>{sentencePrefix}</span>
          <div
            className={`min-w-[120px] h-10 flex items-center justify-center font-mono font-bold rounded transition-all ${
              selectedAnswer
                ? 'bg-white border-2 border-primary text-primary shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                : 'bg-[#EBE5DA] border-b-2 border-text-muted text-primary'
            }`}
          >
            {selectedAnswer || '???'}
          </div>
          <span>{sentenceSuffix}</span>
        </div>
      </div>

      {/* Options Dock */}
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
              className={`bg-white border px-5 py-2.5 rounded-[50px] cursor-pointer font-semibold transition-all ${
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
