import { useState } from 'react';
import type { ReactNode } from 'react';
import { Ui } from '../../../lib/icons';

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
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_8px_24px_rgba(62,54,48,0.06)] sm:shadow-[0_10px_32px_rgba(62,54,48,0.07)] md:shadow-[0_12px_40px_rgba(62,54,48,0.08)] relative overflow-hidden mb-8 sm:mb-12 md:mb-16">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] bg-gradient-radial from-[#FAF6F3] to-transparent opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-6 sm:mb-7 md:mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-1">Der Sprach-Aufzug</h2>
          <p className="text-text-muted text-xs sm:text-sm md:text-base">
            Verwandle Alltagssprache in C1-Niveau.
          </p>
        </div>
      </div>

      {/* Exercise Area */}
      <div className="text-center relative z-10 bg-[#F5F2EB] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] p-4 sm:p-6 md:p-8 min-h-[140px] sm:min-h-[150px] md:min-h-[160px] flex flex-col justify-center items-center transition-all">
        <div
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.4rem] font-serif mb-4 sm:mb-5 md:mb-6 transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {isElevated ? elevatedSentence : simpleSentence}
        </div>

        {!isElevated ? (
          <button
            type="button"
            onClick={handleElevate}
            className="text-white text-xs sm:text-sm md:text-base bg-primary border-none px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold cursor-pointer shadow-[0_4px_12px_rgba(166,123,91,0.3)] transition-all hover:bg-[#8D6546] hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <Ui.ArrowUp width={16} height={16} className="sm:w-5 sm:h-5" />
            Niveau anheben
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="text-text-muted text-[0.7rem] sm:text-xs md:text-sm bg-transparent border border-[rgba(0,0,0,0.1)] px-4 sm:px-5 py-1.5 sm:py-2 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] cursor-pointer transition-all hover:border-[#E3D4C5]"
          >
            Zurücksetzen
          </button>
        )}
      </div>
    </section>
  );
}
