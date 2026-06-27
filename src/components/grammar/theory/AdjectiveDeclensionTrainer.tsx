import { useState } from 'react';
import { Ui } from '../../../lib/icons';

type Exercise = {
  id: string;
  context: string;
  sentence: string;
  adjective: string;
  articleType: string;
  gender: string;
  case: string;
  correctEnding: string;
  explanation: string;
};

export function AdjectiveDeclensionTrainer() {
  const [selectedExercise, setSelectedExercise] = useState<string>('ex1');
  const [selectedEnding, setSelectedEnding] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises: Exercise[] = [
    {
      id: 'ex1',
      context: 'Nominativ + best. Artikel',
      sentence: 'D___ neu___ Student ist sehr fleißig.',
      adjective: 'neu',
      articleType: 'bestimmt (der)',
      gender: 'maskulin',
      case: 'Nominativ',
      correctEnding: 'e',
      explanation: 'Nach bestimmtem Artikel im Nominativ: immer -e',
    },
    {
      id: 'ex2',
      context: 'Akkusativ + unbest. Artikel',
      sentence: 'Ich lese ein___ interessant___ Buch.',
      adjective: 'interessant',
      articleType: 'unbestimmt (ein)',
      gender: 'neutral',
      case: 'Akkusativ',
      correctEnding: 'es',
      explanation: 'Nach unbestimmtem Artikel (neutral, Akkusativ): -es',
    },
    {
      id: 'ex3',
      context: 'Dativ + best. Artikel',
      sentence: 'Sie hilft d___ klein___ Kind.',
      adjective: 'klein',
      articleType: 'bestimmt (dem)',
      gender: 'neutral',
      case: 'Dativ',
      correctEnding: 'en',
      explanation: 'Nach bestimmtem Artikel im Dativ/Genitiv: immer -en',
    },
    {
      id: 'ex4',
      context: 'Nullartikel + Nominativ',
      sentence: 'Frisch___ Luft ist gesund.',
      adjective: 'frisch',
      articleType: 'kein Artikel (Nullartikel)',
      gender: 'feminin',
      case: 'Nominativ',
      correctEnding: 'e',
      explanation: 'Ohne Artikel übernimmt das Adjektiv die Artikelendung: die → -e',
    },
    {
      id: 'ex5',
      context: 'Genitiv + unbest. Artikel',
      sentence: 'Der Titel ein___ berühmt___ Romans',
      adjective: 'berühmt',
      articleType: 'unbestimmt (eines)',
      gender: 'maskulin',
      case: 'Genitiv',
      correctEnding: 'en',
      explanation: 'Nach unbestimmtem Artikel im Genitiv/Dativ: -en',
    },
    {
      id: 'ex6',
      context: 'Akkusativ + Nullartikel',
      sentence: 'Ich trinke gern kalt___ Wasser.',
      adjective: 'kalt',
      articleType: 'kein Artikel (Nullartikel)',
      gender: 'neutral',
      case: 'Akkusativ',
      correctEnding: 'es',
      explanation: 'Ohne Artikel übernimmt das Adjektiv die Artikelendung: das → -es',
    },
    {
      id: 'ex7',
      context: 'Plural + best. Artikel',
      sentence: 'D___ neu___ Studenten kommen morgen.',
      adjective: 'neu',
      articleType: 'bestimmt (die)',
      gender: 'Plural',
      case: 'Nominativ',
      correctEnding: 'en',
      explanation: 'Nach bestimmtem Artikel im Plural (alle Kasus außer Nom/Akk Sg): -en',
    },
    {
      id: 'ex8',
      context: 'Dativ + Possessiv',
      sentence: 'Ich vertraue mein___ best___ Freund.',
      adjective: 'best',
      articleType: 'Possessiv (meinem)',
      gender: 'maskulin',
      case: 'Dativ',
      correctEnding: 'en',
      explanation: 'Nach Possessivartikel (= unbestimmt) im Dativ: -en',
    },
  ];

  const currentExercise = exercises.find((ex) => ex.id === selectedExercise)!;

  const endings = ['e', 'en', 'er', 'es', 'em'];

  const handleEndingClick = (ending: string) => {
    setSelectedEnding(ending);
    setShowFeedback(true);
  };

  const handleExerciseChange = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setSelectedEnding(null);
    setShowFeedback(false);
  };

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Interaktiver Trainer: Adjektivdeklination
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Wähle die richtige <strong>Adjektivendung</strong> basierend auf <strong>Artikeltyp</strong>,{' '}
        <strong>Genus</strong> und <strong>Kasus</strong>.
      </p>

      {/* Exercise Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 sm:mb-6">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => handleExerciseChange(exercise.id)}
            className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-[0.6rem] sm:text-xs font-semibold transition-all ${
              selectedExercise === exercise.id
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {exercise.context}
          </button>
        ))}
      </div>

      {/* Grammar Info */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
              Artikeltyp
            </div>
            <p className="text-xs sm:text-sm text-text-main">{currentExercise.articleType}</p>
          </div>
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
              Genus
            </div>
            <p className="text-xs sm:text-sm text-text-main">{currentExercise.gender}</p>
          </div>
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-1 font-bold">
              Kasus
            </div>
            <p className="text-xs sm:text-sm text-text-main">{currentExercise.case}</p>
          </div>
        </div>
      </div>

      {/* Sentence Display */}
      <div className="bg-white border-2 border-[#E0E0E0] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <div className="text-base sm:text-lg md:text-xl font-serif text-text-main">
          {currentExercise.sentence.split('___').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <>
                  {selectedEnding ? (
                    <span className="bg-primary text-white px-3 sm:px-4 py-1 rounded-full font-bold text-sm sm:text-base inline-block mx-1">
                      -{selectedEnding}
                    </span>
                  ) : (
                    <span className="bg-white border-2 border-dashed border-[#D9A441] px-4 sm:px-6 py-1 rounded-full text-[#D9A441] font-bold text-sm sm:text-base inline-block mx-1">
                      ?
                    </span>
                  )}
                </>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Ending Options */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {endings.map((ending) => (
          <button
            key={ending}
            type="button"
            onClick={() => handleEndingClick(ending)}
            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-serif font-bold text-base sm:text-lg transition-all ${
              selectedEnding === ending
                ? ending === currentExercise.correctEnding
                  ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32]'
                  : 'bg-[#FFEBEE] border-2 border-[#C62828] text-[#C62828]'
                : 'bg-white border-2 border-[#E0E0E0] text-text-main hover:border-primary hover:bg-[#FFF9F0]'
            }`}
          >
            -{ending}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 ${
            selectedEnding === currentExercise.correctEnding
              ? 'bg-[#E8F5E9] border-[#2E7D32]'
              : 'bg-[#FFF3E0] border-[#E65100]'
          }`}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            {selectedEnding === currentExercise.correctEnding
              ? <Ui.Check className="text-success" size={22} />
              : <Ui.Close className="text-danger" size={22} />}
            <div>
              <p className="text-xs sm:text-sm md:text-base text-text-main font-semibold mb-1">
                {selectedEnding === currentExercise.correctEnding
                  ? 'Richtig!'
                  : `Falsch! Die richtige Endung ist: -${currentExercise.correctEnding}`}
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                {currentExercise.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
