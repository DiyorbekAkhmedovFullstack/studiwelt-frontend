import { TemporalConjunctionGrid } from './TemporalConjunctionGrid';
import { TenseSequenceVisual } from './TenseSequenceVisual';
import { TimelineBuilder } from './TimelineBuilder';

export function Lesson22TemporalClauses() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Temporale Nebensätze drücken aus, <strong>wann</strong> etwas passiert und in welcher{' '}
          <strong>zeitlichen Beziehung</strong> zwei Ereignisse zueinander stehen. Im B2-C1-Niveau
          ist die korrekte <strong>Zeitenfolge</strong> (Tense Sequence) entscheidend: Manche
          Konjunktionen wie <em>nachdem</em> und <em>sobald</em> verlangen, dass der Nebensatz
          eine Zeitstufe <em>vor</em> dem Hauptsatz liegt. Andere wie <em>während</em>,{' '}
          <em>bevor</em>, <em>bis</em> und <em>seit</em> nutzen die <em>gleiche</em> Zeit in
          beiden Sätzen. Diese Regeln sind besonders wichtig für{' '}
          <strong>TestDaF Hörverstehen</strong> und <strong>DSH Schreiben</strong>.
        </p>
      </section>

      {/* Temporal Conjunction Grid */}
      <TemporalConjunctionGrid />

      {/* Tense Sequence Visual */}
      <TenseSequenceVisual />

      {/* Detailed Rules Section */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Detaillierte Regeln
        </h2>

        {/* Nachdem */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          1. Nachdem (after) – Eine Zeit zurück
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Der Nebensatz mit <strong>nachdem</strong> steht <em>eine Zeitstufe vor</em> dem
          Hauptsatz. Dies ist die wichtigste Regel für akademisches Schreiben.
        </p>
        <div className="bg-[#E3F2FD] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-2 sm:mb-3">
          <div className="space-y-2">
            <div>
              <code className="text-[0.65rem] sm:text-xs md:text-sm font-mono bg-white px-2 py-1 rounded">
                Nachdem + Plusquamperfekt → Präteritum
              </code>
              <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mt-2">
                <strong>Nachdem</strong> ich gegessen <strong>hatte</strong>, <strong>ging</strong>{' '}
                ich spazieren.
              </p>
            </div>
            <div>
              <code className="text-[0.65rem] sm:text-xs md:text-sm font-mono bg-white px-2 py-1 rounded">
                Nachdem + Perfekt → Präsens
              </code>
              <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mt-2">
                <strong>Nachdem</strong> ich gegessen <strong>habe</strong>, <strong>gehe</strong>{' '}
                ich spazieren.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FFF3E0] border-l-4 border-[#E65100] px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg mb-4 sm:mb-6">
          <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
            <strong>Häufiger Fehler:</strong> "Nachdem ich gegessen habe, ging ich spazieren." ✗
            <br />
            <strong>Korrekt:</strong> "Nachdem ich gegessen hatte, ging ich spazieren." ✓
          </p>
        </div>

        {/* Bevor */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          2. Bevor (before) – Gleiche Zeit
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Mit <strong>bevor</strong> nutzen beide Sätze die <em>gleiche Zeit</em>. Die Handlung im{' '}
          <strong>Hauptsatz</strong> passiert zuerst, dann die im Nebensatz.
        </p>
        <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            <strong>Bevor</strong> ich schlafen <strong>gehe</strong>, <strong>lese</strong> ich ein
            Buch.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            = Erst lese ich ein Buch, dann gehe ich schlafen.
          </p>
        </div>

        {/* Während */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          3. Während (while) – Gleichzeitigkeit
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          <strong>Während</strong> drückt aus, dass zwei Handlungen <em>parallel</em> ablaufen.
          Beide Sätze nutzen die gleiche Zeit.
        </p>
        <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            <strong>Während</strong> ich <strong>arbeitete</strong>, <strong>hörte</strong> ich
            Musik.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            = Beide Handlungen passieren zur gleichen Zeit.
          </p>
        </div>

        {/* Sobald */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          4. Sobald (as soon as) – Eine Zeit zurück
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Wie <em>nachdem</em>, aber betont die <strong>Unmittelbarkeit</strong>: Die zweite
          Handlung folgt sofort auf die erste.
        </p>
        <div className="bg-[#E3F2FD] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
            <strong>Sobald</strong> ich angekommen <strong>bin</strong>, <strong>rufe</strong> ich
            dich an.
          </p>
        </div>

        {/* Bis & Seit */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          5. Bis (until) & Seit(dem) (since) – Dauer
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          <strong>Bis</strong> markiert das <em>Ende</em> einer Handlung, <strong>seit</strong> den{' '}
          <em>Anfang</em>. Beide nutzen die gleiche Zeit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-[#F3E5F5] px-3 sm:px-4 py-3 rounded-lg">
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-1">
              Ich warte, <strong>bis</strong> du kommst.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted italic">(Ende-Punkt)</p>
          </div>
          <div className="bg-[#F3E5F5] px-3 sm:px-4 py-3 rounded-lg">
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-1">
              <strong>Seit</strong> ich hier wohne, lerne ich Deutsch.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted italic">(Start-Punkt)</p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Builder */}
      <TimelineBuilder />

      {/* Summary / Quick Reference */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: Zeitenfolge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
          {/* Back One */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-[#1565C0]">
            <div className="text-base sm:text-lg font-serif font-bold mb-2 text-[#1565C0]">
              Eine Zeit zurück
            </div>
            <div className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted mb-3">
              NS steht vor HS (zeitlich)
            </div>
            <div className="space-y-2">
              <div className="bg-[#E3F2FD] px-2.5 py-2 rounded">
                <span className="font-bold text-xs sm:text-sm">nachdem</span>
              </div>
              <div className="bg-[#E3F2FD] px-2.5 py-2 rounded">
                <span className="font-bold text-xs sm:text-sm">sobald</span>
              </div>
            </div>
          </div>

          {/* Same Time */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-[#2E7D32]">
            <div className="text-base sm:text-lg font-serif font-bold mb-2 text-[#2E7D32]">
              Gleiche Zeit
            </div>
            <div className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted mb-3">
              NS = HS (gleiche Zeitstufe)
            </div>
            <div className="space-y-2">
              <div className="bg-[#E8F5E9] px-2.5 py-2 rounded">
                <span className="font-bold text-xs sm:text-sm">während, bevor</span>
              </div>
              <div className="bg-[#E8F5E9] px-2.5 py-2 rounded">
                <span className="font-bold text-xs sm:text-sm">bis, seit(dem)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Tip */}
        <div className="bg-[rgba(166,123,91,0.1)] border-l-4 border-primary px-3 sm:px-4 py-3 sm:py-4 rounded-r-lg">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">💡</span>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1">
                TestDaF/DSH Prüfungstipp
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                <strong>Hörverstehen:</strong> Achte auf temporale Konjunktionen, um die
                Reihenfolge von Ereignissen zu verstehen.
                <br />
                <strong>Schreiben:</strong> Nutze <em>nachdem + Plusquamperfekt</em> für
                akademische Texte (nicht Perfekt!). Vermeide Wiederholungen: variiere zwischen{' '}
                <em>nachdem</em>, <em>sobald</em>, <em>bevor</em> und <em>während</em>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
