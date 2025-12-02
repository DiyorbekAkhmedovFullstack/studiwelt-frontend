import { AudioPlayerVisual } from './AudioPlayerVisual';
import { SignalWordRadar } from './SignalWordRadar';
import { ShorthandTrainer } from './ShorthandTrainer';

export function Lesson20ListeningComprehension() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          In akademischen Vorlesungen (TestDaF HV3 / DSH) verliert man schnell den Faden. Das
          Geheimnis: Höre nicht auf jedes Wort, sondern auf die "Wegweiser" (Signalwörter).
        </p>
      </section>

      <AudioPlayerVisual />
      <SignalWordRadar />
      <ShorthandTrainer />
    </>
  );
}
