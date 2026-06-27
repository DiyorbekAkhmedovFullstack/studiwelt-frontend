type SignalWord = {
  word: string;
  role: string;
};

type InfoCard = {
  title: string;
  description: string;
};

export function SignalWordRadar() {
  const signalWords: SignalWord[] = [
    { word: 'Zunächst einmal', role: 'Start des Themas' },
    { word: 'Allerdings', role: 'Gegensatz / Problem' },
    { word: 'Dies liegt daran, dass', role: 'Grund / Ursache' },
    { word: 'Veranschaulichen lässt sich dies am', role: 'Beispiel' },
  ];

  const infoCards: InfoCard[] = [
    {
      title: 'Strukturierung / Reihenfolge',
      description:
        '"Zunächst", "Als Nächstes", "Im Folgenden", "Abschließend". Sie zeigen dir, an welcher Stelle der Vorlesung (und des Fragenbogens) du dich befindest.',
    },
    {
      title: 'Widerspruch / Einschränkung',
      description:
        '"Allerdings", "Jedoch", "Demgegenüber", "Gleichwohl". Hier kommt oft die eigentliche Prüfungsantwort — die "Falle" wird aufgelöst.',
    },
    {
      title: 'Begründung',
      description:
        '"Dies liegt daran, dass", "Dies ist darauf zurückzuführen", "Ursächlich hierfür ist". Achte auf Ursache und Wirkung.',
    },
    {
      title: 'Beispiel / Veranschaulichung',
      description:
        '"Veranschaulichen lässt sich dies am Beispiel", "So etwa", "Man denke an". Illustrationen sind meist nicht die Kernantwort, sondern Belege.',
    },
    {
      title: 'Schlussfolgerung / Fazit',
      description:
        '"Daraus folgt, dass", "Somit", "Es lässt sich festhalten", "Zusammenfassend". Hier wird die Kernaussage gebündelt.',
    },
    {
      title: 'Betonung / Wichtigkeit',
      description:
        '"Entscheidend ist", "Hervorzuheben ist", "Besonders wichtig". Oft zusätzlich durch langsameres, lauteres Sprechen markiert — unbedingt notieren.',
    },
    {
      title: 'Umformulierung / Präzisierung',
      description:
        '"Mit anderen Worten", "Anders gesagt", "Genauer gesagt". Dieselbe Aussage neu formuliert — deine zweite Chance, wenn du etwas verpasst hast.',
    },
  ];

  return (
    <section className="mb-12 sm:mb-16 md:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {/* Left: Simulated Hearing Experience */}
        <div className="text-sm sm:text-base md:text-lg lg:text-[1.1rem] bg-surface p-5 sm:p-6 md:p-8 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card font-serif leading-loose">
          <span className="text-transparent blur-[8px] select-none">
            Lorem ipsum dolor sit amet, consectetur
          </span>{' '}
          <span className="text-text-main relative group bg-[rgba(217,164,65,0.2)] px-1.5 py-0.5 rounded font-bold cursor-pointer border-b-2 border-[#D9A441]">
            {signalWords[0].word}
            <span className="text-white text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-text-main px-2 py-1 rounded font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {signalWords[0].role}
            </span>
          </span>{' '}
          <span className="text-transparent blur-[8px] select-none">
            adipiscing elit sed do eiusmod tempor
          </span>{' '}
          <span className="text-text-main relative group bg-[rgba(217,164,65,0.2)] px-1.5 py-0.5 rounded font-bold cursor-pointer border-b-2 border-[#D9A441]">
            {signalWords[1].word}
            <span className="text-white text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-text-main px-2 py-1 rounded font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {signalWords[1].role}
            </span>
          </span>{' '}
          <span className="text-transparent blur-[8px] select-none">
            incididunt ut labore et dolore magna aliqua
          </span>{' '}
          <span className="text-text-main relative group bg-[rgba(217,164,65,0.2)] px-1.5 py-0.5 rounded font-bold cursor-pointer border-b-2 border-[#D9A441]">
            {signalWords[2].word}
            <span className="text-white text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-text-main px-2 py-1 rounded font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {signalWords[2].role}
            </span>
          </span>{' '}
          <span className="text-transparent blur-[8px] select-none">
            ut enim ad minim veniam quis nostrud
          </span>{' '}
          <span className="text-text-main relative group bg-[rgba(217,164,65,0.2)] px-1.5 py-0.5 rounded font-bold cursor-pointer border-b-2 border-[#D9A441]">
            {signalWords[3].word}
            <span className="text-white text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-text-main px-2 py-1 rounded font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {signalWords[3].role}
            </span>
          </span>{' '}
          <span className="text-transparent blur-[8px] select-none">
            exercitation ullamco laboris nisi ut aliquip
          </span>
          .
        </div>

        {/* Right: Info Cards */}
        <div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-3 sm:mb-4">Gliederungssignale</h3>
          <div className="space-y-3 sm:space-y-4">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border-l-[3px] sm:border-l-4 border-[#E3D4C5]"
              >
                <strong className="text-text-main text-sm sm:text-base block mb-1">{card.title}</strong>
                <p className="text-xs sm:text-sm md:text-base">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
