import { ConnectorCards } from './ConnectorCards';
import { SentenceArchitect } from './SentenceArchitect';

export function Lesson15ComplexStructures() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          Zweiteilige Konnektoren (Doppelkonjunktionen) verbinden zwei Hauptsätze oder einen
          Nebensatz mit einem Hauptsatz. Die Schwierigkeit liegt oft in der Position des Verbs.
        </p>
      </section>

      <ConnectorCards />
      <SentenceArchitect />
    </>
  );
}
