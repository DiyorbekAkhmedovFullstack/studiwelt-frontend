type SyntaxRuleProps = {
  title: string;
  rule: string;
  example: string;
};

function SyntaxRule({ title, rule, example }: SyntaxRuleProps) {
  return (
    <div className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] bg-[#F9F9F9] p-4 rounded-lg">
      <span className="font-bold block mb-2">{title}</span>
      <span className="text-text-muted font-mono block mb-2">{rule}</span>
      <div className="text-text-main mt-2">{example}</div>
    </div>
  );
}

export function SyntaxGuide() {
  return (
    <section className="mt-16 border-t border-dashed border-[rgba(0,0,0,0.1)] pt-10">
      <h3 className="text-xs sm:text-sm md:text-[1.2rem] font-serif mb-5">Syntax-Check</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
