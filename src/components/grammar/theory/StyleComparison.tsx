import type { ReactNode } from 'react';

type StyleBoxProps = {
  type: 'verbal' | 'nominal';
  label: string;
  sentence: ReactNode;
  analysis: string;
};

function StyleBox({ type, label, sentence, analysis }: StyleBoxProps) {
  const borderColor = type === 'verbal' ? 'border-[#6B8C6E]' : 'border-[#C07766]';
  const labelColor = type === 'verbal' ? 'text-[#6B8C6E]' : 'text-[#C07766]';

  return (
    <div className={`bg-[#FAF6F3] rounded-[16px] p-6 border-t-4 ${borderColor}`}>
      <span className={`text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] uppercase tracking-wider font-bold block mb-3 ${labelColor}`}>
        {label}
      </span>
      <p className="text-xs sm:text-sm md:text-[1.1rem] font-serif mb-4">{sentence}</p>
      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] border-t border-dashed border-[rgba(0,0,0,0.1)] pt-3">
        {analysis}
      </div>
    </div>
  );
}

export function StyleComparison() {
  return (
    <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Das Prinzip</h2>
      <p className="text-text-muted mb-8">
        In der Alltagssprache nutzen wir oft Verben (Verbalstil). In Zeitungen, Berichten und
        der Wissenschaft dominiert das Nomen (Nominalstil).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Arrow in the middle */}
        <div className="text-text-muted hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#EEE] rounded-full items-center justify-center shadow-card z-10">
          →
        </div>

        <StyleBox
          type="verbal"
          label="Verbalstil (B1/B2)"
          sentence={
            <>
              <span className="text-[#6B8C6E] font-semibold px-1 rounded bg-[rgba(107,140,110,0.1)]">
                Weil
              </span>{' '}
              es heute stark{' '}
              <span className="text-[#6B8C6E] font-semibold px-1 rounded bg-[rgba(107,140,110,0.1)]">
                regnet
              </span>
              , fällt das Fest aus.
            </>
          }
          analysis="Konnektor + Subjekt + Verb"
        />

        <StyleBox
          type="nominal"
          label="Nominalstil (C1)"
          sentence={
            <>
              <span className="text-[#C07766] font-semibold px-1 rounded bg-[rgba(192,119,102,0.1)]">
                Aufgrund
              </span>{' '}
              des starken{' '}
              <span className="text-[#C07766] font-semibold px-1 rounded bg-[rgba(192,119,102,0.1)]">
                Regens
              </span>{' '}
              fällt das Fest aus.
            </>
          }
          analysis="Präposition + Nomen (Genitiv)"
        />
      </div>
    </section>
  );
}
