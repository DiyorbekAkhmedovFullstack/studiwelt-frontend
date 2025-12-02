import { useState } from 'react';

type TransformationType = 'adj' | 'reflex' | 'noun';

type TransformationData = {
  text: string;
  note: string;
};

type LabButtonProps = {
  type: TransformationType;
  label: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
};

function LabButton({ label, color, isActive, onClick }: LabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-[50px] border font-semibold cursor-pointer transition-all flex items-center gap-2 ${
        isActive
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-text-main border-[rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
      }`}
    >
      <span style={{ color: isActive ? 'white' : color }}>●</span> {label}
    </button>
  );
}

export function TransformationLab() {
  const [selectedType, setSelectedType] = useState<TransformationType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transformations: Record<TransformationType, TransformationData> = {
    adj: {
      text: 'Die Handschrift ist <strong>unleserlich</strong>.',
      note: "Suffix '-lich' drückt hier die Unmöglichkeit aus.",
    },
    reflex: {
      text: 'Die Handschrift <strong>lässt sich nicht lesen</strong>.',
      note: "'Sich lassen' ist eine sehr elegante Alternative für 'können'.",
    },
    noun: {
      text: 'Die Handschrift ist <strong>nicht zu entziffern</strong>.',
      note: "'Sein + zu' drückt hier Unmöglichkeit aus (ähnlich wie 'müssen/können').",
    },
  };

  const handleTransform = (type: TransformationType) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedType(type);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="text-center bg-surface rounded-[24px] shadow-[0_12px_40px_rgba(62,54,48,0.08)] p-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">Der Transformations-Labor</h2>
        <p className="text-text-muted">Wähle eine Form, um den Satz umzuwandeln.</p>
      </div>

      {/* Source Sentence */}
      <div className="text-xs sm:text-sm md:text-[1.2rem] bg-[#F2F0EB] px-5 py-5 rounded-[16px] font-serif mb-8 inline-block border border-dashed border-[#CCC]">
        "Die Handschrift{' '}
        <span className="underline">kann nicht gelesen</span> werden."
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        <LabButton
          type="adj"
          label="Adjektivisch"
          color="#6B8C6E"
          isActive={selectedType === 'adj'}
          onClick={() => handleTransform('adj')}
        />
        <LabButton
          type="reflex"
          label="Reflexiv"
          color="#6B8C6E"
          isActive={selectedType === 'reflex'}
          onClick={() => handleTransform('reflex')}
        />
        <LabButton
          type="noun"
          label="Nomen-Verb (Extra)"
          color="#A67B5B"
          isActive={selectedType === 'noun'}
          onClick={() => handleTransform('noun')}
        />
      </div>

      {/* Result Display */}
      <div className="min-h-[80px] flex items-center justify-center transition-opacity duration-300" style={{ opacity: isTransitioning ? 0 : 1 }}>
        {selectedType ? (
          <div
            className="text-xs sm:text-base md:text-[1.4rem] font-serif"
            dangerouslySetInnerHTML={{ __html: transformations[selectedType].text }}
          />
        ) : (
          <span className="text-[#CCC] sm:text-sm md:text-[1rem] font-sans">Wähle eine Option</span>
        )}
      </div>

      {/* Analysis Note */}
      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mt-4 h-6">
        {selectedType && transformations[selectedType].note}
      </div>
    </section>
  );
}
