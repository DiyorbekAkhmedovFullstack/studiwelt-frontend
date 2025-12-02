type VerbExample = {
  infinitive: string;
  form: string;
};

type FormCardProps = {
  type: 'standard' | 'vip';
  title: string;
  formula: string;
  description: string;
  examples: VerbExample[];
};

function FormCard({ type, title, formula, description, examples }: FormCardProps) {
  const borderColor = type === 'standard' ? 'border-[#E3D4C5]' : 'border-primary';

  return (
    <div className={`bg-surface rounded-[24px] p-8 shadow-card relative border-t-[6px] ${borderColor}`}>
      <h3 className="text-xs sm:text-sm md:text-[1.2rem] font-serif font-bold mb-4">{title}</h3>

      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] inline-block bg-[#FAF6F3] px-2.5 py-2 rounded-md font-mono mb-4">
        {formula}
      </div>

      <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-4 leading-relaxed">
        {description}
      </p>

      <ul className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] list-none p-0">
        {examples.map((ex, index) => (
          <li key={index} className="text-text-muted mb-2">
            {ex.infinitive} → <strong className="text-text-main">{ex.form}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

type VerbFormsGridProps = {
  standardCard: Omit<FormCardProps, 'type'>;
  vipCard: Omit<FormCardProps, 'type'>;
};

export function VerbFormsGrid({ standardCard, vipCard }: VerbFormsGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-16">
      <FormCard type="standard" {...standardCard} />
      <FormCard type="vip" {...vipCard} />
    </div>
  );
}
