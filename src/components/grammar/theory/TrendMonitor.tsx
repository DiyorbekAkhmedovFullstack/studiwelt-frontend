type TrendType = 'up' | 'down' | 'flat';

type VocabItem = {
  verb: string;
  noun: string;
};

type TrendCard = {
  type: TrendType;
  title: string;
  icon: string;
  vocab: VocabItem[];
};

export function TrendMonitor() {
  const trends: TrendCard[] = [
    {
      type: 'up',
      title: 'Steigend ↗',
      icon: '📈',
      vocab: [
        { verb: 'ansteigen / wachsen', noun: 'der Anstieg / das Wachstum' },
        { verb: 'sich erhöhen / zunehmen', noun: 'die Erhöhung / die Zunahme' },
        { verb: 'sich verdoppeln', noun: 'die Verdopplung' },
      ],
    },
    {
      type: 'down',
      title: 'Fallend ↘',
      icon: '📉',
      vocab: [
        { verb: 'sinken / fallen', noun: 'das Sinken / der Fall' },
        { verb: 'abnehmen / schrumpfen', noun: 'die Abnahme / die Schrumpfung' },
        { verb: 'sich halbieren', noun: 'die Halbierung' },
      ],
    },
    {
      type: 'flat',
      title: 'Konstant →',
      icon: '⏸',
      vocab: [
        { verb: 'gleich bleiben', noun: 'die Konstanz' },
        { verb: 'stagnieren', noun: 'die Stagnation' },
        { verb: 'sich einpendeln bei', noun: 'das Einpendeln' },
      ],
    },
  ];

  const getTypeClasses = (type: TrendType) => {
    switch (type) {
      case 'up':
        return {
          border: 'border-t-[#6B8C6E]',
          iconBg: 'bg-[rgba(107,140,110,0.15)] text-[#6B8C6E]',
        };
      case 'down':
        return {
          border: 'border-t-[#C07766]',
          iconBg: 'bg-[rgba(192,119,102,0.15)] text-[#C07766]',
        };
      case 'flat':
        return {
          border: 'border-t-[#D9A441]',
          iconBg: 'bg-[rgba(217,164,65,0.15)] text-[#D9A441]',
        };
    }
  };

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {trends.map((trend, index) => {
          const classes = getTypeClasses(trend.type);
          return (
            <div
              key={index}
              className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${classes.border} transition-transform hover:-translate-y-1`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-5">
                <div className="text-sm sm:text-base md:text-lg lg:text-[1.1rem] font-serif font-bold">{trend.title}</div>
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl ${classes.iconBg}`}
                >
                  {trend.icon}
                </div>
              </div>

              {/* Vocab List */}
              <ul className="space-y-2.5 sm:space-y-3">
                {trend.vocab.map((item, idx) => (
                  <li
                    key={idx}
                    className="pb-2.5 sm:pb-3 border-b border-dashed border-[rgba(0,0,0,0.05)] last:border-b-0"
                  >
                    <span className="text-text-main text-xs sm:text-sm md:text-base block font-semibold mb-0.5">{item.verb}</span>
                    <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block font-mono">
                      {item.noun}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
