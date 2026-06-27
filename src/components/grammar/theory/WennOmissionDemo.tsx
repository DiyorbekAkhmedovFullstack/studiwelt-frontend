import { Icon } from '../../../lib/icons';

type OmissionExample = {
  withWenn: string;
  withoutWenn: string;
  explanation: string;
  register: 'formal' | 'literary';
};

export function WennOmissionDemo() {
  const examples: OmissionExample[] = [
    {
      withWenn: 'Wenn ich Zeit hätte, würde ich kommen.',
      withoutWenn: 'Hätte ich Zeit, würde ich kommen.',
      explanation: 'Verb rückt an Position 1. "Wenn" entfällt komplett.',
      register: 'formal',
    },
    {
      withWenn: 'Wenn Sie Fragen haben, rufen Sie mich an.',
      withoutWenn: 'Haben Sie Fragen, rufen Sie mich an.',
      explanation: 'Auch bei Realis möglich. Wirkt formeller.',
      register: 'formal',
    },
    {
      withWenn: 'Wenn ich gewusst hätte, wäre ich nicht gekommen.',
      withoutWenn: 'Hätte ich gewusst, wäre ich nicht gekommen.',
      explanation: 'Häufig in literarischen Texten und formellen Briefen.',
      register: 'literary',
    },
    {
      withWenn: 'Wenn es möglich wäre, würde ich es tun.',
      withoutWenn: 'Wäre es möglich, würde ich es tun.',
      explanation: 'Klingt eleganter und kompakter.',
      register: 'formal',
    },
  ];

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        "Wenn" weglassen (Inversion)
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 md:mb-8 leading-relaxed">
        In formeller und literarischer Sprache kann <strong>"wenn"</strong> weggelassen werden.
        Das Verb rückt dann an <strong>Position 1</strong>. Diese Struktur wirkt eleganter und ist
        typisch für <strong>C1-Niveau</strong> und akademisches Schreiben.
      </p>

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6"
          >
            {/* Register Badge */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span
                className={`text-[0.6rem] sm:text-[0.65rem] font-bold px-2 sm:px-2.5 py-1 rounded-full ${
                  example.register === 'formal'
                    ? 'bg-[#1565C0] text-white'
                    : 'bg-[#6A1B9A] text-white'
                }`}
              >
                {example.register === 'formal' ? 'FORMELL' : 'LITERARISCH'}
              </span>
            </div>

            {/* With "wenn" */}
            <div className="mb-4">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-text-muted uppercase tracking-wide mb-2">
                Mit "wenn" (Standard)
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-[#E0E0E0]">
                <p className="text-sm sm:text-base md:text-lg font-serif text-text-main">
                  {example.withWenn}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center my-2 sm:my-3">
              <div className="text-2xl sm:text-3xl text-primary">↓</div>
            </div>

            {/* Without "wenn" */}
            <div className="mb-3 sm:mb-4">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-text-muted uppercase tracking-wide mb-2">
                Ohne "wenn" (Inversion)
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-primary">
                <p className="text-sm sm:text-base md:text-lg font-serif text-text-main">
                  <span className="text-primary font-bold underline decoration-2">
                    {example.withoutWenn.split(' ')[0]}
                  </span>{' '}
                  {example.withoutWenn.split(' ').slice(1).join(' ')}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-[rgba(166,123,91,0.1)] border-l-3 border-primary px-3 py-2 sm:py-2.5 rounded-r-lg">
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
                <Icon.Tip className="inline text-primary" size={14} /> {example.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-[#E3F2FD] border-l-4 border-[#1565C0] px-4 sm:px-5 py-4 sm:py-5 rounded-r-lg mt-6 sm:mt-8">
        <div className="flex items-start gap-2 sm:gap-3">
          <Icon.Documents className="text-[#1565C0] shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1 sm:mb-2">
              Wann nutzen?
            </p>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
              <strong>Formelle Briefe:</strong> "Haben Sie weitere Fragen, kontaktieren Sie uns
              gerne."
              <br />
              <strong>Akademische Texte:</strong> "Wäre diese Hypothese korrekt, würde dies
              bedeuten..."
              <br />
              <strong>Literatur:</strong> "Hätte er gewusst, hätte er anders gehandelt."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
