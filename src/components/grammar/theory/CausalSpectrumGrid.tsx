type CausalConjunction = {
  word: string;
  type: 'subordinating' | 'coordinating' | 'adverbial';
  register: 'informal' | 'neutral' | 'formal' | 'academic';
  position: string;
  wordOrder: string;
  meaning: string;
  example: string;
};

export function CausalSpectrumGrid() {
  const conjunctions: CausalConjunction[] = [
    {
      word: 'weil',
      type: 'subordinating',
      register: 'neutral',
      position: 'Position 0',
      wordOrder: 'Verb am Ende',
      meaning: 'Grund/Ursache (because)',
      example: 'Ich bleibe zu Hause, weil ich krank bin.',
    },
    {
      word: 'da',
      type: 'subordinating',
      register: 'formal',
      position: 'Meist Position 1',
      wordOrder: 'Verb am Ende',
      meaning: 'Bekannter Grund (since/as)',
      example: 'Da es regnet, bleibe ich zu Hause.',
    },
    {
      word: 'denn',
      type: 'coordinating',
      register: 'formal',
      position: 'Position 0',
      wordOrder: 'Verb Position 2',
      meaning: 'Begründung (for/because)',
      example: 'Ich bleibe zu Hause, denn ich bin krank.',
    },
    {
      word: 'nämlich',
      type: 'adverbial',
      register: 'informal',
      position: 'Mittelfeld',
      wordOrder: 'Verb Position 2',
      meaning: 'Erklärung (namely/you see)',
      example: 'Ich bleibe zu Hause. Ich bin nämlich krank.',
    },
    {
      word: 'zumal',
      type: 'subordinating',
      register: 'academic',
      position: 'Position 0',
      wordOrder: 'Verb am Ende',
      meaning: 'Zusätzlicher Grund (especially since)',
      example: 'Ich bleibe zu Hause, zumal ich Fieber habe.',
    },
    {
      word: 'insofern',
      type: 'adverbial',
      register: 'academic',
      position: 'Position 1',
      wordOrder: 'Verb Position 2',
      meaning: 'Bedingter Grund (insofar as)',
      example: 'Es ist richtig, insofern die Daten stimmen.',
    },
  ];

  const getRegisterColor = (register: CausalConjunction['register']) => {
    switch (register) {
      case 'informal':
        return {
          bg: 'bg-[#E8F5E9]',
          border: 'border-[#2E7D32]',
          text: 'text-[#2E7D32]',
          badge: 'bg-[#2E7D32]',
        };
      case 'neutral':
        return {
          bg: 'bg-[#E3F2FD]',
          border: 'border-[#1565C0]',
          text: 'text-[#1565C0]',
          badge: 'bg-[#1565C0]',
        };
      case 'formal':
        return {
          bg: 'bg-[#FFF3E0]',
          border: 'border-[#E65100]',
          text: 'text-[#E65100]',
          badge: 'bg-[#E65100]',
        };
      case 'academic':
        return {
          bg: 'bg-[#F3E5F5]',
          border: 'border-[#6A1B9A]',
          text: 'text-[#6A1B9A]',
          badge: 'bg-[#6A1B9A]',
        };
    }
  };

  const getTypeLabel = (type: CausalConjunction['type']) => {
    switch (type) {
      case 'subordinating':
        return 'NS';
      case 'coordinating':
        return 'HS';
      case 'adverbial':
        return 'ADV';
    }
  };

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-5 sm:mb-6 md:mb-8">
        Kausale Konnektoren: Von A2 bis C1
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {conjunctions.map((conj, index) => {
          const colors = getRegisterColor(conj.register);
          return (
            <div
              key={index}
              className={`${colors.bg} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${colors.border} transition-transform hover:-translate-y-1`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold ${colors.text}`}>
                  {conj.word}
                </h3>
                <div className="flex flex-col items-end gap-1">
                  <span className={`${colors.badge} text-white text-[0.6rem] sm:text-[0.65rem] font-bold px-2 py-1 rounded-full`}>
                    {conj.register.toUpperCase()}
                  </span>
                  <span className="text-[0.6rem] sm:text-[0.65rem] bg-white px-2 py-1 rounded-full font-bold text-text-muted">
                    {getTypeLabel(conj.type)}
                  </span>
                </div>
              </div>

              {/* Meaning */}
              <p className="text-[0.65rem] sm:text-xs md:text-sm font-semibold text-text-main mb-3">
                {conj.meaning}
              </p>

              {/* Grammar Info */}
              <div className="bg-white rounded-lg p-3 mb-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[0.6rem] sm:text-[0.65rem] text-text-muted">Position:</span>
                    <span className="text-[0.65rem] sm:text-xs font-bold text-text-main">{conj.position}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[0.6rem] sm:text-[0.65rem] text-text-muted">Wortstellung:</span>
                    <span className="text-[0.65rem] sm:text-xs font-bold text-text-main">{conj.wordOrder}</span>
                  </div>
                </div>
              </div>

              {/* Example */}
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic leading-relaxed">
                "{conj.example}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#2E7D32]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Umgangssprachlich</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#1565C0]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E65100]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Formell</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#6A1B9A]" />
          <span className="text-[0.65rem] sm:text-xs text-text-muted">Akademisch</span>
        </div>
      </div>
    </section>
  );
}
