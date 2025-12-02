import { useState } from 'react';

type Gap = {
  id: number;
  answer: string;
  filled: string | null;
};

export function TextReconstruction() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [gaps, setGaps] = useState<Gap[]>([
    { id: 0, answer: 'Dennoch', filled: null },
    { id: 1, answer: 'Infolgedessen', filled: null },
    { id: 2, answer: 'obwohl', filled: null },
  ]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [errorGap, setErrorGap] = useState<number | null>(null);

  const words = ['Infolgedessen', 'Dennoch', 'Obwohl', 'Damit'];

  const handleWordSelect = (word: string) => {
    if (usedWords.includes(word)) return;
    setSelectedWord(word);
  };

  const handleGapClick = (gapId: number) => {
    if (!selectedWord) return;

    const gap = gaps[gapId];

    // Case insensitive comparison
    if (selectedWord.toLowerCase() === gap.answer.toLowerCase()) {
      // Correct answer
      setGaps((prev) =>
        prev.map((g) => (g.id === gapId ? { ...g, filled: selectedWord } : g))
      );
      setUsedWords((prev) => [...prev, selectedWord]);
      setSelectedWord(null);
    } else {
      // Wrong answer - show error animation
      setErrorGap(gapId);
      setTimeout(() => setErrorGap(null), 500);
    }
  };

  return (
    <section className="text-center bg-[#FAF6F3] rounded-[24px] p-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">Text-Rekonstruktion</h2>
        <p className="text-text-muted">
          Welcher logische Konnektor passt in die Lücke? Achte auf den Kontext.
        </p>
      </div>

      {/* Cloze Text */}
      <div className="text-xs sm:text-sm md:text-[1.2rem] bg-white p-10 rounded-[16px] shadow-card font-serif leading-loose max-w-[800px] mx-auto mb-8">
        Viele Städte leiden unter Verkehrsinfarkten.{' '}
        <span
          onClick={() => handleGapClick(0)}
          className={`inline-block min-w-[100px] text-center font-bold cursor-pointer transition-all mx-2 ${
            gaps[0].filled
              ? 'text-primary'
              : errorGap === 0
                ? 'text-[#C07766] border-b-2 border-dashed border-[#C07766]'
                : 'text-primary border-b-2 border-dashed border-text-muted'
          }`}
        >
          {errorGap === 0 ? selectedWord : gaps[0].filled || '_________'}
        </span>{' '}
        halten viele Menschen am eigenen Auto fest.{' '}
        <span
          onClick={() => handleGapClick(1)}
          className={`inline-block min-w-[100px] text-center font-bold cursor-pointer transition-all mx-2 ${
            gaps[1].filled
              ? 'text-primary'
              : errorGap === 1
                ? 'text-[#C07766] border-b-2 border-dashed border-[#C07766]'
                : 'text-primary border-b-2 border-dashed border-text-muted'
          }`}
        >
          {errorGap === 1 ? selectedWord : gaps[1].filled || '_________'}
        </span>{' '}
        steigen die Emissionen weiter an,{' '}
        <span
          onClick={() => handleGapClick(2)}
          className={`inline-block min-w-[100px] text-center font-bold cursor-pointer transition-all mx-2 ${
            gaps[2].filled
              ? 'text-primary'
              : errorGap === 2
                ? 'text-[#C07766] border-b-2 border-dashed border-[#C07766]'
                : 'text-primary border-b-2 border-dashed border-text-muted'
          }`}
        >
          {errorGap === 2 ? selectedWord : gaps[2].filled || '_________'}
        </span>{' '}
        es Alternativen gibt.
      </div>

      {/* Word Bank */}
      <div className="flex justify-center gap-3 flex-wrap">
        {words.map((word, index) => (
          <button
            key={index}
            onClick={() => handleWordSelect(word)}
            disabled={usedWords.includes(word)}
            className={`bg-white border px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm ${
              usedWords.includes(word)
                ? 'opacity-50 pointer-events-none scale-90'
                : selectedWord === word
                  ? 'border-primary border-2 -translate-y-0.5'
                  : 'border-[rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:border-primary'
            }`}
          >
            {word}
          </button>
        ))}
      </div>
    </section>
  );
}
