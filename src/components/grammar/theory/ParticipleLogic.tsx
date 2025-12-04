import type { ReactNode } from 'react';

type ParticipleType = 'p1' | 'p2';

type LogicCardProps = {
  type: ParticipleType;
  title: string;
  badge: string;
  description: string;
  example: ReactNode;
};

function LogicCard({ type, title, badge, description, example }: LogicCardProps) {
  const borderColor = type === 'p1' ? 'border-[#6B8C6E]' : 'border-[#C07766]';
  const badgeColor =
    type === 'p1'
      ? 'bg-[rgba(107,140,110,0.1)] text-[#6B8C6E]'
      : 'bg-[rgba(192,119,102,0.1)] text-[#C07766]';

  return (
    <div className={`bg-surface p-5 sm:p-6 md:p-7 lg:p-8 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${borderColor}`}>
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-2">{title}</h3>
      <span
        className={`inline-block text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] px-2 py-1 rounded font-semibold uppercase mb-3 sm:mb-4 ${badgeColor}`}
      >
        {badge}
      </span>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{description}</p>
      <div className="text-xs sm:text-sm md:text-base bg-[#FAF6F3] p-3 sm:p-4 rounded-lg leading-relaxed">
        {example}
      </div>
    </div>
  );
}

export function ParticipleLogic() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
      <LogicCard
        type="p1"
        title="Partizip I (Active)"
        badge="Gleichzeitig / Aktiv"
        description="Ersetzt Relativsätze im Aktiv. Die Handlung passiert gerade oder ist ein dauerhafter Zustand."
        example={
          <>
            Der Student, der <strong>lernt</strong>...<br />↓<br />
            Der <strong className="text-[#6B8C6E]">lernende</strong> Student
          </>
        }
      />

      <LogicCard
        type="p2"
        title="Partizip II (Passive)"
        badge="Vergangenheit / Passiv"
        description="Ersetzt Relativsätze im Passiv oder Perfekt. Die Handlung ist abgeschlossen oder wurde gemacht."
        example={
          <>
            Das Buch, das <strong>gelesen wurde</strong>...<br />↓<br />
            Das <strong className="text-[#C07766]">gelesene</strong> Buch
          </>
        }
      />
    </div>
  );
}
