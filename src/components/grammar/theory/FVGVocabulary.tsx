type VocabItem = {
  simpleVerb: string;
  fvgPhrase: string;
  preposition?: string;
};

function VocabCard({ simpleVerb, fvgPhrase, preposition }: VocabItem) {
  return (
    <div className="bg-surface p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border border-transparent shadow-card transition-all hover:-translate-y-1 hover:border-[#E3D4C5] flex flex-col">
      {/* Simple Verb */}
      <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] mb-2 flex items-center gap-1.5">
        {simpleVerb}
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>

      {/* FVG Phrase */}
      <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold">
        {fvgPhrase}
        {preposition && (
          <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] inline-block bg-[#F0F0F0] px-1.5 py-0.5 rounded ml-2 font-sans align-middle font-medium">
            {preposition}
          </span>
        )}
      </div>
    </div>
  );
}

export function FVGVocabulary() {
  // 20 gängige, standardsprachliche Funktionsverbgefüge (Verb + Nomen, ggf. Präposition).
  // Das Präpositions-Badge zeigt Präposition + Kasus des Objekts (sofern vorhanden).
  const vocabularyItems: VocabItem[] = [
    { simpleVerb: 'entscheiden', fvgPhrase: 'eine Entscheidung treffen' },
    { simpleVerb: 'fragen', fvgPhrase: 'eine Frage stellen' },
    { simpleVerb: 'beantragen', fvgPhrase: 'einen Antrag stellen', preposition: 'auf + Akk.' },
    { simpleVerb: 'helfen', fvgPhrase: 'Hilfe leisten' },
    { simpleVerb: 'kritisieren', fvgPhrase: 'Kritik üben', preposition: 'an + Dativ' },
    { simpleVerb: 'beeinflussen', fvgPhrase: 'Einfluss nehmen', preposition: 'auf + Akk.' },
    { simpleVerb: 'berücksichtigen', fvgPhrase: 'Rücksicht nehmen', preposition: 'auf + Akk.' },
    { simpleVerb: 'sich verabschieden', fvgPhrase: 'Abschied nehmen', preposition: 'von + Dativ' },
    { simpleVerb: 'verzichten', fvgPhrase: 'Verzicht leisten', preposition: 'auf + Akk.' },
    { simpleVerb: 'wichtig sein', fvgPhrase: 'eine Rolle spielen' },
    { simpleVerb: 'ausdrücken', fvgPhrase: 'zum Ausdruck bringen' },
    { simpleVerb: 'bereitstellen', fvgPhrase: 'zur Verfügung stellen' },
    { simpleVerb: 'bezweifeln', fvgPhrase: 'in Frage stellen' },
    { simpleVerb: 'erwägen', fvgPhrase: 'in Betracht ziehen' },
    { simpleVerb: 'sich äußern', fvgPhrase: 'Stellung nehmen', preposition: 'zu + Dativ' },
    { simpleVerb: 'informieren', fvgPhrase: 'in Kenntnis setzen', preposition: 'von + Dativ' },
    { simpleVerb: 'nutzen', fvgPhrase: 'in Anspruch nehmen' },
    { simpleVerb: 'beauftragen', fvgPhrase: 'in Auftrag geben' },
    { simpleVerb: 'wirksam werden', fvgPhrase: 'in Kraft treten' },
    { simpleVerb: 'sich widersetzen', fvgPhrase: 'Widerstand leisten', preposition: 'gegen + Akk.' },
  ];

  return (
    <section>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Wichtige Verbindungen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {vocabularyItems.map((item, index) => (
          <VocabCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
