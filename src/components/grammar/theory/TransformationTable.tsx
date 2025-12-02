type TransformationRow = {
  logic: string;
  verbal: string;
  nominal: string;
};

export function TransformationTable() {
  const transformations: TransformationRow[] = [
    {
      logic: 'Kausal',
      verbal: 'weil, da',
      nominal: 'aufgrund, wegen, dank',
    },
    {
      logic: 'Konzessiv',
      verbal: 'obwohl, obgleich',
      nominal: 'trotz, ungeachtet',
    },
    {
      logic: 'Temporal',
      verbal: 'nachdem, bevor',
      nominal: 'nach, vor',
    },
    {
      logic: 'Final',
      verbal: 'damit, um... zu',
      nominal: 'zu, zwecks, für',
    },
    {
      logic: 'Konditional',
      verbal: 'wenn, falls',
      nominal: 'bei, im Falle',
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-sm sm:text-xs md:text-[1.2rem] font-serif mb-6">Wichtige Transformationen</h2>
      <div className="bg-surface rounded-[16px] shadow-card overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left sm:text-[0.5rem] md:text-[0.6rem] px-6 py-4 bg-[#FAF6F3] uppercase tracking-wide font-semibold w-1/5">
                Logik
              </th>
              <th className="text-left sm:text-[0.5rem] md:text-[0.6rem] px-6 py-4 bg-[#FAF6F3] uppercase tracking-wide font-semibold w-2/5">
                Verbal (Konnektor)
              </th>
              <th className="text-left sm:text-[0.5rem] md:text-[0.6rem] px-6 py-4 bg-[#FAF6F3] uppercase tracking-wide font-semibold w-2/5">
                Nominal (Präposition + Genitiv)
              </th>
            </tr>
          </thead>
          <tbody>
            {transformations.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
                  <span className="text-[0.55rem] sm:text-[0.5rem] md:text-[0.6rem] inline-block px-2.5 py-1 rounded-md font-semibold bg-[#F0F0F0]">
                    {row.logic}
                  </span>
                </td>
                <td className="text-xs sm:text-sm md:text-[1rem] px-6 py-4 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
                  {row.verbal}
                </td>
                <td className="text-xs sm:text-sm md:text-[1rem] px-6 py-4 border-b border-[rgba(0,0,0,0.05)] last:border-b-0 font-medium">
                  {row.nominal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
