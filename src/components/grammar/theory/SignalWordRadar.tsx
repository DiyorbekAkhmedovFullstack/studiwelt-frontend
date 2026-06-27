type SignalCategory = {
  title: string;
  note: string;
  example: string;
  highlight: string;
};

export function SignalWordRadar() {
  const categories: SignalCategory[] = [
    {
      title: 'Strukturierung / Reihenfolge',
      note: 'Zeigt, wo im Vortrag du dich befindest: "Zunächst", "Im Folgenden", "Abschließend".',
      example:
        'Zunächst möchte ich den historischen Hintergrund umreißen, bevor ich zu den aktuellen Zahlen komme.',
      highlight: 'Zunächst',
    },
    {
      title: 'Widerspruch / Einschränkung',
      note: 'Hier steht oft die eigentliche Prüfungsantwort: "Allerdings", "Jedoch", "Gleichwohl".',
      example:
        'Elektroautos gelten als umweltfreundlich. Allerdings ist ihre Batterieherstellung sehr energieintensiv.',
      highlight: 'Allerdings',
    },
    {
      title: 'Begründung',
      note: 'Nennt eine Ursache: "Dies liegt daran, dass", "Ursächlich hierfür ist".',
      example:
        'Die Mieten steigen rasant. Dies liegt vor allem daran, dass in den Städten zu wenig gebaut wird.',
      highlight: 'Dies liegt vor allem daran, dass',
    },
    {
      title: 'Beispiel / Veranschaulichung',
      note: 'Belegt eine Aussage und ist selten die Kernantwort: "Veranschaulichen lässt sich dies am Beispiel".',
      example:
        'Viele Länder setzen auf Windkraft. Veranschaulichen lässt sich dies am Beispiel Dänemarks.',
      highlight: 'Veranschaulichen lässt sich dies am Beispiel',
    },
    {
      title: 'Schlussfolgerung / Fazit',
      note: 'Bündelt die Kernaussage: "Daraus folgt", "Somit", "Es lässt sich festhalten".',
      example:
        'Die Kosten steigen, die Nachfrage sinkt. Daraus folgt, dass sich das Modell langfristig nicht trägt.',
      highlight: 'Daraus folgt, dass',
    },
    {
      title: 'Betonung / Wichtigkeit',
      note: 'Markiert Kerninfo, oft zusätzlich langsamer und lauter gesprochen: "Entscheidend ist".',
      example:
        'Entscheidend ist dabei, dass die Maßnahmen frühzeitig greifen — sonst scheitert das gesamte Konzept.',
      highlight: 'Entscheidend ist',
    },
    {
      title: 'Umformulierung / Präzisierung',
      note: 'Wiederholt dieselbe Aussage neu — deine zweite Chance: "Mit anderen Worten", "Anders gesagt".',
      example:
        'Die Studie ist nicht repräsentativ. Mit anderen Worten: Ihre Ergebnisse lassen sich nicht verallgemeinern.',
      highlight: 'Mit anderen Worten',
    },
  ];

  const renderExample = (text: string, hl: string) => {
    const idx = text.indexOf(hl);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-text-main bg-[rgba(217,164,65,0.22)] px-1 rounded font-semibold border-b-2 border-[#D9A441]">
          {hl}
        </span>
        {text.slice(idx + hl.length)}
      </>
    );
  };

  return (
    <section className="mb-12 sm:mb-16 md:mb-20">
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-3 sm:mb-4 md:mb-5">
        Gliederungssignale im Kontext
      </h3>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-5 sm:mb-6">
        Höre nicht auf jedes Wort, sondern auf diese "Wegweiser". Jedes Signal kündigt an, was als
        Nächstes kommt — hier jeweils mit einem Beispiel aus einer Vorlesung.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {categories.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border-l-[3px] sm:border-l-4 border-[#E3D4C5] flex flex-col"
          >
            <strong className="text-text-main text-sm sm:text-base block mb-1">{card.title}</strong>
            <p className="text-xs sm:text-sm md:text-base mb-3">{card.note}</p>
            <div className="mt-auto bg-[#FAF6F3] rounded-[10px] sm:rounded-[12px] p-3 sm:p-3.5 border-l-2 border-[#D9A441] font-serif text-xs sm:text-sm md:text-base leading-relaxed">
              {renderExample(card.example, card.highlight)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
