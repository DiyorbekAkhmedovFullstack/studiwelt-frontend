import { DistanceVisual } from './DistanceVisual';
import { ConjugationRules } from './ConjugationRules';
import { EscapeRule } from './EscapeRule';
import { NewsTicker } from './NewsTicker';

export function Lesson13KonjunktivTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
