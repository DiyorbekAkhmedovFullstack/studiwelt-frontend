import { useState } from 'react';

type WordChipData = {
  text: string;
  type: 'te' | 'ka' | 'mo' | 'lo';
};

type SlotData = {
  type: 'te' | 'ka' | 'mo' | 'lo';
  label: string;
  content: string | null;
};

export function SentenceSorter() {
  const [currentStep, setCurrentStep] = useState(0);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [wrongWord, setWrongWord] = useState<string | null>(null);

  const words: WordChipData[] = [
    { text: 'gern', type: 'mo' },
    { text: 'ins Büro', type: 'lo' },
    { text: 'morgens', type: 'te' },
    { text: 'wegen der Arbeit', type: 'ka' },
  ];

  const [slots, setSlots] = useState<SlotData[]>([
    { type: 'te', label: 'Wann?', content: null },
    { type: 'ka', label: 'Warum?', content: null },
    { type: 'mo', label: 'Wie?', content: null },
    { type: 'lo', label: 'Wohin?', content: null },
  ]);

  const expectedOrder: ('te' | 'ka' | 'mo' | 'lo')[] = ['te', 'ka', 'mo', 'lo'];

  const slotColors: Record<'te' | 'ka' | 'mo' | 'lo', string> = {
    te: 'border-[#6B8C6E] text-[#6B8C6E]',
    ka: 'border-[#C07766] text-[#C07766]',
    mo: 'border-[#D9A441] text-[#D9A441]',
    lo: 'border-[#A67B5B] text-[#A67B5B]',
  };

  const handleWordClick = (word: WordChipData) => {
    if (currentStep > 3 || usedWords.has(word.text)) return;

    const expectedType = expectedOrder[currentStep];

    if (word.type === expectedType) {
      // Correct word
      const newSlots = [...slots];
      newSlots[currentStep].content = word.text;
      setSlots(newSlots);

      setUsedWords((prev) => new Set(prev).add(word.text));
      setCurrentStep(currentStep + 1);

      if (currentStep === 3) {
        setFeedback({ message: 'Perfekt! Te - Ka - Mo - Lo.', isError: false });
      } else {
        setFeedback(null);
      }
    } else {
      // Wrong word - shake animation
      setWrongWord(word.text);
      setFeedback({ message: 'Falsche Reihenfolge! Denk an Te-Ka-Mo-Lo.', isError: true });

      setTimeout(() => {
        setWrongWord(null);
      }, 400);
    }
  };

  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0_8px_24px_rgba(62,54,48,0.06)] sm:shadow-[0_10px_32px_rgba(62,54,48,0.07)] md:shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-5 sm:p-8 md:p-10 lg:p-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2">Der Satz-Baukasten</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">Klicke die Bausteine in der richtigen Reihenfolge an.</p>
      </div>

      {/* Sentence Frame */}
      <div className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 font-serif">Ich fahre...</div>

      {/* Slots */}
      <div className="flex justify-center gap-2 sm:gap-3 my-6 sm:my-8 md:my-10 flex-wrap">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`w-28 sm:w-32 md:w-36 h-12 sm:h-14 md:h-16 border-2 rounded-lg sm:rounded-xl flex items-center justify-center font-semibold transition-all ${
              slot.content
                ? `border-solid bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] font-serif text-xs sm:text-sm md:text-base ${slotColors[slot.type]}`
                : 'border-dashed border-[#CCC] bg-[#FAFAFA] text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] text-[#AAA]'
            }`}
          >
            {slot.content || slot.label}
          </div>
        ))}
      </div>

      {/* Word Bank */}
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
        {words.map((word, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleWordClick(word)}
            disabled={usedWords.has(word.text)}
            className={`bg-white border border-[rgba(0,0,0,0.1)] px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold cursor-pointer transition-all shadow-[0_2px_4px_rgba(0,0,0,0.05)] text-xs sm:text-sm md:text-base ${
              usedWords.has(word.text)
                ? 'opacity-0 scale-75 pointer-events-none'
                : wrongWord === word.text
                  ? 'animate-shake border-[#C07766]'
                  : 'hover:-translate-y-0.5 hover:border-[#E3D4C5]'
            }`}
          >
            {word.text}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm md:text-base transition-opacity ${
            feedback.isError ? 'text-[#C07766]' : 'text-text-main'
          }`}
        >
          {feedback.message}
        </div>
      )}
    </section>
  );
}
