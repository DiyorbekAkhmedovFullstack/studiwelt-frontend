import { StyleComparison } from './StyleComparison';
import { TransformationTable } from './TransformationTable';
import { StyleToggle } from './StyleToggle';

export function Lesson09NominalizationTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
