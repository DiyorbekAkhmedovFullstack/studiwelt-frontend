type TrainCarType = 'te' | 'ka' | 'mo' | 'lo';

type TrainCarProps = {
  type: TrainCarType;
  label: string;
  question: string;
  category: string;
  example: string;
  isLast?: boolean;
};

function TrainCar({ type, label, question, category, example, isLast }: TrainCarProps) {
  const borderColors: Record<TrainCarType, string> = {
    te: 'border-[#6B8C6E]',
    ka: 'border-[#C07766]',
    mo: 'border-[#D9A441]',
    lo: 'border-[#A67B5B]',
  };

  const labelColors: Record<TrainCarType, string> = {
    te: 'text-[#6B8C6E]',
    ka: 'text-[#C07766]',
    mo: 'text-[#D9A441]',
    lo: 'text-[#A67B5B]',
  };

  const exampleColors: Record<TrainCarType, string> = {
    te: 'text-[#6B8C6E]',
    ka: 'text-[#C07766]',
    mo: 'text-[#D9A441]',
    lo: 'text-[#A67B5B]',
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`bg-surface rounded-[12px] sm:rounded-[14px] md:rounded-[16px] shadow-card p-3 sm:p-4 md:p-5 flex-1 flex flex-col border-b-[3px] sm:border-b-4 ${borderColors[type]}`}
      >
        <div className={`text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] font-bold uppercase tracking-wider mb-1 sm:mb-2 ${labelColors[type]}`}>
          {label}
        </div>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold mb-1">
          {question}
        </div>
        <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] mb-2 sm:mb-3">{category}</div>
        <div className={`mt-2 sm:mt-3 font-semibold text-xs sm:text-sm md:text-base ${exampleColors[type]}`}>{example}</div>
      </div>

      {/* Connector between cars */}
      {!isLast && (
        <div className="w-2 sm:w-3 md:w-4 h-0.5 sm:h-1 bg-[#D1D1D1] flex-shrink-0" />
      )}
    </div>
  );
}

export function TeKaMoLoTrain() {
  return (
    <div className="mb-8 sm:mb-12 md:mb-16 overflow-x-auto pb-4 sm:pb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-0 items-center min-w-[600px] sm:min-w-[650px] md:min-w-[700px]">
        <TrainCar
          type="te"
          label="1. Te"
          question="Wann?"
          category="Temporal"
          example="heute"
        />
        <TrainCar
          type="ka"
          label="2. Ka"
          question="Warum?"
          category="Kausal"
          example="wegen des Regens"
        />
        <TrainCar
          type="mo"
          label="3. Mo"
          question="Wie?"
          category="Modal"
          example="mit dem Bus"
        />
        <TrainCar
          type="lo"
          label="4. Lo"
          question="Wo/Wohin?"
          category="Lokal"
          example="nach Hause"
          isLast
        />
      </div>
    </div>
  );
}
