import { PassiveAlternatives } from './PassiveAlternatives';
import { TransformationLab } from './TransformationLab';

export function Lesson11PassiveReplacementsTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          Wiederholungen von "werden" klingen oft eintönig. Im C1-Niveau nutzen wir Alternativen,
          um Möglichkeiten oder Notwendigkeiten eleganter auszudrücken.
        </p>
      </section>

      {/* Passive Alternatives */}
      <PassiveAlternatives />

      {/* Interactive Transformation Lab */}
      <TransformationLab />
    </>
  );
}
