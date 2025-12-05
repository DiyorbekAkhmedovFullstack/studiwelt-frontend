type PerspectiveMarker = {
  phrase: string;
  register: string;
  usage: string;
  example: string;
  color: string;
  level: string;
};

export function PerspectiveMarkersGrid() {
  const markers: PerspectiveMarker[] = [
    {
      phrase: 'meiner Meinung nach',
      register: 'Neutral, universal',
      usage: 'Alltag, mündlich & schriftlich',
      example: 'Meiner Meinung nach ist das eine gute Idee.',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
      level: 'B1-C2',
    },
    {
      phrase: 'meines Erachtens',
      register: 'Formal, gehoben',
      usage: 'Akademische Texte, offizielle Dokumente',
      example: 'Meines Erachtens sollte man das Problem anders angehen.',
      color: 'bg-[#FFF3E0] border-[#E65100]',
      level: 'C1-C2',
    },
    {
      phrase: 'aus meiner Sicht',
      register: 'Neutral bis formal',
      usage: 'Berichte, Analysen, Diskussionen',
      example: 'Aus meiner Sicht gibt es mehrere Lösungsmöglichkeiten.',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
      level: 'B2-C2',
    },
    {
      phrase: 'meiner Ansicht nach',
      register: 'Formal',
      usage: 'Essays, Stellungnahmen',
      example: 'Meiner Ansicht nach überwiegen die Vorteile.',
      color: 'bg-[#F3E5F5] border-[#6A1B9A]',
      level: 'B2-C2',
    },
    {
      phrase: 'ich bin der Auffassung, dass',
      register: 'Sehr formal',
      usage: 'Wissenschaftliche Arbeiten',
      example: 'Ich bin der Auffassung, dass weitere Forschung nötig ist.',
      color: 'bg-[#FFF9E5] border-[#D9A441]',
      level: 'C1-C2',
    },
    {
      phrase: 'ich vertrete den Standpunkt, dass',
      register: 'Formal, argumentativ',
      usage: 'Diskussionen, Debatten, Argumentationen',
      example: 'Ich vertrete den Standpunkt, dass Bildung kostenlos sein sollte.',
      color: 'bg-[#FFE5E5] border-[#C2185B]',
      level: 'B2-C2',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Perspektivmarker: Meinung ausdrücken
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Perspektivmarker zeigen die <strong>Quelle</strong> einer Meinung oder Einschätzung. Sie
        unterscheiden sich stark in <strong>Formalität</strong> und <strong>Register</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {markers.map((marker, index) => (
          <div
            key={index}
            className={`${marker.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 transition-transform hover:-translate-y-1`}
          >
            {/* Phrase */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base sm:text-lg font-serif font-bold text-text-main">
                  {marker.phrase}
                </span>
                <span className="text-[0.6rem] sm:text-[0.65rem] px-2 py-1 bg-white rounded-full font-bold text-text-muted">
                  {marker.level}
                </span>
              </div>
            </div>

            {/* Register */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 mb-3">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
                Register
              </div>
              <p className="text-xs sm:text-sm text-text-main">{marker.register}</p>
            </div>

            {/* Usage */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 mb-3">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
                Typische Verwendung
              </div>
              <p className="text-xs sm:text-sm text-text-main">{marker.usage}</p>
            </div>

            {/* Example */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3">
              <p className="text-xs sm:text-sm font-serif text-text-main italic">
                "{marker.example}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
