type LessonReview = {
  title: string;
  keyPoints: string[];
  examTip: string;
  color: string;
};

export function GrammarReviewGrid() {
  const lessons: LessonReview[] = [
    {
      title: 'Adversative Konnektoren',
      keyPoints: [
        'aber vs. sondern (Korrektur vs. Kontrast)',
        'Position 0 vs. Position 1',
        'Register: allerdings, jedoch, dennoch',
      ],
      examTip: 'Nutze "allerdings/jedoch" statt "aber" für formelle Texte',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
    },
    {
      title: 'Temporale Nebensätze',
      keyPoints: [
        'während (gleichzeitig)',
        'nachdem (Zeitenfolge: eine Zeit zurück)',
        'bevor/ehe (gleiche Zeit)',
      ],
      examTip: 'Achte auf Zeitenfolge bei "nachdem"!',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
    },
    {
      title: 'Konditionalsätze',
      keyPoints: [
        'Realis (wenn + Indikativ)',
        'Irrealis Gegenwart (würde + Infinitiv)',
        'Irrealis Vergangenheit (wäre + Partizip II)',
      ],
      examTip: 'Wenn-Weglassung (Inversion) zeigt C1-Niveau',
      color: 'bg-[#FFF3E0] border-[#E65100]',
    },
    {
      title: 'Kausale Nuancen',
      keyPoints: [
        'weil (neutral, Nachfeld)',
        'da (formal, Vorfeld)',
        'denn (koordinierend, Position 0)',
      ],
      examTip: 'Nutze "da" statt "weil" für akademische Texte',
      color: 'bg-[#F3E5F5] border-[#6A1B9A]',
    },
    {
      title: 'Modalpartikeln',
      keyPoints: [
        'ja (Überraschung)',
        'doch (Widerspruch)',
        'mal (Höflichkeit)',
      ],
      examTip: 'Nur für mündliche Prüfung, NICHT schriftlich!',
      color: 'bg-[#FFF9E5] border-[#D9A441]',
    },
    {
      title: 'Adjektivdeklination & Komposita',
      keyPoints: [
        'Typ I (der/die/das): -e oder -en',
        'Typ II (ein/kein): -er/-es oder -en',
        'Grundwort bestimmt Genus bei Komposita',
      ],
      examTip: 'Artikel bestimmt Adjektivendung!',
      color: 'bg-[#FFE5E5] border-[#C2185B]',
    },
    {
      title: 'Restriktive Ausdrücke',
      keyPoints: [
        'nur (neutral)',
        'lediglich (formal)',
        'bloß (informell)',
      ],
      examTip: 'Lediglich/ausschließlich für Essays',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
    },
    {
      title: 'Perspektiv- & Stellungnahme-Marker',
      keyPoints: [
        'meiner Meinung nach (neutral)',
        'meines Erachtens (formal)',
        'Pro/Contra-Struktur',
      ],
      examTip: 'Meines Erachtens = höhere Punktzahl!',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
    },
    {
      title: 'Satzarchitektur & Kohärenz',
      keyPoints: [
        'Hypotaxe (komplex) für C1',
        'Konnektoren (deshalb, allerdings)',
        'Referenzkette (ein → der → er)',
      ],
      examTip: 'Hypotaxen sind Pflicht für C1-Bewertung!',
      color: 'bg-[#FFF3E0] border-[#E65100]',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Gesamtwiederholung: Alle Grammatikthemen
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Überblick über alle <strong>fortgeschrittenen Grammatikthemen</strong> für{' '}
        <strong>TestDaF/DSH</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className={`${lesson.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 transition-transform hover:-translate-y-1`}
          >
            {/* Lesson Header */}
            <div className="mb-3">
              <h3 className="text-base sm:text-lg font-serif font-bold text-text-main">
                {lesson.title}
              </h3>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
                Key Points
              </div>
              <ul className="space-y-1.5">
                {lesson.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span className="text-[0.65rem] sm:text-xs text-text-main">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exam Tip */}
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="text-sm">💡</span>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  {lesson.examTip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
