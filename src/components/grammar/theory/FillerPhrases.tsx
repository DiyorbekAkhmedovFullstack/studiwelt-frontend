export function FillerPhrases() {
  const phrases = [
    'Das ist eine komplexe Frage, die man differenziert betrachten muss.',
    'In diesem Zusammenhang ist auch wichtig zu erwähnen, dass...',
    'Darüber hinaus sollte man nicht vergessen, dass...',
    'Ein weiterer Aspekt, der hier eine Rolle spielt, ist...',
    'Lassen Sie mich kurz nachdenken...',
  ];

  return (
    <section className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Zeit gewinnen (Überleitungen)</h2>

      <div className="flex flex-wrap gap-3">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className="text-text-muted bg-white border border-[rgba(0,0,0,0.1)] px-5 py-2.5 rounded-full font-medium transition-all hover:border-primary hover:text-text-main hover:-translate-y-0.5 cursor-default"
          >
            "{phrase}"
          </div>
        ))}
      </div>
    </section>
  );
}
