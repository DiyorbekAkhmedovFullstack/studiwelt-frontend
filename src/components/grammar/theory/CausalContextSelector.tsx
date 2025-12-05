import { useState } from 'react';

type Scenario = {
  id: string;
  context: string;
  situation: string;
  reason: string;
  options: {
    conjunction: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function CausalContextSelector() {
  const [selectedScenario, setSelectedScenario] = useState<string>('scenario1');
  const [selectedConjunction, setSelectedConjunction] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'scenario1',
      context: 'Umgangsgespräch',
      situation: 'Ich komme nicht zur Party',
      reason: 'ich muss arbeiten',
      options: [
        {
          conjunction: 'weil',
          isCorrect: true,
          explanation: 'Perfekt! "Weil" ist neutral und ideal für Gespräche.',
        },
        {
          conjunction: 'da',
          isCorrect: false,
          explanation: 'Zu formell für eine lockere Unterhaltung. "Da" passt zu schriftlichen Texten.',
        },
        {
          conjunction: 'zumal',
          isCorrect: false,
          explanation: 'Viel zu akademisch! "Zumal" nutzt man nur in formellen, schriftlichen Kontexten.',
        },
        {
          conjunction: 'denn',
          isCorrect: false,
          explanation: 'Möglich, aber klingt veraltet. In modernem Deutsch bevorzugt man "weil".',
        },
      ],
    },
    {
      id: 'scenario2',
      context: 'Akademischer Aufsatz',
      situation: 'Die Hypothese ist plausibel',
      reason: 'die empirischen Daten sie stützen',
      options: [
        {
          conjunction: 'da',
          isCorrect: true,
          explanation: 'Ausgezeichnet! "Da" ist perfekt für akademische Texte und formelle Begründungen.',
        },
        {
          conjunction: 'weil',
          isCorrect: false,
          explanation: 'Grammatisch korrekt, aber zu umgangssprachlich für einen akademischen Aufsatz.',
        },
        {
          conjunction: 'nämlich',
          isCorrect: false,
          explanation: 'Zu informell für akademisches Schreiben. "Nämlich" passt zu gesprochener Sprache.',
        },
        {
          conjunction: 'denn',
          isCorrect: true,
          explanation: 'Auch gut! "Denn" ist formell und passt zu akademischen Texten.',
        },
      ],
    },
    {
      id: 'scenario3',
      context: 'Zusätzliche Begründung',
      situation: 'Das Projekt ist sinnvoll',
      reason: 'es kostengünstig ist',
      options: [
        {
          conjunction: 'zumal',
          isCorrect: true,
          explanation: 'Richtig! "Zumal" fügt einen zusätzlichen, verstärkenden Grund hinzu.',
        },
        {
          conjunction: 'weil',
          isCorrect: false,
          explanation: 'Falsch! "Weil" ist für den Hauptgrund, nicht für zusätzliche Gründe.',
        },
        {
          conjunction: 'nämlich',
          isCorrect: false,
          explanation: 'Falsch! "Nämlich" erklärt, verstärkt aber nicht wie "zumal".',
        },
        {
          conjunction: 'da',
          isCorrect: false,
          explanation: 'Zu neutral. "Zumal" betont die Zusätzlichkeit des Grundes stärker.',
        },
      ],
    },
    {
      id: 'scenario4',
      context: 'Nachträgliche Erklärung',
      situation: 'Ich konnte nicht kommen. Ich war ___ krank',
      reason: '',
      options: [
        {
          conjunction: 'nämlich',
          isCorrect: true,
          explanation: 'Perfekt! "Nämlich" steht im Mittelfeld und erklärt nachträglich einen Grund.',
        },
        {
          conjunction: 'weil',
          isCorrect: false,
          explanation: 'Falsch! "Weil" würde einen Nebensatz einleiten: "weil ich krank war".',
        },
        {
          conjunction: 'da',
          isCorrect: false,
          explanation: 'Falsch! "Da" steht am Satzanfang, nicht im Mittelfeld.',
        },
        {
          conjunction: 'denn',
          isCorrect: false,
          explanation: 'Falsch! "Denn" steht auf Position 0 zwischen zwei Hauptsätzen.',
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
        Kontext-Trainer: Kausale Konnektoren
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle den passenden kausalen Konnektor basierend auf Kontext und Register.
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
            {scenario.context}
          </button>
        ))}
      </div>

      {/* Sentence Display */}
      <div className="bg-[#FAF6F3] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <div className="text-sm sm:text-base md:text-lg font-serif text-text-main">
          <p className="mb-3">{currentScenario.situation},</p>
          <div className="flex flex-wrap items-center gap-2">
            {selectedConjunction ? (
              <span className="bg-primary text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm">
                {selectedConjunction}
              </span>
            ) : (
              <span className="bg-white border-2 border-dashed border-[#D9A441] px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-[#D9A441] font-bold text-xs sm:text-sm">
                ?
              </span>
            )}
            <span>{currentScenario.reason}</span>
          </div>
        </div>
      </div>

      {/* Conjunction Options */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
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
            <span className="text-xl sm:text-2xl">{selectedOption.isCorrect ? '✓' : 'ℹ'}</span>
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
