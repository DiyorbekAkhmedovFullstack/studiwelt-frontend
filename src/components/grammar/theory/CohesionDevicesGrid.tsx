type CohesionDevice = {
  category: string;
  description: string;
  devices: string[];
  examples: {
    text: string;
    explanation: string;
  }[];
  color: string;
};

export function CohesionDevicesGrid() {
  const cohesionDevices: CohesionDevice[] = [
    {
      category: 'Referenzmittel',
      description: 'Wörter, die auf bereits Genanntes verweisen',
      devices: ['Pronomen (er, sie, es, dieser, jener)', 'Synonyme', 'Oberbegriffe/Unterbegriffe'],
      examples: [
        {
          text: 'Maria kaufte ein Auto. Es war rot.',
          explanation: 'Pronomen "es" verweist auf "Auto"',
        },
        {
          text: 'Der Student lernt. Der junge Mann ist fleißig.',
          explanation: 'Synonym: "der junge Mann" = "der Student"',
        },
      ],
      color: 'bg-[#E3F2FD] border-[#1565C0]',
    },
    {
      category: 'Konnektoren',
      description: 'Verbindungswörter zwischen Sätzen und Textteilen',
      devices: [
        'Temporale: dann, danach, zuvor, anschließend',
        'Kausale: deshalb, daher, folglich, nämlich',
        'Adversative: jedoch, allerdings, trotzdem, dennoch',
        'Additive: außerdem, zudem, darüber hinaus',
      ],
      examples: [
        {
          text: 'Es regnete. Deshalb blieb ich zu Hause.',
          explanation: 'Kausaler Konnektor: "deshalb" zeigt Grund-Folge-Beziehung',
        },
        {
          text: 'Ich wollte lernen. Allerdings war ich müde.',
          explanation: 'Adversativer Konnektor: "allerdings" zeigt Kontrast',
        },
      ],
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
    },
    {
      category: 'Ellipsen',
      description: 'Weglassen von Satzteilen, die aus dem Kontext klar sind',
      devices: ['Subjektellipse', 'Verbellipse', 'Objektellipse'],
      examples: [
        {
          text: 'Maria lernt Deutsch. Und [sie lernt] auch Englisch.',
          explanation: 'Subjekt und Verb werden weggelassen (aus Kontext klar)',
        },
        {
          text: 'Peter isst Pizza. Maria [isst] Pasta.',
          explanation: 'Verb "isst" wird beim zweiten Mal weggelassen',
        },
      ],
      color: 'bg-[#FFF3E0] border-[#E65100]',
    },
    {
      category: 'Artikelwahl',
      description: 'Bestimmte vs. unbestimmte Artikel für bekannte/neue Information',
      devices: [
        'Unbestimmter Artikel: neue Information einführen',
        'Bestimmter Artikel: bekannte Information aufgreifen',
      ],
      examples: [
        {
          text: 'Ein Mann betrat den Raum. Der Mann war groß.',
          explanation: 'Erst "ein Mann" (neu), dann "der Mann" (bekannt)',
        },
        {
          text: 'Ich kaufte ein Buch. Das Buch war interessant.',
          explanation: '"Ein Buch" führt neue Info ein, "das Buch" greift sie auf',
        },
      ],
      color: 'bg-[#F3E5F5] border-[#6A1B9A]',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Kohäsionsmittel: Textzusammenhang herstellen
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        <strong>Kohäsionsmittel</strong> sind sprachliche Mittel, die Texte{' '}
        <strong>formal</strong> zusammenhalten. Sie schaffen klare Bezüge zwischen Sätzen.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {cohesionDevices.map((device, index) => (
          <div
            key={index}
            className={`${device.color} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border-l-4`}
          >
            {/* Category */}
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-text-main mb-2">
                {device.category}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted italic">{device.description}</p>
            </div>

            {/* Devices */}
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
              <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-2 font-bold">
                Mittel
              </div>
              <ul className="space-y-1.5">
                {device.devices.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="text-xs sm:text-sm text-text-main">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="space-y-3">
              {device.examples.map((example, exIdx) => (
                <div key={exIdx} className="bg-white rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                    {example.text}
                  </p>
                  <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                    → {example.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
