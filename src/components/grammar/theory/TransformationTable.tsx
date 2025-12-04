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
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5 md:mb-6">Wichtige Transformationen</h2>
      <div className="bg-surface rounded-[12px] sm:rounded-[14px] md:rounded-[16px] shadow-card overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full border-collapse min-w-[500px] sm:min-w-0">
          <thead>
            <tr>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-[#FAF6F3] uppercase tracking-wide font-semibold w-1/5">
                Logik
              </th>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-[#FAF6F3] uppercase tracking-wide font-semibold w-2/5">
                Verbal (Konnektor)
              </th>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-[#FAF6F3] uppercase tracking-wide font-semibold w-2/5">
                Nominal (Präposition + Genitiv)
              </th>
            </tr>
          </thead>
          <tbody>
            {transformations.map((row, index) => (
              <tr key={index}>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
                  <span className="text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-semibold bg-[#F0F0F0]">
                    {row.logic}
                  </span>
                </td>
                <td className="text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
                  {row.verbal}
                </td>
                <td className="text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-[rgba(0,0,0,0.05)] last:border-b-0 font-medium">
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
