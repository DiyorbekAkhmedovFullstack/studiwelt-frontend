import { useState } from 'react';
import { Icon } from '../../../lib/icons';

export function SentenceArchitect() {
  const [isBuilt, setIsBuilt] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBuild = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsBuilt(!isBuilt);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-2">Der Satz-Architekt</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">
          Verbinde die Sätze mit "Je ... desto". Achte auf die Verb-Wanderung.
        </p>
      </div>

      {/* Blueprint Area */}
      <div className="bg-[#F4F6F8] border border-dashed border-[#CCCCDD] p-4 sm:p-6 md:p-8 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] min-h-[160px] sm:min-h-[180px] md:min-h-[200px] flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 relative">
        {/* Initial State */}
        <div
          className="flex gap-2 sm:gap-3 flex-wrap justify-center items-center transition-all duration-300"
          style={{
            opacity: isTransitioning ? 0 : isBuilt ? 0 : 1,
            display: isBuilt && !isTransitioning ? 'none' : 'flex',
          }}
        >
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm text-xs sm:text-sm md:text-base">
            Du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766] text-xs sm:text-sm md:text-base">
            lernst
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441] text-xs sm:text-sm md:text-base">
            schnell
          </div>
          <span className="text-[#CCC]">+</span>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm text-xs sm:text-sm md:text-base">
            Du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766] text-xs sm:text-sm md:text-base">
            bist
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441] text-xs sm:text-sm md:text-base">
            fertig
          </div>
        </div>

        {/* Built State */}
        <div
          className="flex gap-2 sm:gap-3 flex-wrap justify-center items-center transition-all duration-500"
          style={{
            opacity: isTransitioning ? 0 : isBuilt ? 1 : 0,
            display: !isBuilt && !isTransitioning ? 'none' : 'flex',
            position: !isBuilt && !isTransitioning ? 'absolute' : 'static',
          }}
        >
          <div className="text-white bg-primary px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-bold shadow-sm text-xs sm:text-sm md:text-base">
            Je
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441] text-xs sm:text-sm md:text-base">
            schneller
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm text-xs sm:text-sm md:text-base">
            du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766] text-xs sm:text-sm md:text-base">
            lernst,
          </div>
          <div className="text-white bg-primary px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-bold shadow-sm text-xs sm:text-sm md:text-base">
            desto
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441] text-xs sm:text-sm md:text-base">
            eher
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766] text-xs sm:text-sm md:text-base">
            bist
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm text-xs sm:text-sm md:text-base">
            du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium shadow-sm text-xs sm:text-sm md:text-base">
            fertig.
          </div>
        </div>
      </div>

      {/* Explanation Text */}
      <div
        className="text-text-muted text-xs sm:text-sm md:text-base mt-4 sm:mt-5 md:mt-6 transition-opacity duration-500"
        style={{ opacity: isBuilt ? 1 : 0 }}
      >
        "Je" leitet einen Nebensatz ein (Verb am Ende). "Desto" leitet den Hauptsatz ein, zählt als
        Position 1, also folgt das Verb sofort.
      </div>

      {/* Controls */}
      <div className="flex justify-center mt-6 sm:mt-7 md:mt-8">
        <button
          onClick={handleBuild}
          className="text-white text-xs sm:text-sm md:text-base bg-text-main px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-primary"
        >
          {!isBuilt ? (
            <>
              <Icon.Build width={16} height={16} className="sm:w-5 sm:h-5" />
              Konstruieren
            </>
          ) : (
            'Rückgängig'
          )}
        </button>
      </div>
    </section>
  );
}
