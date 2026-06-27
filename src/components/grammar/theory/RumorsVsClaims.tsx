import type { ReactNode } from 'react';
import { Icon } from '../../../lib/icons';

type CardData = {
  icon: ReactNode;
  subtitle: string;
  verb: string;
  description: string;
  example: string;
};

export function RumorsVsClaims() {
  const cards: CardData[] = [
    {
      icon: <Icon.News size={22} />,
      subtitle: 'Fremdbehauptung (Gerücht)',
      verb: 'sollen',
      description:
        'Man sagt das über jemanden/etwas. Ich gebe nur wieder, was ich gehört habe.',
      example: 'Der neue Film <strong>soll</strong> sehr gut sein.',
    },
    {
      icon: <Icon.LanguageReq size={22} />,
      subtitle: 'Selbstbehauptung (Zweifel)',
      verb: 'wollen',
      description: 'Jemand behauptet das über sich selbst, aber ich bin skeptisch.',
      example: 'Er <strong>will</strong> früher ein Star gewesen sein.',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Fremd- vs. Selbstbehauptung</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#FAF6F3] p-5 sm:p-6 md:p-7 lg:p-8 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] border border-[rgba(0,0,0,0.03)]"
          >
            {/* Icon */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-card">
              {card.icon}
            </div>

            {/* Subtitle */}
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block uppercase tracking-wider font-bold mb-3 sm:mb-4">
              {card.subtitle}
            </span>

            {/* Verb */}
            <div className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-2">
              {card.verb}
            </div>

            {/* Description */}
            <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{card.description}</p>

            {/* Example */}
            <p
              className="text-text-main text-xs sm:text-sm md:text-base italic"
              dangerouslySetInnerHTML={{ __html: `"${card.example}"` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
