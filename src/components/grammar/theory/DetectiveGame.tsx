import { useState } from 'react';

type EvidenceType = 'must' | 'could' | 'claim' | null;

type Evidence = {
  id: EvidenceType;
  title: string;
  description: string;
};

type Conclusion = {
  text: string;
  verb: string;
  explanation: string;
};

export function DetectiveGame() {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceType>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const evidences: Evidence[] = [
    {
      id: 'must',
      title: 'Beweis A (Stark)',
      description: 'Die Katze hat Scherben an den Pfoten.',
    },
    {
      id: 'could',
      title: 'Beweis B (Schwach)',
      description: 'Das Fenster war offen (Wind?).',
    },
    {
      id: 'claim',
      title: 'Beweis C (Aussage)',
      description: 'Der Hund behauptet, er habe geschlafen.',
    },
  ];

  const conclusions: Record<Exclude<EvidenceType, null>, Conclusion> = {
    must: {
      text: 'Es ',
      verb: 'muss',
      explanation: ' die Katze gewesen sein. (Logik 99%)',
    },
    could: {
      text: 'Es ',
      verb: 'könnte',
      explanation: ' der Wind gewesen sein. (Möglichkeit 50%)',
    },
    claim: {
      text: 'Der Hund ',
      verb: 'will',
      explanation: ' geschlafen haben. (Zweifelhafte Selbstbehauptung)',
    },
  };

  const handleEvidenceClick = (type: EvidenceType) => {
    if (type === selectedEvidence) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedEvidence(type);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="text-center bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-2">Der Grammatik-Detektiv</h2>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6">
        Wähle einen Hinweis und ziehe die logische Schlussfolgerung.
      </p>

      {/* Scenario Box */}
      <div className="bg-[#F2F0EB] p-4 sm:p-5 md:p-6 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] mb-6 sm:mb-7 md:mb-8 w-full text-xs sm:text-sm md:text-base">
        <strong>Situation:</strong> Jemand hat die Vase zerbrochen. Wir suchen den Täter.
      </div>

      {/* Evidence Buttons */}
      <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8 flex-wrap">
        {evidences.map((evidence) => (
          <button
            key={evidence.id}
            onClick={() => handleEvidenceClick(evidence.id)}
            className={`bg-white border-2 p-3 sm:p-4 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] cursor-pointer text-left transition-all w-full sm:max-w-[200px] md:max-w-[220px] ${
              selectedEvidence === evidence.id
                ? 'border-primary bg-[#FAF6F3]'
                : 'border-[rgba(0,0,0,0.1)] hover:border-[#E3D4C5]'
            }`}
          >
            <span className="text-text-main text-xs sm:text-sm md:text-base block font-bold mb-1">{evidence.title}</span>
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem]">{evidence.description}</span>
          </button>
        ))}
      </div>

      {/* Conclusion Display */}
      <div
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.4rem] font-serif min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.4s ease',
        }}
      >
        {selectedEvidence ? (
          <span>
            {conclusions[selectedEvidence].text}
            <span className="text-primary font-bold border-b-2 border-dashed border-primary px-1 mx-1">
              {conclusions[selectedEvidence].verb}
            </span>
            {conclusions[selectedEvidence].explanation}
          </span>
        ) : (
          <span className="text-[#CCC]">Wähle einen Beweis...</span>
        )}
      </div>
    </section>
  );
}
