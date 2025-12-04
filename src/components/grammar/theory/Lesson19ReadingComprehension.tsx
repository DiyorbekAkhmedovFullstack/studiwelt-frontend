import { SynonymRadar } from './SynonymRadar';
import { TextReconstruction } from './TextReconstruction';

export function Lesson19ReadingComprehension() {
  return (
    <>
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          In der C1-Prüfung stehen die Antworten nie 1:1 im Text. Du musst Paraphrasen
          (Umschreibungen) erkennen und logische Lücken füllen.
        </p>
      </section>

      <SynonymRadar />
      <TextReconstruction />
    </>
  );
}
