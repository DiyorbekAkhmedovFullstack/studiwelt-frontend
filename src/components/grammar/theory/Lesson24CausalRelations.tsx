import { CausalSpectrumGrid } from './CausalSpectrumGrid';
import { WeilDaComparison } from './WeilDaComparison';
import { CausalContextSelector } from './CausalContextSelector';

export function Lesson24CausalRelations() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Kausale Konnektoren drücken <strong>Gründe</strong> und <strong>Ursachen</strong> aus.
          Im B2-C1-Niveau unterscheidest du zwischen <em>neutralen</em> (weil), <em>formellen</em>{' '}
          (da, denn), <em>umgangssprachlichen</em> (nämlich) und <em>akademischen</em> (zumal,
          insofern) Konnektoren. Die Wahl hängt vom <strong>Register</strong> (gesprochen vs.
          geschrieben), der <strong>Textsorte</strong> (Chat vs. Aufsatz) und der{' '}
          <strong>Position im Satz</strong> ab. Besonders wichtig für{' '}
          <strong>TestDaF Schreiben</strong> und <strong>DSH</strong>: Variiere zwischen
          verschiedenen kausalen Ausdrücken für stilistische Eleganz.
        </p>
      </section>

      {/* Causal Spectrum Grid */}
      <CausalSpectrumGrid />

      {/* Weil vs Da Comparison */}
      <WeilDaComparison />

      {/* Detailed Rules */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
          Die Nuancen im Detail
        </h2>

        {/* Denn */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          1. "Denn" (Koordinierende Konjunktion)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          "Denn" ist formell und typisch für <strong>geschriebenes Deutsch</strong>. Anders als
          "weil" und "da" ist es eine <em>koordinierende</em> Konjunktion: Das Verb bleibt auf{' '}
          <strong>Position 2</strong>.
        </p>
        <div className="bg-[#FFF3E0] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            Ich bleibe zu Hause, <strong>denn</strong> ich <strong>bin</strong> krank.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            Verb auf Position 2 (nicht am Ende!)
          </p>
        </div>

        {/* Nämlich */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          2. "Nämlich" (Adverbiale Begründung)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          "Nämlich" steht <strong>im Mittelfeld</strong> des Satzes (nicht am Anfang!) und liefert
          eine nachträgliche Erklärung. Typisch für gesprochenes Deutsch.
        </p>
        <div className="bg-[#E8F5E9] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            Ich konnte nicht kommen. Ich war <strong>nämlich</strong> krank.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            Position im Mittelfeld, erklärt den vorherigen Satz
          </p>
        </div>

        {/* Zumal */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          3. "Zumal" (Zusätzlicher/Verstärkender Grund)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          "Zumal" fügt einen <strong>zusätzlichen Grund</strong> hinzu, der die Argumentation
          verstärkt. Sehr akademisch und formell (C1).
        </p>
        <div className="bg-[#F3E5F5] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            Das Projekt ist sinnvoll, <strong>zumal</strong> es kostengünstig ist.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            = besonders da / vor allem weil (zusätzlicher Grund)
          </p>
        </div>

        {/* Insofern */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
          4. "Insofern" (Bedingter/Eingeschränkter Grund)
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mb-2 sm:mb-3 leading-relaxed">
          "Insofern" drückt einen <strong>bedingten Grund</strong> aus: "sofern dies zutrifft" /
          "in dieser Hinsicht". Sehr akademisch (C1).
        </p>
        <div className="bg-[#F3E5F5] px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main mb-2">
            Die Theorie ist korrekt, <strong>insofern</strong> die Daten stimmen.
          </p>
          <p className="text-[0.65rem] sm:text-xs text-text-muted italic">
            = unter der Bedingung dass / sofern (eingeschränkter Grund)
          </p>
        </div>
      </section>

      {/* Interactive Context Selector */}
      <CausalContextSelector />

      {/* Summary */}
      <section className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF6F3] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 border border-[rgba(166,123,91,0.2)]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-4 sm:mb-5 md:mb-6 text-center">
          Schnellübersicht
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#1565C0]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#1565C0]">weil</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Neutral • NS • Verb Ende</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#E65100]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#E65100]">da</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Formell • NS • Satzanfang</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#E65100]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#E65100]">denn</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Formell • HS • Verb Pos 2</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#2E7D32]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#2E7D32]">nämlich</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Informell • Mittelfeld</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#6A1B9A]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#6A1B9A]">zumal</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Akademisch • Zusatzgrund</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-[#6A1B9A]">
            <div className="text-base sm:text-lg font-serif font-bold mb-1 text-[#6A1B9A]">insofern</div>
            <div className="text-[0.65rem] sm:text-xs text-text-muted">Akademisch • Bedingung</div>
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
                <strong>Schreiben:</strong> Variiere zwischen "weil", "da" und "denn". Nutze "zumal"
                für verstärkende Zusatzgründe. Vermeide Wiederholungen!
                <br />
                <strong>Leseverstehen:</strong> "Nämlich" markiert Erklärungen, "zumal" verstärkt
                Argumente.
                <br />
                <strong>Register:</strong> Chat/E-Mail: weil, nämlich • Aufsatz/Brief: da, denn,
                zumal
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
