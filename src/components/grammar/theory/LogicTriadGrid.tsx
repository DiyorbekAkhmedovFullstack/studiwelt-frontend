type LogicType = 'causal' | 'concessive' | 'final';

type LogicStructure = {
  word: string;
  type: string;
};

type LogicCardProps = {
  logicType: LogicType;
  title: string;
  icon: string;
  questionTag: string;
  structures: LogicStructure[];
};

function LogicCard({ logicType, title, icon, questionTag, structures }: LogicCardProps) {
  const borderColors: Record<LogicType, string> = {
    causal: 'border-[#A67B5B]',
    concessive: 'border-[#C07766]',
    final: 'border-[#6B8C6E]',
  };

  const iconColors: Record<LogicType, string> = {
    causal: 'bg-[rgba(166,123,91,0.15)] text-[#A67B5B]',
    concessive: 'bg-[rgba(192,119,102,0.15)] text-[#C07766]',
    final: 'bg-[rgba(107,140,110,0.15)] text-[#6B8C6E]',
  };

  return (
    <div
      className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${borderColors[logicType]} transition-transform hover:-translate-y-1`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold">{title}</h3>
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg ${iconColors[logicType]}`}
        >
          {icon}
        </div>
      </div>

      {/* Question Tag */}
      <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] italic block mb-3 sm:mb-4">
        {questionTag}
      </span>

      {/* Structure List */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {structures.map((struct, index) => (
          <div
            key={index}
            className="text-xs sm:text-sm md:text-base bg-[#FAF6F3] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg flex justify-between items-center"
          >
            <span className="text-text-main font-bold">{struct.word}</span>
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] font-mono bg-white px-1.5 py-0.5 rounded border border-[rgba(0,0,0,0.05)]">
              {struct.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogicTriadGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16">
      <LogicCard
        logicType="causal"
        title="Kausal (Grund)"
        icon="?"
        questionTag="Warum passiert etwas?"
        structures={[
          { word: 'weil / da', type: 'Nebensatz' },
          { word: 'deshalb', type: 'Hauptsatz' },
          { word: 'wegen', type: 'Präp + Gen' },
        ]}
      />
      <LogicCard
        logicType="concessive"
        title="Konzessiv (Gegengrund)"
        icon="≠"
        questionTag="Trotz welcher Umstände?"
        structures={[
          { word: 'obwohl', type: 'Nebensatz' },
          { word: 'trotzdem', type: 'Hauptsatz' },
          { word: 'trotz', type: 'Präp + Gen' },
        ]}
      />
      <LogicCard
        logicType="final"
        title="Final (Zweck)"
        icon="→"
        questionTag="Wozu / Zu welchem Zweck?"
        structures={[
          { word: 'damit', type: 'Nebensatz' },
          { word: 'um... zu', type: 'Infinitiv' },
          { word: 'für', type: 'Präp + Akk' },
        ]}
      />
    </div>
  );
}
