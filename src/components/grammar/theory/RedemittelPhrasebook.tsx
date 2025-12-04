import { useState } from 'react';

type Phrase = {
  category: string;
  text: string;
};

export function RedemittelPhrasebook() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const phrases: Phrase[] = [
    { category: 'Einleitung', text: 'Die Grafik liefert Informationen über...' },
    { category: 'Auffälligkeiten', text: 'Auffällig ist, dass...' },
    { category: 'Vergleich', text: 'Im Vergleich zum Vorjahr...' },
    { category: 'Fazit', text: 'Zusammenfassend lässt sich sagen, dass...' },
  ];

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Wichtige Redemittel (C1)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {phrases.map((phrase, index) => (
          <button
            key={index}
            onClick={() => handleCopy(phrase.text, index)}
            className="text-left bg-white p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] shadow-card border-l-[3px] sm:border-l-4 border-[#E3D4C5] hover:border-primary transition-all relative group"
          >
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase mb-1.5 sm:mb-2 tracking-wider">
              {phrase.category}
            </span>
            <span className="text-text-main text-xs sm:text-sm md:text-base block font-medium pr-16 sm:pr-20">"{phrase.text}"</span>

            {/* Copy Hint */}
            <span
              className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] transition-all ${
                copiedIndex === index
                  ? 'text-[#6B8C6E] opacity-100'
                  : 'text-primary opacity-0 group-hover:opacity-100'
              }`}
            >
              {copiedIndex === index ? 'Kopiert!' : 'Kopieren'}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
