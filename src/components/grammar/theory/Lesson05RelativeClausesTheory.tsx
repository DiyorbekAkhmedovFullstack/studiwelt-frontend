import { PronounMatrix } from './PronounMatrix';
import { MagnetCards } from './MagnetCards';
import { SentenceWeaver } from './SentenceWeaver';

export function Lesson05RelativeClausesTheory() {
  return (
    <>
      {/* Pronoun Matrix - Declension Table */}
      <PronounMatrix
        title="Die Pronomen-Matrix"
        rows={[
          {
            case: 'Nom',
            maskulin: 'der',
            neutral: 'das',
            feminin: 'die',
            plural: 'die',
          },
          {
            case: 'Akk',
            maskulin: 'den',
            neutral: 'das',
            feminin: 'die',
            plural: 'die',
          },
          {
            case: 'Dat',
            maskulin: 'dem',
            neutral: 'dem',
            feminin: 'der',
            plural: 'denen',
            highlightCells: ['plural'],
          },
          {
            case: 'Gen',
            maskulin: 'dessen',
            neutral: 'dessen',
            feminin: 'deren',
            plural: 'deren',
            highlightCells: ['maskulin', 'neutral', 'feminin', 'plural'],
          },
        ]}
      />

      {/* Magnet Cards - Logic Explanations */}
      <MagnetCards
        cards={[
          {
            type: 'preposition',
            title: 'Die Präposition',
            leftBlock: 'Mit',
            rightBlock: 'dem',
            description: (
              <>
                Wenn das Verb im Nebensatz eine Präposition braucht, zieht diese vor das Pronomen.
                Der Kasus (Dativ/Akk) hängt von der Präposition ab.
              </>
            ),
            example: (
              <em>
                "Das ist der Mann, <strong>mit dem</strong> ich sprach."
              </em>
            ),
          },
          {
            type: 'genitive',
            title: 'Der Besitzer (Genitiv)',
            leftBlock: 'Der Autor',
            rightBlock: 'dessen',
            description: (
              <>
                Ersetzt Possessivartikel (sein/ihr). Achtung: "dessen/deren" orientiert sich am{' '}
                <strong>Besitzer</strong>, nicht am Objekt!
              </>
            ),
            example: (
              <em>
                "Der Autor, <strong>dessen</strong> Buch ich lese."
              </em>
            ),
          },
        ]}
      />

      {/* Interactive Sentence Weaver */}
      <SentenceWeaver
        title="Der Satz-Weber"
        subtitle="Verbinde die Sätze mit dem korrekten Relativpronomen."
        baseSentences={[
          'Das ist der Stuhl.',
          'Ich sitze auf dem Stuhl.',
        ]}
        sentencePrefix="Das ist der Stuhl,"
        sentenceSuffix="ich sitze."
        options={[
          { text: 'auf den', isCorrect: false },
          { text: 'auf dem', isCorrect: true },
          { text: 'worauf', isCorrect: false },
          { text: 'auf der', isCorrect: false },
        ]}
      />
    </>
  );
}
