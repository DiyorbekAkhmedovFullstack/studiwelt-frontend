import type { ReactNode } from 'react';

type RegretSectionProps = {
  title: string;
  subtitle: string;
  exampleSentence: ReactNode;
  explanation: ReactNode;
  additionalExample?: ReactNode;
};

export function RegretSection({
  title,
  subtitle,
  exampleSentence,
  explanation,
  additionalExample,
}: RegretSectionProps) {
  return (
    <section className="text-white bg-[#3E3630] rounded-[24px] p-12 mb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full -top-12 -left-12 z-0" />

      <div className="mb-8 relative z-10">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="opacity-80">{subtitle}</p>
      </div>

      <div className="text-xs sm:text-sm md:text-[1.3rem] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] px-6 py-6 rounded-2xl inline-block font-serif mb-6 relative z-10">
        {exampleSentence}
      </div>

      <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] opacity-70 max-w-[500px] mx-auto relative z-10 leading-relaxed">
        {explanation}
        {additionalExample && (
          <>
            <br />
            <br />
            {additionalExample}
          </>
        )}
      </div>
    </section>
  );
}
