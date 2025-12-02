import type { ReactNode } from 'react';

type AgentGridItem = {
  preposition: string;
  case: string;
  description: ReactNode;
  example: string;
};

type AgentGridProps = {
  title?: string;
  subtitle?: string;
  agents: AgentGridItem[];
  alert?: {
    title: string;
    message: ReactNode;
    variant?: 'success' | 'warning' | 'info';
  };
};

/**
 * Grid layout for displaying agent prepositions (Von/Durch)
 * with case information and examples
 */
export function AgentGrid({ title, subtitle, agents, alert }: AgentGridProps) {
  const alertStyles = {
    success: 'bg-[#F4F9F4] border-[#6B8C6E]',
    warning: 'bg-[#FFF5F5] border-[#C07766]',
    info: 'bg-[#FAF6F3] border-primary',
  };

  const alertTitleStyles = {
    success: 'text-[#2D4A30]',
    warning: 'text-[#C07766]',
    info: 'text-primary',
  };

  return (
    <div>
      {title && <h3 className="text-xs sm:text-sm md:text-[1.3rem] font-serif mb-3">{title}</h3>}
      {subtitle && (
        <p className="text-base mb-6 leading-relaxed">{subtitle}</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="border border-[#E3D4C5] p-5 rounded-xl hover:border-primary transition-colors"
          >
            <div className="text-[#C07766] font-bold mb-2 uppercase tracking-wider">
              {agent.preposition} + {agent.case}
            </div>
            <p className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] mb-3 leading-relaxed">
              {agent.description}
            </p>
            <p
              className="text-base font-serif"
              dangerouslySetInnerHTML={{ __html: agent.example }}
            />
          </div>
        ))}
      </div>

      {/* Alert Box */}
      {alert && (
        <div
          className={`border-l-4 px-4 py-4 rounded-r-lg ${
            alertStyles[alert.variant || 'info']
          }`}
        >
          <span
            className={`font-bold block mb-1 ${
              alertTitleStyles[alert.variant || 'info']
            }`}
          >
            {alert.title}
          </span>
          <span className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] leading-relaxed">
            {alert.message}
          </span>
        </div>
      )}
    </div>
  );
}
