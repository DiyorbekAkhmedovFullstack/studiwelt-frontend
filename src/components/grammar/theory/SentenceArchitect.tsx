import { useState } from 'react';

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
    <section className="bg-surface rounded-[24px] shadow-float p-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">Der Satz-Architekt</h2>
        <p className="text-text-muted">
          Verbinde die Sätze mit "Je ... desto". Achte auf die Verb-Wanderung.
        </p>
      </div>

      {/* Blueprint Area */}
      <div className="bg-[#F4F6F8] border border-dashed border-[#CCCCDD] p-8 rounded-[16px] min-h-[200px] flex flex-col items-center justify-center gap-6 relative">
        {/* Initial State */}
        <div
          className="flex gap-3 flex-wrap justify-center items-center transition-all duration-300"
          style={{
            opacity: isTransitioning ? 0 : isBuilt ? 0 : 1,
            display: isBuilt && !isTransitioning ? 'none' : 'flex',
          }}
        >
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm">
            Du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766]">
            lernst
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441]">
            schnell
          </div>
          <span className="text-[#CCC]">+</span>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm">
            Du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766]">
            bist
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441]">
            fertig
          </div>
        </div>

        {/* Built State */}
        <div
          className="flex gap-3 flex-wrap justify-center items-center transition-all duration-500"
          style={{
            opacity: isTransitioning ? 0 : isBuilt ? 1 : 0,
            display: !isBuilt && !isTransitioning ? 'none' : 'flex',
            position: !isBuilt && !isTransitioning ? 'absolute' : 'static',
          }}
        >
          <div className="text-white bg-primary px-4 py-2 rounded-lg font-bold shadow-sm">
            Je
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441]">
            schneller
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm">
            du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766]">
            lernst,
          </div>
          <div className="text-white bg-primary px-4 py-2 rounded-lg font-bold shadow-sm">
            desto
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#D9A441]">
            eher
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm border-b-[3px] border-b-[#C07766]">
            bist
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm">
            du
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.1)] px-4 py-2 rounded-lg font-medium shadow-sm">
            fertig.
          </div>
        </div>
      </div>

      {/* Explanation Text */}
      <div
        className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem] mt-6 transition-opacity duration-500"
        style={{ opacity: isBuilt ? 1 : 0 }}
      >
        "Je" leitet einen Nebensatz ein (Verb am Ende). "Desto" leitet den Hauptsatz ein, zählt als
        Position 1, also folgt das Verb sofort.
      </div>

      {/* Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleBuild}
          className="text-white bg-text-main px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-primary"
        >
          {!isBuilt ? (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
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
