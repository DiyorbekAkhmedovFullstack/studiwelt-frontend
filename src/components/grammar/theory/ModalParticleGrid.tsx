type Particle = {
  word: string;
  function: string;
  attitude: string;
  usage: string;
  example: string;
  translation: string;
  color: string;
};

export function ModalParticleGrid() {
  const particles: Particle[] = [
    {
      word: 'ja',
      function: 'Betonung & Offensichtlichkeit',
      attitude: 'Das wissen wir beide schon!',
      usage: 'Aussagen',
      example: 'Das ist ja interessant!',
      translation: 'That\'s really interesting! (obviously)',
      color: 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]',
    },
    {
      word: 'doch',
      function: 'Widerspruch & Dringlichkeit',
      attitude: 'Aber es stimmt wirklich!',
      usage: 'Aufforderungen & Aussagen',
      example: 'Komm doch mit!',
      translation: 'Do come along! (emphasis/urging)',
      color: 'bg-[#FFF3E0] border-[#E65100] text-[#E65100]',
    },
    {
      word: 'mal',
      function: 'Höflichkeit & Beiläufigkeit',
      attitude: 'Entspann dich, ist nicht so wichtig',
      usage: 'Aufforderungen',
      example: 'Schau mal!',
      translation: 'Just have a look! (casual/polite)',
      color: 'bg-[#E3F2FD] border-[#1565C0] text-[#1565C0]',
    },
    {
      word: 'eben / halt',
      function: 'Resignation & Akzeptanz',
      attitude: 'So ist es nun mal',
      usage: 'Aussagen',
      example: 'Das ist eben so.',
      translation: 'That\'s just the way it is. (shrug)',
      color: 'bg-[#F3E5F5] border-[#6A1B9A] text-[#6A1B9A]',
    },
    {
      word: 'wohl',
      function: 'Vermutung',
      attitude: 'Ich nehme an...',
      usage: 'Aussagen',
      example: 'Er ist wohl krank.',
      translation: 'He\'s probably sick. (assumption)',
      color: 'bg-[#FFF9E5] border-[#D9A441] text-[#D9A441]',
    },
    {
      word: 'eigentlich',
      function: 'Neugier & Höflichkeit',
      attitude: 'Mal ehrlich gesagt...',
      usage: 'Fragen',
      example: 'Was machst du eigentlich?',
      translation: 'What are you actually doing? (curious)',
      color: 'bg-[#FCE4EC] border-[#C2185B] text-[#C2185B]',
    },
    {
      word: 'denn',
      function: 'Interesse & Überraschung',
      attitude: 'Das interessiert mich!',
      usage: 'Fragen',
      example: 'Was ist denn los?',
      translation: 'What\'s going on? (curious/surprised)',
      color: 'bg-[#E3F2FD] border-[#1565C0] text-[#1565C0]',
    },
    {
      word: 'bloß / nur',
      function: 'Warnung & Dringlichkeit',
      attitude: 'Pass auf!',
      usage: 'Aufforderungen & Fragen',
      example: 'Komm bloß nicht zu spät!',
      translation: 'Don\'t you dare be late! (warning)',
      color: 'bg-[#FFEBEE] border-[#C62828] text-[#C62828]',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-5 sm:mb-6 md:mb-8">
        Die wichtigsten Modalpartikeln
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {particles.map((particle, index) => (
          <div
            key={index}
            className={`${particle.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 transition-transform hover:-translate-y-1`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                {particle.word}
              </h3>
              <span className="text-[0.6rem] sm:text-[0.65rem] bg-white px-2 py-1 rounded-full font-bold text-text-muted">
                {particle.usage}
              </span>
            </div>

            {/* Function */}
            <div className="mb-3">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-text-muted uppercase tracking-wide mb-1">
                Funktion
              </div>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-text-main">
                {particle.function}
              </p>
            </div>

            {/* Attitude */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 mb-3">
              <p className="text-[0.65rem] sm:text-xs italic text-text-muted">
                "{particle.attitude}"
              </p>
            </div>

            {/* Example */}
            <div className="mb-2">
              <p className="text-sm sm:text-base md:text-lg font-serif text-text-main mb-1">
                {particle.example}
              </p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted">
                → {particle.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
