import { SynonymRadar } from './SynonymRadar';
import { TextReconstruction } from './TextReconstruction';

export function Lesson19ReadingComprehension() {
  return (
    <>
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
          In der C1-Prüfung stehen die Antworten nie 1:1 im Text. Du musst Paraphrasen
          (Umschreibungen) erkennen und logische Lücken füllen.
        </p>
      </section>

      <SynonymRadar />
      <TextReconstruction />
    </>
  );
}
