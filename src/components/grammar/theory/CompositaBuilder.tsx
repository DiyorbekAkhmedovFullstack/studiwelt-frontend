import { useState } from 'react';
import { Icon } from '../../../lib/icons';

type CompositaType = {
  type: string;
  description: string;
  structure: string;
  examples: {
    part1: string;
    part2: string;
    composita: string;
    meaning: string;
  }[];
  color: string;
};

export function CompositaBuilder() {
  const [selectedType, setSelectedType] = useState<string>('nomen-nomen');

  const types: CompositaType[] = [
    {
      type: 'nomen-nomen',
      description: 'Nomen + Nomen',
      structure: 'Das Grundwort (rechts) bestimmt Genus und Bedeutungskategorie',
      examples: [
        {
          part1: 'Haus',
          part2: 'Tür',
          composita: 'Haustür',
          meaning: 'die Tür vom Haus',
        },
        {
          part1: 'Prüfung',
          part2: 'Angst',
          composita: 'Prüfungsangst',
          meaning: 'die Angst vor Prüfungen',
        },
        {
          part1: 'Studenten',
          part2: 'Leben',
          composita: 'Studentenleben',
          meaning: 'das Leben der Studenten',
        },
        {
          part1: 'Wort',
          part2: 'Schatz',
          composita: 'Wortschatz',
          meaning: 'der Schatz an Wörtern',
        },
      ],
      color: 'bg-[#E3F2FD] border-[#1565C0] text-[#1565C0]',
    },
    {
      type: 'adjektiv-nomen',
      description: 'Adjektiv + Nomen',
      structure: 'Das Adjektiv beschreibt das Nomen (wird nicht dekliniert!)',
      examples: [
        {
          part1: 'hoch',
          part2: 'Schule',
          composita: 'Hochschule',
          meaning: 'höhere Bildungseinrichtung',
        },
        {
          part1: 'klein',
          part2: 'Kind',
          composita: 'Kleinkind',
          meaning: 'sehr kleines Kind',
        },
        {
          part1: 'schwer',
          part2: 'Punkt',
          composita: 'Schwerpunkt',
          meaning: 'wichtigster Punkt',
        },
        {
          part1: 'roh',
          part2: 'Stoff',
          composita: 'Rohstoff',
          meaning: 'nicht verarbeiteter Stoff',
        },
      ],
      color: 'bg-[#FFF3E0] border-[#E65100] text-[#E65100]',
    },
    {
      type: 'verb-nomen',
      description: 'Verb (Stamm) + Nomen',
      structure: 'Der Verbstamm wird mit einem Nomen kombiniert',
      examples: [
        {
          part1: 'wohn(en)',
          part2: 'Zimmer',
          composita: 'Wohnzimmer',
          meaning: 'das Zimmer zum Wohnen',
        },
        {
          part1: 'lehr(en)',
          part2: 'Buch',
          composita: 'Lehrbuch',
          meaning: 'das Buch zum Lehren/Lernen',
        },
        {
          part1: 'schreib(en)',
          part2: 'Tisch',
          composita: 'Schreibtisch',
          meaning: 'der Tisch zum Schreiben',
        },
        {
          part1: 'fahr(en)',
          part2: 'Rad',
          composita: 'Fahrrad',
          meaning: 'das Rad zum Fahren',
        },
      ],
      color: 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]',
    },
    {
      type: 'nomen-adjektiv',
      description: 'Nomen + Adjektiv',
      structure: 'Das Nomen beschreibt das Adjektiv genauer (→ neues Adjektiv!)',
      examples: [
        {
          part1: 'leben',
          part2: 'müde',
          composita: 'lebensmüde',
          meaning: 'müde vom Leben, suizidal',
        },
        {
          part1: 'wasser',
          part2: 'dicht',
          composita: 'wasserdicht',
          meaning: 'dicht gegen Wasser',
        },
        {
          part1: 'Bären',
          part2: 'stark',
          composita: 'bärenstark',
          meaning: 'stark wie ein Bär',
        },
        {
          part1: 'sonnen',
          part2: 'klar',
          composita: 'sonnenklar',
          meaning: 'klar wie die Sonne, offensichtlich',
        },
      ],
      color: 'bg-[#F3E5F5] border-[#6A1B9A] text-[#6A1B9A]',
    },
  ];

  const currentType = types.find((t) => t.type === selectedType)!;

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Komposita: Wortbildung durch Zusammensetzung
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Deutsche Komposita entstehen durch <strong>Zusammensetzung</strong> von zwei oder mehr
        Wörtern. Das <strong>Grundwort</strong> (rechts) bestimmt die Wortart und das Genus.
      </p>

      {/* Type Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {types.map((type) => (
          <button
            key={type.type}
            type="button"
            onClick={() => setSelectedType(type.type)}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedType === type.type
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {type.description}
          </button>
        ))}
      </div>

      {/* Structure Info */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
          Struktur
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-main">
          {currentType.structure}
        </p>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {currentType.examples.map((example, index) => (
          <div
            key={index}
            className={`${currentType.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 transition-transform hover:-translate-y-1`}
          >
            {/* Parts */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white px-3 py-1.5 rounded-lg text-sm sm:text-base font-serif font-semibold text-text-main">
                {example.part1}
              </span>
              <span className="text-lg sm:text-xl font-bold text-text-muted">+</span>
              <span className="bg-white px-3 py-1.5 rounded-lg text-sm sm:text-base font-serif font-semibold text-text-main">
                {example.part2}
              </span>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-3">
              <span className="text-xl sm:text-2xl">↓</span>
            </div>

            {/* Composita */}
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-3">
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-text-main text-center">
                {example.composita}
              </p>
            </div>

            {/* Meaning */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3">
              <p className="text-xs sm:text-sm text-text-muted italic text-center">
                = {example.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fugenelemente Info */}
      <div className="mt-6 sm:mt-8 bg-[rgba(166,123,91,0.1)] border-l-4 border-primary px-4 sm:px-5 py-4 sm:py-5 rounded-r-lg">
        <div className="flex items-start gap-2 sm:gap-3">
          <Icon.Tip className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-2">
              Fugenelemente: -s-, -n-, -en-, -e-, -er-
            </p>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed mb-2">
              Manchmal werden die Wortteile durch <strong>Fugenelemente</strong> verbunden:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white rounded px-3 py-2">
                <span className="font-serif text-xs sm:text-sm">
                  Prüfung<strong className="text-primary">s</strong>angst
                </span>
              </div>
              <div className="bg-white rounded px-3 py-2">
                <span className="font-serif text-xs sm:text-sm">
                  Student<strong className="text-primary">en</strong>leben
                </span>
              </div>
              <div className="bg-white rounded px-3 py-2">
                <span className="font-serif text-xs sm:text-sm">
                  Kind<strong className="text-primary">er</strong>zimmer
                </span>
              </div>
              <div className="bg-white rounded px-3 py-2">
                <span className="font-serif text-xs sm:text-sm">
                  Sprach<strong className="text-primary">e</strong>kurs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
