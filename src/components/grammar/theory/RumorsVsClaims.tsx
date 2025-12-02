type CardData = {
  icon: string;
  subtitle: string;
  verb: string;
  description: string;
  example: string;
};

export function RumorsVsClaims() {
  const cards: CardData[] = [
    {
      icon: '📰',
      subtitle: 'Fremdbehauptung (Gerücht)',
      verb: 'sollen',
      description:
        'Man sagt das über jemanden/etwas. Ich gebe nur wieder, was ich gehört habe.',
      example: 'Der neue Film <strong>soll</strong> sehr gut sein.',
    },
    {
      icon: '🗣️',
      subtitle: 'Selbstbehauptung (Zweifel)',
      verb: 'wollen',
      description: 'Jemand behauptet das über sich selbst, aber ich bin skeptisch.',
      example: 'Er <strong>will</strong> früher ein Star gewesen sein.',
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Fremd- vs. Selbstbehauptung</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#FAF6F3] p-8 rounded-[24px] border border-[rgba(0,0,0,0.03)]"
          >
            {/* Icon */}
            <div className="text-xs sm:text-sm md:text-[1.2rem] w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-card">
              {card.icon}
            </div>

            {/* Subtitle */}
            <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider font-bold mb-4">
              {card.subtitle}
            </span>

            {/* Verb */}
            <div className="text-sm sm:text-xs md:text-[1.2rem] font-serif font-bold mb-2">
              {card.verb}
            </div>

            {/* Description */}
            <p className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem] mb-4">{card.description}</p>

            {/* Example */}
            <p
              className="text-text-main italic"
              dangerouslySetInnerHTML={{ __html: `"${card.example}"` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
