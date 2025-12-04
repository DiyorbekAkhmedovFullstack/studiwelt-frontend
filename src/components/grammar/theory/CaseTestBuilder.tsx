import { useState } from 'react';

type CaseType = 'nom' | 'akk' | 'dat' | 'gen';

type CaseData = {
  start: string;
  end: string;
  hasN: boolean;
};

export function CaseTestBuilder() {
  const [selectedCase, setSelectedCase] = useState<CaseType>('nom');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNAnimation, setShowNAnimation] = useState(false);

  const cases: Record<CaseType, CaseData> = {
    nom: { start: 'Der', end: 'lernt viel.', hasN: false },
    akk: { start: 'Ich sehe den', end: '.', hasN: true },
    dat: { start: 'Ich spreche mit dem', end: '.', hasN: true },
    gen: { start: 'Das Buch des', end: 'liegt hier.', hasN: true },
  };

  const caseLabels: Record<CaseType, string> = {
    nom: 'Nominativ',
    akk: 'Akkusativ',
    dat: 'Dativ',
    gen: 'Genitiv',
  };

  const handleCaseChange = (type: CaseType) => {
    if (type === selectedCase) return;

    setIsTransitioning(true);
    setShowNAnimation(false);

    setTimeout(() => {
      setSelectedCase(type);
      setIsTransitioning(false);

      if (cases[type].hasN) {
        // Trigger scale animation for N
        setTimeout(() => {
          setShowNAnimation(true);
          setTimeout(() => setShowNAnimation(false), 300);
        }, 100);
      }
    }, 200);
  };

  const currentCase = cases[selectedCase];

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-2">Der Kasus-Test</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">
          Wähle einen Fall für das Wort "Student". Achte auf das N.
        </p>
      </div>

      {/* Case Selector Buttons */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-7 md:mb-8 flex-wrap">
        {(Object.keys(cases) as CaseType[]).map((caseType) => (
          <button
            key={caseType}
            onClick={() => handleCaseChange(caseType)}
            className={`text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2 sm:py-2.5 border rounded-[30px] sm:rounded-[35px] md:rounded-[40px] font-semibold transition-all ${
              selectedCase === caseType
                ? 'bg-text-main text-white border-text-main'
                : 'bg-white text-text-muted border-[rgba(0,0,0,0.1)] hover:-translate-y-0.5'
            }`}
          >
            {caseLabels[caseType]}
          </button>
        ))}
      </div>

      {/* Sentence Stage */}
      <div
        className="text-center text-sm sm:text-base md:text-lg lg:text-xl bg-body p-4 sm:p-6 md:p-8 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] min-h-[80px] sm:min-h-[90px] md:min-h-[100px] flex items-center justify-center font-serif transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <span>{currentCase.start}</span>
        &nbsp;Student
        <span
          className="text-[#C07766] font-bold border-b-2 border-dashed border-[#C07766] pb-0.5 transition-all duration-300"
          style={{
            opacity: currentCase.hasN ? 1 : 0,
            width: currentCase.hasN ? 'auto' : 0,
            display: currentCase.hasN ? 'inline-block' : 'inline',
            overflow: 'hidden',
            paddingLeft: currentCase.hasN ? '1px' : 0,
            marginRight: currentCase.hasN ? '1px' : 0,
            transform: showNAnimation ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          en
        </span>
        &nbsp;<span>{currentCase.end}</span>
      </div>
    </section>
  );
}
