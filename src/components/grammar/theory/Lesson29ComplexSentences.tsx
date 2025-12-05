import { SentenceStructureComparison } from './SentenceStructureComparison';
import { CohesionDevicesGrid } from './CohesionDevicesGrid';
import { TextCoherenceTrainer } from './TextCoherenceTrainer';

export function Lesson29ComplexSentences() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          <strong>Komplexe Satzarchitektur & Kohärenz</strong> sind entscheidend für{' '}
          <strong>C1-Niveau</strong>. Du musst <strong>hypotaktische Strukturen</strong>{' '}
          (Satzgefüge mit Nebensätzen) beherrschen und <strong>Kohäsionsmittel</strong> nutzen,
          um Texte logisch zu verknüpfen. Für <strong>TestDaF/DSH</strong>: Schriftliche Texte
          (Essay, Zusammenfassung) erfordern komplexe, gut verknüpfte Sätze. Nutze{' '}
          <strong>Konnektoren</strong> (deshalb, allerdings, zudem) und <strong>Referenzmittel</strong>{' '}
          (Pronomen, Synonyme) für klaren Textzusammenhang. <strong>Kohärenz</strong> (inhaltlicher
          Zusammenhang) + <strong>Kohäsion</strong> (formale Verknüpfung) = professioneller Text.
        </p>
      </section>

      {/* Sentence Structure Comparison */}
      <SentenceStructureComparison />

      {/* When to Use Which */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Wann welche Struktur? Register & Textsorte
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Parataxe Usage */}
          <div className="bg-[#E3F2FD] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#1565C0]">
            <h3 className="text-base sm:text-lg font-semibold text-[#1565C0] mb-3">
              Parataxe verwenden
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">✓</span>
                <span>
                  <strong>Journalistische Texte</strong> (Nachrichten, Berichte)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">✓</span>
                <span>
                  <strong>Gesprochene Sprache</strong> (einfacher zu verstehen)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">✓</span>
                <span>
                  <strong>Klare, direkte Aussagen</strong> (Handlungsanweisungen)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">✓</span>
                <span>
                  <strong>Aufzählungen</strong> (mehrere gleichwertige Informationen)
                </span>
              </li>
            </ul>
          </div>

          {/* Hypotaxe Usage */}
          <div className="bg-[#E8F5E9] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#2E7D32]">
            <h3 className="text-base sm:text-lg font-semibold text-[#2E7D32] mb-3">
              Hypotaxe verwenden
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">✓</span>
                <span>
                  <strong>Akademische Texte</strong> (Essays, Hausarbeiten)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">✓</span>
                <span>
                  <strong>Komplexe Argumentation</strong> (Pro/Contra, Begründungen)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">✓</span>
                <span>
                  <strong>Fachliteratur</strong> (wissenschaftliche Aufsätze)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">✓</span>
                <span>
                  <strong>TestDaF/DSH Schreiben</strong> (zeigt C1-Kompetenz!)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Balance Tip */}
        <div className="mt-5 sm:mt-6 bg-[#FFF9E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#D9A441]">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">💡</span>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1">
                Balance ist wichtig!
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                Zu viele Hypotaxen → Text wird schwer lesbar, "Schachtelsätze"
                <br />
                Nur Parataxen → Text wirkt simpel, nicht akademisch genug
                <br />
                <strong>Ideal:</strong> Mischung aus beiden Strukturen, abhängig vom Kontext
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cohesion Devices */}
      <CohesionDevicesGrid />

      {/* Coherence vs Cohesion */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Kohärenz vs. Kohäsion: Der Unterschied
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Kohäsion */}
          <div className="bg-[#E3F2FD] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#1565C0]">
            <h3 className="text-base sm:text-lg font-semibold text-[#1565C0] mb-3">
              Kohäsion (Form)
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mb-3">
              <strong>Formale</strong> Verknüpfung durch sprachliche Mittel
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">•</span>
                <span>Pronomen, Artikel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">•</span>
                <span>Konnektoren (deshalb, jedoch)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">•</span>
                <span>Synonyme, Oberbegriffe</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1565C0] flex-shrink-0">•</span>
                <span>Ellipsen</span>
              </li>
            </ul>
          </div>

          {/* Kohärenz */}
          <div className="bg-[#E8F5E9] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#2E7D32]">
            <h3 className="text-base sm:text-lg font-semibold text-[#2E7D32] mb-3">
              Kohärenz (Inhalt)
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mb-3">
              <strong>Inhaltlicher</strong> Zusammenhang und Logik
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">•</span>
                <span>Logische Reihenfolge</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">•</span>
                <span>Thematischer Zusammenhang</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">•</span>
                <span>Kausale Beziehungen</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2E7D32] flex-shrink-0">•</span>
                <span>Zeitliche Abfolge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Example */}
        <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-3 font-bold">
            Beispiel
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs sm:text-sm font-semibold text-text-main mb-2">
                Gute Kohäsion + Gute Kohärenz ✓
              </div>
              <p className="text-xs sm:text-sm font-serif text-text-main mb-2 bg-white rounded p-3">
                Maria lernte fleißig. <strong>Deshalb</strong> bestand <strong>sie</strong> die
                Prüfung. <strong>Anschließend</strong> feierte <strong>sie</strong> ihren Erfolg.
              </p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                → Kohäsion: "deshalb", "anschließend" (Konnektoren), "sie" (Pronomen)
                <br />→ Kohärenz: Logische Reihenfolge (lernen → bestehen → feiern)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Text Coherence Trainer */}
      <TextCoherenceTrainer />

      {/* Summary */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: C1-Textkompetenz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Sentence Structure */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-primary mb-3">Satzarchitektur</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Parataxe:</strong> Hauptsatz + Hauptsatz (einfach, klar)
              </p>
              <p>
                <strong>Hypotaxe:</strong> Hauptsatz + Nebensatz (komplex, akademisch)
              </p>
              <p>
                <strong>TestDaF/DSH:</strong> Zeige Hypotaxen für C1-Bewertung!
              </p>
            </div>
          </div>

          {/* Cohesion */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-primary mb-3">
              Kohäsion & Kohärenz
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Kohäsion:</strong> Pronomen, Konnektoren, Synonyme
              </p>
              <p>
                <strong>Kohärenz:</strong> Logische Struktur, Kausalität
              </p>
              <p>
                <strong>Zusammen:</strong> Professionelle, verständliche Texte
              </p>
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
                <strong>Hypotaxen sind Pflicht:</strong> Nutze Nebensätze (weil, obwohl, wenn)
                für höhere Punktzahlen. Nur Hauptsätze = B1/B2-Niveau!
                <br />
                <strong>Konnektoren variieren:</strong> Nicht immer "und" und "aber". Nutze:
                deshalb, allerdings, zudem, dennoch, folglich.
                <br />
                <strong>Referenzkette:</strong> "Ein Student... Der Student... Er..." zeigt
                Textkompetenz.
                <br />
                <strong>Nicht übertreiben:</strong> Zu viele Nebensätze = unlesbar. Balance!
                Ideale Länge: 2-3 Nebensätze pro Absatz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
