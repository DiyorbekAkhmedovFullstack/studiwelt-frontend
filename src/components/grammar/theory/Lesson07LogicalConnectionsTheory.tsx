import { LogicTriadGrid } from './LogicTriadGrid';
import { LogicSwitcher } from './LogicSwitcher';
import { SyntaxGuide } from './SyntaxGuide';

export function Lesson07LogicalConnectionsTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Wie verbinden wir Gedanken? Im B2-Niveau drücken wir Gründe, Gegengründe und Ziele
          präzise aus – und müssen dabei auf die Position des Verbs achten.
        </p>
      </section>

      {/* Logic Triad Grid */}
      <LogicTriadGrid />

      {/* Interactive Logic Switcher */}
      <LogicSwitcher />

      {/* Syntax Guide */}
      <SyntaxGuide />
    </>
  );
}
