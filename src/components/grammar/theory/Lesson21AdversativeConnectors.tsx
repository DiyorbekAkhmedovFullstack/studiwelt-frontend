import { AdversativeComparison } from './AdversativeComparison';
import { PositionShowcase } from './PositionShowcase';
import { AdversativeSpectrum } from './AdversativeSpectrum';
import { ContrastSelector } from './ContrastSelector';

export function Lesson21AdversativeConnectors() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Adversative Konnektoren drücken einen <strong>Gegensatz</strong> oder eine{' '}
          <strong>Einschränkung</strong> aus. Im B2-C1-Niveau musst du zwischen verschiedenen
          Nuancen unterscheiden: <em>Einfacher Gegensatz</em> (aber), <em>Korrektur nach
          Verneinung</em> (sondern), <em>starker Kontrast</em> (hingegen/dagegen) und{' '}
          <em>Präzisierung</em> (vielmehr). Die Wahl des richtigen Konnektors hängt vom{' '}
          <strong>Register</strong> (Umgangssprache vs. akademisch) und der{' '}
          <strong>syntaktischen Position</strong> ab.
        </p>
      </section>

      {/* Core Distinction: Aber vs. Sondern */}
      <AdversativeComparison />

      {/* Position in Sentence */}
      <PositionShowcase />

      {/* Register Spectrum */}
      <AdversativeSpectrum />

      {/* Special Cases Section */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Spezialfälle & Feinheiten
        </h2>

        {/* Vielmehr */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          1. Vielmehr (Präzisierung / Korrektur)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          "Vielmehr" ersetzt oder verstärkt eine Aussage nach einer Verneinung. Es ist{' '}
          <strong>formeller</strong> als "sondern" und drückt oft eine Steigerung aus.
        </p>
        <div className="bg-[#FAF6F3] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            "Das Ergebnis ist nicht gut, <strong>vielmehr</strong> ist es exzellent."
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            = Es ist mehr als nur gut – es ist sogar exzellent.
          </p>
        </div>

        {/* Dafür vs. Dagegen */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          2. Dafür vs. Dagegen (Pro/Contra)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Diese Adverbien markieren explizit <strong>Zustimmung</strong> (dafür) oder{' '}
          <strong>Widerspruch</strong> (dagegen). Beide stehen auf Position 1 und verlangen
          Inversion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] px-3 sm:px-4 py-3 rounded-r-lg">
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              "Ich bin <strong>dafür</strong>, dass wir den Plan umsetzen."
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted italic mt-1">
              (Zustimmung / Pro-Argument)
            </p>
          </div>
          <div className="bg-[#FFEBEE] border-l-4 border-[#C62828] px-3 sm:px-4 py-3 rounded-r-lg">
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              "Er <strong>dagegen</strong> ist skeptisch."
            </p>
            <p className="text-[0.65rem] sm:text-xs text-text-muted italic mt-1">
              (Opposition / Contra-Argument)
            </p>
          </div>
        </div>

        {/* Andererseits / Einerseits */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3">
          3. Einerseits ... andererseits (Beide Seiten zeigen)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          Zweiteilige Konstruktion für ausgewogene Pro-Contra-Argumente. Oft in{' '}
          <strong>TestDaF/DSH-Erörterungen</strong> verwendet.
        </p>
        <div className="bg-[#FAF6F3] px-3 sm:px-4 py-3 sm:py-4 rounded-lg">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
            "<strong>Einerseits</strong> bietet die Stadt viele Möglichkeiten,{' '}
            <strong>andererseits</strong> ist sie sehr teuer."
          </p>
        </div>
      </section>

      {/* Interactive Context Trainer */}
      <ContrastSelector />

      {/* Summary / Quick Reference */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Aber */}
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-primary">aber</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted mb-2">
              Position 0 • Informal
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-main italic">
              Gegensatz ohne Verneinung
            </div>
          </div>

          {/* Sondern */}
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-primary">
              sondern
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted mb-2">
              Position 0 • Nach "nicht"
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-main italic">
              Korrektur: nicht X, sondern Y
            </div>
          </div>

          {/* Jedoch */}
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-primary">jedoch</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted mb-2">
              Position 1 • Neutral
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-main italic">
              Neutraler Gegensatz (B2)
            </div>
          </div>

          {/* Hingegen */}
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-primary">
              hingegen
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted mb-2">
              Position 1 • Formal
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-main italic">
              Starker Kontrast (B2-C1)
            </div>
          </div>

          {/* Dagegen */}
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-primary">
              dagegen
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted mb-2">
              Position 1 • Formal
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-main italic">
              Opposition / Gegenteil
            </div>
          </div>

          {/* Vielmehr */}
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-primary">
              vielmehr
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted mb-2">
              Position 1 • Akademisch
            </div>
            <div className="text-[0.65rem] sm:text-xs text-text-main italic">
              Präzisierung / Steigerung
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-[rgba(166,123,91,0.1)] border-l-4 border-primary px-3 sm:px-4 py-3 sm:py-4 rounded-r-lg mt-4 sm:mt-5 md:mt-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">💡</span>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1">
                Prüfungstipp
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
                In TestDaF/DSH-Erörterungen: Nutze <strong>jedoch</strong>, <strong>hingegen</strong>{' '}
                und <strong>andererseits</strong> für formelle Gegensätze. Vermeide{' '}
                <strong>aber</strong> in akademischen Texten (zu umgangssprachlich). Für
                Pro/Contra-Strukturen: <em>einerseits...andererseits</em>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
