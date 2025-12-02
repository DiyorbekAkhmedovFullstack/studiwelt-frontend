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
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12 overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">Die Satz-Presse</h2>
        <p className="text-text-muted">Komprimiere den Relativsatz in ein Attribut.</p>
      </div>

      {/* Text Stage */}
      <div className="min-h-[120px] flex items-center justify-center my-8">
        <div
          className="text-xs sm:text-sm md:text-[1.3rem] font-serif transition-all duration-500"
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
        className="text-white sm:text-sm md:text-[1rem] bg-text-main border-none px-9 py-3.5 rounded-[50px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(62,54,48,0.2)] inline-flex items-center gap-2.5 hover:bg-primary hover:-translate-y-0.5"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300"
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
