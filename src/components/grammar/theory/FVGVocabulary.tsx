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
  const vocabularyItems: VocabItem[] = [
    { simpleVerb: 'beenden', fvgPhrase: 'zum Abschluss bringen' },
    { simpleVerb: 'beantragen', fvgPhrase: 'einen Antrag stellen', preposition: 'auf' },
    { simpleVerb: 'beeinflussen', fvgPhrase: 'Einfluss nehmen', preposition: 'auf' },
    { simpleVerb: 'interessieren', fvgPhrase: 'Interesse wecken', preposition: 'an' },
    { simpleVerb: 'helfen', fvgPhrase: 'Hilfe leisten' },
    { simpleVerb: 'wichtig sein', fvgPhrase: 'eine Rolle spielen' },
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
