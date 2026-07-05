type WohlUseCase = {
  label: string;
  function: string;
  example: string;
  register: string;
};

export function ParticleWohl() {
  const cases: WohlUseCase[] = [
    {
      label: 'Verstärker',
      function: 'Unterstreicht eine Vermutung (ersetzt oder verstärkt das Modalverb)',
      example: 'Er hat <strong>wohl</strong> den Bus verpasst. (= Vermutung, ~70%)',
      register: 'Umgangssprachlich / informell',
    },
    {
      label: 'Ersatz',
      function: 'Kann ein subjektives Modalverb komplett ersetzen',
      example: 'Das wird <strong>wohl</strong> der Postbote sein. (= Vermutung, ~80%)',
      register: 'Alltagssprache',
    },
    {
      label: 'Zustimmung mit Einschränkung',
      function: '"Ja, eigentlich schon, aber …": signalisiert leichte Vorbehalte',
      example: 'Das ist <strong>wohl</strong> richtig, aber nicht ganz präzise.',
      register: 'Gehoben / akademisch',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">
        Die Partikel „wohl"
      </h2>

      <div className="bg-[#FFF8F5] border border-[rgba(166,123,91,0.15)] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 mb-4 sm:mb-5 md:mb-6">
        <p className="text-text-muted text-xs sm:text-sm md:text-base leading-relaxed">
          „Wohl" ist ein kleines Wort mit großer Wirkung. Im Kontext subjektiver Modalverben fungiert es als
          <strong className="text-text-main"> Verstärker oder Ersatz</strong> für die Vermutung. Es macht den
          Sprecher vorsichtiger als „müssen", aber sicherer als „könnte".
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {cases.map((c, index) => (
          <div
            key={index}
            className="bg-surface rounded-[12px] sm:rounded-[14px] md:rounded-[16px] p-4 sm:p-5 shadow-card grid grid-cols-1 sm:grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] items-start gap-3 sm:gap-4"
          >
            <div>
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-text-main block">
                {c.label}
              </span>
              <span className="text-[0.65rem] sm:text-[0.7rem] text-text-muted mt-1 block">
                {c.register}
              </span>
            </div>
            <div className="text-text-muted text-xs sm:text-sm md:text-base">
              {c.function}
              <br />
              <em
                className="text-text-main mt-1 block"
                dangerouslySetInnerHTML={{ __html: `"${c.example}"` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
