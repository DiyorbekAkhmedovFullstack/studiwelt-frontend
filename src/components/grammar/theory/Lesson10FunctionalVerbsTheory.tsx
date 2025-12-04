import { FVGAnatomy } from './FVGAnatomy';
import { SentenceElevator } from './SentenceElevator';
import { FVGVocabulary } from './FVGVocabulary';

export function Lesson10FunctionalVerbsTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Im gehobenen Deutsch wird das einfache Verb oft durch eine Nomen-Verb-Verbindung
          ersetzt. Das Verb verliert seine Bedeutung, das Nomen wird zum Bedeutungsträger.
        </p>
      </section>

      {/* FVG Anatomy */}
      <FVGAnatomy />

      {/* Interactive Sentence Elevator */}
      <SentenceElevator />

      {/* FVG Vocabulary */}
      <FVGVocabulary />
    </>
  );
}
