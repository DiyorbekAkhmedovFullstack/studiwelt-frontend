import { useState } from 'react';

type Exercise = {
  id: string;
  title: string;
  task: string;
  fragments: string[];
  correctOrder: number[];
  explanation: string;
};

export function TextCoherenceTrainer() {
  const [selectedExercise, setSelectedExercise] = useState<string>('ex1');
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises: Exercise[] = [
    {
      id: 'ex1',
      title: 'Kausalzusammenhang',
      task: 'Ordne die Sätze logisch (Grund → Folge)',
      fragments: [
        'Deshalb konnte ich nicht zur Arbeit gehen.',
        'Ich fühlte mich gestern sehr krank.',
        'Heute geht es mir wieder besser.',
      ],
      correctOrder: [1, 0, 2], // Indices: 0-based
      explanation:
        'Logische Reihenfolge: Grund (krank) → Folge (nicht zur Arbeit) → Folgerung (jetzt besser). "Deshalb" verweist auf vorherigen Grund.',
    },
    {
      id: 'ex2',
      title: 'Temporale Abfolge',
      task: 'Ordne die Ereignisse chronologisch',
      fragments: [
        'Danach schrieb sie ihre Hausarbeit.',
        'Maria ging zuerst in die Bibliothek.',
        'Schließlich reichte sie die Arbeit ein.',
      ],
      correctOrder: [1, 0, 2],
      explanation:
        'Chronologische Abfolge: "zuerst" (Bibliothek) → "danach" (schreiben) → "schließlich" (einreichen). Temporale Konnektoren zeigen Reihenfolge.',
    },
    {
      id: 'ex3',
      title: 'Referenzkette',
      task: 'Ordne die Sätze nach Referenz (Artikel!)',
      fragments: [
        'Das Buch war sehr interessant.',
        'Ich kaufte gestern ein Buch.',
        'Es handelte von Geschichte.',
      ],
      correctOrder: [1, 0, 2],
      explanation:
        'Referenzkette: "ein Buch" (neu eingeführt) → "das Buch" (bekannt) → "es" (Pronomen verweist auf Buch). Unbestimmter → bestimmter Artikel → Pronomen.',
    },
  ];

  const currentExercise = exercises.find((ex) => ex.id === selectedExercise)!;

  const handleFragmentClick = (index: number) => {
    if (showFeedback) return; // Don't allow changes after checking

    if (userOrder.includes(index)) {
      // Remove from order
      setUserOrder(userOrder.filter((i) => i !== index));
    } else {
      // Add to order
      setUserOrder([...userOrder, index]);
    }
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setUserOrder([]);
    setShowFeedback(false);
  };

  const handleExerciseChange = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setUserOrder([]);
    setShowFeedback(false);
  };

  const isCorrect =
    showFeedback &&
    userOrder.length === currentExercise.correctOrder.length &&
    userOrder.every((val, idx) => val === currentExercise.correctOrder[idx]);

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Kohärenz-Trainer: Textzusammenhang
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Trainiere <strong>logische Verknüpfung</strong> von Sätzen durch korrekte{' '}
        <strong>Reihenfolge</strong>. Achte auf Konnektoren und Referenzen!
      </p>

      {/* Exercise Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => handleExerciseChange(exercise.id)}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedExercise === exercise.id
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {exercise.title}
          </button>
        ))}
      </div>

      {/* Task */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
          Aufgabe
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold">
          {currentExercise.task}
        </p>
      </div>

      {/* Fragments to Order */}
      <div className="mb-5 sm:mb-6">
        <div className="text-xs sm:text-sm text-text-muted mb-3 font-semibold">
          Klicke die Sätze in der richtigen Reihenfolge an:
        </div>
        <div className="space-y-3">
          {currentExercise.fragments.map((fragment, index) => {
            const orderPosition = userOrder.indexOf(index);
            const isSelected = orderPosition !== -1;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleFragmentClick(index)}
                className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all border-2 ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-text-main'
                    : 'bg-white border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  {isSelected && (
                    <span className="flex-shrink-0 bg-primary text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                      {orderPosition + 1}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm md:text-base font-serif">
                    {fragment}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-5 sm:mb-6">
        {!showFeedback ? (
          <>
            <button
              type="button"
              onClick={handleCheck}
              disabled={userOrder.length !== currentExercise.fragments.length}
              className={`px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                userOrder.length === currentExercise.fragments.length
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-[#E0E0E0] text-text-muted cursor-not-allowed'
              }`}
            >
              Überprüfen
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8] transition-all"
            >
              Zurücksetzen
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all"
          >
            Neu versuchen
          </button>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${
            isCorrect ? 'bg-[#E8F5E9] border-[#2E7D32]' : 'bg-[#FFF3E0] border-[#E65100]'
          }`}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">{isCorrect ? '✓' : '✗'}</span>
            <div>
              <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold mb-2">
                {isCorrect ? 'Richtig!' : 'Nicht ganz richtig'}
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed mb-3">
                {currentExercise.explanation}
              </p>
              <div className="bg-white rounded-lg p-3">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
                  Korrekte Reihenfolge
                </div>
                <div className="space-y-2">
                  {currentExercise.correctOrder.map((fragIndex, position) => (
                    <div key={position} className="flex items-center gap-2">
                      <span className="text-primary font-bold flex-shrink-0">{position + 1}.</span>
                      <span className="text-xs sm:text-sm font-serif text-text-main">
                        {currentExercise.fragments[fragIndex]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
