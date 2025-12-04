import { useState } from 'react';

type RegisterType = 'informal' | 'formal';

type RegisterContent = {
  title: string;
  desc: string;
  grammar: string;
  text: string;
};

export function RegisterSwitcher() {
  const [register, setRegister] = useState<RegisterType>('informal');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const content: Record<RegisterType, RegisterContent> = {
    informal: {
      title: 'Ratschlag geben',
      desc: 'Ein Freund fragt dich, ob er das Studium abbrechen soll.',
      grammar: 'Konjunktiv II (Du-Form)',
      text: '"Mensch, an deiner Stelle würde ich mir das gut überlegen. Hast du mal mit der Studienberatung geredet?"',
    },
    formal: {
      title: 'Stellungnahme',
      desc: 'Diskussion im Seminar über Studienabbruchquoten.',
      grammar: 'Passiv / Unpersönlich',
      text: '"Es ist zu beachten, dass ein Studienabbruch weitreichende Folgen hat. Es sollte frühzeitig Beratung in Anspruch genommen werden."',
    },
  };

  const handleRegisterChange = (type: RegisterType) => {
    if (type === register) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setRegister(type);
      setIsTransitioning(false);
    }, 200);
  };

  const currentContent = content[register];
  const borderColor = register === 'informal' ? '#D9A441' : '#4A7C8C';

  return (
    <section
      className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border-t-[4px] sm:border-t-[5px] md:border-t-[6px] transition-all duration-300"
      style={{ borderColor }}
    >
      {/* Header with Toggle */}
      <div className="flex justify-between items-center mb-6 sm:mb-7 md:mb-8">
        <div className="flex bg-[#F0F0F0] p-1 rounded-full">
          <button
            onClick={() => handleRegisterChange('informal')}
            className={`text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition-all ${
              register === 'informal'
                ? 'bg-[#D9A441] text-white'
                : 'bg-transparent text-text-muted'
            }`}
          >
            Mensa (Informell)
          </button>
          <button
            onClick={() => handleRegisterChange('formal')}
            className={`text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition-all ${
              register === 'formal'
                ? 'bg-[#4A7C8C] text-white'
                : 'bg-transparent text-text-muted'
            }`}
          >
            Seminar (Formell)
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
        {/* Left: Scenario Description */}
        <div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-2">{currentContent.title}</h3>
          <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{currentContent.desc}</p>
          <div className="text-xs sm:text-sm md:text-base font-semibold">
            Grammatik: <span className="font-normal">{currentContent.grammar}</span>
          </div>
        </div>

        {/* Right: Speech Bubble */}
        <div
          className="text-sm sm:text-base md:text-lg lg:text-xl bg-[#FAF6F3] p-4 sm:p-5 md:p-6 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] rounded-bl-none font-serif min-h-[100px] sm:min-h-[110px] md:min-h-[120px] flex items-center transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {currentContent.text}
        </div>
      </div>
    </section>
  );
}
