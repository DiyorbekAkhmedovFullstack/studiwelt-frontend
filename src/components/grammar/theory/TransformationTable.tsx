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
    <section className="bg-surface rounded-xl sm:rounded-[24px] p-3 sm:p-6 md:p-10 shadow-card mb-4 sm:mb-8 md:mb-10">
      <h2 className="text-sm sm:text-base md:text-[1.35rem] font-serif mb-3 sm:mb-5 md:mb-6 pb-2 border-b-2 border-[#E3D4C5]">
        Wichtige Transformationen
      </h2>
      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
        <table className="w-full text-left min-w-[400px] sm:min-w-0">
          <thead>
            <tr className="border-b-2 border-[#E3D4C5]">
              <th className="py-2 sm:py-3 pr-2 sm:pr-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">
                Logik
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">
                Verbal (Konnektor)
              </th>
              <th className="py-2 sm:py-3 pl-2 sm:pl-4 text-[0.55rem] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-text-muted">
                Nominal (Präposition)
              </th>
            </tr>
          </thead>
          <tbody className="font-serif">
            {transformations.map((row, index) => (
              <tr key={index} className="border-b border-[#E3D4C5]/50 last:border-b-0">
                <td className="py-1.5 sm:py-3 pr-2 sm:pr-4">
                  <span className="text-[0.5rem] sm:text-[0.65rem] md:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold uppercase tracking-[0.5px] bg-[#EEE] text-[#666] font-sans">
                    {row.logic}
                  </span>
                </td>
                <td className="py-1.5 sm:py-3 px-2 sm:px-4 text-[0.6rem] sm:text-xs md:text-sm text-text-muted">
                  {row.verbal}
                </td>
                <td className="py-1.5 sm:py-3 pl-2 sm:pl-4 text-[0.6rem] sm:text-xs md:text-sm text-text-main font-medium">
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
