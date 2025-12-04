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
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Die Skala der Gewissheit</h2>

      <div className="flex flex-col gap-3 sm:gap-4 relative">
        {/* Vertical gradient line */}
        <div className="absolute left-5 sm:left-6 top-4 sm:top-5 bottom-4 sm:bottom-5 w-[2px] bg-gradient-to-b from-text-main via-primary to-[#C7BFB5] z-0" />

        {items.map((item, index) => {
          const colors = getColorClasses(item.color);
          return (
            <div
              key={index}
              className="bg-surface rounded-[12px] sm:rounded-[14px] md:rounded-[16px] p-4 sm:p-5 shadow-card grid grid-cols-[50px_90px_1fr] sm:grid-cols-[60px_110px_1fr] md:grid-cols-[70px_130px_1fr] items-center gap-3 sm:gap-4 relative z-10 transition-transform hover:translate-x-2"
            >
              {/* Percent Badge */}
              <div
                className={`font-mono font-bold text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] px-1.5 sm:px-2 py-1 rounded text-center ${colors.badge}`}
              >
                {item.percent}
              </div>

              {/* Verb Label */}
              <div className={`font-serif font-bold text-sm sm:text-base md:text-lg lg:text-xl ${colors.verb}`}>
                {item.verb}
              </div>

              {/* Context & Example */}
              <div className="text-text-muted text-xs sm:text-sm md:text-base border-l border-[#EEE] pl-3 sm:pl-4">
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
