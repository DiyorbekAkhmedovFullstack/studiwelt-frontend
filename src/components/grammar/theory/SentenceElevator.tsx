import { useState } from 'react';
import type { ReactNode } from 'react';

export function SentenceElevator() {
  const [isElevated, setIsElevated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const simpleSentence: ReactNode = (
    <>
      Der Politiker <span className="text-primary font-bold relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:opacity-30">kritisierte</span> die neuen Pläne.
    </>
  );

  const elevatedSentence: ReactNode = (
    <>
      Der Politiker <span className="text-primary font-bold relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:opacity-30">übte Kritik an</span> den neuen Plänen.
    </>
  );

  const handleElevate = () => {
    if (isElevated) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setIsElevated(true);
      setIsTransitioning(false);
    }, 200);
  };

  const handleReset = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsElevated(false);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="bg-surface rounded-[24px] p-10 shadow-[0_12px_40px_rgba(62,54,48,0.08)] relative overflow-hidden mb-16">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-radial from-[#FAF6F3] to-transparent opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-1">Der Sprach-Aufzug</h2>
          <p className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem]">
            Verwandle Alltagssprache in C1-Niveau.
          </p>
        </div>
      </div>

      {/* Exercise Area */}
      <div className="text-center relative z-10 bg-[#F5F2EB] rounded-[16px] p-8 min-h-[160px] flex flex-col justify-center items-center transition-all">
        <div
          className="text-xs sm:text-base md:text-[1.4rem] font-serif mb-6 transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {isElevated ? elevatedSentence : simpleSentence}
        </div>

        {!isElevated ? (
          <button
            type="button"
            onClick={handleElevate}
            className="text-white sm:text-sm md:text-[1rem] bg-primary border-none px-8 py-3 rounded-[50px] font-semibold cursor-pointer shadow-[0_4px_12px_rgba(166,123,91,0.3)] transition-all hover:bg-[#8D6546] hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Niveau anheben
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem] bg-transparent border border-[rgba(0,0,0,0.1)] px-5 py-2 rounded-[50px] cursor-pointer transition-all hover:border-[#E3D4C5]"
          >
            Zurücksetzen
          </button>
        )}
      </div>
    </section>
  );
}
