import { LogicTriadGrid } from './LogicTriadGrid';
import { LogicSwitcher } from './LogicSwitcher';
import { SyntaxGuide } from './SyntaxGuide';

export function Lesson07LogicalConnectionsTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
