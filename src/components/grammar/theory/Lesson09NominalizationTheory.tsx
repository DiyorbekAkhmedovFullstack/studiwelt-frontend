import { StyleComparison } from './StyleComparison';
import { TransformationTable } from './TransformationTable';
import { StyleToggle } from './StyleToggle';

export function Lesson09NominalizationTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Der Schlüssel zu komplexen deutschen Texten. Verwandle Nebensätze in kompakte
          Nomen-Konstruktionen, um deinen Stil präziser und akademischer zu gestalten.
        </p>
      </section>

      {/* Style Comparison */}
      <StyleComparison />

      {/* Transformation Table */}
      <TransformationTable />

      {/* Interactive Style Toggle */}
      <StyleToggle />
    </>
  );
}
