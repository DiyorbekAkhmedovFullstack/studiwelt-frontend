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
