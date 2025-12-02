import { useState } from 'react';
import type { ReactNode } from 'react';

type LogicType = 'causal' | 'concessive' | 'final';

type LogicData = {
  sentence: ReactNode;
  explanation: ReactNode;
  color: string;
};

type LogicButtonProps = {
  logicType: LogicType;
  emoji: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function LogicButton({ logicType, emoji, label, isActive, onClick }: LogicButtonProps) {
  const activeClasses: Record<LogicType, string> = {
    causal: 'border-[#A67B5B] text-[#A67B5B] bg-[#F9F5F0]',
    concessive: 'border-[#C07766] text-[#C07766] bg-[#FFF5F5]',
    final: 'border-[#6B8C6E] text-[#6B8C6E] bg-[#F0F7F1]',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-[50px] border-2 bg-white font-semibold transition-all shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex items-center gap-2 ${
        isActive
          ? activeClasses[logicType]
          : 'border-transparent text-text-muted hover:-translate-y-0.5'
      }`}
    >
      <span className="text-xs sm:text-sm md:text-[1.2rem]">{emoji}</span> {label}
    </button>
  );
}

export function LogicSwitcher() {
  const [currentLogic, setCurrentLogic] = useState<LogicType>('concessive');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const logicData: Record<LogicType, LogicData> = {
    causal: {
      sentence: (
        <>
          Ich bleibe zu Hause,{' '}
          <span className="text-[#A67B5B] font-bold border-b-2 border-[#A67B5B] pb-0.5">
            weil
          </span>{' '}
          es regnet.
        </>
      ),
      explanation: (
        <>
          <strong>Weil</strong> gibt den Grund an. Logisch: Regen = Zu Hause bleiben.
        </>
      ),
      color: '#A67B5B',
    },
    concessive: {
      sentence: (
        <>
          Ich gehe spazieren,{' '}
          <span className="text-[#C07766] font-bold border-b-2 border-[#C07766] pb-0.5">
            obwohl
          </span>{' '}
          es regnet.
        </>
      ),
      explanation: (
        <>
          <strong>Obwohl</strong> drückt einen Gegensatz aus. Unlogisch: Regen = Trotzdem
          rausgehen.
        </>
      ),
      color: '#C07766',
    },
    final: {
      sentence: (
        <>
          Ich gehe raus,{' '}
          <span className="text-[#6B8C6E] font-bold border-b-2 border-[#6B8C6E] pb-0.5">
            um
          </span>{' '}
          nass{' '}
          <span className="text-[#6B8C6E] font-bold border-b-2 border-[#6B8C6E] pb-0.5">
            zu
          </span>{' '}
          werden.
        </>
      ),
      explanation: (
        <>
          <strong>Um... zu</strong> drückt ein Ziel aus. Absicht: Ich <em>will</em> nass werden.
        </>
      ),
      color: '#6B8C6E',
    },
  };

  const handleSwitch = (logicType: LogicType) => {
    if (logicType === currentLogic) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLogic(logicType);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">Der Logik-Wandler</h2>
        <p className="text-text-muted">
          Szenario: <strong>"Es regnet"</strong> + <strong>"Ich gehe spazieren"</strong>.
        </p>
      </div>

      {/* Sentence Stage */}
      <div className="my-10 min-h-[120px] bg-[#F5F2EB] rounded-[16px] p-8 flex items-center justify-center">
        <div
          className="text-xs sm:text-sm md:text-[1.3rem] font-serif transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {logicData[currentLogic].sentence}
        </div>
      </div>

      {/* Logic Controls */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <LogicButton
          logicType="causal"
          emoji="🤔"
          label="Kausal (Grund)"
          isActive={currentLogic === 'causal'}
          onClick={() => handleSwitch('causal')}
        />
        <LogicButton
          logicType="concessive"
          emoji="⛈️"
          label="Konzessiv (Gegensatz)"
          isActive={currentLogic === 'concessive'}
          onClick={() => handleSwitch('concessive')}
        />
        <LogicButton
          logicType="final"
          emoji="🎯"
          label="Final (Zweck)"
          isActive={currentLogic === 'final'}
          onClick={() => handleSwitch('final')}
        />
      </div>

      {/* Explanation */}
      <div
        className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mt-6 transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {logicData[currentLogic].explanation}
      </div>
    </section>
  );
}
