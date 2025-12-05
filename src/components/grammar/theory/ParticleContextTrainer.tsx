import { useState } from 'react';

type Scenario = {
  id: string;
  context: string;
  situation: string;
  sentence: string;
  attitude: string;
  options: {
    particle: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function ParticleContextTrainer() {
  const [selectedScenario, setSelectedScenario] = useState<string>('scenario1');
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'scenario1',
      context: 'Überraschung',
      situation: 'Du siehst deinen Freund an einem unerwarteten Ort',
      sentence: 'Du bist ___ hier!',
      attitude: 'Überrascht, "das hätte ich nicht gedacht!"',
      options: [
        {
          particle: 'ja',
          isCorrect: true,
          explanation: 'Perfekt! "Ja" drückt Überraschung über etwas Unerwartetes aus.',
        },
        {
          particle: 'mal',
          isCorrect: false,
          explanation: 'Falsch. "Mal" macht Aufforderungen höflicher, nicht Aussagen überrascht.',
        },
        {
          particle: 'wohl',
          isCorrect: false,
          explanation: 'Falsch. "Wohl" drückt Vermutung aus, nicht Überraschung.',
        },
        {
          particle: 'eben',
          isCorrect: false,
          explanation: 'Falsch. "Eben" drückt Resignation aus, nicht Überraschung.',
        },
      ],
    },
    {
      id: 'scenario2',
      context: 'Höfliche Bitte',
      situation: 'Du möchtest, dass jemand dir hilft - freundlich und beiläufig',
      sentence: 'Hilf mir ___ kurz!',
      attitude: 'Höflich, entspannt, "wenn du Zeit hast"',
      options: [
        {
          particle: 'mal',
          isCorrect: true,
          explanation: 'Richtig! "Mal" macht die Bitte höflich und beiläufig.',
        },
        {
          particle: 'bloß',
          isCorrect: false,
          explanation: 'Falsch. "Bloß" klingt dringend und warnend, nicht höflich.',
        },
        {
          particle: 'doch',
          isCorrect: false,
          explanation: 'Möglich, aber "doch" klingt drängender. "Mal" ist höflicher.',
        },
        {
          particle: 'ja',
          isCorrect: false,
          explanation: 'Falsch. "Ja" passt zu Aussagen, nicht zu Aufforderungen.',
        },
      ],
    },
    {
      id: 'scenario3',
      context: 'Resignation',
      situation: 'Die Prüfung ist schwer und du kannst nichts daran ändern',
      sentence: 'Die Prüfung ist ___ schwer.',
      attitude: 'Resigniert, "kann man nichts machen"',
      options: [
        {
          particle: 'eben',
          isCorrect: true,
          explanation: 'Richtig! "Eben" drückt Resignation und Akzeptanz aus.',
        },
        {
          particle: 'halt',
          isCorrect: true,
          explanation: 'Auch richtig! "Halt" ist die umgangssprachliche (süddeutsche) Variante von "eben".',
        },
        {
          particle: 'ja',
          isCorrect: false,
          explanation: 'Falsch. "Ja" würde Überraschung ausdrücken, nicht Resignation.',
        },
        {
          particle: 'wohl',
          isCorrect: false,
          explanation: 'Falsch. "Wohl" drückt Vermutung aus, nicht Resignation.',
        },
      ],
    },
    {
      id: 'scenario4',
      context: 'Dringende Warnung',
      situation: 'Du warnst jemanden eindringlich vor einer Gefahr',
      sentence: 'Pass ___ auf!',
      attitude: 'Warnend, dringend, "unbedingt!"',
      options: [
        {
          particle: 'bloß',
          isCorrect: true,
          explanation: 'Perfekt! "Bloß" drückt Warnung und Dringlichkeit aus.',
        },
        {
          particle: 'nur',
          isCorrect: true,
          explanation: 'Auch richtig! "Nur" ist synonym zu "bloß" in diesem Kontext.',
        },
        {
          particle: 'mal',
          isCorrect: false,
          explanation: 'Falsch. "Mal" klingt zu entspannt für eine dringende Warnung.',
        },
        {
          particle: 'doch',
          isCorrect: false,
          explanation: 'Teilweise richtig, aber "bloß" ist stärker und passender für Warnungen.',
        },
      ],
    },
    {
      id: 'scenario5',
      context: 'Höfliche Frage',
      situation: 'Du möchtest wissen, was jemand gerade macht - neugierig und freundlich',
      sentence: 'Was machst du ___ ?',
      attitude: 'Neugierig, interessiert, höflich',
      options: [
        {
          particle: 'eigentlich',
          isCorrect: true,
          explanation: 'Richtig! "Eigentlich" macht Fragen neugierig und höflich.',
        },
        {
          particle: 'denn',
          isCorrect: true,
          explanation: 'Auch richtig! "Denn" drückt Interesse und Überraschung in Fragen aus.',
        },
        {
          particle: 'wohl',
          isCorrect: false,
          explanation: 'Falsch. "Wohl" passt zu Aussagen (Vermutung), nicht zu Fragen.',
        },
        {
          particle: 'mal',
          isCorrect: false,
          explanation: 'Falsch. "Mal" passt zu Aufforderungen, nicht zu Fragen.',
        },
      ],
    },
    {
      id: 'scenario6',
      context: 'Vermutung',
      situation: 'Du siehst, dass dein Kollege nicht da ist und vermutest den Grund',
      sentence: 'Er ist ___ krank.',
      attitude: 'Vermutend, unsicher, "ich nehme an"',
      options: [
        {
          particle: 'wohl',
          isCorrect: true,
          explanation: 'Perfekt! "Wohl" drückt Vermutung und Unsicherheit aus.',
        },
        {
          particle: 'ja',
          isCorrect: false,
          explanation: 'Falsch. "Ja" würde bedeuten "das ist offensichtlich", nicht "ich vermute".',
        },
        {
          particle: 'eben',
          isCorrect: false,
          explanation: 'Falsch. "Eben" drückt Resignation aus, nicht Vermutung.',
        },
        {
          particle: 'doch',
          isCorrect: false,
          explanation: 'Falsch. "Doch" würde einen Widerspruch ausdrücken, nicht eine Vermutung.',
        },
      ],
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenario)!;
  const selectedOption = currentScenario.options.find((o) => o.particle === selectedParticle);

  const handleParticleClick = (particle: string) => {
    setSelectedParticle(particle);
    setShowFeedback(true);
  };

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setSelectedParticle(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Kontext-Trainer: Modalpartikeln
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle die passende Modalpartikel basierend auf der <strong>Haltung</strong> und{' '}
        <strong>Situation</strong>.
      </p>

      {/* Scenario Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5 sm:mb-6">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => handleScenarioChange(scenario.id)}
            className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-[0.6rem] sm:text-xs font-semibold transition-all ${
              selectedScenario === scenario.id
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {scenario.context}
          </button>
        ))}
      </div>

      {/* Situation Description */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
          Situation
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-main mb-3">
          {currentScenario.situation}
        </p>
        <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
          Gewünschte Haltung
        </div>
        <p className="text-xs sm:text-sm italic text-text-muted">
          "{currentScenario.attitude}"
        </p>
      </div>

      {/* Sentence Display */}
      <div className="bg-white border-2 border-[#E0E0E0] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-text-main flex flex-wrap items-center gap-2">
          {currentScenario.sentence.split('___').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <>
                  {selectedParticle ? (
                    <span className="bg-primary text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-sm sm:text-base inline-block mx-1">
                      {selectedParticle}
                    </span>
                  ) : (
                    <span className="bg-white border-2 border-dashed border-[#D9A441] px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-[#D9A441] font-bold text-sm sm:text-base inline-block mx-1">
                      ?
                    </span>
                  )}
                </>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Particle Options */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {currentScenario.options.map((option) => (
          <button
            key={option.particle}
            type="button"
            onClick={() => handleParticleClick(option.particle)}
            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-serif font-bold text-sm sm:text-base md:text-lg transition-all ${
              selectedParticle === option.particle
                ? option.isCorrect
                  ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32]'
                  : 'bg-[#FFF3E0] border-2 border-[#E65100] text-[#E65100]'
                : 'bg-white border-2 border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
            }`}
          >
            {option.particle}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && selectedOption && (
        <div
          className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${
            selectedOption.isCorrect
              ? 'bg-[#E8F5E9] border-[#2E7D32]'
              : 'bg-[#FFF9E5] border-[#D9A441]'
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
