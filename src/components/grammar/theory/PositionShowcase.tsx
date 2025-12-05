type PositionType = 'pos0' | 'pos1';

type Connector = {
  word: string;
  position: PositionType;
  exampleSentence: string;
  highlightedParts: {
    connector: string;
    verb: string;
    subject: string;
  };
};

export function PositionShowcase() {
  const connectors: Connector[] = [
    {
      word: 'aber',
      position: 'pos0',
      exampleSentence: 'Ich mag Kaffee, aber ich trinke lieber Tee.',
      highlightedParts: {
        connector: 'aber',
        verb: 'trinke',
        subject: 'ich',
      },
    },
    {
      word: 'sondern',
      position: 'pos0',
      exampleSentence: 'Das ist nicht rot, sondern das ist blau.',
      highlightedParts: {
        connector: 'sondern',
        verb: 'ist',
        subject: 'das',
      },
    },
    {
      word: 'hingegen',
      position: 'pos1',
      exampleSentence: 'Er ist fleißig. Sie hingegen ist faul.',
      highlightedParts: {
        connector: 'hingegen',
        verb: 'ist',
        subject: 'Sie',
      },
    },
    {
      word: 'dagegen',
      position: 'pos1',
      exampleSentence: 'Ich bin dafür. Er dagegen ist skeptisch.',
      highlightedParts: {
        connector: 'dagegen',
        verb: 'ist',
        subject: 'Er',
      },
    },
  ];

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Position im Satz
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 md:mb-8 leading-relaxed">
        Der entscheidende Unterschied: <strong>Position 0</strong> (koordinierende Konjunktion)
        vs. <strong>Position 1</strong> (Konjunktionaladverb mit Inversion).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {/* Position 0 Group */}
        <div className="bg-[#F4F9F5] rounded-[12px] sm:rounded-[16px] p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-[#6B8C6E] text-white text-[0.65rem] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full">
              POSITION 0
            </div>
            <span className="text-[0.65rem] sm:text-xs text-text-muted">
              Normale Wortstellung
            </span>
          </div>

          {connectors
            .filter((c) => c.position === 'pos0')
            .map((connector, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 last:mb-0"
              >
                <div className="text-xs sm:text-sm md:text-base font-serif flex flex-wrap gap-1 sm:gap-1.5 items-center mb-2">
                  <span className="text-text-muted">...</span>
                  <span className="bg-[#6B8C6E] text-white px-2 py-0.5 rounded font-bold text-[0.65rem] sm:text-xs">
                    {connector.highlightedParts.connector}
                  </span>
                  <span className="text-text-main font-bold">
                    {connector.highlightedParts.subject}
                  </span>
                  <span className="text-primary underline decoration-2">
                    {connector.highlightedParts.verb}
                  </span>
                  <span className="text-text-muted">...</span>
                </div>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  {connector.exampleSentence}
                </p>
              </div>
            ))}

          <div className="bg-[rgba(107,140,110,0.1)] border-l-3 border-[#6B8C6E] px-3 py-2 sm:py-2.5 rounded-r-lg mt-3 sm:mt-4">
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
              Subjekt <strong>vor</strong> dem Verb (Standardstellung)
            </p>
          </div>
        </div>

        {/* Position 1 Group */}
        <div className="bg-[#FFF9E5] rounded-[12px] sm:rounded-[16px] p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-[#D9A441] text-white text-[0.65rem] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full">
              POSITION 1
            </div>
            <span className="text-[0.65rem] sm:text-xs text-text-muted">
              Inversion (Verb-Subjekt)
            </span>
          </div>

          {connectors
            .filter((c) => c.position === 'pos1')
            .map((connector, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 last:mb-0"
              >
                <div className="text-xs sm:text-sm md:text-base font-serif flex flex-wrap gap-1 sm:gap-1.5 items-center mb-2">
                  <span className="bg-[#D9A441] text-white px-2 py-0.5 rounded font-bold text-[0.65rem] sm:text-xs">
                    {connector.highlightedParts.connector}
                  </span>
                  <span className="text-primary underline decoration-2">
                    {connector.highlightedParts.verb}
                  </span>
                  <span className="text-text-main font-bold">
                    {connector.highlightedParts.subject}
                  </span>
                  <span className="text-text-muted">...</span>
                </div>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  {connector.exampleSentence}
                </p>
              </div>
            ))}

          <div className="bg-[rgba(217,164,65,0.1)] border-l-3 border-[#D9A441] px-3 py-2 sm:py-2.5 rounded-r-lg mt-3 sm:mt-4">
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
              Verb <strong>vor</strong> dem Subjekt (Inversion!)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
