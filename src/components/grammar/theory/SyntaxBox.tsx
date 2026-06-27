import { Icon } from '../../../lib/icons';

type SyntaxRule = {
  title: string;
  formula: string;
  explanation: string;
  example: string;
  trap: string;
};

export function SyntaxBox() {
  const rules: SyntaxRule[] = [
    {
      title: 'Vergangenheit (Infinitiv Perfekt)',
      formula: 'Modalverb (Präsens) + Infinitiv Perfekt',
      explanation:
        'Bei subjektiven Modalverben bildet man die Vergangenheit NICHT mit Präteritum, sondern mit Infinitiv Perfekt (Partizip II + haben/sein) am Satzende.',
      example: 'Er <strong>muss</strong> den Bus <strong>verpasst haben</strong>.',
      trap: 'Falsch: „Er musste den Bus verpassen." (Das ist objektive Vergangenheit = Er war gezwungen.)',
    },
    {
      title: 'Perfekt mit Modalverb (Ersatzinfinitiv)',
      formula: 'haben/sein + Infinitiv Perfekt + Modalverb-Infinitiv',
      explanation:
        'Wenn ein Modalverb im Perfekt steht, erscheint der Infinitiv des Modalverbs statt des Partizips (Ersatzinfinitiv).',
      example: 'Er hat den Bus <strong>verpassen müssen</strong>.',
      trap: 'Falsch: „Er hat den Bus verpasst gemusst." (Doppeltes Partizip ist ungrammatisch.)',
    },
    {
      title: 'Futur I als Vermutung',
      formula: 'werden + Infinitiv',
      explanation:
        'Futur I wird im subjektiven Gebrauch für Vermutungen in der Gegenwart genutzt (~80–90%). Der Zeitstempel ist JETZT, nicht später.',
      example: 'Das <strong>wird</strong> der Postbote <strong>sein</strong>.',
      trap: 'Falsch: „Das ist in der Zukunft." (Futur I = Zeitform, aber hier = Vermutungsmodus.)',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">
        Satzbau & Zeitformen
      </h2>

      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-7 lg:p-8 border border-[rgba(0,0,0,0.02)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-text-main">
                {rule.title}
              </span>
              <span className="font-mono text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-primary bg-[rgba(166,123,91,0.1)] px-2 py-1 rounded">
                {rule.formula}
              </span>
            </div>
            <p className="text-text-muted text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
              {rule.explanation}
            </p>
            <p className="text-text-main text-xs sm:text-sm md:text-base italic mb-2 sm:mb-3">
              „{rule.example}"
            </p>
            <p className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] text-red-600 bg-red-50 rounded-[8px] p-2 sm:p-3">
              <strong><Icon.Warning className="inline text-red-600" size={14} /> Lernfalle:</strong> {rule.trap}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
