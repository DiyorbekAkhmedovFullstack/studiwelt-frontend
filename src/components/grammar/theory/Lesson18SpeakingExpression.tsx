import { RegisterSwitcher } from './RegisterSwitcher';
import { ArgumentationFlow } from './ArgumentationFlow';
import { TimerSimulator } from './TimerSimulator';
import { FillerPhrases } from './FillerPhrases';

export function Lesson18SpeakingExpression() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          In der mündlichen Prüfung zählt nicht nur Korrektheit, sondern Struktur und Register. Du
          musst zeigen, dass du sowohl mit Kommilitonen (informell) als auch mit Dozenten (formell)
          sprechen kannst.
        </p>
      </section>

      <RegisterSwitcher />
      <ArgumentationFlow />
      <TimerSimulator />
      <FillerPhrases />
    </>
  );
}
