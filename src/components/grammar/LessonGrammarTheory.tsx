import { lazy, Suspense, type ReactNode } from "react";

type LessonGrammarTheoryProps = {
  lessonNumber: number;
};

type LessonTheoryConfig = {
  title: string;
  description: string;
  points?: string[];
};

// Loading fallback component
function TheoryLoadingSkeleton() {
  return (
    <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-border-soft animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
      </div>
    </section>
  );
}

// Lazy load theory components - each lesson loads only when needed
const TheoryComponents: Record<
  number,
  React.LazyExoticComponent<React.ComponentType>
> = {
  1: lazy(() =>
    import("./theory/Lesson01PassivTheory").then((m) => ({
      default: m.Lesson01PassivTheory,
    })),
  ),
  2: lazy(() =>
    import("./theory/Lesson02VerbPrepositionsTheory").then((m) => ({
      default: m.Lesson02VerbPrepositionsTheory,
    })),
  ),
  3: lazy(() =>
    import("./theory/Lesson03ConnectorsTheory").then((m) => ({
      default: m.Lesson03ConnectorsTheory,
    })),
  ),
  4: lazy(() =>
    import("./theory/Lesson04KonjunktivTheory").then((m) => ({
      default: m.Lesson04KonjunktivTheory,
    })),
  ),
  5: lazy(() =>
    import("./theory/Lesson05RelativeClausesTheory").then((m) => ({
      default: m.Lesson05RelativeClausesTheory,
    })),
  ),
  6: lazy(() =>
    import("./theory/Lesson06ParticiplesTheory").then((m) => ({
      default: m.Lesson06ParticiplesTheory,
    })),
  ),
  7: lazy(() =>
    import("./theory/Lesson07LogicalConnectionsTheory").then((m) => ({
      default: m.Lesson07LogicalConnectionsTheory,
    })),
  ),
  8: lazy(() =>
    import("./theory/Lesson08WordOrderTheory").then((m) => ({
      default: m.Lesson08WordOrderTheory,
    })),
  ),
  9: lazy(() =>
    import("./theory/Lesson09NominalizationTheory").then((m) => ({
      default: m.Lesson09NominalizationTheory,
    })),
  ),
  10: lazy(() =>
    import("./theory/Lesson10FunctionalVerbsTheory").then((m) => ({
      default: m.Lesson10FunctionalVerbsTheory,
    })),
  ),
  11: lazy(() =>
    import("./theory/Lesson11PassiveReplacementsTheory").then((m) => ({
      default: m.Lesson11PassiveReplacementsTheory,
    })),
  ),
  12: lazy(() =>
    import("./theory/Lesson12ExtendedParticiplesTheory").then((m) => ({
      default: m.Lesson12ExtendedParticiplesTheory,
    })),
  ),
  13: lazy(() =>
    import("./theory/Lesson13KonjunktivTheory").then((m) => ({
      default: m.Lesson13KonjunktivTheory,
    })),
  ),
  14: lazy(() =>
    import("./theory/Lesson14SubjectiveModals").then((m) => ({
      default: m.Lesson14SubjectiveModals,
    })),
  ),
  15: lazy(() =>
    import("./theory/Lesson15ComplexStructures").then((m) => ({
      default: m.Lesson15ComplexStructures,
    })),
  ),
  16: lazy(() =>
    import("./theory/Lesson16NDeclension").then((m) => ({
      default: m.Lesson16NDeclension,
    })),
  ),
  17: lazy(() =>
    import("./theory/Lesson17GraphDescription").then((m) => ({
      default: m.Lesson17GraphDescription,
    })),
  ),
  18: lazy(() =>
    import("./theory/Lesson18SpeakingExpression").then((m) => ({
      default: m.Lesson18SpeakingExpression,
    })),
  ),
  19: lazy(() =>
    import("./theory/Lesson19ReadingComprehension").then((m) => ({
      default: m.Lesson19ReadingComprehension,
    })),
  ),
  20: lazy(() =>
    import("./theory/Lesson20ListeningComprehension").then((m) => ({
      default: m.Lesson20ListeningComprehension,
    })),
  ),
  21: lazy(() =>
    import("./theory/Lesson21AdversativeConnectors").then((m) => ({
      default: m.Lesson21AdversativeConnectors,
    })),
  ),
  22: lazy(() =>
    import("./theory/Lesson22TemporalClauses").then((m) => ({
      default: m.Lesson22TemporalClauses,
    })),
  ),
  23: lazy(() =>
    import("./theory/Lesson23ConditionalClauses").then((m) => ({
      default: m.Lesson23ConditionalClauses,
    })),
  ),
  24: lazy(() =>
    import("./theory/Lesson24CausalRelations").then((m) => ({
      default: m.Lesson24CausalRelations,
    })),
  ),
  25: lazy(() =>
    import("./theory/Lesson25ModalParticles").then((m) => ({
      default: m.Lesson25ModalParticles,
    })),
  ),
  26: lazy(() =>
    import("./theory/Lesson26AdjectivesComposita").then((m) => ({
      default: m.Lesson26AdjectivesComposita,
    })),
  ),
  27: lazy(() =>
    import("./theory/Lesson27RestrictiveExpressions").then((m) => ({
      default: m.Lesson27RestrictiveExpressions,
    })),
  ),
  28: lazy(() =>
    import("./theory/Lesson28PerspectiveMarkers").then((m) => ({
      default: m.Lesson28PerspectiveMarkers,
    })),
  ),
  29: lazy(() =>
    import("./theory/Lesson29ComplexSentences").then((m) => ({
      default: m.Lesson29ComplexSentences,
    })),
  ),
  30: lazy(() =>
    import("./theory/Lesson30ExamPreparation").then((m) => ({
      default: m.Lesson30ExamPreparation,
    })),
  ),
};

