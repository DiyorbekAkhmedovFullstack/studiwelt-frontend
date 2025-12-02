export function BracketModel() {
  return (
    <section className="mb-16">
      <div className="bg-surface rounded-[24px] shadow-card p-10 flex flex-col relative overflow-hidden">
        <div className="text-center sm:text-sm md:text-[1.2rem] font-serif font-bold mb-6">
          Das "Klammer"-Prinzip
        </div>

        {/* Bracket Visual */}
        <div className="text-xs sm:text-sm md:text-[1.2rem] flex items-stretch justify-center font-serif gap-1">
          {/* Left Bracket (Article) */}
          <div className="text-text-main bg-[#FAF6F3] px-6 py-4 rounded-[16px] border-2 border-[#E3D4C5] font-bold flex items-center">
            Die
          </div>

          {/* Middle (Filling) */}
          <div className="text-primary bg-white px-8 py-4 border-t-2 border-b-2 border-dashed border-[#E3D4C5] flex items-center relative">
            vom Autor empfohlenen
            <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] absolute -top-2.5 left-1/2 -translate-x-1/2 uppercase bg-white px-2 font-sans tracking-wider">
              Informationen
            </span>
          </div>

          {/* Right Bracket (Noun) */}
          <div className="text-text-main bg-[#FAF6F3] px-6 py-4 rounded-[16px] border-2 border-[#E3D4C5] font-bold flex items-center">
            Bücher
          </div>
        </div>

        {/* Explanation */}
        <p className="text-center sm:text-[0.5rem] md:text-[0.6rem] mt-6">
          Artikel und Nomen bilden den Rahmen. Alle Informationen stehen dazwischen.
        </p>
      </div>
    </section>
  );
}
