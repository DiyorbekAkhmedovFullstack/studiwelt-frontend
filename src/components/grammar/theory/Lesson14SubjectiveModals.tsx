import { ProbabilityScale } from './ProbabilityScale';
import { RumorsVsClaims } from './RumorsVsClaims';
import { DetectiveGame } from './DetectiveGame';

export function Lesson14SubjectiveModals() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          Modalverben drücken nicht nur Können oder Müssen aus. Im C1-Niveau nutzen wir sie als
          "Wahrscheinlichkeits-Skala", um logische Schlussfolgerungen zu formulieren.
        </p>
      </section>

      <ProbabilityScale />
      <RumorsVsClaims />
      <DetectiveGame />
    </>
  );
}
