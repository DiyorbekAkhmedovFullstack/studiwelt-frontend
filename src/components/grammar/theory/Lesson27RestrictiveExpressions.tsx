import { Icon, Ui } from '../../../lib/icons';
import { RestrictiveParticlesGrid } from './RestrictiveParticlesGrid';
import { FocusParticlesComparison } from './FocusParticlesComparison';
import { RestrictiveContextTrainer } from './RestrictiveContextTrainer';

export function Lesson27RestrictiveExpressions() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          <strong>Restriktive Ausdrücke</strong> (nur, lediglich, bloß, allein, ausschließlich,
          einzig) <strong>beschränken</strong> oder <strong>begrenzen</strong> die Bedeutung
          eines Satzes. Sie schließen Alternativen aus: "nur dies, nichts anderes". Für{' '}
          <strong>B2-C1</strong>: Verstehe die <strong>feinen Nuancen</strong> zwischen diesen
          Partikeln – sie unterscheiden sich hauptsächlich in <strong>Register</strong> und{' '}
          <strong>Formalität</strong>. Wichtig für <strong>TestDaF/DSH</strong>: Wähle das
          passende Register für schriftliche Texte (lediglich, ausschließlich) vs. mündliche
          Prüfungen (nur, bloß). Im <strong>Leseverstehen</strong>: Erkenne, welche
          Alternativen ausgeschlossen werden.
        </p>
      </section>

      {/* Restrictive Particles Grid */}
      <RestrictiveParticlesGrid />

      {/* Register Rules */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Register-Hierarchie: Wann welche Partikel?
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* Academic/Formal Writing */}
          <div className="bg-[#FFF3E0] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#E65100]">
            <h3 className="text-base sm:text-lg font-semibold text-[#E65100] mb-3 flex items-center gap-2">
              <Icon.Documents size={18} />
              Akademisches Schreiben / Formelle Texte
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold">1. Wahl:</span>
                  <span className="font-serif font-bold text-text-main">
                    lediglich, ausschließlich
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted">
                  → Für wissenschaftliche Arbeiten, Hausarbeiten, Essays (TestDaF/DSH Schreiben)
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  <strong>Beispiel:</strong> Die Studie umfasst lediglich 50 Teilnehmer.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  <Ui.Check className="inline text-success" size={12} />Formal, präzise, akademisch
                </p>
              </div>
            </div>
          </div>

          {/* Neutral/Universal */}
          <div className="bg-[#E3F2FD] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#1565C0]">
            <h3 className="text-base sm:text-lg font-semibold text-[#1565C0] mb-3 flex items-center gap-2">
              <Ui.Check size={18} />
              Neutral / Universal einsetzbar
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold">Beste Wahl:</span>
                  <span className="font-serif font-bold text-text-main">nur</span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted">
                  → Funktioniert in ALLEN Kontexten (mündlich, schriftlich, formal, informell)
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  <strong>Beispiel:</strong> Ich habe nur 10 Euro.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  <Ui.Check className="inline text-success" size={12} />Neutral, sicher, immer korrekt
                </p>
              </div>
            </div>
          </div>

          {/* Spoken/Informal */}
          <div className="bg-[#E8F5E9] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#2E7D32]">
            <h3 className="text-base sm:text-lg font-semibold text-[#2E7D32] mb-3 flex items-center gap-2">
              <Icon.LanguageReq size={18} />
              Gesprochenes Deutsch / Informell
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold">Umgangssprachlich:</span>
                  <span className="font-serif font-bold text-text-main">bloß</span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted">
                  → Für Gespräche, Chats, informelle Situationen
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  <strong>Beispiel:</strong> Das dauert bloß fünf Minuten!
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  <Ui.Check className="inline text-success" size={12} />Natürlich, lebendig, authentisch
                </p>
              </div>
            </div>
          </div>

          {/* Literary/Elevated */}
          <div className="bg-[#F3E5F5] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#6A1B9A]">
            <h3 className="text-base sm:text-lg font-semibold text-[#6A1B9A] mb-3 flex items-center gap-2">
              <Icon.Curriculum size={18} />
              Literarisch / Gehoben
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold">Gehobener Stil:</span>
                  <span className="font-serif font-bold text-text-main">allein</span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted">
                  → Für literarische Texte, gehobene Sprache, Prosa
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  <strong>Beispiel:</strong> Allein die Tatsache zeigt das Problem.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  <Ui.Check className="inline text-success" size={12} />Poetisch, gehoben, literarisch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Particles Comparison */}
      <FocusParticlesComparison />

      {/* Grammar Details */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Grammatische Besonderheiten
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* Position */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">1.</span>
              Position im Satz
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-3 leading-relaxed">
              Restriktive Partikeln stehen <strong>direkt vor</strong> dem Element, das sie
              einschränken (Fokus).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#E8F5E9] rounded-lg p-4 border-l-4 border-[#2E7D32]">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Nur <strong>Maria</strong> kam.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Fokus auf Maria (nicht Peter, nicht Anna)
                </p>
              </div>
              <div className="bg-[#E8F5E9] rounded-lg p-4 border-l-4 border-[#2E7D32]">
                <p className="text-xs sm:text-sm font-serif text-text-main mb-2">
                  Maria kam nur <strong>gestern</strong>.
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Fokus auf gestern (nicht heute, nicht morgen)
                </p>
              </div>
            </div>
          </div>

          {/* "Einzig" as Adjective */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">2.</span>
              "Einzig" ist ein Adjektiv (wird dekliniert!)
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-3 leading-relaxed">
              Anders als die anderen Partikeln wird <strong>"einzig"</strong> wie ein Adjektiv
              dekliniert.
            </p>
            <div className="bg-[#FFE5E5] rounded-lg p-4 border-l-4 border-[#C2185B]">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-serif text-text-main">
                  <Ui.Check className="inline text-success" size={12} />Das ist die <strong>einzige</strong> Lösung. (Adjektiv, dekliniert)
                </p>
                <p className="text-xs sm:text-sm font-serif text-text-main">
                  <Ui.Close className="inline text-danger" size={12} /> Das ist die <del>einzig</del> Lösung. (falsch!)
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic mt-2">
                  → "Einzig" + Nomen = Adjektiv (braucht Endung)
                </p>
              </div>
            </div>
          </div>

          {/* Combination */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">3.</span>
              Kombination für Betonung
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-3 leading-relaxed">
              Man kann restriktive Partikeln kombinieren, um die Einschränkung zu{' '}
              <strong>verstärken</strong>.
            </p>
            <div className="bg-[#FFF9E5] rounded-lg p-4 border-l-4 border-[#D9A441]">
              <div className="space-y-3">
                <div>
                  <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                    einzig und allein
                  </p>
                  <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                    → sehr starke Betonung: "absolut nur, ohne jede Alternative"
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-serif text-text-main mb-1">
                    Beispiel: Er kam einzig und allein wegen dir.
                  </p>
                  <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                    → Betonung: kein anderer Grund, nur du
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Trainer */}
      <RestrictiveContextTrainer />

      {/* Summary */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: Restriktive Ausdrücke nach Register
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#E65100]">
            <h3 className="text-sm sm:text-base font-bold text-[#E65100] mb-2">
              Akademisch/Formal
            </h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <strong>lediglich</strong> – am formalsten
              </p>
              <p>
                <strong>ausschließlich</strong> – betont Exklusivität
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#1565C0]">
            <h3 className="text-sm sm:text-base font-bold text-[#1565C0] mb-2">Neutral</h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <strong>nur</strong> – universal, immer korrekt
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#2E7D32]">
            <h3 className="text-sm sm:text-base font-bold text-[#2E7D32] mb-2">
              Informell/Mündlich
            </h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <strong>bloß</strong> – umgangssprachlich
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#6A1B9A]">
            <h3 className="text-sm sm:text-base font-bold text-[#6A1B9A] mb-2">Gehoben</h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <strong>allein</strong> – literarisch, poetisch
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#C2185B]">
            <h3 className="text-sm sm:text-base font-bold text-[#C2185B] mb-2">Besonderheit</h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <strong>einzig</strong> – Adjektiv (dekliniert!)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#D9A441]">
            <h3 className="text-sm sm:text-base font-bold text-[#D9A441] mb-2">Kombination</h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <strong>einzig und allein</strong> – sehr betont
              </p>
            </div>
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
                <strong>Schriftliche Prüfung:</strong> Nutze "lediglich" oder "ausschließlich"
                für formelle Essays und Zusammenfassungen. Vermeide "bloß" (zu
                umgangssprachlich!).
                <br />
                <strong>Mündliche Prüfung:</strong> "Nur" ist immer sicher. "Bloß" macht deine
                Sprache natürlicher und authentischer, aber übertreib es nicht.
                <br />
                <strong>Leseverstehen:</strong> Achte auf restriktive Partikeln – sie zeigen,
                welche Alternativen der Autor <em>ausschließt</em>. Wichtig für das Verständnis
                der Argumentation!
                <br />
                <strong>Fokus-Regel:</strong> Die Partikel steht direkt vor dem eingeschränkten
                Element. "Nur Maria kam" ≠ "Maria kam nur".
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
