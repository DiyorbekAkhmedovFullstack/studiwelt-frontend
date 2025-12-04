type Exception = {
  word: string;
  note: string;
};

export function ExceptionVault() {
  const exceptions: Exception[] = [
    {
      word: 'der Name (Genitiv: des Namens)',
      note: 'Extra "s" im Genitiv. Gilt auch für: Gedanke, Glaube, Wille.',
    },
    {
      word: 'das Herz (Neutral!)',
      note: 'Einziges neutrales Nomen. Genitiv: des Herzens. Dativ: dem Herzen.',
    },
    {
      word: 'der Herr',
      note: 'Singular: Herrn (kurz). Plural: Herren.',
    },
  ];

  return (
    <section className="text-white mt-8 sm:mt-12 md:mt-16 bg-text-main rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10">
      {/* Title */}
      <div className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] flex items-center gap-2 sm:gap-3 font-serif mb-4 sm:mb-5 md:mb-6">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="sm:w-6 sm:h-6"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Die Ausnahmen
      </div>

      {/* Exception Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {exceptions.map((exception, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.1)] p-3 sm:p-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border border-[rgba(255,255,255,0.1)]"
          >
            <span className="block font-bold mb-1 text-xs sm:text-sm md:text-base">{exception.word}</span>
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] opacity-70">{exception.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
