import { DistanceVisual } from './DistanceVisual';
import { ConjugationRules } from './ConjugationRules';
import { EscapeRule } from './EscapeRule';
import { NewsTicker } from './NewsTicker';

export function Lesson13KonjunktivTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Die Sprache der Journalisten und Wissenschaftler. Wir benutzen den Konjunktiv I, um
          Aussagen Dritter neutral wiederzugeben, ohne uns ihren Inhalt zu eigen zu machen.
        </p>
      </section>

      {/* Distance Visual */}
      <DistanceVisual />

      {/* Conjugation Rules */}
      <ConjugationRules />

      {/* Escape Rule */}
      <EscapeRule />

      {/* Interactive News Ticker */}
      <NewsTicker />
    </>
  );
}
