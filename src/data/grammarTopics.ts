type GrammarTopicData = {
  title: string;
  description: string;
};

export const GRAMMAR_TOPICS_BY_LESSON: Record<number, GrammarTopicData> = {
  1: {
    title: 'Das Passiv',
    description: 'Im Passiv ist nicht wichtig, wer etwas macht (das Subjekt), sondern was mit einer Sache passiert (das Objekt).',
  },
  2: {
    title: 'Verben mit Präpositionen',
    description: 'Manche Verben sind wie chemische Elemente: Sie reagieren nur mit einer bestimmten Präposition. Ohne diese Verbindung ergibt der Satz keinen Sinn.',
  },
  3: {
    title: 'Zweiteilige Konnektoren',
    description: 'Diese Verbindungen funktionieren wie Brücken: Sie bestehen aus zwei Pfeilern. Man muss beide Teile benutzen, um zwei Ideen logisch miteinander zu verknüpfen.',
  },
  4: {
    title: 'Konjunktiv II',
    description: 'Die Form für Wünsche, Träume und Höflichkeit. Wir verlassen die Realität und sprechen darüber, was sein könnte oder was gewesen wäre.',
  },
  5: {
    title: 'Relativsätze',
    description: 'Relativsätze verbinden Informationen. Auf B2-Niveau integrieren wir Präpositionen ("auf dem") und den Genitiv ("dessen"), um präzise Beschreibungen zu formulieren.',
  },
  6: {
    title: 'Partizipien als Adjektive',
    description: 'Partizipien können wie Adjektive vor einem Nomen stehen. Sie verdichten Information und machen Texte eleganter. Partizip I (Infinitiv + d) drückt eine aktive, gleichzeitige Handlung aus. Partizip II (ge-Form) beschreibt eine passive oder abgeschlossene Handlung.',
  },
  7: {
    title: 'Logische Zusammenhänge',
    description: 'Wie verbinden wir Gedanken? Im B2-Niveau drücken wir Gründe, Gegengründe und Ziele präzise aus – und müssen dabei auf die Position des Verbs achten.',
  },
  8: {
    title: 'Wortstellung (TeKaMoLo)',
    description: 'Die goldene Regel für das Mittelfeld im deutschen Satz. Wenn mehrere Angaben in einem Satz stehen, folgen sie meist dieser strengen Reihenfolge.',
  },
  9: {
    title: 'Nominalisierung & Verbalisierung',
    description: 'Der Schlüssel zu komplexen deutschen Texten. Verwandle Nebensätze in kompakte Nomen-Konstruktionen, um deinen Stil präziser und akademischer zu gestalten.',
  },
  10: {
    title: 'Funktionsverbgefüge (FVG)',
    description: 'Im gehobenen Deutsch wird das einfache Verb oft durch eine Nomen-Verb-Verbindung ersetzt. Das Verb verliert seine Bedeutung, das Nomen wird zum Bedeutungsträger.',
  },
  11: {
    title: 'Passiversatzformen',
    description: 'Wiederholungen von "werden" klingen oft eintönig. Im C1-Niveau nutzen wir Alternativen, um Möglichkeiten oder Notwendigkeiten eleganter auszudrücken.',
  },
  12: {
    title: 'Erweiterte Partizipien',
    description: 'Auch "Linksattribute" genannt. In Zeitungsartikeln und wissenschaftlichen Texten werden Relativsätze oft zu komplexen Adjektiven verdichtet, die vor dem Nomen stehen.',
  },
  13: {
    title: 'Konjunktiv I',
    description: 'Die Sprache der Journalisten und Wissenschaftler. Wir benutzen den Konjunktiv I, um Aussagen Dritter neutral wiederzugeben, ohne uns ihren Inhalt zu eigen zu machen.',
  },
  14: {
    title: 'Subjektive Modalverben',
    description: 'Modalverben drücken nicht nur Können oder Müssen aus. Im C1-Niveau nutzen wir sie als "Wahrscheinlichkeits-Skala", um logische Schlussfolgerungen zu formulieren.',
  },
  15: {
    title: 'Komplexe Strukturen',
    description: 'Zweiteilige Konnektoren (Doppelkonjunktionen) verbinden zwei Hauptsätze oder einen Nebensatz mit einem Hauptsatz. Die Schwierigkeit liegt oft in der Position des Verbs.',
  },
  16: {
    title: 'N-Deklination',
    description: 'Einige maskuline Nomen sind "schwach". Sie benötigen in allen Fällen außer dem Nominativ eine Unterstützung: den Buchstaben "n" (oder "en").',
  },
  17: {
    title: 'Grafikbeschreibung',
    description: 'In Prüfungen wie TestDaF und DSH müssen Grafiken präzise analysiert werden. Wichtig ist der Wechsel zwischen Verbalstil (B2) und Nominalstil (C1) sowie die korrekte Nutzung von Präpositionen.',
  },
  18: {
    title: 'Mündlicher Ausdruck',
    description: 'In der mündlichen Prüfung zählt nicht nur Korrektheit, sondern Struktur und Register. Du musst zeigen, dass du sowohl mit Kommilitonen (informell) als auch mit Dozenten (formell) sprechen kannst.',
  },
  19: {
    title: 'Leseverstehen C1',
    description: 'In der C1-Prüfung stehen die Antworten nie 1:1 im Text. Du musst Paraphrasen (Umschreibungen) erkennen und logische Lücken füllen.',
  },
  20: {
    title: 'Hörverstehen C1',
    description: 'In akademischen Vorlesungen (TestDaF HV3 / DSH) verliert man schnell den Faden. Das Geheimnis: Höre nicht auf jedes Wort, sondern auf die "Wegweiser" (Signalwörter).',
  },
  21: {
    title: 'Vergleichssätze und Steigerung',
    description: 'Komparativ und Superlativ sowie typische Strukturen mit „als" und „wie".',
  },
  22: {
    title: 'Wortstellung mit Fokus',
    description: 'Vorfeldbesetzung und Hervorhebung wichtiger Informationsteile im Satz.',
  },
  23: {
    title: 'Zeitformen im Bericht',
    description: 'Wechsel von Perfekt, Präteritum und Plusquamperfekt in Erzählungen und Berichten.',
  },
  24: {
    title: 'Infinitivkonstruktionen mit „zu"',
    description: 'Verwendung von Infinitivgruppen nach bestimmten Verben und Adjektiven.',
  },
  25: {
    title: 'Spezielle Verben mit Präposition',
    description: 'Typische Verb-Präposition-Kombinationen, die im Prüfungskontext wichtig sind.',
  },
  26: {
    title: 'Strukturierung von Argumentationen',
    description: 'Grammatikalische Mittel zur Gliederung von Pro- und Contra-Argumenten.',
  },
  27: {
    title: 'Redemittel für Meinung und Bewertung',
    description: 'Formulierungen für schriftliche Stellungnahmen und mündliche Prüfungen.',
  },
  28: {
    title: 'Konditionalsätze mit „wenn" und „falls"',
    description: 'Ausdrücken von Bedingungen in Prüfungsaufgaben und Textproduktion.',
  },
  29: {
    title: 'Konzessive Strukturen',
    description: 'Gebrauch von „obwohl", „trotzdem" und verwandten Ausdrücken.',
  },
  30: {
    title: 'Wiederholung und Integration',
    description: 'Zusammenführung der wichtigsten Grammatikthemen zur direkten Prüfungsvorbereitung.',
  },
};

export function getGrammarTopicByLessonNumber(lessonNumber: number): GrammarTopicData | null {
  return GRAMMAR_TOPICS_BY_LESSON[lessonNumber] ?? null;
}
