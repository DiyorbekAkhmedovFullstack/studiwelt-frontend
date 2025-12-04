import { useState } from 'react';
import type { ReactNode } from 'react';

export function SentenceCompressor() {
  const [isCompressed, setIsCompressed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const relativeClause: ReactNode = (
    <>
      <span className="text-text-main font-bold">Die</span>{' '}
      <span className="text-text-muted">Katze, die</span>{' '}
      <span className="text-primary">laut im Garten</span>{' '}
      <span className="text-text-main border-b-2 border-[#E3D4C5]">schläft</span>
    </>
  );

  const compressedForm: ReactNode = (
    <>
      <span className="text-text-main font-bold">Die</span>{' '}
      <span className="text-primary">laut im Garten</span>{' '}
      <span className="text-[#6B8C6E] border-b-2 border-[#6B8C6E] font-semibold">schlafende</span>{' '}
      <span className="text-text-main font-bold ml-2">Katze</span>
    </>
  );

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsCompressed(!isCompressed);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2">Die Satz-Presse</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">Komprimiere den Relativsatz in ein Attribut.</p>
      </div>

      {/* Text Stage */}
      <div className="min-h-[80px] sm:min-h-[90px] md:min-h-[100px] flex items-center justify-center my-3 sm:my-4">
        <div
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-serif transition-all duration-500"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
          }}
        >
          {isCompressed ? compressedForm : relativeClause}
        </div>
      </div>

      {/* Compress Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="text-white text-xs sm:text-sm md:text-base bg-text-main border-none px-6 sm:px-7 md:px-8 lg:px-9 py-2.5 sm:py-3 md:py-3.5 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(62,54,48,0.2)] inline-flex items-center gap-2 sm:gap-2.5 hover:bg-primary hover:-translate-y-0.5"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300 sm:w-5 sm:h-5"
          style={{ transform: isCompressed ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M4 14h6v6" />
          <path d="M20 10h-6V4" />
          <path d="M14 10l7-7" />
          <path d="M3 21l7-7" />
        </svg>
        <span>{isCompressed ? 'Auflösen (Relativsatz)' : 'Komprimieren'}</span>
      </button>
    </section>
  );
}
