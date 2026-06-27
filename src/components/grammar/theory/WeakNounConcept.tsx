import { Ui } from '../../../lib/icons';

export function WeakNounConcept() {
  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 shadow-card mb-8 sm:mb-12 md:mb-16 flex flex-col items-center">
      {/* Visual Diagram */}
      <div className="text-sm sm:text-base md:text-lg lg:text-xl flex items-center gap-4 sm:gap-6 md:gap-8 my-6 sm:my-7 md:my-8 font-serif flex-wrap justify-center">
        {/* Strong Form (Nominativ) */}
        <div>
          <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 border-2 border-[#E3D4C5] rounded-[12px] sm:rounded-[14px] md:rounded-[16px]">
            Der Experte
          </div>
          <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] mt-2">Nominativ (Stark)</div>
        </div>

        {/* Arrow */}
        <Ui.ArrowRight width={20} height={20} className="sm:w-6 sm:h-6" />

        {/* Weak Form (with N) */}
        <div>
          <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 border-2 border-[#C07766] bg-[#FFF5F5] rounded-[12px] sm:rounded-[14px] md:rounded-[16px]">
            Den Experte<span className="text-[#C07766] font-bold ml-0.5">n</span>
          </div>
          <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] mt-2">Akk/Dat/Gen (Schwach)</div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs sm:text-sm md:text-base max-w-[400px] sm:max-w-[500px]">
        Stell dir vor, das Nomen ist zu schwach, um allein zu stehen, wenn sich der Kasus ändert.
        Es braucht das "N" als Krücke.
      </p>
    </section>
  );
}
