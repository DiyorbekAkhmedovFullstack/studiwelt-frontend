import { Icon, Ui } from '../../../lib/icons';
import { GrammarReviewGrid } from './GrammarReviewGrid';
import { ExamStrategiesGrid } from './ExamStrategiesGrid';
import { GrammarCompetencyChecklist } from './GrammarCompetencyChecklist';

export function Lesson30ExamPreparation() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          <strong>Willkommen zur Gesamtwiederholung!</strong> Du hast in den Lektionen 21-29
          fortgeschrittene Grammatik für <strong>TestDaF/DSH</strong> gelernt. Diese Lektion
          hilft dir, dein Wissen zu <strong>konsolidieren</strong> und <strong>
            Prüfungsstrategien
          </strong>{' '}
          zu entwickeln. Grammatik allein reicht nicht – du musst auch wissen,{' '}
          <strong>wie</strong> du sie in der Prüfung anwendest. Nutze die{' '}
          <strong>Selbsteinschätzung</strong>, um Schwächen zu identifizieren, und die{' '}
          <strong>Strategien</strong>, um jeden Prüfungsteil optimal zu meistern. Erfolg in
          TestDaF/DSH = <strong>Grammatik</strong> + <strong>Strategie</strong> +{' '}
          <strong>Übung</strong>!
        </p>
      </section>

      {/* Grammar Review Grid */}
      <GrammarReviewGrid />

      {/* Exam Strategies */}
      <ExamStrategiesGrid />

      {/* Competency Checklist */}
      <GrammarCompetencyChecklist />

      {/* Common Mistakes Across All Lessons */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Die 10 häufigsten Fehler (und wie du sie vermeidest)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Error 1 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                aber vs. sondern verwechseln
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>Falsch:</strong> Ich lerne nicht Englisch, aber Deutsch.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>Richtig:</strong> Ich lerne nicht Englisch, <strong>sondern</strong>{' '}
              Deutsch.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → Korrektur = sondern | Kontrast = aber
            </p>
          </div>

          {/* Error 2 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Zeitenfolge bei nachdem ignorieren
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>Falsch:</strong> Nachdem ich gegessen habe, ging ich spazieren.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>Richtig:</strong> Nachdem ich gegessen <strong>hatte</strong>, ging ich
              spazieren.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → nachdem: Nebensatz = eine Zeit zurück!
            </p>
          </div>

          {/* Error 3 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Irrealis falsch bilden
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>Falsch:</strong> Wenn ich reich wäre, würde ich kaufen ein Haus.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>Richtig:</strong> Wenn ich reich wäre, würde ich ein Haus{' '}
              <strong>kaufen</strong>.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → würde + Infinitiv am Ende!
            </p>
          </div>

          {/* Error 4 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                weil im formellen Text (statt da)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>B2-Niveau:</strong> Die Studie ist wichtig, weil sie neue Daten zeigt.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>C1-Niveau:</strong> <strong>Da</strong> die Studie neue Daten zeigt, ist
              sie wichtig.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → da = formell, im Vorfeld
            </p>
          </div>

          {/* Error 5 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Modalpartikeln schriftlich verwenden
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>Falsch (Essay):</strong> Die Studie zeigt ja interessante Ergebnisse.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>Richtig:</strong> Die Studie zeigt interessante Ergebnisse.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → Modalpartikeln NUR mündlich!
            </p>
          </div>

          {/* Error 6 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Adjektivendung vergessen
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>Falsch:</strong> Der interessant Vortrag
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>Richtig:</strong> Der interessant<strong>e</strong> Vortrag
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → Typ I nach bestimmtem Artikel: -e/-en
            </p>
          </div>

          {/* Error 7 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                nur in formalem Kontext
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>B2-Niveau:</strong> Nur 30% der Studenten bestanden.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>C1-Niveau:</strong> <strong>Lediglich</strong> 30% der Studenten
              bestanden.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → lediglich/ausschließlich für Essays
            </p>
          </div>

          {/* Error 8 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Informelle Meinungsäußerung
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>B2-Niveau:</strong> Ich denke, dass...
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>C1-Niveau:</strong> <strong>Meines Erachtens</strong>...
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → Meines Erachtens = höhere Punktzahl
            </p>
          </div>

          {/* Error 9 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Nur Hauptsätze verwenden
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>B1/B2:</strong> Die Studie ist wichtig. Sie zeigt neue Daten.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>C1:</strong> Die Studie ist wichtig, <strong>da sie</strong> neue Daten
              zeigt.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → Hypotaxen = Pflicht für C1-Bewertung!
            </p>
          </div>

          {/* Error 10 */}
          <div className="bg-[#FFE5E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#C2185B]">
            <div className="flex items-start gap-2 mb-2">
              <Ui.Close className="text-danger shrink-0 mt-0.5" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                Fehlende Referenzkette
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mb-2">
              <strong>Falsch:</strong> Ein Student kam. Ein Student fragte.
            </p>
            <p className="text-xs sm:text-sm text-[#2E7D32]">
              <strong>Richtig:</strong> Ein Student kam. <strong>Der Student</strong> / <strong>Er</strong> fragte.
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted mt-2 italic">
              → ein → der → er (Kohäsion)
            </p>
          </div>
        </div>
      </section>

      {/* Final Exam Checklist */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Checkliste: Bist du bereit für TestDaF/DSH?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Grammar Readiness */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-primary mb-3">
              Grammatik-Bereitschaft
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Konnektoren variieren (nicht nur "und", "aber")</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Nebensätze mit korrekter Verbposition bilden</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Zeitenfolge bei temporalen Nebensätzen beherrschen</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Register-angemessene Ausdrücke wählen können</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Adjektivendungen automatisch korrekt deklinieren</span>
              </li>
            </ul>
          </div>

          {/* Strategic Readiness */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-primary mb-3">
              Strategische Bereitschaft
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Zeitmanagement für jeden Prüfungsteil geplant</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Redemittel für mündlichen Ausdruck auswendig</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Essay-Struktur (Einleitung/Pro/Contra/Schluss) verinnerlicht</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Fehlerquellen identifiziert und geübt</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span>Mindestens 3 komplette Probetests absolviert</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Final Motivation */}
        <div className="bg-[rgba(166,123,91,0.1)] border-l-4 border-primary px-3 sm:px-4 py-3 sm:py-4 rounded-r-lg">
          <div className="flex items-start gap-2 sm:gap-3">
            <Icon.Target className="text-primary shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1">
                Letzter Tipp vor der Prüfung
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                <strong>Ruhe bewahren!</strong> Du hast die Grammatik gelernt. In der Prüfung:
                Konzentriere dich auf <strong>klare Struktur</strong> und{' '}
                <strong>korrekte Anwendung</strong>, nicht auf Perfektion. Kleine Fehler sind
                ok – niemand erwartet fehlerfreies Deutsch. Zeige, was du <strong>kannst</strong>
                , nicht, was du nicht kannst. <strong>Viel Erfolg!</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
