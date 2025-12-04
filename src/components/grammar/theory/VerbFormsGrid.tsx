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
    <div className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card relative border-t-[4px] sm:border-t-[5px] md:border-t-[6px] ${borderColor}`}>
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-3 sm:mb-4">{title}</h3>

      <div className="text-xs sm:text-sm md:text-base inline-block bg-[#FAF6F3] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md font-mono mb-3 sm:mb-4">
        {formula}
      </div>

      <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed text-text-muted">
        {description}
      </p>

      <ul className="text-xs sm:text-sm md:text-base list-none p-0">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16">
      <FormCard type="standard" {...standardCard} />
      <FormCard type="vip" {...vipCard} />
    </div>
  );
}
