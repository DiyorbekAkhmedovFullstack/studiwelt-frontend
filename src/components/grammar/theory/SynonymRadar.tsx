import { useState } from 'react';

type Question = {
  matchId: string;
  label: string;
  question: string;
  hint: string;
};

export function SynonymRadar() {
  const [activeMatch, setActiveMatch] = useState<string | null>(null);

  const questions: Question[] = [
    {
      matchId: 'match-1',
      label: 'Frage 1',
      question: 'Welches Risiko wird im Text genannt?',
      hint: 'Suche nach: "Aushöhlung der Privatsphäre"',
    },
    {
      matchId: 'match-2',
      label: 'Frage 2',
      question: 'Welche positiven Aspekte nennen die Unterstützer?',
      hint: 'Suche nach: "Befürworter... ökologische Vorteile"',
    },
    {
      matchId: 'match-3',
      label: 'Frage 3',
      question: 'Was ist eine notwendige Voraussetzung?',
      hint: 'Suche nach: "unabdingbar... einzubeziehen"',
    },
  ];

  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        {/* Left: Text Panel */}
        <div className="bg-surface p-10 rounded-[24px] shadow-card relative before:absolute before:top-0 before:left-0 before:w-full before:h-[6px] before:bg-primary before:opacity-80 before:rounded-t-[24px]">
          <h3 className="text-xs sm:text-sm md:text-[1.3rem] font-serif mb-6">
            Smart Cities: Zukunft oder Überwachung?
          </h3>

          <div className="text-xs sm:text-sm md:text-[1.1rem] font-serif leading-relaxed space-y-6">
            <p>
              Die Digitalisierung städtischer Infrastrukturen verspricht effizientere Abläufe.{' '}
              <span
                className={`rounded px-0.5 transition-all duration-300 ${
                  activeMatch === 'match-1'
                    ? 'bg-[#FFF9E5] border-b-2 border-[#D9A441]'
                    : 'bg-transparent'
                }`}
              >
                Kritiker warnen jedoch vor einer Aushöhlung der Privatsphäre
              </span>{' '}
              durch die ständige Datenerfassung.
            </p>

            <p>
              <span
                className={`rounded px-0.5 transition-all duration-300 ${
                  activeMatch === 'match-2'
                    ? 'bg-[#FFF9E5] border-b-2 border-[#D9A441]'
                    : 'bg-transparent'
                }`}
              >
                Während Befürworter auf die ökologischen Vorteile hinweisen
              </span>
              , etwa durch intelligente Verkehrssteuerung, bleibt die Finanzierung oft ungeklärt.
            </p>

            <p>
              Es ist{' '}
              <span
                className={`rounded px-0.5 transition-all duration-300 ${
                  activeMatch === 'match-3'
                    ? 'bg-[#FFF9E5] border-b-2 border-[#D9A441]'
                    : 'bg-transparent'
                }`}
              >
                unabdingbar, die Bürger frühzeitig in den Planungsprozess einzubeziehen
              </span>
              , um Akzeptanz zu schaffen.
            </p>
          </div>
        </div>

        {/* Right: Questions Panel */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-[100px] lg:h-fit">
          {questions.map((q, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveMatch(q.matchId)}
              onMouseLeave={() => setActiveMatch(null)}
              className="bg-white p-6 rounded-[16px] border-l-4 border-[#E3D4C5] shadow-card transition-all hover:-translate-x-1 hover:border-[#D9A441] cursor-default group"
            >
              <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] block uppercase tracking-wider mb-2">
                {q.label}
              </span>
              <div className="text-text-main font-semibold">{q.question}</div>
              <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mt-2 italic opacity-0 group-hover:opacity-100 transition-opacity">
                {q.hint}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
