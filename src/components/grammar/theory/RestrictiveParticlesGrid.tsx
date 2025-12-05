type RestrictiveParticle = {
  word: string;
  meaning: string;
  register: string;
  example: string;
  translation: string;
  color: string;
  registerLevel: string;
};

export function RestrictiveParticlesGrid() {
  const particles: RestrictiveParticle[] = [
    {
      word: 'nur',
      meaning: 'Einschränkung, Limitation',
      register: 'Neutral, universal',
      example: 'Ich habe nur 10 Euro.',
      translation: 'I only have 10 euros.',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
      registerLevel: 'A1-C2',
    },
    {
      word: 'lediglich',
      meaning: 'Einschränkung (formeller als "nur")',
      register: 'Formal, schriftlich',
      example: 'Die Studie umfasst lediglich 50 Teilnehmer.',
      translation: 'The study includes only 50 participants.',
      color: 'bg-[#FFF3E0] border-[#E65100]',
      registerLevel: 'B2-C2',
    },
    {
      word: 'bloß',
      meaning: 'Einschränkung (umgangssprachlich)',
      register: 'Informell, mündlich',
      example: 'Das dauert bloß fünf Minuten.',
      translation: 'That only takes five minutes.',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
      registerLevel: 'B1-C1',
    },
    {
      word: 'allein',
      meaning: 'Ausschließlich, ohne andere',
      register: 'Gehoben, literarisch',
      example: 'Allein die Tatsache zeigt das Problem.',
      translation: 'The fact alone shows the problem.',
      color: 'bg-[#F3E5F5] border-[#6A1B9A]',
      registerLevel: 'C1-C2',
    },
    {
      word: 'ausschließlich',
      meaning: 'Nur, ohne Ausnahme',
      register: 'Formal, akademisch',
      example: 'Die Bibliothek ist ausschließlich für Studenten.',
      translation: 'The library is exclusively for students.',
      color: 'bg-[#FFF9E5] border-[#D9A441]',
      registerLevel: 'B2-C2',
    },
    {
      word: 'einzig',
      meaning: 'Der/die/das einzige, alleinig',
      register: 'Formal, betont',
      example: 'Das ist die einzige Lösung.',
      translation: 'That is the only solution.',
      color: 'bg-[#FFE5E5] border-[#C2185B]',
      registerLevel: 'B2-C2',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Restriktive Partikeln: Nuancen der Einschränkung
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Restriktive Partikeln <strong>beschränken</strong> oder <strong>begrenzen</strong> die
        Bedeutung. Sie unterscheiden sich in <strong>Register</strong> und{' '}
        <strong>Formalität</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {particles.map((particle, index) => (
          <div
            key={index}
            className={`${particle.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 transition-transform hover:-translate-y-1`}
          >
            {/* Word */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl sm:text-2xl font-serif font-bold text-text-main">
                  {particle.word}
                </span>
                <span className="text-[0.6rem] sm:text-[0.65rem] px-2 py-1 bg-white rounded-full font-bold text-text-muted">
                  {particle.registerLevel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted italic">{particle.meaning}</p>
            </div>

            {/* Register */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 mb-3">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
                Register
              </div>
              <p className="text-xs sm:text-sm text-text-main">{particle.register}</p>
            </div>

            {/* Example */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 mb-2">
              <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                {particle.example}
              </p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                → {particle.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
