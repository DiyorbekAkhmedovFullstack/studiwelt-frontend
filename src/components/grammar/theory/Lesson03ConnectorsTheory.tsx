import { ConnectorRegistry } from './ConnectorRegistry';
import { SentenceMerger } from './SentenceMerger';

export function Lesson03ConnectorsTheory() {
  return (
    <>
      {/* Connector Registry - Split Cards */}
      <ConnectorRegistry
        connectors={[
          {
            type: 'positive',
            part1: 'Sowohl',
            part2: 'als auch',
            icon: '+',
            title: 'Doppelte Bejahung (A + B).',
            example: (
              <>
                Ich spreche <em>sowohl</em> Deutsch <em>als auch</em> Englisch.
              </>
            ),
            note: '(Positiver als "und")',
          },
          {
            type: 'positive',
            part1: 'Nicht nur',
            part2: 'sondern auch',
            icon: '++',
            title: 'Verstärkung (A + B).',
            example: (
              <>
                Das Internet ist <em>nicht nur</em> informativ, <em>sondern auch</em> unterhaltsam.
              </>
            ),
            note: '(Betont den zweiten Teil)',
          },
          {
            type: 'negative',
            part1: 'Weder',
            part2: 'noch',
            icon: '-',
            title: 'Doppelte Verneinung (Nicht A + Nicht B).',
            example: (
              <>
                Er hat <em>weder</em> Zeit <em>noch</em> (hat er) Lust.
              </>
            ),
            note: '(Ersetzt "nicht ... und nicht")',
          },
          {
            type: 'alternative',
            part1: 'Entweder',
            part2: 'oder',
            icon: '/',
            title: 'Alternative (A oder B).',
            example: (
              <>
                Wir gehen <em>entweder</em> ins Kino <em>oder</em> wir bleiben zu Hause.
              </>
            ),
          },
          {
            type: 'alternative',
            part1: 'Teils',
            part2: 'teils',
            icon: '%',
            title: 'Aufteilung (Ein bisschen A, ein bisschen B).',
            example: (
              <>
                Ich nutze das Handy <em>teils</em> beruflich, <em>teils</em> privat.
              </>
            ),
          },
          {
            type: 'contrast',
            part1: 'Zwar',
            part2: 'aber',
            icon: 'vs',
            title: 'Einschränkung / Gegensatz.',
            example: (
              <>
                Die Wohnung ist <em>zwar</em> klein, <em>aber</em> sie ist billig.
              </>
            ),
          },
          {
            type: 'contrast',
            part1: 'Einerseits',
            part2: 'andererseits',
            icon: '<>',
            title: 'Zwei Aspekte / Gegensatz.',
            example: (
              <>
                <em>Einerseits</em> ist es teuer, <em>andererseits</em> ist die Qualität top.
              </>
            ),
          },
          {
            type: 'contrast',
            part1: 'Je',
            part2: 'desto',
            icon: '>>',
            title: 'Vergleich (Proportionalität).',
            example: (
              <>
                <em>Je</em> mehr man lernt, <em>desto</em> besser spricht man.
              </>
            ),
            note: '(Nebensatz + Hauptsatz)',
          },
        ]}
      />

      {/* Interactive Sentence Merger */}
      <SentenceMerger
        title="Satz-Verbindung"
        subtitle="Verschmelze die zwei Aussagen zu einem komplexen Satz."
        sentence1="Max spielt Klavier."
        sentence2="Er spielt Gitarre."
        options={[
          {
            id: 'positive',
            label: 'Sowohl ... als auch',
            icon: '+',
            type: 'positive',
            result: (
              <>
                Max spielt{' '}
                <span className="text-[#6B8C6E] font-bold border-b-[3px] border-[#6B8C6E] px-0.5">
                  sowohl
                </span>{' '}
                Klavier{' '}
                <span className="text-[#6B8C6E] font-bold border-b-[3px] border-[#6B8C6E] px-0.5">
                  als auch
                </span>{' '}
                Gitarre.
              </>
            ),
          },
          {
            id: 'negative',
            label: 'Weder ... noch',
            icon: '-',
            type: 'negative',
            result: (
              <>
                Max spielt{' '}
                <span className="text-[#8C8075] font-bold border-b-[3px] border-[#8C8075] px-0.5">
                  weder
                </span>{' '}
                Klavier{' '}
                <span className="text-[#8C8075] font-bold border-b-[3px] border-[#8C8075] px-0.5">
                  noch
                </span>{' '}
                Gitarre.
              </>
            ),
          },
          {
            id: 'reset',
            label: 'Reset',
            icon: '↻',
            type: 'reset',
            result: null,
          },
        ]}
      />
    </>
  );
}
