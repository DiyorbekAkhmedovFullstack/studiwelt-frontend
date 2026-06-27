import { Icon } from '../../../lib/icons';
import { AdjectiveDeclensionGrid } from './AdjectiveDeclensionGrid';
import { AdjectiveDeclensionTrainer } from './AdjectiveDeclensionTrainer';
import { CompositaBuilder } from './CompositaBuilder';

export function Lesson26AdjectivesComposita() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Diese Lektion kombiniert zwei zentrale Themen für B2-C1:{' '}
          <strong>Adjektivdeklination</strong> und <strong>Komposita</strong>. Die{' '}
          <strong>Adjektivdeklination</strong> ist essentiell für korrektes Deutsch – die Endung
          hängt vom <em>Artikeltyp</em>, <em>Genus</em>, <em>Numerus</em> und <em>Kasus</em> ab.{' '}
          <strong>Komposita</strong> (zusammengesetzte Wörter) sind typisch für das Deutsche und
          erweitern deinen <strong>Wortschatz</strong> enorm. Für <strong>TestDaF/DSH</strong>:
          Beherrsche die Adjektivdeklination für fehlerfreies Schreiben und erkenne Komposita
          im Leseverstehen, um komplexe Fachbegriffe zu entschlüsseln.
        </p>
      </section>

      {/* Part 1: Adjektivdeklination */}
      <section className="mb-8 sm:mb-12 md:mb-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
            Teil 1: Adjektivdeklination
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted">
            Wie dekliniert man Adjektive vor Nomen?
          </p>
        </div>

        {/* Adjective Declension Grid */}
        <AdjectiveDeclensionGrid />

        {/* Key Rules */}
        <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
          <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold mb-4 sm:mb-5 pb-2 border-b-2 border-[#E3D4C5]">
            Die wichtigsten Regeln auf einen Blick
          </h3>

          <div className="space-y-5 sm:space-y-6">
            {/* Rule 1 */}
            <div className="bg-[#E3F2FD] rounded-lg p-4 sm:p-5 border-l-4 border-[#1565C0]">
              <h4 className="text-sm sm:text-base font-bold text-[#1565C0] mb-2 sm:mb-3">
                1. Nach bestimmtem Artikel (der, die, das)
              </h4>
              <p className="text-xs sm:text-sm text-text-muted mb-3 leading-relaxed">
                Der Artikel zeigt bereits Genus und Kasus → Adjektiv hat <strong>schwache</strong>{' '}
                Endung
              </p>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs sm:text-sm font-mono text-text-main mb-2">
                  Nominativ Singular: immer <strong>-e</strong>
                </p>
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Alle anderen: immer <strong>-en</strong>
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="bg-[#FFF3E0] rounded-lg p-4 sm:p-5 border-l-4 border-[#E65100]">
              <h4 className="text-sm sm:text-base font-bold text-[#E65100] mb-2 sm:mb-3">
                2. Nach unbestimmtem Artikel (ein, kein, mein...)
              </h4>
              <p className="text-xs sm:text-sm text-text-muted mb-3 leading-relaxed">
                Der unbestimmte Artikel zeigt nicht immer Genus/Kasus klar → Adjektiv muss{' '}
                <strong>manchmal</strong> helfen
              </p>
              <div className="bg-white rounded-lg p-3 space-y-2">
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Nom. mask: ein gut<strong>er</strong> Mann (Adjektiv zeigt maskulin)
                </p>
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Nom./Akk. neut: ein gut<strong>es</strong> Kind (Adjektiv zeigt neutral)
                </p>
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Sonst: meist <strong>-en</strong>
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="bg-[#E8F5E9] rounded-lg p-4 sm:p-5 border-l-4 border-[#2E7D32]">
              <h4 className="text-sm sm:text-base font-bold text-[#2E7D32] mb-2 sm:mb-3">
                3. Ohne Artikel (Nullartikel)
              </h4>
              <p className="text-xs sm:text-sm text-text-muted mb-3 leading-relaxed">
                Kein Artikel da → Adjektiv <strong>übernimmt</strong> die Artikelendung (starke
                Deklination)
              </p>
              <div className="bg-white rounded-lg p-3 space-y-2">
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Nom. mask: gut<strong>er</strong> Wein (= der Wein → -er)
                </p>
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Nom. fem: gut<strong>e</strong> Milch (= die Milch → -e)
                </p>
                <p className="text-xs sm:text-sm font-mono text-text-main">
                  Akk. neut: gut<strong>es</strong> Bier (= das Bier → -es)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Trainer */}
        <AdjectiveDeclensionTrainer />
      </section>

      {/* Part 2: Komposita */}
      <section className="mb-8 sm:mb-12 md:mb-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
            Teil 2: Komposita (Zusammengesetzte Wörter)
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted">
            Wie entstehen neue Wörter durch Zusammensetzung?
          </p>
        </div>

        {/* Basic Principles */}
        <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
          <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold mb-4 sm:mb-5 pb-2 border-b-2 border-[#E3D4C5]">
            Grundprinzipien der Komposita
          </h3>

          <div className="space-y-5 sm:space-y-6">
            {/* Principle 1 */}
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-primary">1.</span>
                Das Grundwort bestimmt alles
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-text-muted mb-3 leading-relaxed">
                Das <strong>letzte Wort</strong> (Grundwort) bestimmt <strong>Genus</strong>,{' '}
                <strong>Plural</strong> und <strong>Wortart</strong>. Das Bestimmungswort
                (links) beschreibt das Grundwort genauer.
              </p>
              <div className="bg-[#FAF6F3] rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-serif text-text-main">
                      <strong className="text-text-muted">Haus</strong>
                      <strong className="text-primary">tür</strong>
                    </span>
                    <span className="text-sm sm:text-base text-text-muted">
                      → <strong>die</strong> Haustür (Genus von "Tür")
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-serif text-text-main">
                      <strong className="text-text-muted">Hoch</strong>
                      <strong className="text-primary">schule</strong>
                    </span>
                    <span className="text-sm sm:text-base text-text-muted">
                      → <strong>die</strong> Hochschule (Genus von "Schule")
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Principle 2 */}
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-primary">2.</span>
                Keine Leerzeichen!
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-text-muted mb-3 leading-relaxed">
                Im Deutschen werden Komposita <strong>zusammengeschrieben</strong> – anders als
                im Englischen.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#E8F5E9] rounded-lg p-3 border-l-4 border-[#2E7D32]">
                  <div className="text-[0.6rem] sm:text-[0.65rem] text-[#2E7D32] font-bold mb-1 uppercase">
                    Deutsch: Richtig
                  </div>
                  <p className="text-sm sm:text-base font-serif text-text-main">
                    Hochschule, Lehrbuch, Wohnzimmer
                  </p>
                </div>
                <div className="bg-[#FFEBEE] rounded-lg p-3 border-l-4 border-[#C62828]">
                  <div className="text-[0.6rem] sm:text-[0.65rem] text-[#C62828] font-bold mb-1 uppercase">
                    Englisch: Vergleich
                  </div>
                  <p className="text-sm sm:text-base font-serif text-text-main">
                    high school, textbook, living room
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 3 */}
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-primary">3.</span>
                Bedeutung: Bestimmungswort beschreibt Grundwort
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-text-muted mb-3 leading-relaxed">
                Die <strong>Bedeutungsrichtung</strong> geht von links nach rechts: Das
                Bestimmungswort (links) gibt an, <em>welche Art</em> von Grundwort gemeint ist.
              </p>
              <div className="bg-[#FFF3E0] rounded-lg p-4 space-y-2">
                <p className="text-xs sm:text-sm font-serif text-text-main">
                  <strong>Lehrbuch</strong> = ein Buch zum Lehren/Lernen
                </p>
                <p className="text-xs sm:text-sm font-serif text-text-main">
                  <strong>Buchladen</strong> = ein Laden für Bücher
                </p>
                <p className="text-xs sm:text-sm text-text-muted italic mt-2">
                  → Unterschiedliche Reihenfolge = unterschiedliche Bedeutung!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Composita Builder */}
        <CompositaBuilder />
      </section>

      {/* Summary */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht: Adjektive & Komposita
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Adjektivdeklination Summary */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-serif font-bold mb-3 text-primary">
              Adjektivdeklination
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-[#1565C0] font-bold">•</span>
                <span>
                  <strong>Typ I (der/die/das):</strong> -e oder -en
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#E65100] font-bold">•</span>
                <span>
                  <strong>Typ II (ein/kein/mein):</strong> -er/-es in Nom/Akk, sonst -en
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#2E7D32] font-bold">•</span>
                <span>
                  <strong>Typ III (Nullartikel):</strong> Adjektiv übernimmt Artikelendung
                </span>
              </div>
            </div>
          </div>

          {/* Komposita Summary */}
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-serif font-bold mb-3 text-primary">
              Komposita
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-[#1565C0] font-bold">•</span>
                <span>
                  <strong>Nomen + Nomen:</strong> Haustür, Wortschatz
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#E65100] font-bold">•</span>
                <span>
                  <strong>Adjektiv + Nomen:</strong> Hochschule, Kleinkind
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#2E7D32] font-bold">•</span>
                <span>
                  <strong>Verb + Nomen:</strong> Wohnzimmer, Lehrbuch
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6A1B9A] font-bold">•</span>
                <span>
                  <strong>Nomen + Adjektiv:</strong> lebensmüde, wasserdicht
                </span>
              </div>
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
                <strong>Adjektivdeklination:</strong> Identifiziere zuerst Artikeltyp, Genus und
                Kasus, bevor du die Endung wählst. Übe mit authentischen Prüfungstexten!
                <br />
                <strong>Komposita:</strong> Zerlege lange Wörter von rechts nach links: Das
                Grundwort (rechts) gibt die Hauptbedeutung, das Bestimmungswort (links)
                präzisiert. Beispiel: Studenten<strong>aus</strong>weis → Ausweis für Studenten.
                <br />
                <strong>Leseverstehen:</strong> Erkenne Komposita, um Fachbegriffe zu verstehen,
                ohne jedes Wort zu kennen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
