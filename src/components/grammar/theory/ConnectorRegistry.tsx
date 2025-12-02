import type { ReactNode } from 'react';

type LogicType = 'positive' | 'negative' | 'alternative' | 'contrast';

type ConnectorCardProps = {
  type: LogicType;
  part1: string;
  part2: string;
  icon: string;
  title: string;
  example: ReactNode;
  note?: string;
};

function ConnectorCard({ type, part1, part2, icon, title, example, note }: ConnectorCardProps) {
  const getColors = () => {
    switch (type) {
      case 'positive':
        return {
          bar: 'bg-[#6B8C6E]',
          icon: 'text-[#6B8C6E]',
        };
      case 'negative':
        return {
          bar: 'bg-[#8C8075]',
          icon: 'text-[#8C8075]',
        };
      case 'alternative':
        return {
          bar: 'bg-[#D9A441]',
          icon: 'text-[#D9A441]',
        };
      case 'contrast':
        return {
          bar: 'bg-[#C07766]',
          icon: 'text-[#C07766]',
        };
    }
  };

  const colors = getColors();

  return (
    <div className="bg-surface rounded-[24px] shadow-card flex flex-col overflow-hidden border border-[rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
      {/* Top Section */}
      <div className="relative p-6 flex justify-between items-center border-b border-dashed border-[rgba(0,0,0,0.1)]">
        {/* Left Color Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bar}`} />

        {/* Connector Pair */}
        <div className="text-xs sm:text-sm md:text-[1.1rem] font-serif font-bold flex gap-2">
          <span className="px-1.5 py-0.5 rounded bg-[#FAF6F3]">{part1}</span>
          <span>...</span>
          <span className="px-1.5 py-0.5 rounded bg-[#FAF6F3]">{part2}</span>
        </div>

        {/* Logic Icon */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] ${colors.icon} text-xs sm:text-sm md:text-[1.2rem]`}>
          {icon}
        </div>
      </div>

      {/* Body Section */}
      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] p-6 leading-relaxed">
        <strong className="text-text-main">{title}</strong>
        <br />
        {example}
        {note && (
          <>
            <br />
            <span className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] opacity-70">{note}</span>
          </>
        )}
      </div>
    </div>
  );
}

type ConnectorRegistryProps = {
  connectors: ConnectorCardProps[];
};

export function ConnectorRegistry({ connectors }: ConnectorRegistryProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 mb-16">
      {connectors.map((connector, index) => (
        <ConnectorCard key={index} {...connector} />
      ))}
    </div>
  );
}
