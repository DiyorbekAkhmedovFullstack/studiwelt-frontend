import { useState } from 'react';
import { Icon, Ui } from '../../../lib/icons';

type Exercise = {
  id: string;
  context: string;
  register: string;
  sentence: string;
  options: {
    particle: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function RestrictiveContextTrainer() {
  const [selectedExercise, setSelectedExercise] = useState<string>('ex1');
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises: Exercise[] = [
    {
      id: 'ex1',
      context: 'Akademischer Text',
      register: 'Formal, schriftlich',
      sentence: 'Die Studie umfasst ___ 50 Probanden.',
      options: [
        {
          particle: 'lediglich',
          isCorrect: true,
          explanation: 'Perfekt! "Lediglich" ist formal und passt zu akademischen Texten.',
        },
        {
          particle: 'nur',
          isCorrect: false,
          explanation:
            'Möglich, aber "lediglich" ist formeller und passt besser zu wissenschaftlichen Texten.',
        },
        {
          particle: 'bloß',
          isCorrect: false,
          explanation: 'Falsch. "Bloß" ist zu umgangssprachlich für akademische Texte.',
        },
        {
          particle: 'allein',
          isCorrect: false,
          explanation: 'Falsch. "Allein" bedeutet hier nicht Einschränkung, sondern "ohne andere".',
        },
      ],
    },
    {
      id: 'ex2',
      context: 'Informelles Gespräch',
      register: 'Mündlich, informell',
      sentence: 'Das dauert ___ fünf Minuten!',
      options: [
        {
          particle: 'bloß',
          isCorrect: true,
          explanation: 'Richtig! "Bloß" ist umgangssprachlich und passt perfekt zu Gesprächen.',
        },
        {
          particle: 'nur',
          isCorrect: true,
          explanation: 'Auch richtig! "Nur" ist neutral und funktioniert in allen Registern.',
        },
        {
          particle: 'lediglich',
          isCorrect: false,
          explanation: 'Zu formal für informelle Gespräche. Klingt steif und unnatürlich.',
        },
        {
          particle: 'ausschließlich',
          isCorrect: false,
          explanation: 'Zu formal und lang für lockere Gespräche.',
        },
      ],
    },
    {
      id: 'ex3',
      context: 'Exklusivität',
      register: 'Formell, betont',
      sentence: 'Die Bibliothek ist ___ für Studierende.',
      options: [
        {
          particle: 'ausschließlich',
          isCorrect: true,
          explanation:
            'Perfekt! "Ausschließlich" betont, dass es keine Ausnahmen gibt.',
        },
        {
          particle: 'nur',
          isCorrect: false,
          explanation:
            'Möglich, aber "ausschließlich" betont die Exklusivität stärker.',
        },
        {
          particle: 'bloß',
          isCorrect: false,
          explanation: 'Zu informell für offizielle Regelungen.',
        },
        {
          particle: 'einzig',
          isCorrect: false,
          explanation:
            '"Einzig" bedeutet "der/die/das einzige", nicht "nur für diese Gruppe".',
        },
      ],
    },
    {
      id: 'ex4',
      context: 'Literarischer Text',
      register: 'Gehoben, schriftlich',
      sentence: '___ die Tatsache, dass er kam, zeigt seine Loyalität.',
      options: [
        {
          particle: 'allein',
          isCorrect: true,
          explanation:
            'Richtig! "Allein" ist gehoben und literarisch. Bedeutet: "schon die Tatsache für sich".',
        },
        {
          particle: 'nur',
          isCorrect: false,
          explanation:
            'Grammatisch möglich, aber "allein" klingt gehobener und literarischer.',
        },
        {
          particle: 'bloß',
          isCorrect: false,
          explanation: 'Viel zu umgangssprachlich für literarische Texte.',
        },
        {
          particle: 'lediglich',
          isCorrect: false,
          explanation:
            'Formal, aber nicht poetisch/gehoben genug für Literatur.',
        },
      ],
    },
    {
      id: 'ex5',
      context: 'Betonung Singularität',
      register: 'Betont, formal',
      sentence: 'Das ist die ___ Lösung für dieses Problem.',
      options: [
        {
          particle: 'einzige',
          isCorrect: true,
          explanation:
            'Perfekt! "Einzige" bedeutet "die eine und alleinige" (Adjektiv, dekliniert).',
        },
        {
          particle: 'nur',
          isCorrect: false,
          explanation:
            '"Nur Lösung" ist grammatisch falsch. Man braucht "einzige Lösung".',
        },
        {
          particle: 'lediglich',
          isCorrect: false,
          explanation:
            '"Lediglich" ist eine Partikel, kein Adjektiv. Kann nicht vor Artikel + Nomen stehen.',
        },
        {
          particle: 'ausschließlich',
          isCorrect: false,
          explanation:
            '"Ausschließlich" passt nicht zu "die ___ Lösung". Man sagt "die einzige Lösung".',
        },
      ],
    },
    {
      id: 'ex6',
      context: 'Neutrale Aussage',
      register: 'Neutral, universal',
      sentence: 'Ich habe ___ 10 Euro dabei.',
      options: [
        {
          particle: 'nur',
          isCorrect: true,
          explanation:
            'Richtig! "Nur" ist die neutrale, universelle Wahl für alle Register.',
        },
        {
          particle: 'bloß',
          isCorrect: true,
          explanation:
            'Auch möglich! "Bloß" klingt etwas informeller, funktioniert aber hier.',
        },
        {
          particle: 'lediglich',
          isCorrect: false,
          explanation:
            'Zu formal für diese alltägliche Aussage. Klingt übertrieben.',
        },
        {
          particle: 'ausschließlich',
          isCorrect: false,
          explanation:
            '"Ausschließlich" klingt hier unnatürlich und zu offiziell.',
        },
      ],
    },
  ];

  const currentExercise = exercises.find((ex) => ex.id === selectedExercise)!;

  const handleParticleClick = (particle: string) => {
    setSelectedParticle(particle);
    setShowFeedback(true);
  };

  const handleExerciseChange = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setSelectedParticle(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Kontext-Trainer: Register-angemessene Auswahl
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle die passende restriktive Partikel basierend auf <strong>Kontext</strong> und{' '}
        <strong>Register</strong>.
      </p>

      {/* Exercise Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5 sm:mb-6">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => handleExerciseChange(exercise.id)}
            className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-[0.6rem] sm:text-xs lg:text-[0.7rem] font-semibold transition-all break-words hyphens-auto ${
              selectedExercise === exercise.id
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
            style={{ wordBreak: 'break-word' }}
          >
            {exercise.context}
          </button>
        ))}
      </div>

      {/* Context Info */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
          Kontext & Register
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-main">
          <strong>{currentExercise.context}</strong> – {currentExercise.register}
        </p>
      </div>

      {/* Sentence Display */}
      <div className="bg-white border-2 border-[#E0E0E0] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <div className="text-base sm:text-lg md:text-xl font-serif text-text-main flex flex-wrap items-center gap-2">
          {currentExercise.sentence.split('___').map((part, index, array) => (
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
        {currentExercise.options.map((option) => (
          <button
            key={option.particle}
            type="button"
            onClick={() => handleParticleClick(option.particle)}
            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-serif font-bold text-sm sm:text-base transition-all ${
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
      {showFeedback && selectedParticle && (
        <div
          className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${
            currentExercise.options.find((o) => o.particle === selectedParticle)?.isCorrect
              ? 'bg-[#E8F5E9] border-[#2E7D32]'
              : 'bg-[#FFF9E5] border-[#D9A441]'
          }`}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            {currentExercise.options.find((o) => o.particle === selectedParticle)?.isCorrect
              ? <Ui.Check className="text-success" size={22} />
              : <Icon.Info className="text-primary" size={22} />}
            <div>
              <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold mb-1">
                {currentExercise.options.find((o) => o.particle === selectedParticle)?.isCorrect
                  ? 'Richtig!'
                  : 'Hinweis'}
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                {
                  currentExercise.options.find((o) => o.particle === selectedParticle)
                    ?.explanation
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
