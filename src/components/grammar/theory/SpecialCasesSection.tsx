import type { ReactNode } from 'react';

type SpecialCase = {
  title: string;
  description: ReactNode;
  example: {
    active?: string;
    passive?: string;
    single?: string;
  };
};

type SpecialCasesSectionProps = {
  title?: string;
  cases: SpecialCase[];
};

/**
 * Section for displaying special grammatical cases with examples
 */
export function SpecialCasesSection({
  title = 'Besonderheiten',
  cases,
}: SpecialCasesSectionProps) {
  return (
    <div>
      {title && <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6 pb-2 border-b-2 border-[#E3D4C5]">{title}</h2>}

      {cases.map((specialCase, index) => (
        <div key={index} className={index < cases.length - 1 ? 'mb-6' : ''}>
          <h3 className="text-xs sm:text-sm md:text-[1.1rem] font-semibold mb-3">
            {index + 1}. {specialCase.title}
          </h3>
          <p className="text-base mb-3 leading-relaxed">{specialCase.description}</p>

          {/* Example Box */}
          <div className="text-base bg-[#FAF6F3] px-3 py-3 rounded-lg font-serif leading-relaxed">
            {specialCase.example.active && (
              <>
                <span className="text-text-muted">Aktiv:</span>{' '}
                <span
                  className="text-text-main"
                  dangerouslySetInnerHTML={{ __html: specialCase.example.active }}
                />
                <br />
              </>
            )}
            {specialCase.example.passive && (
              <>
                <span className="text-text-muted">Passiv:</span>{' '}
                <span
                  className="text-text-main"
                  dangerouslySetInnerHTML={{ __html: specialCase.example.passive }}
                />
              </>
            )}
            {specialCase.example.single && (
              <div
                className="text-text-main"
                dangerouslySetInnerHTML={{ __html: specialCase.example.single }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
