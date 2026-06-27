import { useState } from 'react';
import { Icon, Ui } from '../../../lib/icons';

type Scenario = {
  id: string;
  situation: string;
  reality: 'real' | 'unreal-present' | 'unreal-past';
  condition: string;
  consequence: string;
  options: {
    answer: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function ConditionalBuilder() {
  const [selectedScenario, setSelectedScenario] = useState<string>('scenario1');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'scenario1',
      situation: 'Realistische Bedingung (Gegenwart/Zukunft)',
      reality: 'real',
      condition: 'Wenn das Wetter gut ___',
      consequence: 'gehen wir spazieren.',
      options: [
        {
          answer: 'ist',
          isCorrect: true,
          explanation: 'Richtig! Realis nutzt Präsens + Präsens. Die Bedingung ist möglich.',
        },
        {
          answer: 'wäre',
          isCorrect: false,
          explanation: 'Falsch! "Wäre" (Konjunktiv II) ist für hypothetische, unmögliche Bedingungen.',
        },
        {
          answer: 'war',
          isCorrect: false,
          explanation: 'Falsch! Präteritum passt nicht zu Konditionalsätzen über Gegenwart/Zukunft.',
        },
        {
          answer: 'gewesen wäre',
          isCorrect: false,
          explanation: 'Falsch! Das ist Irrealis Vergangenheit – für Dinge, die nicht passiert sind.',
        },
      ],
    },
    {
      id: 'scenario2',
      situation: 'Hypothetische Bedingung (Gegenwart)',
      reality: 'unreal-present',
      condition: 'Wenn ich eine Million Euro ___',
      consequence: 'würde ich eine Weltreise machen.',
      options: [
        {
          answer: 'hätte',
          isCorrect: true,
          explanation: 'Perfekt! Irrealis Gegenwart: hätte (Konjunktiv II) + würde + Infinitiv.',
        },
        {
          answer: 'habe',
          isCorrect: false,
          explanation: 'Falsch! "Habe" (Präsens) ist für realistische Bedingungen. Aber du hast NICHT eine Million.',
        },
        {
          answer: 'gehabt hätte',
          isCorrect: false,
          explanation: 'Falsch! Das ist Irrealis Vergangenheit. Hier geht es um die Gegenwart.',
        },
        {
          answer: 'hatte',
          isCorrect: false,
          explanation: 'Falsch! Präteritum passt nicht. Nutze Konjunktiv II für hypothetische Bedingungen.',
        },
      ],
    },
    {
      id: 'scenario3',
      situation: 'Nicht erfüllte Bedingung (Vergangenheit)',
      reality: 'unreal-past',
      condition: 'Wenn ich früher gelernt ___',
      consequence: 'hätte ich die Prüfung bestanden.',
      options: [
        {
          answer: 'hätte',
          isCorrect: true,
          explanation: 'Richtig! Irrealis Vergangenheit: hätte/wäre + Partizip II in beiden Sätzen.',
        },
        {
          answer: 'habe',
          isCorrect: false,
          explanation: 'Falsch! Präsens passt nicht zur Vergangenheit. Nutze "hätte gelernt".',
        },
        {
          answer: 'würde',
          isCorrect: false,
          explanation: 'Falsch! "Würde" + Infinitiv ist für Irrealis Gegenwart, nicht Vergangenheit.',
        },
        {
          answer: 'hatte',
          isCorrect: false,
          explanation: 'Falsch! Präteritum ist nicht für Konditionalsätze der Vergangenheit. Nutze Konjunktiv II Plusquamperfekt.',
        },
      ],
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenario)!;
  const selectedOption = currentScenario.options.find((o) => o.answer === selectedAnswer);

  const getRealityColor = (reality: Scenario['reality']) => {
    switch (reality) {
      case 'real':
        return 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]';
      case 'unreal-present':
        return 'bg-[#FFF3E0] border-[#E65100] text-[#E65100]';
      case 'unreal-past':
        return 'bg-[#FCE4EC] border-[#C2185B] text-[#C2185B]';
    }
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Konditionalsatz-Trainer
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle die korrekte Verbform basierend auf der Realität der Bedingung.
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
            {scenario.situation}
          </button>
        ))}
      </div>

      {/* Reality Badge */}
      <div className="flex justify-center mb-5 sm:mb-6">
        <div className={`inline-block px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 ${getRealityColor(currentScenario.reality)} font-bold text-xs sm:text-sm`}>
          {currentScenario.reality === 'real' && 'REALIS (Typ I)'}
          {currentScenario.reality === 'unreal-present' && 'IRREALIS GEGENWART (Typ II)'}
          {currentScenario.reality === 'unreal-past' && 'IRREALIS VERGANGENHEIT (Typ III)'}
        </div>
      </div>

      {/* Sentence Display */}
      <div className="bg-[#FAF6F3] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif text-text-main flex flex-wrap items-center gap-2">
          <span>{currentScenario.condition.split('___')[0]}</span>
          {selectedAnswer ? (
            <span className="bg-primary text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm">
              {selectedAnswer}
            </span>
          ) : (
            <span className="bg-white border-2 border-dashed border-[#D9A441] px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-[#D9A441] font-bold text-xs sm:text-sm">
              ?
            </span>
          )}
          <span>, {currentScenario.consequence}</span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {currentScenario.options.map((option) => (
          <button
            key={option.answer}
            type="button"
            onClick={() => handleAnswerClick(option.answer)}
            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-serif font-bold text-sm sm:text-base md:text-lg transition-all ${
              selectedAnswer === option.answer
                ? option.isCorrect
                  ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32]'
                  : 'bg-[#FFEBEE] border-2 border-[#C62828] text-[#C62828]'
                : 'bg-white border-2 border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
            }`}
          >
            {option.answer}
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
