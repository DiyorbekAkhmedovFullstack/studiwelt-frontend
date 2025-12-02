import { BracketModel } from './BracketModel';
import { ParticipleLogic } from './ParticipleLogic';
import { SentenceCompressor } from './SentenceCompressor';

export function Lesson12ExtendedParticiplesTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
