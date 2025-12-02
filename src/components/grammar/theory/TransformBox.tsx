import type { ReactNode } from 'react';

type SentenceTag = {
  type: 'subject' | 'verb' | 'agent' | 'neutral';
  text: string;
};

type TransformBoxProps = {
  activeSentence: {
    label?: string;
    parts: (string | SentenceTag | ReactNode)[];
  };
  passiveSentence: {
    label?: string;
    parts: (string | SentenceTag | ReactNode)[];
  };
  hint?: string;
};

/**
 * Visual transformer showing Active → Passive sentence transformation
 * with semantic tags (subject, verb, agent)
 */
export function TransformBox({
  activeSentence,
  passiveSentence,
  hint,
}: TransformBoxProps) {
  const renderPart = (part: string | SentenceTag | ReactNode, index: number) => {
    if (typeof part === 'string') {
      return <span key={index}>{part}</span>;
    }

    if (typeof part === 'object' && part !== null && 'type' in part) {
      const tag = part as SentenceTag;
      const tagStyles = {
        subject: 'bg-[rgba(217,164,65,0.15)] text-[#D9A441]',
        verb: 'bg-[rgba(107,140,110,0.15)] text-[#6B8C6E]',
        agent: 'bg-[rgba(192,119,102,0.15)] text-[#C07766]',
        neutral: 'bg-[#EEE] text-[#999]',
      };

      return (
        <span
          key={index}
          className={`px-3 py-1 rounded-md font-sans text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] sm:text-[0.55rem] sm:text-[0.55rem] md:text-[0.6rem] md:text-[0.8rem] font-bold uppercase tracking-wide ${
            tagStyles[tag.type]
          }`}
        >
          {tag.text}
        </span>
      );
    }

    return <span key={index}>{part as ReactNode}</span>;
  };

  return (
    <div className="text-xs sm:text-sm md:text-[1.1rem] bg-[#FAF6F3] p-6 rounded-xl flex flex-col gap-4 font-serif">
      {/* Active Sentence */}
      <div className="flex items-center gap-3 flex-wrap">
        {activeSentence.label && (
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] px-3 py-1 rounded-md font-sans font-bold uppercase tracking-wide bg-[#EEE]">
            {activeSentence.label}
          </span>
        )}
        {activeSentence.parts.map((part, idx) => renderPart(part, idx))}
      </div>

      {/* Arrow */}
      <div className="text-center opacity-50">↓</div>

      {/* Passive Sentence */}
      <div className="flex items-center gap-3 flex-wrap">
        {passiveSentence.label && (
          <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] px-3 py-1 rounded-md font-sans font-bold uppercase tracking-wide bg-[#EEE]">
            {passiveSentence.label}
          </span>
        )}
        {passiveSentence.parts.map((part, idx) => renderPart(part, idx))}
      </div>

      {/* Hint */}
      {hint && (
        <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mt-6 font-sans">{hint}</p>
      )}
    </div>
  );
}
