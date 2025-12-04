import { AudioPlayerVisual } from './AudioPlayerVisual';
import { SignalWordRadar } from './SignalWordRadar';
import { ShorthandTrainer } from './ShorthandTrainer';

export function Lesson20ListeningComprehension() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
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
