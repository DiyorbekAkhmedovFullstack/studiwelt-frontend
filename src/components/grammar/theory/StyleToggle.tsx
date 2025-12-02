import { useState } from 'react';
import type { ReactNode } from 'react';

type StyleMode = 'verbal' | 'nominal';

export function StyleToggle() {
  const [currentStyle, setCurrentStyle] = useState<StyleMode>('verbal');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const content: Record<StyleMode, ReactNode> = {
    verbal: (
      <>
        <span className="text-[#6B8C6E] font-semibold">Nachdem</span> der Wissenschaftler die
        Daten <span className="text-[#6B8C6E] font-semibold">analysiert hatte</span>,
        veröffentlichte er die Ergebnisse.
        <br />
        <br />
        <span className="text-[#6B8C6E] font-semibold">Weil</span> die Temperaturen weltweit{' '}
        <span className="text-[#6B8C6E] font-semibold">steigen</span>, schmilzt das Eis schneller
        als erwartet.
      </>
    ),
    nominal: (
      <>
        <span className="text-[#C07766] font-semibold">Nach der Analyse</span> der Daten
        veröffentlichte der Wissenschaftler die Ergebnisse.
        <br />
        <br />
        <span className="text-[#C07766] font-semibold">
          Aufgrund des weltweiten Temperaturanstiegs
        </span>{' '}
        schmilzt das Eis schneller als erwartet.
      </>
    ),
  };

  const borderColor = currentStyle === 'verbal' ? 'border-[#6B8C6E]' : 'border-[#C07766]';

  const handleToggle = (style: StyleMode) => {
    if (style === currentStyle) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStyle(style);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="text-center">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-4">Stil-Vergleich</h2>
      <p className="text-text-muted mb-6">
        Wechsle den Modus, um den Unterschied in der Informationsdichte zu sehen.
      </p>

      {/* Toggle Controls */}
      <div className="inline-flex bg-[#EBE5DA] p-1 rounded-[50px] mb-6">
        <button
          type="button"
          onClick={() => handleToggle('verbal')}
          className={`px-6 py-2.5 rounded-[50px] border-none font-semibold text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] md:text-[0.95rem] transition-all ${
            currentStyle === 'verbal'
              ? 'bg-surface text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
              : 'bg-transparent text-text-muted'
          }`}
        >
          Verbalstil (Alltag)
        </button>
        <button
          type="button"
          onClick={() => handleToggle('nominal')}
          className={`px-6 py-2.5 rounded-[50px] border-none font-semibold text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] md:text-[0.95rem] transition-all ${
            currentStyle === 'nominal'
              ? 'bg-surface text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
              : 'bg-transparent text-text-muted'
          }`}
        >
          Nominalstil (Akademisch)
        </button>
      </div>

      {/* Text Display Box */}
      <div
        className={`bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12 text-left border-l-4 ${borderColor} transition-all`}
      >
        <div
          className="text-xs sm:text-sm md:text-[1.2rem] font-serif leading-relaxed min-h-[120px] transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {content[currentStyle]}
        </div>
      </div>
    </section>
  );
}
