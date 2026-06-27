import { Icon, Ui } from '../../../lib/icons';
import { ConditionalTypesGrid } from './ConditionalTypesGrid';
import { WennOmissionDemo } from './WennOmissionDemo';
import { ConditionalBuilder } from './ConditionalBuilder';

export function Lesson23ConditionalClauses() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Konditionalsätze (Bedingungssätze) drücken eine <strong>Bedingung</strong> und ihre{' '}
          <strong>Konsequenz</strong> aus. Im B2-C1-Niveau unterscheiden wir zwischen{' '}
          <strong>realen</strong> (möglichen), <strong>irrealen</strong> (hypothetischen) und{' '}
          <strong>gemischten</strong> Bedingungen. Die Wahl der Zeitform (Präsens, Konjunktiv II,
          Plusquamperfekt) hängt davon ab, ob die Bedingung <em>erfüllbar</em> ist, <em>aktuell
          unmöglich</em> ist, oder <em>in der Vergangenheit nicht erfüllt wurde</em>. Fortgeschrittene
          Strukturen wie die <strong>Weglassung von "wenn"</strong> (Inversion) und{' '}
          <strong>gemischte Konditionale</strong> sind typisch für akademisches Schreiben und
          C1-Prüfungen wie TestDaF und DSH.
        </p>
      </section>

      {/* Conditional Types Grid */}
      <ConditionalTypesGrid />

      {/* Detailed Rules Section */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Detaillierte Regeln & Nuancen
        </h2>

        {/* Type I: Realis */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          1. Typ I: Realis (Realistische Bedingung)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Nutze <strong>Präsens</strong> in beiden Sätzen, wenn die Bedingung möglich oder
          wahrscheinlich ist. Die Konsequenz kann auch im <strong>Futur</strong> oder{' '}
          <strong>Imperativ</strong> stehen.
        </p>
        <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-2 sm:mb-3">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              <strong>Wenn</strong> du Zeit <strong>hast</strong>, <strong>komm</strong> vorbei.
              (Imperativ)
            </p>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              <strong>Falls</strong> es <strong>regnet</strong>, <strong>werden</strong> wir zu
              Hause <strong>bleiben</strong>. (Futur)
            </p>
          </div>
        </div>
        <div className="bg-[#FFF3E0] border-l-4 border-[#E65100] px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg mb-4 sm:mb-6">
          <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
            <strong>Wenn vs. Falls:</strong> "Falls" klingt formeller und betont Unsicherheit
            stärker. In akademischen Texten: "falls" &gt; "wenn".
          </p>
        </div>

        {/* Type II: Unreal Present */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          2. Typ II: Irrealis Gegenwart (Hypothetische Bedingung)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Für <strong>unmögliche</strong> oder <strong>sehr unwahrscheinliche</strong> Bedingungen
          in der Gegenwart nutze <strong>Konjunktiv II</strong> in beiden Sätzen.
        </p>
        <div className="bg-[#FFF3E0] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-2 sm:mb-3">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            <strong>Wenn</strong> ich reich <strong>wäre</strong>, <strong>würde</strong> ich
            reisen.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            (Ich bin nicht reich → unmöglich)
          </p>
        </div>
        <div className="bg-[#E3F2FD] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
            <strong>Wichtig:</strong> Für <em>sein</em>, <em>haben</em> und Modalverben nutze die
            originale Konjunktiv-II-Form: <strong>wäre</strong>, <strong>hätte</strong>,{' '}
            <strong>könnte</strong>, <strong>müsste</strong>, <strong>dürfte</strong>,{' '}
            <strong>sollte</strong>.
            <br />
            Für alle anderen Verben: <strong>würde + Infinitiv</strong>.
          </p>
        </div>

        {/* Type III: Unreal Past */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          3. Typ III: Irrealis Vergangenheit (Nicht erfüllte Bedingung)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Für Bedingungen, die <strong>in der Vergangenheit NICHT erfüllt wurden</strong>, nutze
          Konjunktiv II Plusquamperfekt in beiden Sätzen. Oft drückt dieser Typ{' '}
          <strong>Reue</strong> oder <strong>Bedauern</strong> aus.
        </p>
        <div className="bg-[#FCE4EC] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-2 sm:mb-3">
          <div className="space-y-2">
            <div>
              <code className="text-[0.65rem] sm:text-xs md:text-sm font-mono bg-white px-2 py-1 rounded">
                Wenn + hätte/wäre + Partizip II → hätte/wäre + Partizip II
              </code>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mt-2">
              <strong>Wenn</strong> ich gelernt <strong>hätte</strong>, <strong>hätte</strong> ich
              die Prüfung <strong>bestanden</strong>.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
              (Ich habe NICHT gelernt → ich habe NICHT bestanden)
            </p>
          </div>
        </div>
        <div className="bg-[#FFF3E0] border-l-4 border-[#E65100] px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg mb-4 sm:mb-6">
          <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-main">
            <strong>Häufiger Fehler:</strong> "Wenn ich gelernt würde..." <Ui.Close className="inline text-danger" size={14} />
            <br />
            <strong>Korrekt:</strong> "Wenn ich gelernt <strong>hätte</strong>..." <Ui.Check className="inline text-success" size={14} />
          </p>
        </div>

        {/* Mixed Conditionals */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          4. Gemischte Konditionalsätze (C1)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Kombiniere <strong>Vergangenheit</strong> (Bedingung) mit{' '}
          <strong>Gegenwart</strong> (Konsequenz), wenn eine vergangene Handlung aktuelle Folgen
          hat.
        </p>
        <div className="bg-[#E3F2FD] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            <strong>Wenn</strong> ich Medizin <strong>studiert hätte</strong>,{' '}
            <strong>wäre</strong> ich jetzt Arzt.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            (Vergangenheit: studiert hätte → Gegenwart: wäre)
          </p>
        </div>

        {/* Sollte (C1) */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          5. "Sollte" (Formelle Alternative zu "wenn")
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          In formellen Texten kann <strong>"sollte"</strong> anstelle von "wenn" genutzt werden. Es
          betont Unsicherheit oder Höflichkeit.
        </p>
        <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              <strong>Sollten</strong> Sie Fragen haben, kontaktieren Sie uns.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
              = Wenn Sie Fragen haben sollten... (formeller)
            </p>
          </div>
        </div>
      </section>

      {/* Wenn Omission Demo */}
      <WennOmissionDemo />

      {/* Interactive Conditional Builder */}
      <ConditionalBuilder />

      {/* Summary / Quick Reference */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: Konditionalsätze
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
          {/* Realis */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-[#2E7D32]">
            <div className="text-base sm:text-lg font-serif font-bold mb-2 text-[#2E7D32]">
              Typ I: Realis
            </div>
            <code className="text-[0.65rem] sm:text-xs font-mono bg-[#E8F5E9] px-2 py-1 rounded block mb-2">
              Präsens + Präsens/Futur
            </code>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic">
              Wenn es regnet, bleiben wir zu Hause.
            </p>
          </div>

          {/* Irrealis Present */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-[#E65100]">
            <div className="text-base sm:text-lg font-serif font-bold mb-2 text-[#E65100]">
              Typ II: Irrealis (Jetzt)
            </div>
            <code className="text-[0.65rem] sm:text-xs font-mono bg-[#FFF3E0] px-2 py-1 rounded block mb-2">
              K2 + würde/wäre/hätte
            </code>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic">
              Wenn ich reich wäre, würde ich reisen.
            </p>
          </div>

          {/* Irrealis Past */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-[#C2185B]">
            <div className="text-base sm:text-lg font-serif font-bold mb-2 text-[#C2185B]">
              Typ III: Irrealis (Vergangenheit)
            </div>
            <code className="text-[0.65rem] sm:text-xs font-mono bg-[#FCE4EC] px-2 py-1 rounded block mb-2">
              hätte/wäre + Part. II
            </code>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic">
              Wenn ich gelernt hätte, hätte ich bestanden.
            </p>
          </div>

          {/* Mixed */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-[#1565C0]">
            <div className="text-base sm:text-lg font-serif font-bold mb-2 text-[#1565C0]">
              Gemischt: Vergangenheit → Jetzt
            </div>
            <code className="text-[0.65rem] sm:text-xs font-mono bg-[#E3F2FD] px-2 py-1 rounded block mb-2">
              hätte + Part. II → wäre/würde
            </code>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic">
              Wenn ich studiert hätte, wäre ich jetzt Arzt.
            </p>
          </div>
        </div>

        {/* Exam Tip */}
        <div className="bg-[rgba(166,123,91,0.1)] border-l-4 border-primary px-3 sm:px-4 py-3 sm:py-4 rounded-r-lg">
          <div className="flex items-start gap-2 sm:gap-3">
            <Icon.Tip className="text-primary shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1">
                TestDaF/DSH Prüfungstipp
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                <strong>Leseverstehen:</strong> Achte auf Konjunktiv-II-Formen, um hypothetische
                Szenarien zu erkennen.
                <br />
                <strong>Schreiben:</strong> Nutze gemischte Konditionale für komplexe Argumentationen.
                Weglassung von "wenn" (Inversion) zeigt C1-Niveau: "Hätte ich gewusst..."
                <br />
                <strong>Variiere:</strong> wenn, falls, sollte (nicht immer nur "wenn"!).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
