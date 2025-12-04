import { BracketModel } from './BracketModel';
import { ParticipleLogic } from './ParticipleLogic';
import { SentenceCompressor } from './SentenceCompressor';

export function Lesson12ExtendedParticiplesTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Auch "Linksattribute" genannt. In Zeitungsartikeln und wissenschaftlichen Texten werden
          Relativsätze oft zu komplexen Adjektiven verdichtet, die <em>vor</em> dem Nomen stehen.
        </p>
      </section>

      {/* Bracket Model */}
      <BracketModel />

      {/* Participle Logic */}
      <ParticipleLogic />

      {/* Interactive Sentence Compressor */}
      <SentenceCompressor />
    </>
  );
}
