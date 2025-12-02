import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className="bg-surface p-5 sm:p-7 md:p-10 rounded-[16px] md:rounded-[24px] shadow-card transition-all duration-300 border border-transparent hover:-translate-y-1 hover:border-primary-light"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-primary-light text-primary rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
        {icon}
      </div>
      <h3 className="text-[1.1rem] sm:text-lg md:text-xl font-bold mb-2 md:mb-3">{title}</h3>
      <p className="text-text-muted text-[0.875rem] md:text-[15px] leading-relaxed">{description}</p>
    </div>
  );
}
