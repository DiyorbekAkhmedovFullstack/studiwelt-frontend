import { useState } from 'react';

type Scenario = {
  id: string;
  context: string;
  sentence1: string;
  sentence2: string;
  options: {
    connector: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function ContrastSelector() {
  const [selectedScenario, setSelectedScenario] = useState<string>('scenario1');
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'scenario1',
      context: 'Informeller Chat',
      sentence1: 'Ich wollte ins Kino gehen',
      sentence2: 'ich hatte kein Geld',
      options: [
        {
          connector: 'aber',
          isCorrect: true,
          explanation: 'Perfekt! "Aber" ist ideal für informelle Gespräche.',
        },
        {
          connector: 'hingegen',
          isCorrect: false,
          explanation: 'Zu formell für einen Chat. "Hingegen" passt zu akademischen Texten.',
        },
        {
          connector: 'indes',
          isCorrect: false,
          explanation: 'Viel zu gehoben! "Indes" nutzt man nur in literarischen Texten.',
        },
        {
          connector: 'jedoch',
          isCorrect: false,
          explanation: 'Möglich, aber zu neutral/formell für einen lockeren Chat.',
        },
      ],
    },
    {
      id: 'scenario2',
      context: 'Akademischer Essay',
      sentence1: 'Die Studie zeigt positive Ergebnisse',
      sentence2: 'die Methodik weist Schwächen auf',
      options: [
        {
          connector: 'aber',
          isCorrect: false,
          explanation: 'Zu umgangssprachlich für einen akademischen Text.',
        },
        {
          connector: 'hingegen',
          isCorrect: true,
          explanation:
            'Ausgezeichnet! "Hingegen" ist perfekt für formelle, akademische Kontraste.',
        },
        {
          connector: 'jedoch',
          isCorrect: true,
          explanation: 'Auch gut! "Jedoch" ist neutral-formell und passt zu B2-C1 Texten.',
        },
        {
          connector: 'allerdings',
          isCorrect: true,
          explanation: 'Sehr gut! "Allerdings" drückt eine Einschränkung aus (B2-C1).',
        },
      ],
    },
    {
      id: 'scenario3',
      context: 'Korrektur nach Verneinung',
      sentence1: 'Das ist nicht grün',
      sentence2: 'das ist blau',
      options: [
        {
          connector: 'aber',
          isCorrect: false,
          explanation: 'Falsch! Nach "nicht" + Korrektur muss "sondern" stehen.',
        },
        {
          connector: 'sondern',
          isCorrect: true,
          explanation:
            'Richtig! "Sondern" ersetzt die verneinte Aussage. Regel: nicht X, sondern Y.',
        },
        {
          connector: 'hingegen',
          isCorrect: false,
          explanation: 'Grammatisch falsch. "Hingegen" steht nicht nach Verneinungen.',
        },
        {
          connector: 'jedoch',
          isCorrect: false,
          explanation: 'Falsch! Bei Korrekturen nach "nicht" ist nur "sondern" erlaubt.',
        },
      ],
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenario)!;
  const selectedOption = currentScenario.options.find((o) => o.connector === selectedConnector);

  const handleConnectorClick = (connector: string) => {
    setSelectedConnector(connector);
    setShowFeedback(true);
  };

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setSelectedConnector(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Kontext-Trainer
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle den passenden adversativen Konnektor für verschiedene Kontexte.
      </p>

      {/* Scenario Selector */}
      <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => handleScenarioChange(scenario.id)}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full text-[0.6rem] sm:text-xs md:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
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
        <div className="text-sm sm:text-base md:text-lg font-serif text-text-main space-y-2 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span>{currentScenario.sentence1},</span>
            {selectedConnector ? (
              <span className="bg-primary text-white px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                {selectedConnector}
              </span>
            ) : (
              <span className="bg-white border-2 border-dashed border-[#D9A441] px-4 sm:px-6 py-1 rounded-full text-[#D9A441] font-bold text-xs sm:text-sm">
                ?
              </span>
            )}
            <span>{currentScenario.sentence2}.</span>
          </div>
        </div>
      </div>

      {/* Connector Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {currentScenario.options.map((option) => (
          <button
            key={option.connector}
            type="button"
            onClick={() => handleConnectorClick(option.connector)}
            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-serif font-bold text-sm sm:text-base md:text-lg transition-all ${
              selectedConnector === option.connector
                ? option.isCorrect
                  ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32]'
                  : 'bg-[#FFEBEE] border-2 border-[#C62828] text-[#C62828]'
                : 'bg-white border-2 border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
            }`}
          >
            {option.connector}
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
