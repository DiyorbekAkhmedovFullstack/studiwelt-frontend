import { useState } from 'react';

type ParticleType = 'restrictive' | 'additive' | 'scalar';

type Comparison = {
  type: ParticleType;
  title: string;
  description: string;
  particles: string[];
  examples: {
    sentence: string;
    explanation: string;
  }[];
  color: string;
};

export function FocusParticlesComparison() {
  const [selectedType, setSelectedType] = useState<ParticleType>('restrictive');

  const comparisons: Comparison[] = [
    {
      type: 'restrictive',
      title: 'Restriktive Partikeln',
      description: 'Schließen Alternativen aus → "nur dies, nichts anderes"',
      particles: ['nur', 'lediglich', 'bloß', 'allein', 'ausschließlich', 'einzig'],
      examples: [
        {
          sentence: 'Nur Maria kam zur Party.',
          explanation: 'Alternativen ausgeschlossen: Nicht Peter, nicht Anna, nur Maria.',
        },
        {
          sentence: 'Die Prüfung dauert lediglich 60 Minuten.',
          explanation: 'Einschränkung: Nicht länger, nur 60 Minuten (kürzer als erwartet).',
        },
        {
          sentence: 'Die Bibliothek ist ausschließlich für Studenten.',
          explanation: 'Keine Ausnahmen: Nur Studenten, keine anderen Personen.',
        },
      ],
      color: 'bg-[#E3F2FD] border-[#1565C0] text-[#1565C0]',
    },
    {
      type: 'additive',
      title: 'Additive Partikeln',
      description: 'Fügen Alternativen hinzu → "auch dies, zusätzlich"',
      particles: ['auch', 'ebenfalls', 'gleichfalls', 'ebenso'],
      examples: [
        {
          sentence: 'Auch Maria kam zur Party.',
          explanation: 'Addition: Maria + andere Personen (z.B. Peter, Anna) kamen.',
        },
        {
          sentence: 'Die Hausaufgaben sind ebenfalls wichtig.',
          explanation: 'Zusätzlich zu anderen wichtigen Dingen (z.B. Unterricht, Prüfung).',
        },
        {
          sentence: 'Dieses Problem betrifft ebenso die Wirtschaft.',
          explanation: 'Nicht nur Politik, sondern auch Wirtschaft ist betroffen.',
        },
      ],
      color: 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]',
    },
    {
      type: 'scalar',
      title: 'Skalare Partikeln',
      description: 'Zeigen eine Skala → "überraschend, extrem, minimal"',
      particles: ['sogar', 'selbst', 'nicht einmal', 'schon', 'erst'],
      examples: [
        {
          sentence: 'Sogar der Professor wusste die Antwort nicht.',
          explanation:
            'Überraschung: Wenn sogar der Professor es nicht weiß, weiß es niemand (höchster Punkt auf der Skala).',
        },
        {
          sentence: 'Selbst Kinder verstehen das.',
          explanation: 'Betonung: Wenn sogar Kinder es verstehen, ist es sehr einfach.',
        },
        {
          sentence: 'Er hat nicht einmal "Danke" gesagt.',
          explanation:
            'Minimum nicht erreicht: Das Mindeste (Danke sagen) wurde nicht getan.',
        },
      ],
      color: 'bg-[#FFF3E0] border-[#E65100] text-[#E65100]',
    },
  ];

  const currentComparison = comparisons.find((c) => c.type === selectedType)!;

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Fokuspartikeln: Drei Typen im Vergleich
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Fokuspartikeln lenken die Aufmerksamkeit auf bestimmte Satzelemente. Es gibt drei
        Haupttypen mit unterschiedlichen Funktionen.
      </p>

      {/* Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {comparisons.map((comparison) => (
          <button
            key={comparison.type}
            type="button"
            onClick={() => setSelectedType(comparison.type)}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedType === comparison.type
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {comparison.title}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
          Funktion
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-main mb-3">
          {currentComparison.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {currentComparison.particles.map((particle, index) => (
            <span
              key={index}
              className={`${currentComparison.color} px-3 py-1.5 rounded-full text-xs sm:text-sm font-serif font-bold border-2`}
            >
              {particle}
            </span>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-4 sm:space-y-5">
        {currentComparison.examples.map((example, index) => (
          <div
            key={index}
            className={`${currentComparison.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4`}
          >
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-3">
              <p className="text-base sm:text-lg font-serif text-text-main">
                {example.sentence}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg sm:text-xl mt-1">→</span>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {example.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
