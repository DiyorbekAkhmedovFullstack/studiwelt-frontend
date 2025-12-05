import { useState } from 'react';

type StructureType = 'parataxe' | 'hypotaxe';

type StructureContent = {
  type: StructureType;
  title: string;
  definition: string;
  characteristics: string[];
  examples: {
    text: string;
    analysis: string;
  }[];
  usage: string;
  color: string;
};

export function SentenceStructureComparison() {
  const [selectedType, setSelectedType] = useState<StructureType>('parataxe');

  const structures: StructureContent[] = [
    {
      type: 'parataxe',
      title: 'Parataxe (Satzreihe)',
      definition: 'Aneinanderreihung von gleichrangigen Hauptsätzen',
      characteristics: [
        'Mehrere Hauptsätze nebeneinander',
        'Verbindung durch nebenordnende Konjunktionen (und, oder, aber, denn)',
        'Jeder Satz kann alleine stehen',
        'Klare, einfache Struktur',
      ],
      examples: [
        {
          text: 'Die Sonne scheint. Die Vögel singen. Die Kinder spielen.',
          analysis: '3 eigenständige Hauptsätze ohne Konjunktion (Asyndeton)',
        },
        {
          text: 'Die Sonne scheint und die Vögel singen.',
          analysis: '2 Hauptsätze verbunden durch "und" (nebenordnende Konjunktion)',
        },
        {
          text: 'Ich wollte lernen, aber ich war zu müde.',
          analysis: '2 Hauptsätze verbunden durch "aber" (adversativ)',
        },
      ],
      usage: 'Einfache, direkte Kommunikation; journalistische Texte; gesprochene Sprache',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
    },
    {
      type: 'hypotaxe',
      title: 'Hypotaxe (Satzgefüge)',
      definition: 'Hierarchische Struktur aus Hauptsatz und untergeordneten Nebensätzen',
      characteristics: [
        'Hauptsatz + mindestens ein Nebensatz',
        'Verbindung durch unterordnende Konjunktionen (dass, weil, obwohl, wenn)',
        'Nebensätze sind abhängig vom Hauptsatz',
        'Komplexe, verschachtelte Struktur',
      ],
      examples: [
        {
          text: 'Ich bleibe zu Hause, weil ich krank bin.',
          analysis: 'Hauptsatz + Nebensatz (kausal mit "weil")',
        },
        {
          text: 'Die Studie, die letztes Jahr veröffentlicht wurde, zeigt interessante Ergebnisse.',
          analysis: 'Hauptsatz mit eingeschobenem Relativsatz',
        },
        {
          text: 'Obwohl er lange geübt hatte, bevor er zur Prüfung ging, konnte er die schwierige Aufgabe nicht lösen.',
          analysis:
            'Mehrfach verschachtelt: Konzessivsatz + Temporalsatz im Nebensatz + Hauptsatz',
        },
      ],
      usage: 'Akademische Texte; Fachliteratur; komplexe Argumentation; literarische Texte',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
    },
  ];

  const currentStructure = structures.find((s) => s.type === selectedType)!;

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Satzarchitektur: Parataxe vs. Hypotaxe
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Die <strong>Satzstruktur</strong> beeinflusst <strong>Komplexität</strong> und{' '}
        <strong>Lesbarkeit</strong>. Für C1: Beherrsche beide Formen und wähle je nach{' '}
        <strong>Textsorte</strong>.
      </p>

      {/* Type Selector */}
      <div className="grid grid-cols-2 gap-3 mb-5 sm:mb-6">
        {structures.map((structure) => (
          <button
            key={structure.type}
            type="button"
            onClick={() => setSelectedType(structure.type)}
            className={`px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all ${
              selectedType === structure.type
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {structure.title}
          </button>
        ))}
      </div>

      {/* Structure Content */}
      <div className={`${currentStructure.color} rounded-lg sm:rounded-xl p-5 sm:p-6 border-l-4`}>
        {/* Definition */}
        <div className="mb-5">
          <h3 className="text-base sm:text-lg font-serif font-bold text-text-main mb-2">
            Definition
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-text-muted">
            {currentStructure.definition}
          </p>
        </div>

        {/* Characteristics */}
        <div className="bg-white rounded-lg p-4 sm:p-5 mb-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-3 font-bold">
            Merkmale
          </div>
          <ul className="space-y-2">
            {currentStructure.characteristics.map((char, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span className="text-xs sm:text-sm text-text-main">{char}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-lg p-4 sm:p-5 mb-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-3 font-bold">
            Beispiele
          </div>
          <div className="space-y-4">
            {currentStructure.examples.map((example, index) => (
              <div key={index} className="border-l-4 border-[#E0E0E0] pl-3 sm:pl-4">
                <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
                  {example.text}
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → {example.analysis}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="bg-white rounded-lg p-4 sm:p-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
            Typische Verwendung
          </div>
          <p className="text-xs sm:text-sm text-text-main">{currentStructure.usage}</p>
        </div>
      </div>
    </section>
  );
}
