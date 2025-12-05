import { useState } from 'react';

type ArgumentPhase = 'introduction' | 'pro' | 'contra' | 'conclusion';

type PhaseContent = {
  phase: ArgumentPhase;
  title: string;
  description: string;
  redemittel: string[];
  example: string;
  color: string;
};

export function ArgumentationStructure() {
  const [selectedPhase, setSelectedPhase] = useState<ArgumentPhase>('introduction');

  const phases: PhaseContent[] = [
    {
      phase: 'introduction',
      title: 'Einleitung',
      description: 'Thema einführen, Position ankündigen',
      redemittel: [
        'Das Thema [...] ist in letzter Zeit viel diskutiert worden.',
        'Die Frage, ob [...], wird kontrovers diskutiert.',
        'In der heutigen Gesellschaft spielt [...] eine wichtige Rolle.',
        'Im Folgenden möchte ich Pro- und Contra-Argumente abwägen.',
      ],
      example:
        'Die Frage, ob Studiengebühren eingeführt werden sollten, wird kontrovers diskutiert. Im Folgenden möchte ich Pro- und Contra-Argumente abwägen und meine eigene Position darlegen.',
      color: 'bg-[#E3F2FD] border-[#1565C0]',
    },
    {
      phase: 'pro',
      title: 'Pro-Argumente',
      description: 'Argumente für eine Position präsentieren',
      redemittel: [
        'Ein wichtiges Argument dafür ist, dass [...]',
        'Dafür spricht, dass [...]',
        'Ein weiterer Vorteil besteht darin, dass [...]',
        'Befürworter argumentieren, dass [...]',
        'Nicht zu vernachlässigen ist, dass [...]',
        'Hinzu kommt, dass [...]',
      ],
      example:
        'Ein wichtiges Argument dafür ist, dass Studiengebühren die Qualität der Lehre verbessern könnten. Dafür spricht, dass Universitäten mehr finanzielle Mittel zur Verfügung hätten. Ein weiterer Vorteil besteht darin, dass Studierende möglicherweise ihr Studium ernster nehmen würden.',
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
    },
    {
      phase: 'contra',
      title: 'Contra-Argumente',
      description: 'Gegenargumente präsentieren',
      redemittel: [
        'Dagegen lässt sich einwenden, dass [...]',
        'Kritiker wenden ein, dass [...]',
        'Ein Nachteil ist jedoch, dass [...]',
        'Problematisch erscheint, dass [...]',
        'Andererseits muss man bedenken, dass [...]',
        'Allerdings darf man nicht übersehen, dass [...]',
      ],
      example:
        'Dagegen lässt sich einwenden, dass Studiengebühren sozial ungerecht wären. Kritiker wenden ein, dass Bildung ein Menschenrecht sei und nicht vom Einkommen abhängen sollte. Ein Nachteil ist jedoch, dass talentierte Studierende aus einkommensschwachen Familien abgeschreckt werden könnten.',
      color: 'bg-[#FFF3E0] border-[#E65100]',
    },
    {
      phase: 'conclusion',
      title: 'Schluss',
      description: 'Persönliche Stellungnahme, Fazit',
      redemittel: [
        'Zusammenfassend lässt sich sagen, dass [...]',
        'Abwägend komme ich zu dem Schluss, dass [...]',
        'Meines Erachtens überwiegen die Argumente für/gegen [...]',
        'Ich bin der Auffassung, dass [...]',
        'Aus den genannten Gründen plädiere ich für [...]',
      ],
      example:
        'Zusammenfassend lässt sich sagen, dass beide Positionen nachvollziehbare Argumente haben. Abwägend komme ich jedoch zu dem Schluss, dass die sozialen Nachteile von Studiengebühren überwiegen. Meines Erachtens sollte Bildung kostenlos und für alle zugänglich bleiben.',
      color: 'bg-[#F3E5F5] border-[#6A1B9A]',
    },
  ];

  const currentPhase = phases.find((p) => p.phase === selectedPhase)!;

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Argumentationsstruktur: Pro & Contra
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Eine klare <strong>Struktur</strong> ist essentiell für überzeugende Argumentationen. Nutze
        passende <strong>Redemittel</strong> für jede Phase.
      </p>

      {/* Phase Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {phases.map((phase) => (
          <button
            key={phase.phase}
            type="button"
            onClick={() => setSelectedPhase(phase.phase)}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedPhase === phase.phase
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {phase.title}
          </button>
        ))}
      </div>

      {/* Phase Content */}
      <div className={`${currentPhase.color} rounded-lg sm:rounded-xl p-5 sm:p-6 border-l-4`}>
        {/* Description */}
        <div className="mb-5">
          <h3 className="text-base sm:text-lg font-serif font-bold text-text-main mb-2">
            {currentPhase.title}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted italic">{currentPhase.description}</p>
        </div>

        {/* Redemittel List */}
        <div className="bg-white rounded-lg p-4 sm:p-5 mb-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-3 font-bold">
            Redemittel
          </div>
          <ul className="space-y-2">
            {currentPhase.redemittel.map((mittel, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-xs sm:text-sm text-text-main font-serif">{mittel}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Example */}
        <div className="bg-white rounded-lg p-4 sm:p-5">
          <div className="text-[0.6rem] sm:text-[0.65rem] text-primary uppercase tracking-wide mb-3 font-bold">
            Beispieltext
          </div>
          <p className="text-xs sm:text-sm text-text-main leading-relaxed font-serif">
            {currentPhase.example}
          </p>
        </div>
      </div>

      {/* Structure Overview */}
      <div className="mt-6 sm:mt-8 bg-[#FAF6F3] rounded-lg sm:rounded-xl p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-text-main mb-3">
          Typische Struktur einer Stellungnahme
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="bg-[#E3F2FD] text-[#1565C0] px-2 py-1 rounded font-bold text-xs flex-shrink-0">
              1
            </span>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-text-main">Einleitung</p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted">
                Thema vorstellen, eigene Position ankündigen
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-[#E8F5E9] text-[#2E7D32] px-2 py-1 rounded font-bold text-xs flex-shrink-0">
              2
            </span>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-text-main">Pro-Argumente</p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted">
                2-3 Argumente dafür (vom schwächsten zum stärksten)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-[#FFF3E0] text-[#E65100] px-2 py-1 rounded font-bold text-xs flex-shrink-0">
              3
            </span>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-text-main">Contra-Argumente</p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted">
                2-3 Gegenargumente (vom schwächsten zum stärksten)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-[#F3E5F5] text-[#6A1B9A] px-2 py-1 rounded font-bold text-xs flex-shrink-0">
              4
            </span>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-text-main">Schluss</p>
              <p className="text-[0.65rem] sm:text-xs text-text-muted">
                Zusammenfassung, eigene Position mit Begründung
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
