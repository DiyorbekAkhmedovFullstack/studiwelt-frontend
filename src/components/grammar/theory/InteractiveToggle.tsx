import { useState, type KeyboardEvent } from 'react';

type InteractiveToggleProps = {
  title?: string;
  subtitle?: string;
  processOption: string;
  stateOption: string;
  sentence: {
    prefix: string;
    suffix: string;
    processVerb: string;
    stateVerb: string;
  };
  contextHints: {
    process: string;
    state: string;
  };
};

export function InteractiveToggle({
  title = 'Der Passiv-Regler',
  subtitle = 'Wechsle zwischen Handlung (Vorgang) und Ergebnis (Zustand).',
  processOption,
  stateOption,
  sentence,
  contextHints,
}: InteractiveToggleProps) {
  const [isProcess, setIsProcess] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsProcess(!isProcess);
      setIsTransitioning(false);
    }, 250);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const currentVerb = isProcess ? sentence.processVerb : sentence.stateVerb;
  const currentHint = isProcess ? contextHints.process : contextHints.state;
  const verbColor = isProcess ? 'text-[#D9A441]' : 'text-[#6B8C6E]';
  const verbBorder = isProcess ? 'border-[#D9A441]' : 'border-[#6B8C6E]';

  return (
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-2">{title}</h2>
      <p className="text-text-muted mb-8">{subtitle}</p>

      {/* Toggle Switch */}
      <div
        role="switch"
        aria-checked={!isProcess}
        aria-label={`Toggle between ${processOption} and ${stateOption}`}
        tabIndex={0}
        className="inline-flex bg-[#EBE5DA] p-1 rounded-[50px] relative cursor-pointer mb-8"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <div
          className={`absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white rounded-[50px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out ${
            isProcess ? 'translate-x-0' : 'translate-x-[calc(100%+8px)]'
          }`}
        />
        <div
          className={`px-8 py-2.5 rounded-[50px] font-semibold text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.8rem] z-10 select-none transition-colors duration-300 ${
            isProcess ? 'text-text-main' : 'text-text-muted'
          }`}
        >
          {processOption}
        </div>
        <div
          className={`px-8 py-2.5 rounded-[50px] font-semibold text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.8rem] z-10 select-none transition-colors duration-300 ${
            !isProcess ? 'text-text-main' : 'text-text-muted'
          }`}
        >
          {stateOption}
        </div>
      </div>

      {/* Sentence Display */}
      <div
        className="text-xs sm:text-sm md:text-[1.3rem] bg-page p-8 rounded-2xl min-h-[120px] flex items-center justify-center font-serif transition-opacity duration-300 mb-4"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <span className="inline-block">{sentence.prefix}</span>&nbsp;
        <span className={`inline-block font-bold border-b-2 px-0.5 transition-colors duration-400 ${verbColor} ${verbBorder}`}>
          {currentVerb}
        </span>&nbsp;
        <span className="inline-block">{sentence.suffix}</span>
      </div>

      {/* Context Hint */}
      <p
        className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] min-h-[24px] transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {currentHint}
      </p>
    </section>
  );
}
