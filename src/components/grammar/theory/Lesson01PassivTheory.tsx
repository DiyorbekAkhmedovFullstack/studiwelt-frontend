export function Lesson01PassivTheory() {

  return (
    <div>
      {/* 1. THE BASIC TRANSFORMATION */}
      <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
        <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Das Grundprinzip
        </h2>
        <div className="bg-[#FAF6F3] p-2.5 sm:p-5 md:p-6 rounded-lg sm:rounded-xl flex flex-col gap-2.5 sm:gap-4">
          {/* Active Sentence */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
            <span className="text-[0.6rem] sm:text-[0.65rem] md:text-[0.75rem] px-2 py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#999] font-sans w-fit">
              AKTIV
            </span>
            <div className="text-xs sm:text-sm md:text-base font-serif flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <span>Der Architekt</span>
              <span className="underline decoration-[#6B8C6E] decoration-2">plant</span>
              <span className="text-[#D9A441] font-bold">das Haus</span>
              <span>.</span>
            </div>
          </div>

          {/* Passive Sentence */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
            <span className="text-[0.6rem] sm:text-[0.65rem] md:text-[0.75rem] px-2 py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#999] font-sans w-fit">
              PASSIV
            </span>
            <div className="text-xs sm:text-sm md:text-base font-serif flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <span className="text-[#D9A441] font-bold">Das Haus</span>
              <span className="text-[#6B8C6E] font-bold">wird</span>
              <span className="text-[0.6rem] sm:text-[0.65rem] md:text-[0.75rem] px-2 py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[rgba(192,119,102,0.15)] text-[#C07766] font-sans">
                von dem Architekten
              </span>
              <span className="text-[#6B8C6E] font-bold">geplant</span>
              <span>.</span>
            </div>
          </div>
        </div>
        <p className="text-[0.65rem] sm:text-xs md:text-sm mt-2.5 sm:mt-4 md:mt-6 leading-relaxed text-text-muted">
          <strong className="text-text-main">Hinweis:</strong> Nur <strong>transitive Verben</strong> (Verben mit Akkusativobjekt) können
          ein persönliches Passiv bilden. "Ich schlafe" oder "Wir fahren" (Intransitiv) bilden
          nur ein unpersönliches Passiv mit "Es".
        </p>
      </section>

      {/* 2. TENSES & FORMS - Comprehensive Table */}
      <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
        <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Alle Zeitformen im Passiv
        </h2>

        {/* Responsive Table - hides Subjekt & Zeitangabe on mobile */}
        <div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-[#E3D4C5]">
                <th className="py-2 sm:py-3 pr-1 sm:pr-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted w-8 sm:w-auto"></th>
                <th className="py-2 sm:py-3 px-1 sm:px-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">Zeitform</th>
                <th className="hidden md:table-cell py-2 sm:py-3 px-2 sm:px-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">Subjekt</th>
                <th className="py-2 sm:py-3 px-1 sm:px-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">Position 2</th>
                <th className="hidden sm:table-cell py-2 sm:py-3 px-2 sm:px-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">Zeitangabe</th>
                <th className="py-2 sm:py-3 pl-1 sm:pl-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">Ende</th>
              </tr>
            </thead>
            <tbody className="font-serif">
              {/* Präsens */}
              <tr className="border-b border-[#E3D4C5]/50">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#666] font-sans">B2</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Präsens</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">wird</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">heute</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert.</td>
              </tr>
              {/* Präteritum */}
              <tr className="border-b border-[#E3D4C5]/50">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#666] font-sans">B2</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Präteritum</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">wurde</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">gestern</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert.</td>
              </tr>
              {/* Perfekt */}
              <tr className="border-b border-[#E3D4C5]/50">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#666] font-sans">B2</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Perfekt</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">ist</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">gestern</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert worden.</td>
              </tr>
              {/* Plusquamperfekt */}
              <tr className="border-b border-[#E3D4C5]/50 ">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#D9A441]/20 text-[#8B6914] font-sans">C1</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Plusquamperf.</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">war</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">vor der Abreise</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert worden.</td>
              </tr>
              {/* Futur I */}
              <tr className="border-b border-[#E3D4C5]/50 ">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#D9A441]/20 text-[#8B6914] font-sans">C1</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Futur I</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">wird</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">bestimmt bald</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert werden.</td>
              </tr>
              {/* Futur II */}
              <tr className="border-b border-[#E3D4C5]/50 ">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#D9A441]/20 text-[#8B6914] font-sans">C1</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Futur II</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">wird</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">bis morgen</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">inform. worden sein.*</td>
              </tr>
              {/* Konjunktiv 2 Gegenwart */}
              <tr className="border-b border-[#E3D4C5]/50">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#666] font-sans">B2</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Konj. 2 Gegenw.</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">würde</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">heute noch</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert.</td>
              </tr>
              {/* Konjunktiv 2 Vergangenheit */}
              <tr className="border-b border-[#E3D4C5]/50 ">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#D9A441]/20 text-[#8B6914] font-sans">C1</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Konj. 2 Verg.</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">wäre</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">vor der Abreise</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert worden.</td>
              </tr>
              {/* Konjunktiv 1 Gegenwart */}
              <tr className="border-b border-[#E3D4C5]/50">
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#666] font-sans">B2</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Konj. 1 Gegenw.</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">werde</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">heute</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert.</td>
              </tr>
              {/* Konjunktiv 1 Vergangenheit */}
              <tr>
                <td className="py-1.5 sm:py-3 pr-1 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#D9A441]/20 text-[#8B6914] font-sans">C1</span>
                </td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main">Konj. 1 Verg.</td>
                <td className="hidden md:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">Die Gruppe</td>
                <td className="py-1.5 sm:py-3 px-1 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-[#6B8C6E] font-bold">sei</td>
                <td className="hidden sm:table-cell py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">gestern</td>
                <td className="py-1.5 sm:py-3 pl-1 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-bold">informiert worden.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="text-[0.6rem] sm:text-xs md:text-sm mt-3 sm:mt-4 text-text-muted italic">
          * Diese Form wird nur sehr selten verwendet.
        </p>
      </section>

      {/* 3. AGENTS (Von vs Durch) */}
      <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
        <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-2 sm:mb-3 pb-2 border-b-2 border-[#E3D4C5]">
          Wer ist der Täter? (Agens)
        </h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-5 md:mb-6 leading-relaxed">
          Wenn wir den Täter nennen wollen, nutzen wir Präpositionen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          {/* VON */}
          <div className="border border-[#E3D4C5] p-3 sm:p-5 rounded-lg sm:rounded-xl">
            <div className="text-[#C07766] text-[0.65rem] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-2 uppercase tracking-wider">
              VON + Dativ
            </div>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Für <strong>Personen</strong>, Institutionen oder Naturgewalten, die aktiv handeln.
            </p>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              "Der Patient wird <strong>vom Arzt</strong> behandelt."
            </p>
          </div>

          {/* DURCH */}
          <div className="border border-[#E3D4C5] p-3 sm:p-5 rounded-lg sm:rounded-xl">
            <div className="text-[#C07766] text-[0.65rem] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-2 uppercase tracking-wider">
              DURCH + Akkusativ
            </div>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Für <strong>Mittel</strong>, Werkzeuge oder abstrakte Ursachen.
            </p>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              "Das Haus wurde <strong>durch ein Feuer</strong> zerstört."
            </p>
          </div>

          {/* MIT */}
          <div className="border border-[#E3D4C5] p-3 sm:p-5 rounded-lg sm:rounded-xl">
            <div className="text-[#C07766] text-[0.65rem] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-2 uppercase tracking-wider">
              MIT + Dativ
            </div>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Für <strong>Instrumente</strong> und Werkzeuge, die benutzt werden.
            </p>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              "Das Papier wurde <strong>mit einer Schere</strong> geschnitten."
            </p>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mt-2">
              "Die Analyse wurde <strong>mit der neuen Technologie</strong> durchgeführt."
            </p>
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-[#F4F9F4] border-l-4 border-[#6B8C6E] px-2.5 sm:px-4 py-2.5 sm:py-4 rounded-r-lg mt-3 sm:mt-5 md:mt-6">
          <span className="text-[#2D4A30] text-xs sm:text-sm md:text-base font-bold block mb-1">Wann weglassen?</span>
          <span className="text-xs sm:text-sm md:text-base text-text-main leading-relaxed">
            Der Täter wird oft weggelassen, wenn er <strong>unbekannt</strong> ist ("Mein Rad wurde
            gestohlen") oder <strong>selbstverständlich</strong> ist ("Der Verletzte wurde [vom
            Notarzt] operiert").
          </span>
        </div>
      </section>

      {/* 4. SPECIAL CASES */}
      <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
        <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Besonderheiten
        </h2>

        <h3 className="text-[0.7rem] sm:text-xs md:text-sm font-semibold mt-3 sm:mt-5 md:mt-6 mb-2 sm:mb-3">1. Dativ-Verben</h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Verben, die den Dativ verlangen (helfen, danken, gratulieren), behalten den Dativ auch
          im Passiv. Sie haben <strong>kein Nominativ-Subjekt</strong>.
        </p>
        <div className="text-xs sm:text-sm md:text-base bg-[#FAF6F3] px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg font-serif text-text-main">
          Aktiv: "Wir helfen <strong>dem Mann</strong>."
          <br />
          Passiv: "<strong>Dem Mann</strong> wird geholfen."
        </div>

        <h3 className="text-[0.7rem] sm:text-xs md:text-sm font-semibold mt-3 sm:mt-5 md:mt-6 mb-2 sm:mb-3">
          2. Das Subjektlose Passiv & "Es"
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Wenn kein Subjekt da ist (oder bei intransitiven Verben), nutzen wir "Es" als
          Platzhalter. Aber: <strong>"Es" darf nie in der Satzmitte stehen!</strong>
        </p>
        <div className="text-xs sm:text-sm md:text-base bg-[#FAF6F3] px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg font-serif text-text-main">
          Pos 1: "<strong>Es</strong> wird hier nicht geraucht." (Korrekt)
          <br />
          Pos 3: "Hier wird <span className="line-through opacity-50">es</span> nicht geraucht."
          (Korrekt: Hier wird nicht geraucht.)
        </div>
      </section>

      {/* 5. PASSIVE ALTERNATIVES */}
      <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
        <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-2 sm:mb-3 pb-2 border-b-2 border-[#E3D4C5]">
          Passiversatzformen (B2/C1)
        </h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base mb-3 sm:mb-5 leading-relaxed">Oft stilistisch besser als das normale Passiv.</p>

        <ul className="list-none p-0">
          <li className="mb-2.5 sm:mb-4 pb-2.5 sm:pb-4 border-b border-dashed border-[#EEE]">
            <strong className="text-xs sm:text-sm md:text-base block mb-1 sm:mb-2 text-text-main">sein + zu + Infinitiv</strong>
            <span className="text-xs sm:text-sm md:text-base text-text-muted block mb-1 sm:mb-2">= müssen/können</span>
            <em className="text-xs sm:text-sm md:text-base block font-serif text-text-main">
              "Die Aufgabe ist zu lösen." (= muss gelöst werden)
            </em>
          </li>
          <li className="mb-2.5 sm:mb-4 pb-2.5 sm:pb-4 border-b border-dashed border-[#EEE]">
            <strong className="text-xs sm:text-sm md:text-base block mb-1 sm:mb-2 text-text-main">sich lassen + Infinitiv</strong>
            <span className="text-xs sm:text-sm md:text-base text-text-muted block mb-1 sm:mb-2">= können</span>
            <em className="text-xs sm:text-sm md:text-base block font-serif text-text-main">
              "Das Fenster lässt sich öffnen." (= kann geöffnet werden)
            </em>
          </li>
          <li className="mb-2.5 sm:mb-4 pb-2.5 sm:pb-4 border-b border-dashed border-[#EEE]">
            <strong className="text-xs sm:text-sm md:text-base block mb-1 sm:mb-2 text-text-main">Adjektive auf -bar / -lich</strong>
            <span className="text-xs sm:text-sm md:text-base text-text-muted block mb-1 sm:mb-2">= können</span>
            <em className="text-xs sm:text-sm md:text-base block font-serif text-text-main">
              "Der Text ist lesbar." (= kann gelesen werden)
            </em>
          </li>
          <li className="mb-2.5 sm:mb-4">
            <strong className="text-xs sm:text-sm md:text-base block mb-1 sm:mb-2 text-text-main">gehören + Partizip II</strong>
            <span className="text-xs sm:text-sm md:text-base text-text-muted block mb-1 sm:mb-2">
              (Umgangssprachlich)
            </span>
            <em className="text-xs sm:text-sm md:text-base block font-serif text-text-main">
              "Das gehört verboten!" (= Das sollte verboten werden)
            </em>
          </li>
        </ul>
      </section>

      {/* 6. VORGANG VS ZUSTAND */}
      <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
        <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-3 sm:mb-5 pb-2 border-b-2 border-[#E3D4C5]">
          Vorgang vs. Zustand
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mt-3 sm:mt-5">
          {/* Vorgang */}
          <div className="bg-[#FFF9E5] p-3 sm:p-4 rounded-lg sm:rounded-xl">
            <strong className="text-[#B07D00] text-[0.7rem] sm:text-xs md:text-sm block mb-1.5 sm:mb-2">Vorgang (Process)</strong>
            <code className="text-[0.65rem] sm:text-xs md:text-sm block font-mono bg-white px-2.5 sm:px-3 py-2 rounded-lg mb-2 sm:mb-3">
              werden + Partizip II
            </code>
            <p className="text-xs sm:text-sm md:text-base text-[#7A5C00] mb-2 sm:mb-3 leading-relaxed">Jemand tut etwas. Fokus auf die Aktion.</p>
            <em className="text-xs sm:text-sm md:text-base block font-serif text-[#7A5C00]">
              "Die Tür <strong>wird</strong> geschlossen."
            </em>
          </div>

          {/* Zustand */}
          <div className="bg-[#E6F4EA] p-3 sm:p-4 rounded-lg sm:rounded-xl">
            <strong className="text-[#137333] text-[0.7rem] sm:text-xs md:text-sm block mb-1.5 sm:mb-2">Zustand (State)</strong>
            <code className="text-[0.65rem] sm:text-xs md:text-sm block font-mono bg-white px-2.5 sm:px-3 py-2 rounded-lg mb-2 sm:mb-3">
              sein + Partizip II
            </code>
            <p className="text-xs sm:text-sm md:text-base text-[#0D5A26] mb-2 sm:mb-3 leading-relaxed">Es ist schon passiert. Fokus auf das Ergebnis.</p>
            <em className="text-xs sm:text-sm md:text-base block font-serif text-[#0D5A26]">
              "Die Tür <strong>ist</strong> geschlossen."
            </em>
          </div>
        </div>
      </section>
    </div>
  );
}
