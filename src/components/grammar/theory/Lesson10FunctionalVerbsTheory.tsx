import { FVGAnatomy } from './FVGAnatomy';
import { SentenceElevator } from './SentenceElevator';
import { FVGVocabulary } from './FVGVocabulary';

export function Lesson10FunctionalVerbsTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