const THEORY_BY_LESSON: Record<number, LessonTheoryConfig> = {
  1: {
    title: "Das Passiv",
    description:
      "Im Passiv ist nicht wichtig, wer etwas macht (das Subjekt), sondern was mit einer Sache passiert (das Objekt).",
    points: [],
  },
  2: {
    title: "Verben mit Präpositionen",
    description:
      "Manche Verben sind wie chemische Elemente: Sie reagieren nur mit einer bestimmten Präposition. Ohne diese Verbindung ergibt der Satz keinen Sinn.",
    points: [],
  },
  3: {
    title: "Zweiteilige Konnektoren",
    description:
      "Diese Verbindungen funktionieren wie Brücken: Sie bestehen aus zwei Pfeilern. Man muss beide Teile benutzen, um zwei Ideen logisch miteinander zu verknüpfen.",
    points: [],
  },
  4: {
    title: "Tempus – Präsens und Perfekt",
    description:
      "Unterscheidung zwischen Gegenwart und vollendeter Vergangenheit im mündlichen und schriftlichen Gebrauch.",
  },
  5: {
    title: "Trennbare und untrennbare Verben",
    description:
      "Erkennen von Präfixen und deren Einfluss auf Satzstellung und Bedeutung.",
  },
  6: {
    title: "Modalverben im Alltag",
    description:
      "Gebrauch von 'können', 'müssen', 'dürfen', 'sollen', 'wollen' in Studien- und Prüfungssituationen.",
  },
  7: {
    title: "Kasus – Nominativ und Akkusativ",
    description:
      "Grundlagen der Fälle und ihre typischen Fragen: 'Wer/was?' und 'Wen/was?'.",
  },
  8: {
    title: "Kasus – Dativ",
    description:
      "Verwendung des Dativs nach bestimmten Verben und Präpositionen im Studienalltag.",
  },
  9: {
    title: "Präpositionen mit Dativ oder Akkusativ",
    description:
      "Wechselpräpositionen im Kontext von Ort (Wo?) und Richtung (Wohin?).",
  },
  10: {
    title: "Adjektivendungen – Ein Überblick",
    description:
      "Grundmuster der Deklination von Adjektiven im Nominalausdruck.",
  },
  11: {
    title: "Passiv – Vorgangspassiv mit 'werden'",
    description:
      "Beschreibung von Prozessen, wie sie in Prüfungsaufgaben und Texten vorkommen.",
  },
  12: {
    title: "Passiv – Zustandspassiv mit 'sein'",
    description:
      "Unterschied zwischen Handlung (Vorgang) und Ergebnis (Zustand).",
  },
  13: {
    title: "Relativsätze – Einfache Bezüge",
    description:
      "Verwendung von 'der, die, das' zur Verknüpfung von Sätzen in Beschreibungen.",
  },
  14: {
    title: "Konjunktiv II – Höflichkeit und Irrealität",
    description:
      "Typische Formen mit 'würde' und die wichtigsten unregelmäßigen Verben.",
  },
  15: {
    title: "Indirekte Rede – Einfache Formen",
    description:
      "Wiedergabe von Aussagen im Prüfungs- und Textkontext ohne wörtliche Rede.",
  },
  16: {
    title: "Wortbildung – Nomen und Verben",
    description:
      "Typische Präfixe und Suffixe, die in Studienkolleg-Texten häufig vorkommen.",
  },
  17: {
    title: "Nominalstil in wissenschaftlichen Texten",
    description:
      "Erkennen und Bilden von Nominalisierungen, wie sie in Prüfungstexten genutzt werden.",
  },
  18: {
    title: "Konnektoren – Addition und Gegensatz",
    description:
      "Verwendung von 'außerdem', 'jedoch', 'dennoch' zur Textverknüpfung.",
  },
  19: {
    title: "Konnektoren – Ursache und Folge",
    description:
      "Gebrauch von 'deshalb', 'daher', 'infolgedessen' im Argumentationsaufbau.",
  },
  20: {
    title: "Partizipialkonstruktionen – Ein Einstieg",
    description:
      "Verwendung von Partizip I und II zur Verdichtung von Informationen.",
  },
  21: {
    title: "Adversative Konnektoren",
    description:
      "Nuancen zwischen aber, sondern, hingegen, vielmehr und dagegen. Register und Positionsregeln für B2-C1.",
  },
  22: {
    title: "Temporale Nebensätze",
    description:
      "Zeitenfolge mit während, bevor, nachdem, sobald, seit und bis. Tense Sequence für B2-C1.",
  },
  23: {
    title: "Bedingungssätze (Konditionalsätze)",
    description:
      "Realis, Irrealis Gegenwart/Vergangenheit, gemischte Konditionale. Wenn-Weglassung für C1.",
  },
  24: {
    title: "Kausale Nuancen",
    description:
      "Unterschiede zwischen weil, da, denn, nämlich, zumal und insofern. Register und Position für B2-C1.",
  },
  25: {
    title: "Modalpartikeln",
    description:
      "Kleine Wörter (ja, doch, mal, eben, wohl) die Haltung und Emotion ausdrücken. Typisch für gesprochenes Deutsch.",
  },
  26: {
    title: "Adjektivdeklination & Komposita",
    description:
      "Korrekte Adjektivendungen nach verschiedenen Artikeltypen. Zusammengesetzte Wörter verstehen und bilden.",
  },
  27: {
    title: "Restriktive Ausdrücke",
    description:
      "Nuancen zwischen nur, lediglich, bloß, allein, ausschließlich, einzig. Register-angemessene Verwendung.",
  },
  28: {
    title: "Perspektiv- & Stellungnahme-Marker",
    description:
      "Meinung ausdrücken, argumentieren (Pro/Contra), register-angemessene Redemittel für TestDaF/DSH.",
  },
  29: {
    title: "Komplexe Satzarchitektur & Kohärenz",
    description:
      "Parataxe vs. Hypotaxe, Kohäsionsmittel (Konnektoren, Referenz), Textzusammenhang für C1-Niveau.",
  },
  30: {
    title: "Wiederholung und Integration",
    description:
      "Zusammenführung der wichtigsten Grammatikthemen zur direkten Prüfungsvorbereitung.",
  },
};

export function LessonGrammarTheory({
  lessonNumber,
}: LessonGrammarTheoryProps): ReactNode {
  const theory = THEORY_BY_LESSON[lessonNumber];
  const TheoryComponent = TheoryComponents[lessonNumber];

  // If we have a lazy-loaded interactive theory component, render it
  if (TheoryComponent) {
    return (
      <Suspense fallback={<TheoryLoadingSkeleton />}>
        <TheoryComponent />
      </Suspense>
    );
  }

  // Fallback for lessons without custom theory
  if (!theory) {
    return (
      <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-border-soft">
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

  // Default text-only theory display
  return (
    <section className="bg-surface rounded-[24px] shadow-card p-10 mb-12 border border-border-soft">
      <p className="text-[0.95rem] text-text-main leading-relaxed">
        {theory.description}
      </p>
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
