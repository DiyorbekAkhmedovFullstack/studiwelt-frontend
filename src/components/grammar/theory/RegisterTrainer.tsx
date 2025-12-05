import { useState } from 'react';

type Exercise = {
  id: string;
  context: string;
  register: string;
  task: string;
  options: {
    phrase: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export function RegisterTrainer() {
  const [selectedExercise, setSelectedExercise] = useState<string>('ex1');
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises: Exercise[] = [
    {
      id: 'ex1',
      context: 'TestDaF Essay',
      register: 'Formal, akademisch',
      task: 'Wie drückst du deine Meinung aus?',
      options: [
        {
          phrase: 'Meines Erachtens',
          isCorrect: true,
          explanation:
            'Perfekt! "Meines Erachtens" ist formal und akademisch, ideal für TestDaF-Essays.',
        },
        {
          phrase: 'Ich finde',
          isCorrect: false,
          explanation:
            'Zu informell für akademische Texte. "Ich finde" klingt wie gesprochene Sprache.',
        },
        {
          phrase: 'Meiner Meinung nach',
          isCorrect: false,
          explanation:
            'Möglich, aber "meines Erachtens" ist formeller und passender für Prüfungstexte.',
        },
        {
          phrase: 'Ich denke',
          isCorrect: false,
          explanation: 'Viel zu informell und unsicher für akademisches Schreiben.',
        },
      ],
    },
    {
      id: 'ex2',
      context: 'Mündliche Diskussion',
      register: 'Neutral, mündlich',
      task: 'Wie beginnst du ein Argument?',
      options: [
        {
          phrase: 'Meiner Meinung nach',
          isCorrect: true,
          explanation: 'Richtig! Neutral und natürlich für mündliche Diskussionen.',
        },
        {
          phrase: 'Ich bin der Auffassung, dass',
          isCorrect: false,
          explanation:
            'Zu formal und steif für normale Gespräche. Klingt wie schriftliche Sprache.',
        },
        {
          phrase: 'Aus meiner Sicht',
          isCorrect: true,
          explanation: 'Auch gut! Neutral und natürlich für mündliche Prüfungen.',
        },
        {
          phrase: 'Meines Erachtens',
          isCorrect: false,
          explanation:
            'Möglich, aber zu gehoben für normale Diskussionen. Wirkt unnatürlich.',
        },
      ],
    },
    {
      id: 'ex3',
      context: 'Pro-Argument',
      register: 'Formal, schriftlich',
      task: 'Wie leitest du ein Argument dafür ein?',
      options: [
        {
          phrase: 'Ein wichtiges Argument dafür ist, dass',
          isCorrect: true,
          explanation: 'Perfekt! Formal, klar strukturiert, ideal für Argumentationen.',
        },
        {
          phrase: 'Gut ist auch, dass',
          isCorrect: false,
          explanation: 'Zu informell. "Gut ist" klingt umgangssprachlich.',
        },
        {
          phrase: 'Dafür spricht, dass',
          isCorrect: true,
          explanation: 'Auch richtig! Formal und prägnant für Pro-Argumente.',
        },
        {
          phrase: 'Ich finde gut, dass',
          isCorrect: false,
          explanation: 'Zu subjektiv und informell für formelle Stellungnahmen.',
        },
      ],
    },
    {
      id: 'ex4',
      context: 'Contra-Argument',
      register: 'Formal, schriftlich',
      task: 'Wie präsentierst du ein Gegenargument?',
      options: [
        {
          phrase: 'Dagegen lässt sich einwenden, dass',
          isCorrect: true,
          explanation: 'Perfekt! Sehr formal und akademisch für Gegenargumente.',
        },
        {
          phrase: 'Aber das ist schlecht, weil',
          isCorrect: false,
          explanation:
            'Viel zu informell. "Schlecht" ist zu wertend und umgangssprachlich.',
        },
        {
          phrase: 'Kritiker wenden ein, dass',
          isCorrect: true,
          explanation:
            'Auch richtig! Zeigt verschiedene Perspektiven, sehr akademisch.',
        },
        {
          phrase: 'Das Problem ist',
          isCorrect: false,
          explanation:
            'Zu direkt und wenig differenziert für formelle Argumentationen.',
        },
      ],
    },
    {
      id: 'ex5',
      context: 'Schluss/Fazit',
      register: 'Formal, schriftlich',
      task: 'Wie beginnst du dein Fazit?',
      options: [
        {
          phrase: 'Zusammenfassend lässt sich sagen, dass',
          isCorrect: true,
          explanation:
            'Perfekt! Klassische Einleitung für Fazit in formellen Texten.',
        },
        {
          phrase: 'Also ich denke',
          isCorrect: false,
          explanation:
            'Viel zu informell für Schluss. Klingt unsicher und umgangssprachlich.',
        },
        {
          phrase: 'Abwägend komme ich zu dem Schluss, dass',
          isCorrect: true,
          explanation:
            'Auch richtig! Zeigt kritische Reflexion, sehr akademisch.',
        },
        {
          phrase: 'Am Ende finde ich',
          isCorrect: false,
          explanation: 'Zu informell und nicht präzise genug für Fazit.',
        },
      ],
    },
    {
      id: 'ex6',
      context: 'Wissenschaftliche Arbeit',
      register: 'Sehr formal, akademisch',
      task: 'Wie drückst du eine feste Überzeugung aus?',
      options: [
        {
          phrase: 'Ich bin der Auffassung, dass',
          isCorrect: true,
          explanation:
            'Perfekt! Sehr formal, ideal für wissenschaftliche Arbeiten.',
        },
        {
          phrase: 'Ich glaube',
          isCorrect: false,
          explanation:
            'Viel zu unsicher und informell. Wissenschaft braucht Präzision.',
        },
        {
          phrase: 'Ich vertrete den Standpunkt, dass',
          isCorrect: true,
          explanation:
            'Auch richtig! Zeigt klare, begründete Position, sehr akademisch.',
        },
        {
          phrase: 'Meiner Meinung nach',
          isCorrect: false,
          explanation:
            'Zu neutral. Wissenschaftliche Texte brauchen formalere Ausdrücke.',
        },
      ],
    },
  ];

  const currentExercise = exercises.find((ex) => ex.id === selectedExercise)!;

  const handlePhraseClick = (phrase: string) => {
    setSelectedPhrase(phrase);
    setShowFeedback(true);
  };

  const handleExerciseChange = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setSelectedPhrase(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Register-Trainer: Prüfungssituationen
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle die <strong>register-angemessene</strong> Formulierung für verschiedene{' '}
        <strong>Prüfungskontexte</strong>.
      </p>

      {/* Exercise Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5 sm:mb-6">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => handleExerciseChange(exercise.id)}
            className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-[0.6rem] sm:text-xs lg:text-[0.7rem] font-semibold transition-all break-words ${
              selectedExercise === exercise.id
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {exercise.context}
          </button>
        ))}
      </div>

      {/* Context Info */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
              Kontext
            </div>
            <p className="text-xs sm:text-sm text-text-main">{currentExercise.context}</p>
          </div>
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
              Register
            </div>
            <p className="text-xs sm:text-sm text-text-main">{currentExercise.register}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[rgba(166,123,91,0.2)]">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
            Aufgabe
          </div>
          <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold">
            {currentExercise.task}
          </p>
        </div>
      </div>

      {/* Phrase Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
        {currentExercise.options.map((option) => (
          <button
            key={option.phrase}
            type="button"
            onClick={() => handlePhraseClick(option.phrase)}
            className={`px-4 sm:px-5 py-4 sm:py-5 rounded-lg sm:rounded-xl font-serif text-sm sm:text-base text-left transition-all ${
              selectedPhrase === option.phrase
                ? option.isCorrect
                  ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32]'
                  : 'bg-[#FFF3E0] border-2 border-[#E65100] text-[#E65100]'
                : 'bg-white border-2 border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
            }`}
          >
            {option.phrase}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && selectedPhrase && (
        <div
          className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${
            currentExercise.options.find((o) => o.phrase === selectedPhrase)?.isCorrect
              ? 'bg-[#E8F5E9] border-[#2E7D32]'
              : 'bg-[#FFF9E5] border-[#D9A441]'
          }`}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">
              {currentExercise.options.find((o) => o.phrase === selectedPhrase)?.isCorrect
                ? '✓'
                : 'ℹ'}
            </span>
            <div>
              <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold mb-1">
                {currentExercise.options.find((o) => o.phrase === selectedPhrase)?.isCorrect
                  ? 'Richtig!'
                  : 'Hinweis'}
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                {currentExercise.options.find((o) => o.phrase === selectedPhrase)?.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
