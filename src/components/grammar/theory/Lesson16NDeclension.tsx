import { WeakNounConcept } from './WeakNounConcept';
import { SuffixScanner } from './SuffixScanner';
import { CaseTestBuilder } from './CaseTestBuilder';
import { ExceptionVault } from './ExceptionVault';

export function Lesson16NDeclension() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Einige maskuline Nomen sind "schwach". Sie benötigen in allen Fällen außer dem Nominativ
          eine Unterstützung: den Buchstaben "n" (oder "en").
        </p>
      </section>

      <WeakNounConcept />
      <SuffixScanner />
      <CaseTestBuilder />
      <ExceptionVault />
    </>
  );
}
