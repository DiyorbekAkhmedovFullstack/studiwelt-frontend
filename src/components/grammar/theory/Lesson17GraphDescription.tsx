import { TrendMonitor } from './TrendMonitor';
import { PrepositionCalculator } from './PrepositionCalculator';
import { RedemittelPhrasebook } from './RedemittelPhrasebook';

export function Lesson17GraphDescription() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          In Prüfungen wie TestDaF und DSH müssen Grafiken präzise analysiert werden. Wichtig ist
          der Wechsel zwischen Verbalstil (B2) und Nominalstil (C1) sowie die korrekte Nutzung von
          Präpositionen.
        </p>
      </section>

      <TrendMonitor />
      <PrepositionCalculator />
      <RedemittelPhrasebook />
    </>
  );
}
