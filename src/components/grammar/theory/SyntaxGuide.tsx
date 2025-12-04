type SyntaxRuleProps = {
  title: string;
  rule: string;
  example: string;
};

function SyntaxRule({ title, rule, example }: SyntaxRuleProps) {
  return (
    <div className="text-xs sm:text-sm md:text-base bg-[#F9F9F9] p-3 sm:p-4 rounded-lg">
      <span className="font-bold block mb-2">{title}</span>
      <span className="text-text-muted font-mono block mb-2 text-[0.7rem] sm:text-xs md:text-sm">{rule}</span>
      <div className="text-text-main mt-2">{example}</div>
    </div>
  );
}

export function SyntaxGuide() {
  return (
    <section className="mt-8 sm:mt-12 md:mt-16 border-t border-dashed border-[rgba(0,0,0,0.1)] pt-6 sm:pt-8 md:pt-10">
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5">Syntax-Check</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        <SyntaxRule
          title="Nebensatz (NS)"
          rule="Konnektor + Subjekt ... Verb (Ende)"
          example="... weil es regnet."
        />
        <SyntaxRule
          title="Hauptsatz (HS)"
          rule="Konnektor (Pos 1) + Verb (Pos 2)"
          example="Deshalb bleibe ich hier."
        />
        <SyntaxRule
          title="Präposition"
          rule="Präp + Nomen (Kein Verb)"
          example="Wegen des Regens..."
        />
      </div>
    </section>
  );
}
