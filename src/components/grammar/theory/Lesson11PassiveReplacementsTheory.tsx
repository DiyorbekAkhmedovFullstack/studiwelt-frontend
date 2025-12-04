import { PassiveAlternatives } from './PassiveAlternatives';
import { TransformationLab } from './TransformationLab';

export function Lesson11PassiveReplacementsTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
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
