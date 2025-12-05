import type { ReactNode } from 'react';
import { Lesson01PassivTheory } from './theory/Lesson01PassivTheory';
import { Lesson02VerbPrepositionsTheory } from './theory/Lesson02VerbPrepositionsTheory';
import { Lesson03ConnectorsTheory } from './theory/Lesson03ConnectorsTheory';
import { Lesson04KonjunktivTheory } from './theory/Lesson04KonjunktivTheory';
import { Lesson05RelativeClausesTheory } from './theory/Lesson05RelativeClausesTheory';
import { Lesson06ParticiplesTheory } from './theory/Lesson06ParticiplesTheory';
import { Lesson07LogicalConnectionsTheory } from './theory/Lesson07LogicalConnectionsTheory';
import { Lesson08WordOrderTheory } from './theory/Lesson08WordOrderTheory';
import { Lesson09NominalizationTheory } from './theory/Lesson09NominalizationTheory';
import { Lesson10FunctionalVerbsTheory } from './theory/Lesson10FunctionalVerbsTheory';
import { Lesson11PassiveReplacementsTheory } from './theory/Lesson11PassiveReplacementsTheory';
import { Lesson12ExtendedParticiplesTheory } from './theory/Lesson12ExtendedParticiplesTheory';
import { Lesson13KonjunktivTheory } from './theory/Lesson13KonjunktivTheory';
import { Lesson14SubjectiveModals } from './theory/Lesson14SubjectiveModals';
import { Lesson15ComplexStructures } from './theory/Lesson15ComplexStructures';
import { Lesson16NDeclension } from './theory/Lesson16NDeclension';
import { Lesson17GraphDescription } from './theory/Lesson17GraphDescription';
import { Lesson18SpeakingExpression } from './theory/Lesson18SpeakingExpression';
import { Lesson19ReadingComprehension } from './theory/Lesson19ReadingComprehension';
import { Lesson20ListeningComprehension } from './theory/Lesson20ListeningComprehension';
import { Lesson21AdversativeConnectors } from './theory/Lesson21AdversativeConnectors';
import { Lesson22TemporalClauses } from './theory/Lesson22TemporalClauses';
import { Lesson23ConditionalClauses } from './theory/Lesson23ConditionalClauses';
import { Lesson24CausalRelations } from './theory/Lesson24CausalRelations';
import { Lesson25ModalParticles } from './theory/Lesson25ModalParticles';
import { Lesson26AdjectivesComposita } from './theory/Lesson26AdjectivesComposita';
import { Lesson27RestrictiveExpressions } from './theory/Lesson27RestrictiveExpressions';
import { Lesson28PerspectiveMarkers } from './theory/Lesson28PerspectiveMarkers';
import { Lesson29ComplexSentences } from './theory/Lesson29ComplexSentences';
import { Lesson30ExamPreparation } from './theory/Lesson30ExamPreparation';

type LessonGrammarTheoryProps = {
  lessonNumber: number;
};

type LessonTheoryConfig = {
  title: string;
  description: string;
  points?: string[];
};

