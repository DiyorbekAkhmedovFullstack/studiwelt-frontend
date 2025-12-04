type CaseType = 'Nom' | 'Akk' | 'Dat' | 'Gen';

type PronounRow = {
  case: CaseType;
  maskulin: string;
  neutral: string;
  feminin: string;
  plural: string;
  highlightCells?: ('maskulin' | 'neutral' | 'feminin' | 'plural')[];
};

type PronounMatrixProps = {
  title: string;
  rows: PronounRow[];
};

function getCaseColor(caseType: CaseType): string {
  switch (caseType) {
    case 'Nom':
      return 'bg-[rgba(107,140,110,0.15)] text-[#6B8C6E]';
    case 'Akk':
      return 'bg-[rgba(74,124,140,0.15)] text-[#4A7C8C]';
    case 'Dat':
      return 'bg-[rgba(217,164,65,0.15)] text-[#D9A441]';
    case 'Gen':
      return 'bg-[rgba(192,119,102,0.15)] text-[#C07766]';
  }
}

export function PronounMatrix({ title, rows }: PronounMatrixProps) {
  return (
    <div className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-4 sm:p-6 md:p-7 lg:p-8 mb-8 sm:mb-12 md:mb-16 overflow-x-auto">
      <h3 className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] font-serif mb-4 sm:mb-5">{title}</h3>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full border-collapse min-w-[500px] sm:min-w-0">
          <thead>
            <tr>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] p-2 sm:p-3 uppercase tracking-wider border-b-2 border-[rgba(0,0,0,0.05)]">
                Kasus
              </th>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] p-2 sm:p-3 uppercase tracking-wider border-b-2 border-[rgba(0,0,0,0.05)]">
                Maskulin
              </th>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] p-2 sm:p-3 uppercase tracking-wider border-b-2 border-[rgba(0,0,0,0.05)]">
                Neutral
              </th>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] p-2 sm:p-3 uppercase tracking-wider border-b-2 border-[rgba(0,0,0,0.05)]">
                Feminin
              </th>
              <th className="text-left text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] p-2 sm:p-3 uppercase tracking-wider border-b-2 border-[rgba(0,0,0,0.05)]">
                Plural
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="p-2 sm:p-3 md:p-4 border-b border-[rgba(0,0,0,0.05)]">
                  <span
                    className={`inline-block w-[38px] sm:w-[42px] md:w-[45px] text-center font-sans text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] px-1 sm:px-1.5 py-0.5 rounded font-bold ${getCaseColor(row.case)}`}
                  >
                    {row.case}
                  </span>
                </td>
                <td
                  className={`p-2 sm:p-3 md:p-4 font-mono text-sm sm:text-base md:text-lg border-b border-[rgba(0,0,0,0.05)] ${
                    row.highlightCells?.includes('maskulin')
                      ? 'font-bold text-primary'
                      : 'text-text-main'
                  }`}
                >
                  {row.maskulin}
                </td>
                <td
                  className={`p-2 sm:p-3 md:p-4 font-mono text-sm sm:text-base md:text-lg border-b border-[rgba(0,0,0,0.05)] ${
                    row.highlightCells?.includes('neutral')
                      ? 'font-bold text-primary'
                      : 'text-text-main'
                  }`}
                >
                  {row.neutral}
                </td>
                <td
                  className={`p-2 sm:p-3 md:p-4 font-mono text-sm sm:text-base md:text-lg border-b border-[rgba(0,0,0,0.05)] ${
                    row.highlightCells?.includes('feminin')
                      ? 'font-bold text-primary'
                      : 'text-text-main'
                  }`}
                >
                  {row.feminin}
                </td>
                <td
                  className={`p-2 sm:p-3 md:p-4 font-mono text-sm sm:text-base md:text-lg border-b border-[rgba(0,0,0,0.05)] ${
                    row.highlightCells?.includes('plural')
                      ? 'font-bold text-primary'
                      : 'text-text-main'
                  }`}
                >
                  {row.plural}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
