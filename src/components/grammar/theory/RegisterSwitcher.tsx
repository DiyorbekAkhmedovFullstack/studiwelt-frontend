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
      className="bg-surface rounded-[24px] shadow-card p-10 mb-16 border-t-[6px] transition-all duration-300"
      style={{ borderColor }}
    >
      {/* Header with Toggle */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex bg-[#F0F0F0] p-1 rounded-full">
          <button
            onClick={() => handleRegisterChange('informal')}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
              register === 'informal'
                ? 'bg-[#D9A441] text-white'
                : 'bg-transparent text-text-muted'
            }`}
          >
            Mensa (Informell)
          </button>
          <button
            onClick={() => handleRegisterChange('formal')}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Scenario Description */}
        <div>
          <h3 className="text-xs sm:text-sm md:text-[1.3rem] font-serif mb-2">{currentContent.title}</h3>
          <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-4">{currentContent.desc}</p>
          <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] font-semibold">
            Grammatik: <span className="font-normal">{currentContent.grammar}</span>
          </div>
        </div>

        {/* Right: Speech Bubble */}
        <div
          className="text-xs sm:text-sm md:text-[1.2rem] bg-[#FAF6F3] p-6 rounded-[16px] rounded-bl-none font-serif min-h-[120px] flex items-center transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {currentContent.text}
        </div>
      </div>
    </section>
  );
}
