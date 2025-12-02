import { TeKaMoLoTrain } from './TeKaMoLoTrain';
import { WordOrderComparison } from './WordOrderComparison';
import { SentenceSorter } from './SentenceSorter';

export function Lesson08WordOrderTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          Die goldene Regel für das Mittelfeld im deutschen Satz. Wenn mehrere Angaben in einem
          Satz stehen, folgen sie meist dieser strengen Reihenfolge.
        </p>
      </section>

      {/* TeKaMoLo Train */}
      <TeKaMoLoTrain />

      {/* Word Order Comparison */}
      <WordOrderComparison />

      {/* Interactive Sentence Sorter */}
      <SentenceSorter />
    </>
  );
}
