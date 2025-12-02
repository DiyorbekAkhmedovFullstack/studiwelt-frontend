import { WorldsComparison } from './WorldsComparison';
import { VerbFormsGrid } from './VerbFormsGrid';
import { RegretSection } from './RegretSection';
import { PolitenessSlider } from './PolitenessSlider';

export function Lesson04KonjunktivTheory() {
  return (
    <>
      {/* Worlds Visual - Reality vs Dream */}
      <WorldsComparison
        realityLabel="Realität (Indikativ)"
        realityContent={
          <>
            Ich <span className="font-bold border-b-2 border-[#8C8075] pb-0.5">habe</span> kein
            Geld.
            <br />
            Deshalb <span className="font-bold border-b-2 border-[#8C8075] pb-0.5">kaufe</span>{' '}
            ich das Auto nicht.
          </>
        }
        dreamLabel="Traum (Konjunktiv II)"
        dreamContent={
          <>
            Wenn ich Geld <span className="font-bold border-b-2 border-primary pb-0.5">hätte</span>
            ,<br />
            <span className="font-bold border-b-2 border-primary pb-0.5">würde</span> ich das Auto{' '}
            <span className="font-bold border-b-2 border-primary pb-0.5">kaufen</span>.
          </>
        }
      />

      {/* Rules Grid - Würde-Form vs Original Form */}
      <VerbFormsGrid
        standardCard={{
          title: 'Die "Würde"-Form',
          formula: 'würden + Infinitiv',
          description: 'Für 95% aller Verben benutzen wir diese einfache Konstruktion.',
          examples: [
            { infinitive: 'kaufen', form: 'würde kaufen' },
            { infinitive: 'gehen', form: 'würde gehen' },
            { infinitive: 'schlafen', form: 'würde schlafen' },
          ],
        }}
        vipCard={{
          title: 'Die "Original"-Form',
          formula: 'Eigene K2-Form',
          description: 'Hilfsverben und Modalverben nutzen ihre eigene Form (oft mit Umlaut).',
          examples: [
            { infinitive: 'haben', form: 'hätte' },
            { infinitive: 'sein', form: 'wäre' },
            { infinitive: 'können', form: 'könnte' },
            { infinitive: 'müssen', form: 'müsste' },
          ],
        }}
      />

      {/* Past Tense - Regrets */}
      <RegretSection
        title="Die Vergangenheit"
        subtitle="Für Dinge, die wir bereuen oder nicht mehr ändern können."
        exampleSentence={
          <>
            "Ich <span className="text-primary font-bold underline">hätte</span> mehr{' '}
            <span className="text-primary font-bold underline">gelernt</span>."
          </>
        }
        explanation={
          <>
            Logik: Man nimmt das Perfekt ("habe gelernt") und setzt das Hilfsverb in den
            Konjunktiv II ("hätte gelernt").
          </>
        }
        additionalExample={
          <>
            <em>Beispiel mit sein:</em> "Ich bin gegangen" → "Ich <strong>wäre</strong> gegangen".
          </>
        }
      />

      {/* Politeness Slider */}
      <PolitenessSlider
        title="Der Höflichkeits-Regler"
        levels={{
          1: {
            text: 'Gib mir das Salz!',
            label: 'Level 1: Unhöflich (Imperativ)',
          },
          2: {
            text: 'Kannst du mir das Salz geben?',
            label: 'Level 2: Freundlich (Indikativ)',
          },
          3: {
            text: 'Könntest du mir bitte das Salz geben?',
            label: 'Level 3: Sehr Höflich (Konjunktiv II)',
          },
        }}
      />
    </>
  );
}