const THEORY_BY_LESSON: Record<number, LessonTheoryConfig> = {
  1: {
    title: 'Das Passiv',
    description:
      'Im Passiv ist nicht wichtig, wer etwas macht (das Subjekt), sondern was mit einer Sache passiert (das Objekt).',
    points: [],
  },
  2: {
    title: 'Verben mit Präpositionen',
    description:
      'Manche Verben sind wie chemische Elemente: Sie reagieren nur mit einer bestimmten Präposition. Ohne diese Verbindung ergibt der Satz keinen Sinn.',
    points: [],
  },
  3: {
    title: 'Zweiteilige Konnektoren',
    description:
      'Diese Verbindungen funktionieren wie Brücken: Sie bestehen aus zwei Pfeilern. Man muss beide Teile benutzen, um zwei Ideen logisch miteinander zu verknüpfen.',
    points: [],
  },
  4: {
    title: 'Tempus – Präsens und Perfekt',
    description:
      'Unterscheidung zwischen Gegenwart und vollendeter Vergangenheit im mündlichen und schriftlichen Gebrauch.',
  },
  5: {
    title: 'Trennbare und untrennbare Verben',
    description:
      'Erkennen von Präfixen und deren Einfluss auf Satzstellung und Bedeutung.',
  },
  6: {
    title: 'Modalverben im Alltag',
    description:
      'Gebrauch von „können“, „müssen“, „dürfen“, „sollen“, „wollen“ in Studien- und Prüfungssituationen.',
  },
  7: {
    title: 'Kasus – Nominativ und Akkusativ',
    description:
      'Grundlagen der Fälle und ihre typischen Fragen: „Wer/was?“ und „Wen/was?“. ',
  },
  8: {
    title: 'Kasus – Dativ',
    description:
      'Verwendung des Dativs nach bestimmten Verben und Präpositionen im Studienalltag.',
  },
  9: {
    title: 'Präpositionen mit Dativ oder Akkusativ',
    description:
      'Wechselpräpositionen im Kontext von Ort (Wo?) und Richtung (Wohin?).',
  },
  10: {
    title: 'Adjektivendungen – Ein Überblick',
    description:
      'Grundmuster der Deklination von Adjektiven im Nominalausdruck.',
  },
  11: {
    title: 'Passiv – Vorgangspassiv mit „werden“',
    description:
      'Beschreibung von Prozessen, wie sie in Prüfungsaufgaben und Texten vorkommen.',
  },
  12: {
    title: 'Passiv – Zustandspassiv mit „sein“',
    description:
      'Unterschied zwischen Handlung (Vorgang) und Ergebnis (Zustand).',
  },
  13: {
    title: 'Relativsätze – Einfache Bezüge',
    description:
      'Verwendung von „der, die, das“ zur Verknüpfung von Sätzen in Beschreibungen.',
  },
  14: {
    title: 'Konjunktiv II – Höflichkeit und Irrealität',
    description:
      'Typische Formen mit „würde“ und die wichtigsten unregelmäßigen Verben.',
  },
  15: {
    title: 'Indirekte Rede – Einfache Formen',
    description:
      'Wiedergabe von Aussagen im Prüfungs- und Textkontext ohne wörtliche Rede.',
  },
  16: {
    title: 'Wortbildung – Nomen und Verben',
    description:
      'Typische Präfixe und Suffixe, die in Studienkolleg-Texten häufig vorkommen.',
  },
  17: {
    title: 'Nominalstil in wissenschaftlichen Texten',
    description:
      'Erkennen und Bilden von Nominalisierungen, wie sie in Prüfungs­texten genutzt werden.',
  },
  18: {
    title: 'Konnektoren – Addition und Gegensatz',
    description:
      'Verwendung von „außerdem“, „jedoch“, „dennoch“ zur Textverknüpfung.',
  },
  19: {
    title: 'Konnektoren – Ursache und Folge',
    description:
      'Gebrauch von „deshalb“, „daher“, „infolgedessen“ im Argumentationsaufbau.',
  },
  20: {
    title: 'Partizipialkonstruktionen – Ein Einstieg',
    description:
      'Verwendung von Partizip I und II zur Verdichtung von Informationen.',
  },
  21: {
    title: 'Adversative Konnektoren',
    description:
      'Nuancen zwischen aber, sondern, hingegen, vielmehr und dagegen. Register und Positionsregeln für B2-C1.',
  },
  22: {
    title: 'Temporale Nebensätze',
    description:
      'Zeitenfolge mit während, bevor, nachdem, sobald, seit und bis. Tense Sequence für B2-C1.',
  },
  23: {
    title: 'Bedingungssätze (Konditionalsätze)',
    description:
      'Realis, Irrealis Gegenwart/Vergangenheit, gemischte Konditionale. Wenn-Weglassung für C1.',
  },
  24: {
    title: 'Kausale Nuancen',
    description:
      'Unterschiede zwischen weil, da, denn, nämlich, zumal und insofern. Register und Position für B2-C1.',
  },
  25: {
    title: 'Modalpartikeln',
    description:
      'Kleine Wörter (ja, doch, mal, eben, wohl) die Haltung und Emotion ausdrücken. Typisch für gesprochenes Deutsch.',
  },
  26: {
    title: 'Adjektivdeklination & Komposita',
    description:
      'Korrekte Adjektivendungen nach verschiedenen Artikeltypen. Zusammengesetzte Wörter verstehen und bilden.',
  },
  27: {
    title: 'Restriktive Ausdrücke',
    description:
      'Nuancen zwischen nur, lediglich, bloß, allein, ausschließlich, einzig. Register-angemessene Verwendung.',
  },
  28: {
    title: 'Perspektiv- & Stellungnahme-Marker',
    description:
      'Meinung ausdrücken, argumentieren (Pro/Contra), register-angemessene Redemittel für TestDaF/DSH.',
  },
  29: {
    title: 'Komplexe Satzarchitektur & Kohärenz',
    description:
      'Parataxe vs. Hypotaxe, Kohäsionsmittel (Konnektoren, Referenz), Textzusammenhang für C1-Niveau.',
  },
  30: {
    title: 'Wiederholung und Integration',
    description:
      'Zusammenführung der wichtigsten Grammatikthemen zur direkten Prüfungsvorbereitung.',
  },
};

