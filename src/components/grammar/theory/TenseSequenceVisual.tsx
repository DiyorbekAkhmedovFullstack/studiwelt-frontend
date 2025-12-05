type TenseExample = {
  conjunction: string;
  subordinateClause: {
    text: string;
    tense: string;
  };
  mainClause: {
    text: string;
    tense: string;
  };
  rule: string;
  type: 'same' | 'back-one';
};

export function TenseSequenceVisual() {
  const examples: TenseExample[] = [
    {
      conjunction: 'nachdem',
      subordinateClause: {
        text: 'Nachdem ich gegessen hatte',
        tense: 'Plusquamperfekt',
      },
      mainClause: {
        text: 'ging ich spazieren',
        tense: 'Präteritum',
      },
      rule: 'NS eine Zeit zurück → HS',
      type: 'back-one',
    },
    {
      conjunction: 'nachdem',
      subordinateClause: {
        text: 'Nachdem ich gegessen habe',
        tense: 'Perfekt',
      },
      mainClause: {
        text: 'gehe ich spazieren',
        tense: 'Präsens',
      },
      rule: 'NS eine Zeit zurück → HS',
      type: 'back-one',
    },
    {
      conjunction: 'bevor',
      subordinateClause: {
        text: 'Bevor ich schlafe',
        tense: 'Präsens',
      },
      mainClause: {
        text: 'lese ich ein Buch',
        tense: 'Präsens',
      },
      rule: 'NS gleiche Zeit = HS',
      type: 'same',
    },
    {
      conjunction: 'während',
      subordinateClause: {
        text: 'Während ich arbeitete',
        tense: 'Präteritum',
      },
      mainClause: {
        text: 'hörte ich Musik',
        tense: 'Präteritum',
      },
      rule: 'NS gleiche Zeit = HS',
      type: 'same',
    },
  ];

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Zeitenfolge (Tense Sequence)
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 md:mb-8 leading-relaxed">
        Die <strong>Zeitenfolge</strong> ist entscheidend: Manche Konjunktionen verlangen, dass
        der Nebensatz eine Zeitstufe <em>vor</em> dem Hauptsatz liegt (nachdem, sobald). Andere
        nutzen die <em>gleiche</em> Zeit (während, bevor, bis, seit).
      </p>

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className={`rounded-lg sm:rounded-xl p-4 sm:p-5 ${
              example.type === 'back-one'
                ? 'bg-[#E3F2FD] border-l-4 border-[#1565C0]'
                : 'bg-[#E8F5E9] border-l-4 border-[#2E7D32]'
            }`}
          >
            {/* Rule Tag */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span
                className={`text-[0.6rem] sm:text-[0.65rem] md:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full ${
                  example.type === 'back-one'
                    ? 'bg-[#1565C0] text-white'
                    : 'bg-[#2E7D32] text-white'
                }`}
              >
                {example.rule}
              </span>
            </div>

            {/* Clauses Display */}
            <div className="space-y-3 sm:space-y-4">
              {/* Subordinate Clause */}
              <div>
                <div className="text-[0.65rem] sm:text-xs text-text-muted mb-1 uppercase tracking-wide">
                  Nebensatz
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <div className="text-sm sm:text-base md:text-lg font-serif text-text-main mb-2">
                    {example.subordinateClause.text}
                  </div>
                  <div className="text-[0.65rem] sm:text-xs font-mono text-text-muted">
                    → {example.subordinateClause.tense}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div
                  className={`text-2xl sm:text-3xl ${
                    example.type === 'back-one' ? 'text-[#1565C0]' : 'text-[#2E7D32]'
                  }`}
                >
                  ↓
                </div>
              </div>

              {/* Main Clause */}
              <div>
                <div className="text-[0.65rem] sm:text-xs text-text-muted mb-1 uppercase tracking-wide">
                  Hauptsatz
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <div className="text-sm sm:text-base md:text-lg font-serif text-text-main mb-2">
                    {example.mainClause.text}
                  </div>
                  <div className="text-[0.65rem] sm:text-xs font-mono text-text-muted">
                    → {example.mainClause.tense}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-[#FFF9E5] border-l-4 border-[#D9A441] px-4 sm:px-5 py-4 sm:py-5 rounded-r-lg mt-6 sm:mt-8">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl">⚡</span>
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1 sm:mb-2">
              Die goldene Regel
            </p>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
              <strong>Nachdem</strong> und <strong>sobald</strong>: Der Nebensatz steht eine
              Zeitstufe <em>vor</em> dem Hauptsatz (Plusquamperfekt → Präteritum, Perfekt →
              Präsens).
              <br />
              <strong>Während, bevor, bis, seit</strong>: Beide Sätze nutzen die{' '}
              <em>gleiche Zeit</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
