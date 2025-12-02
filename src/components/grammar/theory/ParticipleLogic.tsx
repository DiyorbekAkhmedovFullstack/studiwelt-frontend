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
    <div className={`bg-surface p-8 rounded-[24px] shadow-card border-t-[6px] ${borderColor}`}>
      <h3 className="text-xs sm:text-sm md:text-[1.2rem] font-serif font-bold mb-2">{title}</h3>
      <span
        className={`inline-block text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] px-2 py-1 rounded font-semibold uppercase mb-4 ${badgeColor}`}
      >
        {badge}
      </span>
      <p className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem] mb-4">{description}</p>
      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] bg-[#FAF6F3] p-4 rounded-lg leading-relaxed">
        {example}
      </div>
    </div>
  );
}

export function ParticipleLogic() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
