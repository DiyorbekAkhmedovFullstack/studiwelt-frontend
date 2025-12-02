type AgentBoxProps = {
  preposition: string;
  caseLabel: string;
  title: string;
  example: string;
};

function AgentBox({ preposition, caseLabel, title, example }: AgentBoxProps) {
  return (
    <div className="bg-surface rounded-2xl p-6 mb-4 border-l-4 border-primary flex items-start gap-5 shadow-card">
      <div className="text-xs sm:text-sm md:text-[1.2rem] font-serif font-bold min-w-[80px]">
        {preposition}{' '}
        <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] font-sans uppercase bg-[#E3D4C5] px-1.5 py-0.5 rounded align-middle ml-2">
          {caseLabel}
        </span>
      </div>
      <div>
        <strong className="block mb-1">{title}</strong>
        <span className="text-text-muted sm:text-[0.5rem] md:text-[0.6rem]" dangerouslySetInnerHTML={{ __html: example }} />
      </div>
    </div>
  );
}

type AgentsSectionProps = {
  title?: string;
  agents: Array<{
    preposition: string;
    caseLabel: string;
    title: string;
    example: string;
  }>;
};

export function AgentsSection({ title = 'Wer macht es? (Täter)', agents }: AgentsSectionProps) {
  return (
    <div className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">{title}</h2>

      {agents.map((agent, index) => (
        <AgentBox key={index} {...agent} />
      ))}
    </div>
  );
}
