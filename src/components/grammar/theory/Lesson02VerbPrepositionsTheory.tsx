import { VerbPrepositionGrid } from './VerbPrepositionGrid';
import { PersonThingToggle } from './PersonThingToggle';
import { ReactionChamber } from './ReactionChamber';

export function Lesson02VerbPrepositionsTheory() {
  return (
    <>
      {/* AKKUSATIV Section Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base md:text-[1.35rem] font-serif font-bold text-text-main mb-1 sm:mb-2">
          Präpositionen mit Akkusativ
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted">
          Diese Präpositionen verlangen den Akkusativ.
        </p>
      </div>

      {/* Akkusativ Grid */}
      <VerbPrepositionGrid
        cards={[
          {
            preposition: 'auf',
            caseType: 'Akkusativ',
            description: 'Fokus auf die Zukunft oder ein Ziel (Mental Direction).',
            verbs: [
              'warten',
              'sich freuen',
              'sich vorbereiten',
              'sich konzentrieren',
              'hoffen',
              'aufpassen',
              'achten',
              'antworten',
            ],
          },
          {
            preposition: 'über',
            caseType: 'Akkusativ',
            description: 'Thema oder Emotion.',
            verbs: [
              'sprechen',
              'diskutieren',
              'sich ärgern',
              'sich freuen',
              'nachdenken',
              'berichten',
              'sich unterhalten',
              'sich beschweren',
            ],
          },
          {
            preposition: 'für',
            caseType: 'Akkusativ',
            description: 'Zielobjekt oder Empfänger.',
            verbs: [
              'sich interessieren',
              'sich entscheiden',
              'sich bedanken',
              'kämpfen',
              'sorgen',
              'sich entschuldigen',
              'werben',
            ],
          },
          {
            preposition: 'gegen',
            caseType: 'Akkusativ',
            description: 'Ablehnung oder Widerstand.',
            verbs: [
              'protestieren',
              'kämpfen',
              'sich entscheiden',
              'sich verteidigen',
              'sich wehren',
            ],
          },
          {
            preposition: 'um',
            caseType: 'Akkusativ',
            description: 'Objekt mit Intensität oder Thema.',
            verbs: [
              'sich bewerben',
              'sich bemühen',
              'sich kümmern',
              'kämpfen',
              'sich sorgen',
              'bitten',
              'es geht',
            ],
          },
          {
            preposition: 'an',
            caseType: 'Akkusativ',
            description: 'Kontakt oder mentale Verbindung.',
            verbs: [
              'denken',
              'sich erinnern',
              'glauben',
              'schicken',
              'sich gewöhnen',
              'sich wenden',
            ],
          },
        ]}
      />

      {/* DATIV Section Header */}
      <div className="mb-4 sm:mb-6 mt-8 sm:mt-12">
        <h3 className="text-sm sm:text-base md:text-[1.35rem] font-serif font-bold text-text-main mb-1 sm:mb-2">
          Präpositionen mit Dativ
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-muted">
          Diese Präpositionen verlangen den Dativ.
        </p>
      </div>

      {/* Dativ Grid */}
      <VerbPrepositionGrid
        cards={[
          {
            preposition: 'an',
            caseType: 'Dativ',
            description: 'Teilhabe oder statischer Zustand.',
            verbs: [
              'teilnehmen',
              'arbeiten',
              'leiden',
              'zweifeln',
              'sterben',
              'erkranken',
              'sich orientieren',
            ],
          },
          {
            preposition: 'auf',
            caseType: 'Dativ',
            description: 'Basis oder Grundlage.',
            verbs: [
              'basieren',
              'beruhen',
              'bestehen',
              'beharren',
            ],
          },
          {
            preposition: 'aus',
            caseType: 'Dativ',
            description: 'Herkunft oder Bestandteile.',
            verbs: [
              'bestehen',
              'stammen',
              'entstehen',
              'sich ergeben',
              'übersetzen',
            ],
          },
          {
            preposition: 'bei',
            caseType: 'Dativ',
            description: 'Person oder Institution.',
            verbs: [
              'sich bewerben',
              'arbeiten',
              'sich bedanken',
              'sich beschweren',
              'sich entschuldigen',
              'anrufen',
            ],
          },
          {
            preposition: 'mit',
            caseType: 'Dativ',
            description: 'Partner oder Beginn/Ende.',
            verbs: [
              'sprechen',
              'diskutieren',
              'anfangen',
              'aufhören',
              'beginnen',
              'sich unterhalten',
              'kämpfen',
            ],
          },
          {
            preposition: 'nach',
            caseType: 'Dativ',
            description: 'Suche oder Sinne.',
            verbs: [
              'fragen',
              'suchen',
              'sich erkundigen',
              'sich sehnen',
              'riechen',
              'schmecken',
            ],
          },
          {
            preposition: 'von',
            caseType: 'Dativ',
            description: 'Thema oder Herkunft.',
            verbs: [
              'träumen',
              'erzählen',
              'abhängen',
              'sich erholen',
              'sich befreien',
              'überzeugen',
            ],
          },
          {
            preposition: 'vor',
            caseType: 'Dativ',
            description: 'Gefahr oder Angst.',
            verbs: [
              'sich fürchten',
              'Angst haben',
              'flüchten',
              'fliehen',
              'warnen',
              'schützen',
            ],
          },
          {
            preposition: 'zu',
            caseType: 'Dativ',
            description: 'Anlass oder Kombination.',
            verbs: [
              'gratulieren',
              'gehören',
              'passen',
              'beitragen',
              'einladen',
              'führen',
            ],
          },
        ]}
      />

      {/* Person vs Thing Toggle */}
      <PersonThingToggle
        title="Personen vs. Dinge"
        subtitle='Für Dinge nutzen wir "Wo-" und "Da-". Für Personen nutzen wir die Präposition + Pronomen.'
        thingMode={{
          questionFormula: 'Wo + (r) + Präp?',
          questionExample: (
            <>
              <strong>Worauf</strong> wartest du?
            </>
          ),
          answerFormula: 'Da + (r) + Präp',
          answerExample: (
            <>
              Ich warte <strong>darauf</strong>, dass der Bus kommt.
            </>
          ),
        }}
        personMode={{
          questionFormula: 'Präp + Wen/Wem?',
          questionExample: (
            <>
              <strong>Auf wen</strong> wartest du?
            </>
          ),
          answerFormula: 'Präp + Person',
          answerExample: (
            <>
              Ich warte <strong>auf Tom</strong>.
            </>
          ),
        }}
      />

      {/* Interactive Reaction Chamber */}
      <ReactionChamber
        title="Reaktions-Kammer"
        subtitle="Finde die passende Präposition für das Verb."
        verb="sich interessieren"
        sentenceEnding="Sport."
        options={[
          { value: 'für', isCorrect: true },
          { value: 'auf', isCorrect: false },
          { value: 'mit', isCorrect: false },
          { value: 'an', isCorrect: false },
        ]}
        successMessage="Korrekt! 'Interessieren für' + Akkusativ."
        errorMessage="Instabile Verbindung. Versuch es noch einmal."
      />
    </>
  );
}