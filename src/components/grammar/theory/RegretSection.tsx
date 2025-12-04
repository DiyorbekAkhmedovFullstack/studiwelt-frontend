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
    <section className="text-white bg-[#3E3630] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12 md:mb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full -top-10 -left-10 sm:-top-12 sm:-left-12 z-0" />

      <div className="mb-6 sm:mb-7 md:mb-8 relative z-10">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2">{title}</h2>
        <p className="opacity-80 text-xs sm:text-sm md:text-base">{subtitle}</p>
      </div>

      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl inline-block font-serif mb-5 sm:mb-6 relative z-10 max-w-full">
        {exampleSentence}
      </div>

      <div className="text-xs sm:text-sm md:text-base opacity-70 max-w-full sm:max-w-[500px] md:max-w-[600px] mx-auto relative z-10 leading-relaxed">
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
