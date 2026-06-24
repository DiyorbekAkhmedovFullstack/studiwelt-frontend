type NegationItem = {
  phrase: string;
  meaning: string;
  probability: string;
  example: string;
};

export function NegationScale() {
  const items: NegationItem[] = [
    {
      phrase: 'kann nicht + Inf.Perf.',
      meaning: 'Negative Deduktion: unmöglich (~99% sicher, dass NEIN)',
      probability: '~1%',
      example: 'Er <strong>kann</strong> den Bus nicht <strong>verpasst haben</strong> – der fährt erst in 10 Minuten.',
    },
    {
      phrase: 'muss nicht + Inf.',
      meaning: 'Objektiv: keine Pflicht (subjektiv selten/unklar)',
      probability: 'Pflicht-Frage',
      example: 'Er <strong>muss</strong> nicht kommen. (= Es ist nicht zwingend.)',
    },
    {
      phrase: 'nicht können (objektiv)',
      meaning: 'Unfähigkeit / Unmöglichkeit (fähigkeitsbedingt)',
      probability: '0% (Fähigkeit)',
      example: 'Ich <strong>kann</strong> das nicht <strong>glauben</strong>. (= Unfähigkeit)',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">
        Negation bei subjektiven Modalverben
      </h2>

      <div className="bg-[#FFF8F5] border border-[rgba(166,123,91,0.15)] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 mb-4 sm:mb-5 md:mb-6">
        <p className="text-text-muted text-xs sm:text-sm md:text-base leading-relaxed">
          <strong className="text-text-main">Achtung:</strong> Die Negation verändert die Bedeutung drastisch.
          „Nicht können" im subjektiven Gebrauch bedeutet <em>unmöglich</em> (starkste negative Schlussfolgerung).
          „Nicht müssen" kehrt dagegen meist ins <em>objektive</em> Bedeutungsfeld zurück („nicht zwingend").
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-surface rounded-[12px] sm:rounded-[14px] md:rounded-[16px] p-4 sm:p-5 shadow-card grid grid-cols-1 sm:grid-cols-[200px_1fr] md:grid-cols-[220px_1fr] items-start gap-3 sm:gap-4"
          >
            <div>
              <span className="font-mono font-bold text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-primary block mb-1">
                {item.probability}
              </span>
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-text-main">
                {item.phrase}
              </span>
            </div>
            <div className="text-text-muted text-xs sm:text-sm md:text-base">
              {item.meaning}
              <br />
              <em
                className="text-text-main mt-1 block"
                dangerouslySetInnerHTML={{ __html: `"${item.example}"` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
