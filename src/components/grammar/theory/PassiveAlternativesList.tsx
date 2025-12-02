import type { ReactNode } from 'react';

type PassiveAlternative = {
  title: string;
  description: ReactNode;
  example: string;
};

type PassiveAlternativesListProps = {
  title?: string;
  subtitle?: string;
  alternatives: PassiveAlternative[];
};

/**
 * List component for displaying passive voice alternatives (Passiversatzformen)
 */
export function PassiveAlternativesList({
  title = 'Passiversatzformen (B2/C1)',
  subtitle = 'Oft stilistisch besser als das normale Passiv.',
  alternatives,
}: PassiveAlternativesListProps) {
  return (
    <div>
      {title && <h3 className="text-xs sm:text-sm md:text-[1.3rem] font-serif mb-3">{title}</h3>}
      {subtitle && (
        <p className="text-base mb-5 leading-relaxed">{subtitle}</p>
      )}

      <ul className="list-none p-0">
        {alternatives.map((alt, index) => (
          <li
            key={index}
            className={`mb-4 pb-4 ${
              index < alternatives.length - 1 ? 'border-b border-dashed border-[#EEE]' : ''
            }`}
          >
            <strong className="text-base block mb-2">{alt.title}</strong>
            <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-2 leading-relaxed">
              {alt.description}
            </div>
            <em className="text-base block font-serif">
              {alt.example}
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}
