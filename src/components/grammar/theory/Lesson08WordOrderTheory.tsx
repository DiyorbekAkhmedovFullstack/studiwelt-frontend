import { TeKaMoLoTrain } from './TeKaMoLoTrain';
import { WordOrderComparison } from './WordOrderComparison';
import { MittelfeldRules } from './MittelfeldRules';
import { SentenceSorter } from './SentenceSorter';

export function Lesson08WordOrderTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Die goldene Regel für das Mittelfeld im deutschen Satz. Wenn mehrere Angaben in einem
          Satz stehen, folgen sie meist der TeKaMoLo-Reihenfolge. Für Objekte, Pronomen und die
          Stellung von „nicht" gelten zusätzliche Regeln.
        </p>
      </section>

      {/* TeKaMoLo Train */}
      <TeKaMoLoTrain />

      {/* Word Order Comparison */}
      <WordOrderComparison />

      {/* Further Mittelfeld rules: objects, pronouns, nicht */}
      <MittelfeldRules />

      {/* Interactive Sentence Sorter */}
      <SentenceSorter />
    </>
  );
}
