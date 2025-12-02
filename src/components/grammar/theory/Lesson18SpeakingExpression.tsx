import { RegisterSwitcher } from './RegisterSwitcher';
import { ArgumentationFlow } from './ArgumentationFlow';
import { TimerSimulator } from './TimerSimulator';
import { FillerPhrases } from './FillerPhrases';

export function Lesson18SpeakingExpression() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
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
