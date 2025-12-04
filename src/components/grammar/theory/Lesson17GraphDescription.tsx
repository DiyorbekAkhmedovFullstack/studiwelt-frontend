import { TrendMonitor } from './TrendMonitor';
import { PrepositionCalculator } from './PrepositionCalculator';
import { RedemittelPhrasebook } from './RedemittelPhrasebook';

export function Lesson17GraphDescription() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
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
