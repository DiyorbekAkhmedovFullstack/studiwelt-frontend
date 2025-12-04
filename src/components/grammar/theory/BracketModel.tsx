export function BracketModel() {
  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <div className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col relative overflow-hidden">
        <div className="text-center text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif font-bold mb-4 sm:mb-5 md:mb-6">
          Das "Klammer"-Prinzip
        </div>

        {/* Bracket Visual */}
        <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex items-stretch justify-center font-serif gap-0.5 sm:gap-1 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pt-4 sm:pt-5">
          {/* Left Bracket (Article) */}
          <div className="text-text-main bg-[#FAF6F3] px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border sm:border-2 border-[#E3D4C5] font-bold flex items-center">
            Die
          </div>

          {/* Middle (Filling) */}
          <div className="text-primary bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t sm:border-t-2 border-b sm:border-b-2 border-dashed border-[#E3D4C5] flex items-center relative">
            vom Autor empfohlenen
            <span className="text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 uppercase bg-white px-1.5 sm:px-2 font-sans tracking-wider text-text-main font-semibold">
              Informationen
            </span>
          </div>

          {/* Right Bracket (Noun) */}
          <div className="text-text-main bg-[#FAF6F3] px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border sm:border-2 border-[#E3D4C5] font-bold flex items-center">
            Bücher
          </div>
        </div>

        {/* Explanation */}
        <p className="text-center text-xs sm:text-sm md:text-base mt-4 sm:mt-5 md:mt-6">
          Artikel und Nomen bilden den Rahmen. Alle Informationen stehen dazwischen.
        </p>
      </div>
    </section>
  );
}
