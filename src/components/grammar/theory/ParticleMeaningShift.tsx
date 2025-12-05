import { useState } from 'react';

type Sentence = {
  base: string;
  particles: {
    word: string;
    sentence: string;
    attitude: string;
    color: string;
  }[];
};

export function ParticleMeaningShift() {
  const [selectedSentence, setSelectedSentence] = useState<number>(0);

  const sentences: Sentence[] = [
    {
      base: 'Komm mit!',
      particles: [
        {
          word: 'ohne Partikel',
          sentence: 'Komm mit!',
          attitude: 'Neutral, direkter Befehl',
          color: 'bg-[#F5F5F5] border-[#757575] text-[#757575]',
        },
        {
          word: 'mal',
          sentence: 'Komm mal mit!',
          attitude: 'Höflich, beiläufig, entspannt',
          color: 'bg-[#E3F2FD] border-[#1565C0] text-[#1565C0]',
        },
        {
          word: 'doch',
          sentence: 'Komm doch mit!',
          attitude: 'Dringend, überredend, "bitte wirklich!"',
          color: 'bg-[#FFF3E0] border-[#E65100] text-[#E65100]',
        },
        {
          word: 'bloß',
          sentence: 'Komm bloß mit!',
          attitude: 'Warnung, Dringlichkeit, "unbedingt!"',
          color: 'bg-[#FFEBEE] border-[#C62828] text-[#C62828]',
        },
      ],
    },
    {
      base: 'Das ist interessant.',
      particles: [
        {
          word: 'ohne Partikel',
          sentence: 'Das ist interessant.',
          attitude: 'Neutral, sachliche Feststellung',
          color: 'bg-[#F5F5F5] border-[#757575] text-[#757575]',
        },
        {
          word: 'ja',
          sentence: 'Das ist ja interessant!',
          attitude: 'Überrascht, "das wusste ich nicht!"',
          color: 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]',
        },
        {
          word: 'wohl',
          sentence: 'Das ist wohl interessant.',
          attitude: 'Vermutend, unsicher, "ich nehme an"',
          color: 'bg-[#FFF9E5] border-[#D9A441] text-[#D9A441]',
        },
        {
          word: 'doch',
          sentence: 'Das ist doch interessant!',
          attitude: 'Bekräftigend, "siehst du? Hab ich gesagt!"',
          color: 'bg-[#FFF3E0] border-[#E65100] text-[#E65100]',
        },
      ],
    },
    {
      base: 'Das ist so.',
      particles: [
        {
          word: 'ohne Partikel',
          sentence: 'Das ist so.',
          attitude: 'Neutral, einfache Bestätigung',
          color: 'bg-[#F5F5F5] border-[#757575] text-[#757575]',
        },
        {
          word: 'eben',
          sentence: 'Das ist eben so.',
          attitude: 'Resignation, "kann man nichts machen"',
          color: 'bg-[#F3E5F5] border-[#6A1B9A] text-[#6A1B9A]',
        },
        {
          word: 'halt',
          sentence: 'Das ist halt so.',
          attitude: 'Akzeptanz, umgangssprachlich (Süddeutsch)',
          color: 'bg-[#F3E5F5] border-[#6A1B9A] text-[#6A1B9A]',
        },
        {
          word: 'nun mal',
          sentence: 'Das ist nun mal so.',
          attitude: 'Betonung der Unveränderlichkeit',
          color: 'bg-[#F3E5F5] border-[#6A1B9A] text-[#6A1B9A]',
        },
      ],
    },
  ];

  const currentSentence = sentences[selectedSentence];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Bedeutungsveränderung durch Partikeln
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Sieh, wie <strong>eine Modalpartikel</strong> die <strong>Haltung</strong> und{' '}
        <strong>Bedeutung</strong> eines Satzes komplett verändert.
      </p>

      {/* Sentence Selector */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {sentences.map((sentence, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedSentence(index)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-serif font-semibold transition-all flex-shrink-0 ${
              selectedSentence === index
                ? 'bg-primary text-white'
                : 'bg-[#F5F5F5] text-text-muted hover:bg-[#E8E8E8]'
            }`}
          >
            {sentence.base}
          </button>
        ))}
      </div>

      {/* Particle Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {currentSentence.particles.map((particle, index) => (
          <div
            key={index}
            className={`${particle.color} rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 transition-transform hover:-translate-y-1`}
          >
            {/* Particle Label */}
            <div className="mb-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide opacity-75">
                {particle.word}
              </span>
            </div>

            {/* Sentence */}
            <p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-text-main mb-3">
              {particle.sentence}
            </p>

            {/* Attitude */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3">
              <p className="text-xs sm:text-sm text-text-muted italic">
                → {particle.attitude}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
