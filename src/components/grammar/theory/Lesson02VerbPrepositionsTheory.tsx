import { VerbPrepositionGrid } from './VerbPrepositionGrid';
import { PersonThingToggle } from './PersonThingToggle';
import { ReactionChamber } from './ReactionChamber';

export function Lesson02VerbPrepositionsTheory() {
  return (
    <>
      {/* Chemistry Grid - Verb + Preposition Combinations */}
      <VerbPrepositionGrid
        cards={[
          {
            preposition: 'auf',
            caseType: 'Akkusativ',
            description: 'Fokus auf die Zukunft oder ein Ziel (Mental Direction).',
            verbs: [
              { verb: 'warten', translation: 'to wait for' },
              { verb: 'sich freuen', translation: 'to look forward to' },
              { verb: 'sich vorbereiten', translation: 'to prepare for' },
              { verb: 'sich konzentrieren', translation: 'to focus on' },
            ],
          },
          {
            preposition: 'an',
            caseType: 'Dativ',
            description: 'Teilhabe oder statischer Zustand.',
            verbs: [
              { verb: 'teilnehmen', translation: 'to participate in' },
              { verb: 'arbeiten', translation: 'to work on' },
              { verb: 'leiden', translation: 'to suffer from (disease)' },
              { verb: 'zweifeln', translation: 'to doubt' },
            ],
          },
          {
            preposition: 'über',
            caseType: 'Akkusativ',
            description: 'Thema oder Emotion.',
            verbs: [
              { verb: 'sprechen', translation: 'to talk about' },
              { verb: 'diskutieren', translation: 'to discuss' },
              { verb: 'lachen', translation: 'to laugh about' },
              { verb: 'sich ärgern', translation: 'to be annoyed at' },
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
