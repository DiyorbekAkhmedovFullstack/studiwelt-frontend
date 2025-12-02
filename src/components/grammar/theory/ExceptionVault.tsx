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
    <section className="text-white mt-16 bg-text-main rounded-[24px] p-10">
      {/* Title */}
      <div className="text-sm sm:text-xs md:text-[1.2rem] flex items-center gap-3 font-serif mb-6">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Die Ausnahmen
      </div>

      {/* Exception Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exceptions.map((exception, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.1)] p-4 rounded-[16px] border border-[rgba(255,255,255,0.1)]"
          >
            <span className="block font-bold mb-1">{exception.word}</span>
            <span className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] opacity-70">{exception.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
