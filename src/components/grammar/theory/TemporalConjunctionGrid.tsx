type TimeRelation = 'simultaneous' | 'sequential-before' | 'sequential-after' | 'duration';

type TemporalConjunction = {
  word: string;
  relation: TimeRelation;
  tenseRule: string;
  meaning: string;
  example: string;
};

export function TemporalConjunctionGrid() {
  const conjunctions: TemporalConjunction[] = [
    {
      word: 'während',
      relation: 'simultaneous',
      tenseRule: 'Gleiche Zeit',
      meaning: 'Gleichzeitigkeit (while)',
      example: 'Während ich lese, höre ich Musik.',
    },
    {
      word: 'bevor',
      relation: 'sequential-before',
      tenseRule: 'Gleiche Zeit',
      meaning: 'Vorher (before)',
      example: 'Bevor ich schlafe, lese ich ein Buch.',
    },
    {
      word: 'nachdem',
      relation: 'sequential-after',
      tenseRule: 'Eine Zeit zurück',
      meaning: 'Danach (after)',
      example: 'Nachdem ich gegessen hatte, ging ich spazieren.',
    },
    {
      word: 'sobald',
      relation: 'sequential-after',
      tenseRule: 'Eine Zeit zurück',
      meaning: 'Sofort danach (as soon as)',
      example: 'Sobald ich angekommen bin, rufe ich dich an.',
    },
    {
      word: 'bis',
      relation: 'duration',
      tenseRule: 'Gleiche Zeit',
      meaning: 'Ende-Punkt (until)',
      example: 'Ich warte, bis du kommst.',
    },
    {
      word: 'seit(dem)',
      relation: 'duration',
      tenseRule: 'Gleiche Zeit',
      meaning: 'Start-Punkt (since)',
      example: 'Seit ich hier wohne, lerne ich Deutsch.',
    },
  ];

  const getRelationColor = (relation: TimeRelation) => {
    switch (relation) {
      case 'simultaneous':
        return {
          bg: 'bg-[#E8F5E9]',
          border: 'border-[#2E7D32]',
          text: 'text-[#2E7D32]',
          icon: '⏸',
        };
      case 'sequential-before':
        return {
          bg: 'bg-[#FFF3E0]',
          border: 'border-[#E65100]',
          text: 'text-[#E65100]',
          icon: '←',
        };
      case 'sequential-after':
        return {
          bg: 'bg-[#E3F2FD]',
          border: 'border-[#1565C0]',
          text: 'text-[#1565C0]',
          icon: '→',
        };
      case 'duration':
        return {
          bg: 'bg-[#F3E5F5]',
          border: 'border-[#6A1B9A]',
          text: 'text-[#6A1B9A]',
          icon: '⏳',
        };
    }
  };

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-5 sm:mb-6 md:mb-8">
        Temporale Konjunktionen im Überblick
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {conjunctions.map((conj, index) => {
          const colors = getRelationColor(conj.relation);
          return (
            <div
              key={index}
              className={`${colors.bg} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${colors.border} transition-transform hover:-translate-y-1`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-text-main">
                  {conj.word}
                </div>
                <div className={`text-xl sm:text-2xl ${colors.text}`}>{colors.icon}</div>
              </div>

              {/* Meaning */}
              <p className="text-[0.65rem] sm:text-xs md:text-sm font-semibold text-text-main mb-2">
                {conj.meaning}
              </p>

              {/* Tense Rule */}
              <div className={`inline-block px-2 sm:px-2.5 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-bold ${colors.text} bg-white mb-3`}>
                {conj.tenseRule}
              </div>

              {/* Example */}
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic leading-relaxed">
                "{conj.example}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#2E7D32]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Gleichzeitig</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E65100]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Vorher</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#1565C0]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Danach</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#6A1B9A]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Dauer</span>
        </div>
      </div>
    </section>
  );
}
