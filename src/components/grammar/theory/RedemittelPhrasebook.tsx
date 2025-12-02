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
    <section className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Wichtige Redemittel (C1)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {phrases.map((phrase, index) => (
          <button
            key={index}
            onClick={() => handleCopy(phrase.text, index)}
            className="text-left bg-white p-5 rounded-[16px] shadow-card border-l-4 border-[#E3D4C5] hover:border-primary transition-all relative group"
          >
            <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase mb-2 tracking-wider">
              {phrase.category}
            </span>
            <span className="text-text-main block font-medium">"{phrase.text}"</span>

            {/* Copy Hint */}
            <span
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] transition-all ${
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
