type RuleCard = {
  title: string;
  rule: string;
  examples: { text: string; highlight: string[] }[];
};

function renderWithHighlights(text: string, highlight: string[]) {
  if (highlight.length === 0) return text;
  // split on the highlight terms, keeping them, and bold the matches
  const pattern = new RegExp(`(${highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    highlight.includes(part) ? (
      <span key={i} className="text-[#6B8C6E] font-bold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function Card({ title, rule, examples }: RuleCard) {
  return (
    <div className="border border-[#E3D4C5] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 flex flex-col">
      <div className="text-[0.65rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#C07766] mb-1.5 sm:mb-2">
        {title}
      </div>
      <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed mb-2 sm:mb-3">{rule}</p>
      <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
        {examples.map((ex, i) => (
          <div key={i} className="text-xs sm:text-sm md:text-base font-serif text-text-main bg-[#FAF6F3] rounded-md px-2.5 py-1.5">
            {renderWithHighlights(ex.text, ex.highlight)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MittelfeldRules() {
  const cards: RuleCard[] = [
    {
      title: 'Pronomen zuerst',
      rule: 'Personalpronomen rücken im Mittelfeld nach vorn – sie stehen vor den Nomen, egal welcher Kasus.',
      examples: [
        { text: 'Ich gebe dem Kind das Buch.', highlight: ['dem Kind', 'das Buch'] },
        { text: 'Ich gebe es dem Kind.', highlight: ['es'] },
        { text: 'Ich gebe ihm das Buch.', highlight: ['ihm'] },
      ],
    },
    {
      title: 'Zwei Nomen: Dativ vor Akkusativ',
      rule: 'Stehen zwei Nomen-Objekte zusammen, kommt das Dativobjekt vor dem Akkusativobjekt (Dat → Akk).',
      examples: [
        { text: 'Er schenkt der Frau einen Ring.', highlight: ['der Frau', 'einen Ring'] },
        { text: 'Sie erklärt den Schülern die Regel.', highlight: ['den Schülern', 'die Regel'] },
      ],
    },
    {
      title: 'Zwei Pronomen: Akkusativ vor Dativ',
      rule: 'Bei zwei Pronomen dreht sich die Reihenfolge um: das Akkusativpronomen steht vor dem Dativpronomen (Akk → Dat).',
      examples: [
        { text: 'Ich gebe es ihm.', highlight: ['es', 'ihm'] },
        { text: 'Sie schickt es uns.', highlight: ['es', 'uns'] },
      ],
    },
    {
      title: 'Bekannt vor unbekannt',
      rule: 'Bekannte Information (bestimmter Artikel) steht vor neuer Information (unbestimmter Artikel).',
      examples: [
        { text: 'Ich gebe dem Mann ein Buch.', highlight: ['dem Mann', 'ein Buch'] },
        { text: 'Er zeigt den Gästen einen Film.', highlight: ['den Gästen', 'einen Film'] },
      ],
    },
    {
      title: 'Position von „nicht"',
      rule: 'Die Satznegation „nicht" steht am Ende des Mittelfeldes – vor dem zweiten Verbteil und meist vor der Lokal-/Präpositionalergänzung. Soll nur ein Teil verneint werden (Sondernegation), steht „nicht" direkt davor.',
      examples: [
        { text: 'Ich kenne den Mann nicht.', highlight: ['nicht'] },
        { text: 'Sie fährt heute nicht nach Berlin.', highlight: ['nicht'] },
        { text: 'Nicht heute fahre ich, sondern morgen.', highlight: ['Nicht heute'] },
      ],
    },
    {
      title: 'Reflexivpronomen früh',
      rule: 'Das Reflexivpronomen (sich, mich, dich …) steht weit vorn im Mittelfeld – direkt nach dem finiten Verb bzw. dem Subjektpronomen.',
      examples: [
        { text: 'Gestern hat sich der Student gut vorbereitet.', highlight: ['sich'] },
        { text: 'Heute interessiert er sich für Politik.', highlight: ['sich'] },
      ],
    },
  ];

  return (
    <section className="bg-surface rounded-xl sm:rounded-[24px] p-4 sm:p-6 md:p-10 shadow-card mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-2 sm:mb-3 pb-2 border-b-2 border-[#E3D4C5]">
        Weitere Mittelfeld-Regeln
      </h2>
      <p className="text-text-muted text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed">
        TeKaMoLo ordnet die <strong>Angaben</strong>. Für <strong>Objekte, Pronomen und „nicht"</strong> im
        Mittelfeld gelten zusätzlich diese Regeln.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        {cards.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
