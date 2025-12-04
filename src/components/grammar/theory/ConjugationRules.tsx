type VerbRow = {
  pronoun: string;
  form: string;
  ending: string;
  highlighted?: boolean;
};

type RuleCardProps = {
  title: string;
  description: string;
  rows: VerbRow[];
};

function RuleCard({ title, description, rows }: RuleCardProps) {
  return (
    <div className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card">
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-3 sm:mb-4 border-b-2 border-[#E3D4C5] pb-2">
        {title}
      </h3>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{description}</p>

      <div className="flex flex-col">
        {rows.map((row, index) => (
          <div
            key={index}
            className={`flex justify-between py-2 border-b border-dashed border-[rgba(0,0,0,0.05)] last:border-b-0 font-mono text-xs sm:text-sm md:text-base ${
              row.highlighted ? 'bg-[rgba(166,123,91,0.1)]' : ''
            }`}
          >
            <span className={`text-text-muted ${row.highlighted ? 'font-bold' : ''}`}>
              {row.pronoun}
            </span>
            <span className={row.highlighted ? 'font-bold' : ''}>
              {row.form}
              <span className="text-primary font-bold">{row.ending}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConjugationRules() {
  const standardRows: VerbRow[] = [
    { pronoun: 'ich', form: 'geh', ending: 'e' },
    { pronoun: 'du', form: 'geh', ending: 'est' },
    { pronoun: 'er/sie/es', form: 'geh', ending: 'e', highlighted: true },
    { pronoun: 'wir', form: 'geh', ending: 'en' },
  ];

  const seinRows: VerbRow[] = [
    { pronoun: 'ich', form: '', ending: 'sei' },
    { pronoun: 'du', form: '', ending: 'seiest' },
    { pronoun: 'er/sie/es', form: '', ending: 'sei', highlighted: true },
    { pronoun: 'wir', form: '', ending: 'seien' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
      <RuleCard
        title="Die Regel (Verbstamm)"
        description="Man nimmt den Verbstamm (Infinitiv minus -n/-en) und hängt die Konjunktiv-Endungen an."
        rows={standardRows}
      />
      <RuleCard
        title='Ausnahme: Sein'
        description='Das Verb "sein" ist die einzige echte Ausnahme. Es ist im Konjunktiv I sehr stark und wird oft verwendet.'
        rows={seinRows}
      />
    </div>
  );
}
