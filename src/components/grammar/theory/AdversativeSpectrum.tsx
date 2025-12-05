type RegisterLevel = 'informal' | 'neutral' | 'formal' | 'academic';

type ConnectorItem = {
  word: string;
  register: RegisterLevel;
  meaning: string;
  example: string;
};

export function AdversativeSpectrum() {
  const connectors: ConnectorItem[] = [
    {
      word: 'aber',
      register: 'informal',
      meaning: 'Einfacher Gegensatz (but)',
      example: 'Ich bin müde, aber ich muss arbeiten.',
    },
    {
      word: 'doch',
      register: 'informal',
      meaning: 'Leichte Überraschung (but, however)',
      example: 'Es sollte regnen, doch die Sonne scheint.',
    },
    {
      word: 'jedoch',
      register: 'neutral',
      meaning: 'Neutraler Gegensatz (however)',
      example: 'Das Projekt ist teuer, jedoch notwendig.',
    },
    {
      word: 'allerdings',
      register: 'neutral',
      meaning: 'Einschränkung (however, though)',
      example: 'Die Wohnung ist schön, allerdings etwas klein.',
    },
    {
      word: 'hingegen',
      register: 'formal',
      meaning: 'Starker Kontrast (in contrast)',
      example: 'Berlin ist laut. München hingegen ist ruhiger.',
    },
    {
      word: 'dagegen',
      register: 'formal',
      meaning: 'Gegenteil/Opposition (on the contrary)',
      example: 'Er ist optimistisch. Sie dagegen ist pessimistisch.',
    },
    {
      word: 'vielmehr',
      register: 'academic',
      meaning: 'Präzisierung/Korrektur (rather)',
      example: 'Es ist nicht gut, vielmehr ist es exzellent.',
    },
    {
      word: 'indes(sen)',
      register: 'academic',
      meaning: 'Gehobener Gegensatz (whereas, meanwhile)',
      example: 'Die Wirtschaft wächst, indes steigt die Armut.',
    },
  ];

  const getRegisterColor = (register: RegisterLevel) => {
    switch (register) {
      case 'informal':
        return {
          bg: 'bg-[#E8F5E9]',
          text: 'text-[#2E7D32]',
          border: 'border-[#2E7D32]',
        };
      case 'neutral':
        return {
          bg: 'bg-[#E3F2FD]',
          text: 'text-[#1565C0]',
          border: 'border-[#1565C0]',
        };
      case 'formal':
        return {
          bg: 'bg-[#FFF3E0]',
          text: 'text-[#E65100]',
          border: 'border-[#E65100]',
        };
      case 'academic':
        return {
          bg: 'bg-[#F3E5F5]',
          text: 'text-[#6A1B9A]',
          border: 'border-[#6A1B9A]',
        };
    }
  };

  const getRegisterLabel = (register: RegisterLevel) => {
    switch (register) {
      case 'informal':
        return 'A2-B1';
      case 'neutral':
        return 'B2';
      case 'formal':
        return 'B2-C1';
      case 'academic':
        return 'C1-C2';
    }
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Register-Spektrum (A2 → C2)
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 md:mb-8 leading-relaxed">
        Wähle den passenden adversativen Konnektor basierend auf dem Kontext: Gespräch,
        E-Mail, akademischer Text oder wissenschaftliche Publikation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {connectors.map((connector, index) => {
          const colors = getRegisterColor(connector.register);
          return (
            <div
              key={index}
              className={`${colors.bg} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-transform hover:-translate-y-0.5 border ${colors.border} border-opacity-20`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <span
                  className={`text-base sm:text-lg md:text-xl font-serif font-bold ${colors.text}`}
                >
                  {connector.word}
                </span>
                <span
                  className={`text-[0.6rem] sm:text-[0.65rem] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${colors.text} ${colors.bg} border ${colors.border}`}
                >
                  {getRegisterLabel(connector.register)}
                </span>
              </div>

              {/* Meaning */}
              <p className="text-[0.65rem] sm:text-xs text-text-main font-semibold mb-2">
                {connector.meaning}
              </p>

              {/* Example */}
              <p className="text-[0.65rem] sm:text-xs text-text-muted italic leading-relaxed">
                "{connector.example}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 sm:mt-6 md:mt-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#2E7D32]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Umgangssprache</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#1565C0]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Neutral</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E65100]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Formell</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#6A1B9A]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Akademisch</span>
        </div>
      </div>
    </section>
  );
}
