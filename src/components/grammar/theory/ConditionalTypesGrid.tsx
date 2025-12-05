type ConditionalType = 'real' | 'unreal-present' | 'unreal-past' | 'mixed';

type ConditionalCard = {
  type: ConditionalType;
  title: string;
  reality: string;
  structure: string;
  ifClause: string;
  mainClause: string;
  example: string;
  translation: string;
};

export function ConditionalTypesGrid() {
  const conditionals: ConditionalCard[] = [
    {
      type: 'real',
      title: 'Realis (Typ I)',
      reality: 'Möglich / Wahrscheinlich',
      structure: 'Präsens + Präsens/Futur',
      ifClause: 'wenn + Präsens',
      mainClause: 'Präsens/Futur',
      example: 'Wenn es regnet, bleibe ich zu Hause.',
      translation: 'If it rains, I stay home.',
    },
    {
      type: 'unreal-present',
      title: 'Irrealis Gegenwart (Typ II)',
      reality: 'Unmöglich / Hypothetisch',
      structure: 'Konjunktiv II + Konjunktiv II',
      ifClause: 'wenn + Konjunktiv II',
      mainClause: 'würde/hätte/wäre + Infinitiv',
      example: 'Wenn ich reich wäre, würde ich reisen.',
      translation: 'If I were rich, I would travel.',
    },
    {
      type: 'unreal-past',
      title: 'Irrealis Vergangenheit (Typ III)',
      reality: 'Nicht passiert / Bereuen',
      structure: 'Plusquamperfekt K2 + K2 Perfekt',
      ifClause: 'wenn + wäre/hätte + Partizip II',
      mainClause: 'hätte/wäre + Partizip II',
      example: 'Wenn ich gelernt hätte, hätte ich bestanden.',
      translation: 'If I had studied, I would have passed.',
    },
    {
      type: 'mixed',
      title: 'Gemischte Konditionalsätze',
      reality: 'Vergangenheit → Gegenwart',
      structure: 'Plusquamperfekt K2 + Präsens K2',
      ifClause: 'wenn + hätte/wäre + Partizip II',
      mainClause: 'würde/wäre/hätte + Infinitiv',
      example: 'Wenn ich studiert hätte, wäre ich jetzt Arzt.',
      translation: 'If I had studied, I would be a doctor now.',
    },
  ];

  const getTypeColors = (type: ConditionalType) => {
    switch (type) {
      case 'real':
        return {
          bg: 'bg-[#E8F5E9]',
          border: 'border-[#2E7D32]',
          text: 'text-[#2E7D32]',
          badge: 'bg-[#2E7D32]',
        };
      case 'unreal-present':
        return {
          bg: 'bg-[#FFF3E0]',
          border: 'border-[#E65100]',
          text: 'text-[#E65100]',
          badge: 'bg-[#E65100]',
        };
      case 'unreal-past':
        return {
          bg: 'bg-[#FCE4EC]',
          border: 'border-[#C2185B]',
          text: 'text-[#C2185B]',
          badge: 'bg-[#C2185B]',
        };
      case 'mixed':
        return {
          bg: 'bg-[#E3F2FD]',
          border: 'border-[#1565C0]',
          text: 'text-[#1565C0]',
          badge: 'bg-[#1565C0]',
        };
    }
  };

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-5 sm:mb-6 md:mb-8">
        Die vier Konditionalsatz-Typen
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {conditionals.map((cond, index) => {
          const colors = getTypeColors(cond.type);
          return (
            <div
              key={index}
              className={`${colors.bg} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border-l-4 ${colors.border} transition-transform hover:-translate-y-1`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-serif font-bold ${colors.text} mb-1`}>
                    {cond.title}
                  </h3>
                  <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                    {cond.reality}
                  </p>
                </div>
                <div className={`${colors.badge} text-white text-[0.6rem] sm:text-[0.65rem] font-bold px-2 py-1 rounded-full`}>
                  TYP {index + 1}
                </div>
              </div>

              {/* Structure */}
              <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-text-muted uppercase tracking-wide mb-2">
                  Struktur
                </div>
                <code className="text-[0.65rem] sm:text-xs md:text-sm font-mono text-text-main">
                  {cond.structure}
                </code>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[0.6rem] sm:text-[0.65rem] font-bold ${colors.text}`}>IF:</span>
                    <span className="text-[0.65rem] sm:text-xs text-text-muted">{cond.ifClause}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[0.6rem] sm:text-[0.65rem] font-bold ${colors.text}`}>MAIN:</span>
                    <span className="text-[0.65rem] sm:text-xs text-text-muted">{cond.mainClause}</span>
                  </div>
                </div>
              </div>

              {/* Example */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base md:text-lg font-serif text-text-main">
                  "{cond.example}"
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → {cond.translation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
