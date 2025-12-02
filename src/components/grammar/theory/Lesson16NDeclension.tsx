import { WeakNounConcept } from './WeakNounConcept';
import { SuffixScanner } from './SuffixScanner';
import { CaseTestBuilder } from './CaseTestBuilder';
import { ExceptionVault } from './ExceptionVault';

export function Lesson16NDeclension() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
