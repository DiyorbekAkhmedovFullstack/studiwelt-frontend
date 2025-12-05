import { PerspectiveMarkersGrid } from './PerspectiveMarkersGrid';
import { ArgumentationStructure } from './ArgumentationStructure';
import { RegisterTrainer } from './RegisterTrainer';

export function Lesson28PerspectiveMarkers() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          <strong>Perspektiv- und Stellungnahme-Marker</strong> sind sprachliche Mittel, um{' '}
          <strong>Meinungen</strong>, <strong>Positionen</strong> und <strong>Argumente</strong>{' '}
          auszudrücken. Für <strong>B2-C1</strong>: Meistere die <strong>Register-Unterschiede</strong>{' '}
          zwischen informellen (ich finde), neutralen (meiner Meinung nach) und formellen (meines
          Erachtens) Ausdrücken. Essentiell für <strong>TestDaF/DSH</strong>:{' '}
          <strong>Schriftliche Prüfung</strong> (Essay, Stellungnahme) erfordert formelle Redemittel,{' '}
          <strong>mündliche Prüfung</strong> (Diskussion) erlaubt neutralere Formulierungen. Nutze
          klare <strong>Argumentationsstrukturen</strong> (Einleitung, Pro, Contra, Schluss) mit
          passenden Redemitteln für jede Phase.
        </p>
      </section>

      {/* Perspective Markers Grid */}
      <PerspectiveMarkersGrid />

      {/* Register Hierarchy */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Register-Hierarchie: Von informell bis akademisch
        </h2>

        <div className="space-y-4 sm:space-y-5">
          {/* Informal */}
          <div className="bg-[#FFEBEE] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#C62828]">
            <h3 className="text-base sm:text-lg font-semibold text-[#C62828] mb-3 flex items-center gap-2">
              <span>❌</span>
              Informell (NICHT für Prüfungen!)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Ich finde</strong> / <strong>Ich denke</strong> / <strong>Ich glaube</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Zu unsicher und umgangssprachlich
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Gut/Schlecht ist</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Zu wertend und simpel
                </p>
              </div>
            </div>
          </div>

          {/* Neutral */}
          <div className="bg-[#E3F2FD] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#1565C0]">
            <h3 className="text-base sm:text-lg font-semibold text-[#1565C0] mb-3 flex items-center gap-2">
              <span>✅</span>
              Neutral (Mündliche Prüfung)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Meiner Meinung nach</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Universal, immer korrekt
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Aus meiner Sicht</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Neutral, natürlich
                </p>
              </div>
            </div>
          </div>

          {/* Formal */}
          <div className="bg-[#E8F5E9] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#2E7D32]">
            <h3 className="text-base sm:text-lg font-semibold text-[#2E7D32] mb-3 flex items-center gap-2">
              <span>✅✅</span>
              Formal (Schriftliche Prüfung)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Meines Erachtens</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Formal, akademisch
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Meiner Ansicht nach</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Formal, präzise
                </p>
              </div>
            </div>
          </div>

          {/* Very Formal */}
          <div className="bg-[#FFF3E0] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#E65100]">
            <h3 className="text-base sm:text-lg font-semibold text-[#E65100] mb-3 flex items-center gap-2">
              <span>🎓</span>
              Sehr formal (Wissenschaftliche Arbeiten)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Ich bin der Auffassung, dass</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Sehr formal, akademisch
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                  <strong>Ich vertrete den Standpunkt, dass</strong>
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Argumentativ, begründet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Argumentation Structure */}
      <ArgumentationStructure />

      {/* Common Mistakes */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Häufige Fehler vermeiden
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* Mistake 1 */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-[#C62828]">❌</span>
              Fehler 1: Zu informelle Sprache in Essays
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#FFEBEE] rounded-lg p-4 border-l-4 border-[#C62828]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#C62828] font-bold mb-2 uppercase">
                  Falsch
                </div>
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Ich <strong>finde</strong>, dass Studiengebühren schlecht sind.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → "Ich finde" und "schlecht" sind zu informell
                </p>
              </div>
              <div className="bg-[#E8F5E9] rounded-lg p-4 border-l-4 border-[#2E7D32]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#2E7D32] font-bold mb-2 uppercase">
                  Richtig
                </div>
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  <strong>Meines Erachtens</strong> sind Studiengebühren{' '}
                  <strong>problematisch</strong>.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Formal und präzise
                </p>
              </div>
            </div>
          </div>

          {/* Mistake 2 */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-[#C62828]">❌</span>
              Fehler 2: Wiederholung derselben Formulierung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#FFEBEE] rounded-lg p-4 border-l-4 border-[#C62828]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#C62828] font-bold mb-2 uppercase">
                  Falsch
                </div>
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Meiner Meinung nach... Meiner Meinung nach... Meiner Meinung nach...
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Monoton, keine Variation
                </p>
              </div>
              <div className="bg-[#E8F5E9] rounded-lg p-4 border-l-4 border-[#2E7D32]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#2E7D32] font-bold mb-2 uppercase">
                  Richtig
                </div>
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Meiner Meinung nach... Aus meiner Sicht... Meines Erachtens...
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Variation zeigt Sprachkompetenz
                </p>
              </div>
            </div>
          </div>

          {/* Mistake 3 */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-[#C62828]">❌</span>
              Fehler 3: Fehlende Struktur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#FFEBEE] rounded-lg p-4 border-l-4 border-[#C62828]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#C62828] font-bold mb-2 uppercase">
                  Falsch
                </div>
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Argumente ohne Struktur, chaotisch durcheinander
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Keine klare Argumentationslinie
                </p>
              </div>
              <div className="bg-[#E8F5E9] rounded-lg p-4 border-l-4 border-[#2E7D32]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#2E7D32] font-bold mb-2 uppercase">
                  Richtig
                </div>
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Einleitung → Pro → Contra → Schluss
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Klare, logische Struktur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Register Trainer */}
      <RegisterTrainer />

      {/* Summary */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: Register-Wahl für Prüfungen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Written Exam */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border-l-4 border-[#2E7D32]">
            <h3 className="text-base sm:text-lg font-bold text-[#2E7D32] mb-3">
              Schriftliche Prüfung
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Meinung:</strong> meines Erachtens, meiner Ansicht nach
              </p>
              <p>
                <strong>Pro:</strong> ein wichtiges Argument dafür ist, dafür spricht
              </p>
              <p>
                <strong>Contra:</strong> dagegen lässt sich einwenden, Kritiker wenden ein
              </p>
              <p>
                <strong>Fazit:</strong> zusammenfassend lässt sich sagen, abwägend komme ich
              </p>
            </div>
          </div>

          {/* Oral Exam */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border-l-4 border-[#1565C0]">
            <h3 className="text-base sm:text-lg font-bold text-[#1565C0] mb-3">
              Mündliche Prüfung
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Meinung:</strong> meiner Meinung nach, aus meiner Sicht
              </p>
              <p>
                <strong>Pro:</strong> dafür spricht, ein Vorteil ist
              </p>
              <p>
                <strong>Contra:</strong> dagegen spricht, ein Nachteil ist
              </p>
              <p>
                <strong>Fazit:</strong> zusammenfassend, ich komme zu dem Schluss
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
                <strong>Schriftlich:</strong> Nutze "meines Erachtens" statt "meiner Meinung nach"
                für höhere Punktzahlen. Variiere deine Redemittel – Wiederholungen wirken monoton!
                Vermeide "ich finde" und "ich denke" komplett.
                <br />
                <strong>Mündlich:</strong> "Meiner Meinung nach" ist immer sicher. Zeige Struktur:
                "Erstens... Zweitens... Abschließend..." macht deine Argumentation klar.
                <br />
                <strong>Goldene Regel:</strong> Formeller ist immer besser als informeller. Im
                Zweifel: Wähle die formalere Variante!
                <br />
                <strong>Struktur ist Pflicht:</strong> Einleitung (Thema) → Pro (2-3 Argumente) →
                Contra (2-3 Argumente) → Schluss (eigene Position). Ohne diese Struktur: Keine
                Höchstpunktzahl!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
