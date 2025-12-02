type Step = {
  number: string;
  title: string;
  phrases: string[];
};

export function ArgumentationFlow() {
  const steps: Step[] = [
    {
      number: '1',
      title: 'Standpunkt',
      phrases: [
        'Ich vertrete den Standpunkt, dass...',
        'Meiner Ansicht nach...',
        'Ich bin der festen Überzeugung, dass...',
      ],
    },
    {
      number: '2',
      title: 'Begründung',
      phrases: [
        'Das liegt vor allem daran, dass...',
        'Ein wesentlicher Grund hierfür ist...',
        'Dies lässt sich darauf zurückführen, dass...',
      ],
    },
    {
      number: '3',
      title: 'Beispiel',
      phrases: [
        'Verdeutlichen lässt sich dies am Beispiel...',
        'Hierzu möchte ich ein Beispiel anführen: ...',
        'Dies zeigt sich besonders bei...',
      ],
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Der Argumentations-Baukasten</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, index) => (
          <div key={index} className="bg-surface p-6 rounded-[16px] shadow-card flex flex-col">
            {/* Step Number (Giant Watermark) */}
            <div className="text-[3rem] font-black leading-none -mb-2.5">
              {step.number}
            </div>

            {/* Step Title */}
            <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-wider font-bold mb-3">
              {step.title}
            </div>

            {/* Phrases List */}
            <ul className="space-y-2">
              {step.phrases.map((phrase, idx) => (
                <li
                  key={idx}
                  className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] pl-3 border-l-2 border-[#E3D4C5]"
                >
                  {phrase}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
