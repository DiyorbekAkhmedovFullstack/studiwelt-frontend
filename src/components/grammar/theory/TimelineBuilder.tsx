import { useState } from 'react';
import { Icon, Ui } from '../../../lib/icons';

type TimelineScenario = {
  id: string;
  title: string;
  event1: string;
  event2: string;
  correctConjunction: string;
  correctTenses: {
    clause1: string;
    clause2: string;
  };
  options: {
    conjunction: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function TimelineBuilder() {
  const [selectedScenario, setSelectedScenario] = useState<string>('scenario1');
  const [selectedConjunction, setSelectedConjunction] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios: TimelineScenario[] = [
    {
      id: 'scenario1',
      title: 'Vergangenheit: Handlung 1 → dann Handlung 2',
      event1: 'Ich habe meine Hausaufgaben gemacht',
      event2: 'Ich bin ins Kino gegangen',
      correctConjunction: 'nachdem',
      correctTenses: {
        clause1: 'Plusquamperfekt/Perfekt',
        clause2: 'Präteritum/Präsens',
      },
      options: [
        {
          conjunction: 'nachdem',
          isCorrect: true,
          explanation:
            'Perfekt! "Nachdem" zeigt, dass Handlung 1 vor Handlung 2 passiert ist. NS eine Zeit zurück.',
        },
        {
          conjunction: 'bevor',
          isCorrect: false,
          explanation:
            'Falsch! "Bevor" würde bedeuten: Ich bin ins Kino gegangen, BEVOR ich Hausaufgaben gemacht habe (umgekehrte Reihenfolge).',
        },
        {
          conjunction: 'während',
          isCorrect: false,
          explanation:
            'Falsch! "Während" bedeutet gleichzeitig. Aber man kann nicht gleichzeitig Hausaufgaben machen UND im Kino sein.',
        },
        {
          conjunction: 'bis',
          isCorrect: false,
          explanation: 'Falsch! "Bis" markiert ein Ende, nicht eine Abfolge von Ereignissen.',
        },
      ],
    },
    {
      id: 'scenario2',
      title: 'Gegenwart: Zwei Dinge passieren gleichzeitig',
      event1: 'Ich höre Musik',
      event2: 'Ich arbeite',
      correctConjunction: 'während',
      correctTenses: {
        clause1: 'Präsens',
        clause2: 'Präsens',
      },
      options: [
        {
          conjunction: 'während',
          isCorrect: true,
          explanation: 'Richtig! "Während" drückt Gleichzeitigkeit aus. Beide Handlungen laufen parallel.',
        },
        {
          conjunction: 'nachdem',
          isCorrect: false,
          explanation: 'Falsch! "Nachdem" würde bedeuten: erst Musik hören, dann arbeiten (nacheinander, nicht gleichzeitig).',
        },
        {
          conjunction: 'bevor',
          isCorrect: false,
          explanation: 'Falsch! "Bevor" würde eine Reihenfolge ausdrücken, nicht Gleichzeitigkeit.',
        },
        {
          conjunction: 'sobald',
          isCorrect: false,
          explanation: 'Falsch! "Sobald" bedeutet: sofort nachdem etwas passiert ist.',
        },
      ],
    },
    {
      id: 'scenario3',
      title: 'Handlung 2 passiert BEVOR Handlung 1',
      event1: 'Ich gehe ins Bett',
      event2: 'Ich putze meine Zähne',
      correctConjunction: 'bevor',
      correctTenses: {
        clause1: 'Präsens',
        clause2: 'Präsens',
      },
      options: [
        {
          conjunction: 'bevor',
          isCorrect: true,
          explanation: 'Richtig! "Bevor ich ins Bett gehe, putze ich meine Zähne." Die Hauptsatz-Handlung passiert zuerst.',
        },
        {
          conjunction: 'nachdem',
          isCorrect: false,
          explanation: 'Falsch! "Nachdem" würde die Reihenfolge umkehren: erst ins Bett, dann Zähneputzen.',
        },
        {
          conjunction: 'während',
          isCorrect: false,
          explanation: 'Unlogisch! Man kann nicht gleichzeitig im Bett liegen und Zähne putzen.',
        },
        {
          conjunction: 'seit',
          isCorrect: false,
          explanation: 'Falsch! "Seit" markiert einen Startpunkt, nicht eine Reihenfolge.',
        },
      ],
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenario)!;
  const selectedOption = currentScenario.options.find((o) => o.conjunction === selectedConjunction);

  const handleConjunctionClick = (conjunction: string) => {
    setSelectedConjunction(conjunction);
    setShowFeedback(true);
  };

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setSelectedConjunction(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Zeitstrahl-Trainer
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle die passende temporale Konjunktion basierend auf der zeitlichen Beziehung zwischen zwei Ereignissen.
      </p>

      {/* Scenario Selector */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => handleScenarioChange(scenario.id)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[0.65rem] sm:text-xs md:text-sm font-semibold transition-all flex-shrink-0 ${
              selectedScenario === scenario.id
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      {/* Events Display */}
      <div className="bg-[#FAF6F3] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4">
          {/* Event 1 */}
          <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 border-2 border-[#6B8C6E] w-full">
            <div className="text-[0.6rem] sm:text-[0.65rem] text-[#6B8C6E] font-bold mb-1 uppercase">
              Ereignis 1
            </div>
            <div className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              {currentScenario.event1}
            </div>
          </div>

          {/* Conjunction */}
          <div className="flex items-center justify-center">
            {selectedConjunction ? (
              <span className="bg-primary text-white px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap">
                {selectedConjunction}
              </span>
            ) : (
              <span className="bg-white border-2 border-dashed border-[#D9A441] px-4 sm:px-6 py-2 rounded-full text-[#D9A441] font-bold text-xs sm:text-sm">
                ?
              </span>
            )}
          </div>

          {/* Event 2 */}
          <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 border-2 border-[#1565C0] w-full">
            <div className="text-[0.6rem] sm:text-[0.65rem] text-[#1565C0] font-bold mb-1 uppercase">
              Ereignis 2
            </div>
            <div className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              {currentScenario.event2}
            </div>
          </div>
        </div>
      </div>

      {/* Conjunction Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {currentScenario.options.map((option) => (
          <button
            key={option.conjunction}
            type="button"
            onClick={() => handleConjunctionClick(option.conjunction)}
            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-serif font-bold text-sm sm:text-base md:text-lg transition-all ${
              selectedConjunction === option.conjunction
                ? option.isCorrect
                  ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32]'
                  : 'bg-[#FFEBEE] border-2 border-[#C62828] text-[#C62828]'
                : 'bg-white border-2 border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
            }`}
          >
            {option.conjunction}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && selectedOption && (
        <div
          className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${
            selectedOption.isCorrect
              ? 'bg-[#E8F5E9] border-[#2E7D32]'
              : 'bg-[#FFF3E0] border-[#E65100]'
          }`}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            {selectedOption.isCorrect ? <Ui.Check className="text-success" size={22} /> : <Icon.Info className="text-primary" size={22} />}
            <div>
              <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold mb-1">
                {selectedOption.isCorrect ? 'Richtig!' : 'Hinweis'}
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                {selectedOption.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
