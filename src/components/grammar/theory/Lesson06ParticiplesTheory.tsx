import { ParticiplesComparison } from './ParticiplesComparison';
import { AdjectiveMachine } from './AdjectiveMachine';

export function Lesson06ParticiplesTheory() {
  return (
    <>
      {/* Introduction */}
      <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 border border-[rgba(0,0,0,0.02)]">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Partizipien können wie Adjektive vor einem Nomen stehen. Sie verdichten Information
          und machen Texte eleganter. <strong>Partizip I</strong> (Infinitiv + d) drückt eine
          aktive, gleichzeitige Handlung aus. <strong>Partizip II</strong> (ge-Form) beschreibt
          eine passive oder abgeschlossene Handlung.
        </p>
      </section>

      {/* Participles Comparison Cards */}
      <ParticiplesComparison />

      {/* Interactive Adjective Machine */}
      <AdjectiveMachine
        title="Der Adjektiv-O-Mat"
        subtitle="Wandle den Relativsatz in ein Partizipialadjektiv um."
        inputSentence="Das Kind, das im Garten spielt."
        options={[
          { text: 'Das spielende Kind.', isCorrect: true },
          { text: 'Das gespielte Kind.', isCorrect: false },
          { text: 'Das spielige Kind.', isCorrect: false },
          { text: 'Das spielte Kind.', isCorrect: false },
        ]}
      />
    </>
  );
}
