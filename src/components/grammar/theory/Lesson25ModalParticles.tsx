import { Icon, Ui } from '../../../lib/icons';
import { ModalParticleGrid } from './ModalParticleGrid';
import { ParticleMeaningShift } from './ParticleMeaningShift';
import { ParticleContextTrainer } from './ParticleContextTrainer';

export function Lesson25ModalParticles() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          <strong>Modalpartikeln</strong> sind kleine Wörter wie <em>ja</em>, <em>doch</em>,{' '}
          <em>mal</em>, <em>eben</em>, die keine grammatische Funktion haben, aber die{' '}
          <strong>Haltung</strong> und <strong>Emotion</strong> des Sprechers ausdrücken. Sie
          sind typisch für <strong>gesprochenes Deutsch</strong> und machen Sätze natürlicher
          und lebendiger. Für B2-C1: Verstehe, wie Modalpartikeln die <strong>Bedeutung</strong>{' '}
          und <strong>Stimmung</strong> eines Satzes verändern, ohne die grundlegende Aussage zu
          ändern. Wichtig für <strong>mündliche Prüfungen</strong> (TestDaF, DSH) und{' '}
          <strong>Leseverstehen</strong>: Erkenne die impliziten Haltungen des Sprechers.
        </p>
      </section>

      {/* Modal Particle Grid */}
      <ModalParticleGrid />

      {/* Meaning Shift Demonstration */}
      <ParticleMeaningShift />

      {/* Key Characteristics */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Wichtige Eigenschaften von Modalpartikeln
        </h2>

        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {/* Property 1 */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">1.</span>
              Unbetont im Satz
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Modalpartikeln werden <strong>nie betont</strong>. Sie stehen im{' '}
              <strong>Mittelfeld</strong> des Satzes, oft nach dem konjugierten Verb.
            </p>
            <div className="bg-[#E3F2FD] px-3 sm:px-4 py-3 sm:py-4 rounded-lg">
              <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
                Das ist <span className="font-normal text-text-muted">(unbetont)</span>{' '}
                <strong>ja</strong> interessant!
              </p>
            </div>
          </div>

          {/* Property 2 */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">2.</span>
              Nicht weglassbar für die Bedeutung
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Grammatisch kann man sie weglassen, aber die <strong>emotionale Bedeutung</strong>{' '}
              geht verloren. Der Satz klingt neutral oder sogar unhöflich.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#FFEBEE] px-3 sm:px-4 py-3 sm:py-4 rounded-lg border-l-4 border-[#C62828]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#C62828] font-bold mb-1 uppercase">
                  Ohne Partikel
                </div>
                <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
                  Komm mit! <span className="text-text-muted">(direkter Befehl)</span>
                </p>
              </div>
              <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg border-l-4 border-[#2E7D32]">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#2E7D32] font-bold mb-1 uppercase">
                  Mit Partikel
                </div>
                <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
                  Komm mal mit! <span className="text-text-muted">(höfliche Bitte)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Property 3 */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">3.</span>
              Satzart bestimmt Bedeutung
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Dieselbe Partikel hat in <strong>verschiedenen Satzarten</strong> (Aussage, Frage,
              Aufforderung) unterschiedliche Funktionen.
            </p>
            <div className="space-y-3">
              <div className="bg-[#FFF3E0] px-3 sm:px-4 py-3 sm:py-4 rounded-lg">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#E65100] font-bold mb-1 uppercase">
                  "Doch" in Aussagen
                </div>
                <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-1">
                  Das ist <strong>doch</strong> klar!
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Widerspruch, Bekräftigung
                </p>
              </div>
              <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg">
                <div className="text-[0.6rem] sm:text-[0.65rem] text-[#2E7D32] font-bold mb-1 uppercase">
                  "Doch" in Aufforderungen
                </div>
                <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-1">
                  Komm <strong>doch</strong> mit!
                </p>
                <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                  → Dringlichkeit, Überredung
                </p>
              </div>
            </div>
          </div>

          {/* Property 4 */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-primary">4.</span>
              Kombination möglich
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
              Man kann <strong>mehrere Modalpartikeln</strong> kombinieren, um die Haltung zu
              verstärken oder zu nuancieren.
            </p>
            <div className="bg-[#F3E5F5] px-3 sm:px-4 py-3 sm:py-4 rounded-lg">
              <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
                Komm <strong>doch mal</strong> mit!
              </p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
                → "doch" (dringend) + "mal" (höflich) = dringende, aber höfliche Bitte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Context Trainer */}
      <ParticleContextTrainer />

      {/* Register and Usage */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Register: Wann Modalpartikeln nutzen?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Spoken German */}
          <div className="bg-[#E8F5E9] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#2E7D32]">
            <h3 className="text-base sm:text-lg font-semibold text-[#2E7D32] mb-3">
              Gesprochenes Deutsch <Ui.Check className="inline" size={16} />
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-main">
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] mt-1">•</span>
                <span>Alltägliche Gespräche</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] mt-1">•</span>
                <span>Mündliche Prüfungen (natürliche Ausdrucksweise)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] mt-1">•</span>
                <span>Informelle E-Mails und Chats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] mt-1">•</span>
                <span>Dialoge in Literatur</span>
              </li>
            </ul>
          </div>

          {/* Written German */}
          <div className="bg-[#FFEBEE] rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#C62828]">
            <h3 className="text-base sm:text-lg font-semibold text-[#C62828] mb-3">
              Geschriebenes Deutsch <Ui.Close className="inline" size={16} />
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-main">
              <li className="flex items-start gap-2">
                <span className="text-[#C62828] mt-1">•</span>
                <span>Akademische Aufsätze</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C62828] mt-1">•</span>
                <span>Formelle Briefe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C62828] mt-1">•</span>
                <span>TestDaF/DSH Schreiben (zu informell!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C62828] mt-1">•</span>
                <span>Wissenschaftliche Texte</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: Die 8 wichtigsten Modalpartikeln
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#2E7D32]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#2E7D32]">ja</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Überraschung</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#E65100]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#E65100]">doch</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Widerspruch</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#1565C0]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#1565C0]">mal</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Höflichkeit</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#6A1B9A]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#6A1B9A]">eben</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Resignation</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#D9A441]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#D9A441]">wohl</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Vermutung</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#C2185B]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#C2185B]">eigentlich</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Neugier</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#1565C0]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#1565C0]">denn</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Interesse</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#C62828]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#C62828]">bloß/nur</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Warnung</div>
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
                <strong>Mündliche Prüfung:</strong> Nutze Modalpartikeln wie "ja", "doch", "eben"
                für natürliche Sprache und emotionale Ausdrucksweise. Zeige damit, dass du
                authentisches Deutsch sprichst!
                <br />
                <strong>Schriftliche Prüfung:</strong> Vermeide Modalpartikeln! Sie sind zu
                informell für akademisches Schreiben.
                <br />
                <strong>Leseverstehen:</strong> Achte auf Modalpartikeln, um die <em>implizite
                Haltung</em> des Autors zu erkennen (Ironie, Überraschung, Resignation).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
