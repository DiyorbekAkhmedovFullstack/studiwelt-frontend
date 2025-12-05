export function WeilDaComparison() {
  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        "Weil" vs. "Da" – Der Unterschied
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 md:mb-8 leading-relaxed">
        Beide drücken einen <strong>Grund</strong> aus, aber <strong>"da"</strong> ist formeller
        und wird oft genutzt, wenn der Grund <em>bereits bekannt</em> oder <em>offensichtlich</em>{' '}
        ist. "Weil" ist neutral und universell einsetzbar.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        {/* Weil */}
        <div className="bg-[#E3F2FD] rounded-lg sm:rounded-xl p-5 sm:p-6 border-l-4 border-[#1565C0]">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#1565C0]">
              weil
            </h3>
            <span className="bg-[#1565C0] text-white text-[0.6rem] sm:text-[0.65rem] font-bold px-2 py-1 rounded-full">
              NEUTRAL
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[0.65rem] sm:text-xs text-text-muted uppercase tracking-wide mb-2">
                Verwendung
              </div>
              <p className="text-xs sm:text-sm md:text-base text-text-main leading-relaxed">
                Universell einsetzbar. Neuer oder unbekannter Grund. Hauptsatz kommt meist zuerst.
              </p>
            </div>

            <div>
              <div className="text-[0.65rem] sm:text-xs text-text-muted uppercase tracking-wide mb-2">
                Beispiel
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base md:text-lg font-serif text-text-main">
                  Ich bleibe zu Hause, <strong className="text-[#1565C0]">weil</strong> ich krank
                  bin.
                </p>
              </div>
            </div>

            <div>
              <div className="text-[0.65rem] sm:text-xs text-text-muted uppercase tracking-wide mb-2">
                Register
              </div>
              <p className="text-xs sm:text-sm text-text-muted">
                Gesprochen & geschrieben, alle Kontexte
              </p>
            </div>
          </div>
        </div>

        {/* Da */}
        <div className="bg-[#FFF3E0] rounded-lg sm:rounded-xl p-5 sm:p-6 border-l-4 border-[#E65100]">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#E65100]">
              da
            </h3>
            <span className="bg-[#E65100] text-white text-[0.6rem] sm:text-[0.65rem] font-bold px-2 py-1 rounded-full">
              FORMELL
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[0.65rem] sm:text-xs text-text-muted uppercase tracking-wide mb-2">
                Verwendung
              </div>
              <p className="text-xs sm:text-sm md:text-base text-text-main leading-relaxed">
                Bekannter/offensichtlicher Grund. Nebensatz steht oft am <strong>Anfang</strong>.
                Eleganter als "weil".
              </p>
            </div>

            <div>
              <div className="text-[0.65rem] sm:text-xs text-text-muted uppercase tracking-wide mb-2">
                Beispiel
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base md:text-lg font-serif text-text-main">
                  <strong className="text-[#E65100]">Da</strong> es regnet, bleiben wir zu Hause.
                </p>
              </div>
            </div>

            <div>
              <div className="text-[0.65rem] sm:text-xs text-text-muted uppercase tracking-wide mb-2">
                Register
              </div>
              <p className="text-xs sm:text-sm text-text-muted">
                Geschrieben, formell, akademisch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Position Comparison */}
      <div className="bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-5 sm:mb-6">
        <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">
          Position im Satz
        </h4>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-[#1565C0] font-bold mb-1 uppercase">
              Typisch mit "weil"
            </div>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              Hauptsatz → Nebensatz: "Ich lerne Deutsch, weil ich nach Berlin ziehe."
            </p>
          </div>
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] text-[#E65100] font-bold mb-1 uppercase">
              Typisch mit "da"
            </div>
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-main">
              Nebensatz → Hauptsatz: "Da ich nach Berlin ziehe, lerne ich Deutsch."
            </p>
          </div>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-[rgba(166,123,91,0.1)] border-l-4 border-primary px-4 sm:px-5 py-4 sm:py-5 rounded-r-lg">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl">💡</span>
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1 sm:mb-2">
              Wann "da" nutzen?
            </p>
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted leading-relaxed">
              <strong>Akademisches Schreiben:</strong> "Da" wirkt eleganter und professioneller.
              <br />
              <strong>Bekannte Gründe:</strong> "Da du Geburtstag hast, habe ich ein Geschenk
              gekauft."
              <br />
              <strong>Satzanfang:</strong> Beginne den Satz mit dem Grund für stilistische
              Variation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
