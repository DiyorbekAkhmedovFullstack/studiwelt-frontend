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
    <div className={`bg-[#FAF6F3] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] p-4 sm:p-5 md:p-6 border-t-[3px] sm:border-t-4 ${borderColor}`}>
      <span className={`text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] uppercase tracking-wider font-bold block mb-2 sm:mb-3 ${labelColor}`}>
        {label}
      </span>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-serif mb-3 sm:mb-4">{sentence}</p>
      <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] border-t border-dashed border-[rgba(0,0,0,0.1)] pt-2 sm:pt-3">
        {analysis}
      </div>
    </div>
  );
}

export function StyleComparison() {
  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Das Prinzip</h2>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8">
        In der Alltagssprache nutzen wir oft Verben (Verbalstil). In Zeitungen, Berichten und
        der Wissenschaft dominiert das Nomen (Nominalstil).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 relative">
        {/* Arrow in the middle */}
        <div className="text-text-muted hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white border border-[#EEE] rounded-full items-center justify-center shadow-card z-10 text-base sm:text-lg">
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
