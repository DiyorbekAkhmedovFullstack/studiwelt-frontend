import { useState } from 'react';

type Quote = {
  direct: string;
  speaker: string;
  indirect: string;
};

export function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReported, setIsReported] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const quotes: Quote[] = [
    {
      direct: 'Ich <strong>werde</strong> die Steuern nicht erhöhen.',
      speaker: 'Der Minister',
      indirect:
        'Der Minister sagte, er <span class="bg-[#554b45] text-white px-1 rounded font-bold">werde</span> die Steuern nicht erhöhen.',
    },
    {
      direct: 'Wir <strong>haben</strong> keine Probleme.',
      speaker: 'Die Firma',
      indirect:
        'Die Firma betonte, sie <span class="bg-[#554b45] text-white px-1 rounded font-bold">habe</span> keine Probleme.',
    },
    {
      direct: 'Das Wetter <strong>ist</strong> zu schlecht.',
      speaker: 'Der Pilot',
      indirect:
        'Der Pilot meldete, das Wetter <span class="bg-[#554b45] text-white px-1 rounded font-bold">sei</span> zu schlecht.',
    },
  ];

  const handleReport = () => {
    if (isReported) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setIsReported(true);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % quotes.length);
      setIsReported(false);
      setIsTransitioning(false);
    }, 200);
  };

  const currentQuote = quotes[currentIndex];

  return (
    <section className="mt-6 sm:mt-8 md:mt-10">
      <div className="text-white bg-text-main rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden shadow-card">
        {/* Label */}
        <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] tracking-[2px] uppercase mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF5252] rounded-full animate-pulse" />
          LIVE REDAKTION
        </div>

        {/* Quote Display */}
        <div
          className="text-sm sm:text-base md:text-lg lg:text-xl font-serif mb-6 sm:mb-7 md:mb-8 leading-relaxed min-h-[80px] sm:min-h-[90px] md:min-h-[100px] transition-opacity duration-200"
          style={{
            opacity: isTransitioning ? 0 : 1,
            fontStyle: isReported ? 'italic' : 'normal',
          }}
          dangerouslySetInnerHTML={{
            __html: isReported ? currentQuote.indirect : `"${currentQuote.direct}"`,
          }}
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleReport}
            disabled={isReported}
            className="text-text-main text-xs sm:text-sm md:text-base bg-white border-none px-5 sm:px-6 py-2.5 sm:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bericht erstatten
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="text-white text-xs sm:text-sm md:text-base bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.2)]"
          >
            Nächstes Zitat
          </button>
        </div>
      </div>
    </section>
  );
}
