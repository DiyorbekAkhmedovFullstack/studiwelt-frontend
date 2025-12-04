import { ConnectorCards } from './ConnectorCards';
import { SentenceArchitect } from './SentenceArchitect';

export function Lesson15ComplexStructures() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Zweiteilige Konnektoren (Doppelkonjunktionen) verbinden zwei Hauptsätze oder einen
          Nebensatz mit einem Hauptsatz. Die Schwierigkeit liegt oft in der Position des Verbs.
        </p>
      </section>

      <ConnectorCards />
      <SentenceArchitect />
    </>
  );
}
