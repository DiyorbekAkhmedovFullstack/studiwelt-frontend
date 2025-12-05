type DeclensionPattern = {
  type: string;
  description: string;
  examples: {
    case: string;
    masculine: string;
    feminine: string;
    neuter: string;
    plural: string;
  }[];
  color: string;
  rule: string;
};

export function AdjectiveDeclensionGrid() {
  const patterns: DeclensionPattern[] = [
    {
      type: 'Typ I: Nach bestimmtem Artikel',
      description: 'der, die, das, dieser, jener, welcher, alle',
      examples: [
        {
          case: 'Nom',
          masculine: 'der gut<strong>e</strong> Mann',
          feminine: 'die gut<strong>e</strong> Frau',
          neuter: 'das gut<strong>e</strong> Kind',
          plural: 'die gut<strong>en</strong> Leute',
        },
        {
          case: 'Akk',
          masculine: 'den gut<strong>en</strong> Mann',
          feminine: 'die gut<strong>e</strong> Frau',
          neuter: 'das gut<strong>e</strong> Kind',
          plural: 'die gut<strong>en</strong> Leute',
        },
        {
          case: 'Dat',
          masculine: 'dem gut<strong>en</strong> Mann',
          feminine: 'der gut<strong>en</strong> Frau',
          neuter: 'dem gut<strong>en</strong> Kind',
          plural: 'den gut<strong>en</strong> Leuten',
        },
        {
          case: 'Gen',
          masculine: 'des gut<strong>en</strong> Mannes',
          feminine: 'der gut<strong>en</strong> Frau',
          neuter: 'des gut<strong>en</strong> Kindes',
          plural: 'der gut<strong>en</strong> Leute',
        },
      ],
      color: 'bg-[#E3F2FD] border-[#1565C0]',
      rule: 'Endungen: -e (Nom Sg) oder -en (sonst)',
    },
    {
      type: 'Typ II: Nach unbestimmtem Artikel',
      description: 'ein, kein, mein, dein, sein, ihr, unser, euer',
      examples: [
        {
          case: 'Nom',
          masculine: 'ein gut<strong>er</strong> Mann',
          feminine: 'eine gut<strong>e</strong> Frau',
          neuter: 'ein gut<strong>es</strong> Kind',
          plural: 'keine gut<strong>en</strong> Leute',
        },
        {
          case: 'Akk',
          masculine: 'einen gut<strong>en</strong> Mann',
          feminine: 'eine gut<strong>e</strong> Frau',
          neuter: 'ein gut<strong>es</strong> Kind',
          plural: 'keine gut<strong>en</strong> Leute',
        },
        {
          case: 'Dat',
          masculine: 'einem gut<strong>en</strong> Mann',
          feminine: 'einer gut<strong>en</strong> Frau',
          neuter: 'einem gut<strong>en</strong> Kind',
          plural: 'keinen gut<strong>en</strong> Leuten',
        },
        {
          case: 'Gen',
          masculine: 'eines gut<strong>en</strong> Mannes',
          feminine: 'einer gut<strong>en</strong> Frau',
          neuter: 'eines gut<strong>en</strong> Kindes',
          plural: 'keiner gut<strong>en</strong> Leute',
        },
      ],
      color: 'bg-[#FFF3E0] border-[#E65100]',
      rule: 'Endungen: -er, -es (Nom/Akk Sg mask/neut) oder -e/-en (sonst)',
    },
    {
      type: 'Typ III: Ohne Artikel (Nullartikel)',
      description: 'Bei Stoffnamen, abstrakten Begriffen, Plural ohne Artikel',
      examples: [
        {
          case: 'Nom',
          masculine: 'gut<strong>er</strong> Wein',
          feminine: 'gut<strong>e</strong> Milch',
          neuter: 'gut<strong>es</strong> Bier',
          plural: 'gut<strong>e</strong> Leute',
        },
        {
          case: 'Akk',
          masculine: 'gut<strong>en</strong> Wein',
          feminine: 'gut<strong>e</strong> Milch',
          neuter: 'gut<strong>es</strong> Bier',
          plural: 'gut<strong>e</strong> Leute',
        },
        {
          case: 'Dat',
          masculine: 'gut<strong>em</strong> Wein',
          feminine: 'gut<strong>er</strong> Milch',
          neuter: 'gut<strong>em</strong> Bier',
          plural: 'gut<strong>en</strong> Leuten',
        },
        {
          case: 'Gen',
          masculine: 'gut<strong>en</strong> Weines',
          feminine: 'gut<strong>er</strong> Milch',
          neuter: 'gut<strong>en</strong> Bieres',
          plural: 'gut<strong>er</strong> Leute',
        },
      ],
      color: 'bg-[#E8F5E9] border-[#2E7D32]',
      rule: 'Adjektiv übernimmt Artikelendung (starke Deklination)',
    },
  ];

  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Die drei Deklinationstypen
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Die Adjektivendung hängt vom <strong>Artikeltyp</strong> und <strong>Kasus</strong> ab.
        Es gibt drei Hauptmuster.
      </p>

      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className={`${pattern.color} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border-l-4`}
          >
            {/* Header */}
            <div className="mb-4 sm:mb-5">
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold mb-2">
                {pattern.type}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted mb-2">{pattern.description}</p>
              <div className="bg-white rounded-lg px-3 py-2">
                <p className="text-[0.65rem] sm:text-xs font-semibold text-primary">
                  Regel: {pattern.rule}
                </p>
              </div>
            </div>

            {/* Declension Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-text-muted/20">
                    <th className="text-left py-2 px-2 font-bold text-text-muted">Kasus</th>
                    <th className="text-left py-2 px-2 font-bold text-text-muted">Maskulinum</th>
                    <th className="text-left py-2 px-2 font-bold text-text-muted">Femininum</th>
                    <th className="text-left py-2 px-2 font-bold text-text-muted">Neutrum</th>
                    <th className="text-left py-2 px-2 font-bold text-text-muted">Plural</th>
                  </tr>
                </thead>
                <tbody>
                  {pattern.examples.map((example, exIndex) => (
                    <tr key={exIndex} className="border-b border-text-muted/10">
                      <td className="py-2 sm:py-3 px-2 font-bold text-primary">{example.case}</td>
                      <td
                        className="py-2 sm:py-3 px-2 font-serif"
                        dangerouslySetInnerHTML={{ __html: example.masculine }}
                      />
                      <td
                        className="py-2 sm:py-3 px-2 font-serif"
                        dangerouslySetInnerHTML={{ __html: example.feminine }}
                      />
                      <td
                        className="py-2 sm:py-3 px-2 font-serif"
                        dangerouslySetInnerHTML={{ __html: example.neuter }}
                      />
                      <td
                        className="py-2 sm:py-3 px-2 font-serif"
                        dangerouslySetInnerHTML={{ __html: example.plural }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
