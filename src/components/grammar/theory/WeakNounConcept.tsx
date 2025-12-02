export function WeakNounConcept() {
  return (
    <section className="text-center bg-surface rounded-[24px] p-10 shadow-card mb-16 flex flex-col items-center">
      {/* Visual Diagram */}
      <div className="text-xs sm:text-sm md:text-[1.2rem] flex items-center gap-8 my-8 font-serif flex-wrap justify-center">
        {/* Strong Form (Nominativ) */}
        <div>
          <div className="px-6 py-4 border-2 border-[#E3D4C5] rounded-[16px]">
            Der Experte
          </div>
          <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] mt-2">Nominativ (Stark)</div>
        </div>

        {/* Arrow */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>

        {/* Weak Form (with N) */}
        <div>
          <div className="px-6 py-4 border-2 border-[#C07766] bg-[#FFF5F5] rounded-[16px]">
            Den Experte<span className="text-[#C07766] sm:text-xs md:text-[1.2rem] font-bold ml-0.5">n</span>
          </div>
          <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] mt-2">Akk/Dat/Gen (Schwach)</div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] max-w-[500px]">
        Stell dir vor, das Nomen ist zu schwach, um allein zu stehen, wenn sich der Kasus ändert.
        Es braucht das "N" als Krücke.
      </p>
    </section>
  );
}
