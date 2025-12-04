export function FillerPhrases() {
  const phrases = [
    'Das ist eine komplexe Frage, die man differenziert betrachten muss.',
    'In diesem Zusammenhang ist auch wichtig zu erwähnen, dass...',
    'Darüber hinaus sollte man nicht vergessen, dass...',
    'Ein weiterer Aspekt, der hier eine Rolle spielt, ist...',
    'Lassen Sie mich kurz nachdenken...',
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Zeit gewinnen (Überleitungen)</h2>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className="text-text-muted text-xs sm:text-sm md:text-base bg-white border border-[rgba(0,0,0,0.1)] px-4 sm:px-5 py-2 sm:py-2.5 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] font-medium transition-all hover:border-primary hover:text-text-main hover:-translate-y-0.5 cursor-default"
          >
            "{phrase}"
          </div>
        ))}
      </div>
    </section>
  );
}
