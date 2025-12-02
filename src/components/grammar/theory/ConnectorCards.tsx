import type { ReactNode } from 'react';

type ConnectorType = 'add' | 'contrast' | 'cond' | 'alt';

type Connector = {
  type: ConnectorType;
  logicTag: string;
  icon: ReactNode;
  title: string;
  syntaxGuide: string;
  example: string;
};

export function ConnectorCards() {
  const connectors: Connector[] = [
    {
      type: 'cond',
      logicTag: 'Vergleich',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D9A441"
          strokeWidth="2"
        >
          <path d="M3 6l6 6 6-6M3 18l6-6 6 6" />
        </svg>
      ),
      title: 'Je ... desto/umso',
      syntaxGuide: 'NS (Verb Ende), HS (Verb Pos 2)',
      example: '<strong>Je</strong> mehr man übt, <strong>desto</strong> besser <em>wird</em> man.',
    },
    {
      type: 'add',
      logicTag: 'Addition',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6B8C6E"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
      title: 'Nicht nur ... sondern auch',
      syntaxGuide: 'HS (Pos 0), HS (Pos 0)',
      example:
        'Er spricht <strong>nicht nur</strong> Deutsch, <strong>sondern</strong> (er) <em>spricht</em> <strong>auch</strong> Spanisch.',
    },
    {
      type: 'contrast',
      logicTag: 'Einschränkung',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C07766"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      ),
      title: 'Zwar ... aber',
      syntaxGuide: 'HS (Pos 1/3), HS (Pos 0)',
      example:
        '<strong>Zwar</strong> <em>ist</em> die Wohnung teuer, <strong>aber</strong> sie liegt zentral.',
    },
    {
      type: 'alt',
      logicTag: 'Alternative',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M4 20h5M4 20v-5" />
        </svg>
      ),
      title: 'Entweder ... oder',
      syntaxGuide: 'HS (Pos 0), HS (Pos 0)',
      example:
        '<strong>Entweder</strong> wir <em>fahren</em> jetzt, <strong>oder</strong> wir <em>bleiben</em> hier.',
    },
  ];

  const getTypeClasses = (type: ConnectorType) => {
    switch (type) {
      case 'add':
        return {
          border: 'border-t-[#6B8C6E]',
          tag: 'text-[#6B8C6E]',
        };
      case 'contrast':
        return {
          border: 'border-t-[#C07766]',
          tag: 'text-[#C07766]',
        };
      case 'cond':
        return {
          border: 'border-t-[#D9A441]',
          tag: 'text-[#D9A441]',
        };
      case 'alt':
        return {
          border: 'border-t-text-muted',
          tag: 'text-text-muted',
        };
    }
  };

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectors.map((connector, index) => {
          const classes = getTypeClasses(connector.type);
          return (
            <div
              key={index}
              className={`bg-surface rounded-[24px] p-8 shadow-card border-t-[6px] ${classes.border} transition-transform hover:-translate-y-1`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <span className={`text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.75rem] uppercase tracking-wider font-bold ${classes.tag}`}>
                  {connector.logicTag}
                </span>
                {connector.icon}
              </div>

              {/* Title */}
              <div className="text-xs sm:text-sm md:text-[1.3rem] font-serif font-bold mb-3">
                {connector.title}
              </div>

              {/* Syntax Guide */}
              <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] font-mono bg-[#FAF6F3] px-3 py-2 rounded-md mb-4 inline-block">
                {connector.syntaxGuide}
              </div>

              {/* Example */}
              <p
                className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: connector.example }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
