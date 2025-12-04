import { ProbabilityScale } from './ProbabilityScale';
import { RumorsVsClaims } from './RumorsVsClaims';
import { DetectiveGame } from './DetectiveGame';

export function Lesson14SubjectiveModals() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
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