export function LessonGrammarTheory({
  lessonNumber,
}: LessonGrammarTheoryProps): ReactNode {
  const theory = THEORY_BY_LESSON[lessonNumber];

  // Special handling for lessons with custom interactive theory
  if (lessonNumber === 1) {
    return <Lesson01PassivTheory />;
  }

  if (lessonNumber === 2) {
    return <Lesson02VerbPrepositionsTheory />;
  }

  if (lessonNumber === 3) {
    return <Lesson03ConnectorsTheory />;
  }

  if (lessonNumber === 4) {
    return <Lesson04KonjunktivTheory />;
  }

  if (lessonNumber === 5) {
    return <Lesson05RelativeClausesTheory />;
  }

  if (lessonNumber === 6) {
    return <Lesson06ParticiplesTheory />;
  }

  if (lessonNumber === 7) {
    return <Lesson07LogicalConnectionsTheory />;
  }

  if (lessonNumber === 8) {
    return <Lesson08WordOrderTheory />;
  }

  if (lessonNumber === 9) {
    return <Lesson09NominalizationTheory />;
  }

  if (lessonNumber === 10) {
    return <Lesson10FunctionalVerbsTheory />;
  }

  if (lessonNumber === 11) {
    return <Lesson11PassiveReplacementsTheory />;
  }

  if (lessonNumber === 12) {
    return <Lesson12ExtendedParticiplesTheory />;
  }

  if (lessonNumber === 13) {
    return <Lesson13KonjunktivTheory />;
  }

  if (lessonNumber === 14) {
    return <Lesson14SubjectiveModals />;
  }

  if (lessonNumber === 15) {
    return <Lesson15ComplexStructures />;
  }

  if (lessonNumber === 16) {
    return <Lesson16NDeclension />;
  }

  if (lessonNumber === 17) {
    return <Lesson17GraphDescription />;
  }

  if (lessonNumber === 18) {
    return <Lesson18SpeakingExpression />;
  }

  if (lessonNumber === 19) {
    return <Lesson19ReadingComprehension />;
  }

  if (lessonNumber === 20) {
    return <Lesson20ListeningComprehension />;
  }

  if (lessonNumber === 21) {
    return <Lesson21AdversativeConnectors />;
  }

  if (lessonNumber === 22) {
    return <Lesson22TemporalClauses />;
  }

  if (lessonNumber === 23) {
    return <Lesson23ConditionalClauses />;
  }

  if (lessonNumber === 24) {
    return <Lesson24CausalRelations />;
  }

  if (lessonNumber === 25) {
    return <Lesson25ModalParticles />;
  }

  if (lessonNumber === 26) {
    return <Lesson26AdjectivesComposita />;
  }

  if (lessonNumber === 27) {
    return <Lesson27RestrictiveExpressions />;
  }

  if (lessonNumber === 28) {
    return <Lesson28PerspectiveMarkers />;
  }

  if (lessonNumber === 29) {
    return <Lesson29ComplexSentences />;
  }

  if (lessonNumber === 30) {
    return <Lesson30ExamPreparation />;
  }

  if (!theory) {
    return (
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
        <h2 className="text-[1.1rem] font-serif font-bold">
          Grammatik – Lektion {lessonNumber}
        </h2>
        <p className="mt-2 text-[0.95rem] text-text-main leading-relaxed">
          Die Grammatiktheorie für diese Lektion wird hier angezeigt, sobald sie
          im Frontend gepflegt ist.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-[rgba(0,0,0,0.02)]">
      <p className="text-[0.95rem] text-text-main leading-relaxed">{theory.description}</p>
      {theory.points && theory.points.length > 0 && (
        <ul className="mt-6 space-y-2 text-[0.95rem] text-text-main leading-relaxed">
          {theory.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

