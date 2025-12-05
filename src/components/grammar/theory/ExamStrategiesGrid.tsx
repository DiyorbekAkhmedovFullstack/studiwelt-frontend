import { useState } from 'react';

type ExamSection = 'reading' | 'listening' | 'writing' | 'speaking';

type Strategy = {
  section: ExamSection;
  sectionTitle: string;
  color: string;
  strategies: {
    phase: string;
    tips: string[];
  }[];
  grammarFocus: string[];
};

export function ExamStrategiesGrid() {
  const [selectedSection, setSelectedSection] = useState<ExamSection>('reading');

  const strategies: Strategy[] = [
    {
      section: 'reading',
      sectionTitle: 'Leseverstehen',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
      strategies: [
        {
          phase: 'Vor dem Lesen',
          tips: [
            'Fragen zuerst lesen → wissen, wonach du suchst',
            'Schlüsselwörter in Fragen markieren',
            'Zeit einteilen: 60 Minuten für 3 Texte = 20 Min/Text',
          ],
        },
        {
          phase: 'Beim Lesen',
          tips: [
            'Nicht jedes Wort verstehen müssen! Kontext nutzen',
            'Konnektoren beachten (deshalb, jedoch, dennoch)',
            'Referenzen verfolgen (er/sie/es → Bezugswort finden)',
          ],
        },
        {
          phase: 'Nach dem Lesen',
          tips: [
            'Antworten mit Text abgleichen (keine Vermutungen!)',
            'Paraphrasierungen erkennen (Synonym im Text ≠ gleiche Wörter)',
            'Alle Fragen beantworten (keine Punkte abgezogen für falsche Antwort)',
          ],
        },
      ],
      grammarFocus: [
        'Konnektoren',
        'Referenzmittel',
        'Nominalisierungen',
        'Passivkonstruktionen',
      ],
    },
    {
      section: 'listening',
      sectionTitle: 'Hörverstehen',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
      strategies: [
        {
          phase: 'Vor dem Hören',
          tips: [
            'Aufgaben durchlesen (du hörst Text 1x oder 2x)',
            'Schlüsselwörter notieren',
            'Thema antizipieren (Universität, Forschung, Alltag)',
          ],
        },
        {
          phase: 'Beim Hören',
          tips: [
            'Notizen in Stichworten (nicht ganze Sätze!)',
            'Auf Signalwörter achten (erstens, jedoch, schließlich)',
            'Zahlen, Namen, Orte sofort notieren',
          ],
        },
        {
          phase: 'Nach dem Hören',
          tips: [
            'Antworten aus Notizen formulieren',
            'Grammatik überprüfen (Artikel, Endungen)',
            'Rechtschreibung kontrollieren (Fehler = Punktabzug)',
          ],
        },
      ],
      grammarFocus: [
        'Temporale Ausdrücke',
        'Kausale Relationen',
        'Modalpartikeln verstehen',
        'Indirekte Rede',
      ],
    },
    {
      section: 'writing',
      sectionTitle: 'Schriftlicher Ausdruck',
      color: 'bg-[#FFF3E0] border-[#E65100]',
      strategies: [
        {
          phase: 'Planung (10 Min)',
          tips: [
            'Aufgabe genau lesen: Was wird verlangt?',
            'Mindmap erstellen: Pro/Contra sammeln',
            'Struktur festlegen: Einleitung → Hauptteil → Schluss',
          ],
        },
        {
          phase: 'Schreiben (50 Min)',
          tips: [
            'Hypotaxen nutzen! (weil, obwohl, wenn)',
            'Konnektoren variieren (deshalb, allerdings, zudem)',
            'Referenzkette aufbauen (ein Student → der Student → er)',
          ],
        },
        {
          phase: 'Überprüfung (10 Min)',
          tips: [
            'Adjektivendungen kontrollieren (L26)',
            'Verbposition prüfen (Hauptsatz vs. Nebensatz)',
            'Rechtschreibung & Zeichensetzung',
          ],
        },
      ],
      grammarFocus: [
        'Hypotaxen',
        'Stellungnahme-Marker',
        'Adjektivdeklination',
        'Konnektoren',
      ],
    },
    {
      section: 'speaking',
      sectionTitle: 'Mündlicher Ausdruck',
      color: 'bg-[#F3E5F5] border-[#6A1B9A]',
      strategies: [
        {
          phase: 'Vorbereitung',
          tips: [
            'Redemittel auswendig lernen (meiner Meinung nach...)',
            'Struktur üben: These → Begründung → Beispiel',
            'Zeitmanagement: Vorbereitungszeit VOLL nutzen',
          ],
        },
        {
          phase: 'Präsentation',
          tips: [
            'Langsam & deutlich sprechen (Akzent ist ok!)',
            'Pausen machen (Zeit zum Nachdenken = normal)',
            'Komplexe Sätze zeigen (nicht nur Hauptsätze)',
          ],
        },
        {
          phase: 'Fehlerkorrektur',
          tips: [
            'Kleine Fehler ignorieren → weitersprechen!',
            'Selbstkorrektur nur bei großen Fehlern',
            'Nicht abbrechen, neu formulieren statt steckenbleiben',
          ],
        },
      ],
      grammarFocus: [
        'Perspektiv-Marker',
        'Konditionalsätze',
        'Modalpartikeln - NUR mündlich!',
        'Temporale Nebensätze',
      ],
    },
  ];

  const currentStrategy = strategies.find((s) => s.section === selectedSection)!;

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Prüfungsstrategien: TestDaF/DSH
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Konkrete <strong>Strategien</strong> für jeden Prüfungsteil. Grammatik allein reicht
        nicht – du musst auch <strong>effektiv arbeiten</strong>!
      </p>

      {/* Section Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {strategies.map((strategy) => (
          <button
            key={strategy.section}
            type="button"
            onClick={() => setSelectedSection(strategy.section)}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedSection === strategy.section
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {strategy.sectionTitle}
          </button>
        ))}
      </div>

      {/* Strategy Content */}
      <div className={`${currentStrategy.color} rounded-lg sm:rounded-xl p-5 sm:p-6 border-l-4`}>
        {/* Strategies */}
        <div className="space-y-5 mb-5">
          {currentStrategy.strategies.map((strat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-bold text-primary mb-3">
                {strat.phase}
              </h3>
              <ul className="space-y-2">
                {strat.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span className="text-xs sm:text-sm text-text-main">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Grammar Focus */}
        <div className="bg-white rounded-lg p-4 sm:p-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-3 font-bold">
            Wichtige Grammatik für diesen Teil
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentStrategy.grammarFocus.map((focus, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#FAF6F3] rounded px-3 py-2"
              >
                <span className="text-primary font-bold flex-shrink-0">✓</span>
                <span className="text-xs sm:text-sm text-text-main">{focus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
