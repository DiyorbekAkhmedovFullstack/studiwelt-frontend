type ScaleItem = {
  percent: string;
  verb: string;
  color: 'high' | 'mid' | 'low';
  context: string;
  example: string;
};

export function ProbabilityScale() {
  const items: ScaleItem[] = [
    {
      percent: '~99%',
      verb: 'müssen',
      color: 'high',
      context: 'Logische Schlussfolgerung. Es gibt keine andere Erklärung.',
      example: 'Das Licht brennt, er <strong>muss</strong> zu Hause sein.',
    },
    {
      percent: '~85%',
      verb: 'müssten',
      color: 'mid',
      context: 'Hohe Wahrscheinlichkeit, aber theoretisch könnte etwas dazwischenkommen.',
      example: 'Er ist früh losgefahren, er <strong>müsste</strong> gleich da sein.',
    },
    {
      percent: '~75%',
      verb: 'dürften',
      color: 'mid',
      context: 'Vorsichtige Annahme oder Prognose.',
      example: 'Das <strong>dürfte</strong> das richtige Haus sein.',
    },
    {
      percent: '~50%',
      verb: 'können',
      color: 'low',
      context: 'Ungewissheit. Es ist möglich, aber nicht sicher.',
      example: 'Es <strong>kann</strong> sein, dass er den Zug verpasst hat.',
    },
  ];

  const getColorClasses = (color: 'high' | 'mid' | 'low') => {
    switch (color) {
      case 'high':
        return {
          badge: 'bg-[rgba(62,54,48,0.1)] text-text-main',
          verb: 'text-text-main',
        };
      case 'mid':
        return {
          badge: 'bg-[rgba(166,123,91,0.1)] text-primary',
          verb: 'text-primary',
        };
      case 'low':
        return {
          badge: 'bg-[rgba(199,191,181,0.2)] text-text-muted',
          verb: 'text-text-muted',
        };
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Die Skala der Gewissheit</h2>

      <div className="flex flex-col gap-4 relative">
        {/* Vertical gradient line */}
        <div className="absolute left-6 top-5 bottom-5 w-[2px] bg-gradient-to-b from-text-main via-primary to-[#C7BFB5] z-0" />

        {items.map((item, index) => {
          const colors = getColorClasses(item.color);
          return (
            <div
              key={index}
              className="bg-surface rounded-[16px] p-5 shadow-card grid grid-cols-[60px_120px_1fr] items-center gap-4 relative z-10 transition-transform hover:translate-x-2"
            >
              {/* Percent Badge */}
              <div
                className={`font-mono font-bold text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.5rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.8rem] px-2 py-1 rounded text-center ${colors.badge}`}
              >
                {item.percent}
              </div>

              {/* Verb Label */}
              <div className={`font-serif font-bold text-xs sm:text-sm md:text-[1.2rem] ${colors.verb}`}>
                {item.verb}
              </div>

              {/* Context & Example */}
              <div className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem] border-l border-[#EEE] pl-4">
                {item.context}
                <br />
                <em
                  className="text-text-main"
                  dangerouslySetInnerHTML={{ __html: `"${item.example}"` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
