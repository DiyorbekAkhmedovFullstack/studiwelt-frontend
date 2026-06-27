import type { ReactNode } from 'react';
import { Ui } from '../../../lib/icons';

type ComparisonType = 'aber' | 'sondern';

type ComparisonCardProps = {
  type: ComparisonType;
  title: string;
  rule: string;
  exampleCorrect: ReactNode;
  exampleWrong?: ReactNode;
  note: string;
};

function ComparisonCard({
  type,
  title,
  rule,
  exampleCorrect,
  exampleWrong,
  note,
}: ComparisonCardProps) {
  const borderColor = type === 'aber' ? 'border-[#6B8C6E]' : 'border-[#C07766]';
  const bgColor = type === 'aber' ? 'bg-[#F4F9F5]' : 'bg-[#FFF5F2]';
  const textColor = type === 'aber' ? 'text-[#6B8C6E]' : 'text-[#C07766]';

  return (
    <div
      className={`bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-7 lg:p-8 shadow-card border-l-[4px] sm:border-l-[5px] md:border-l-[6px] ${borderColor} transition-transform hover:-translate-y-1`}
    >
      {/* Title */}
      <div className={`text-lg sm:text-xl md:text-2xl lg:text-[1.4rem] font-serif font-bold mb-3 sm:mb-4 ${textColor}`}>
        {title}
      </div>

      {/* Rule Box */}
      <div className={`${bgColor} px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg mb-3 sm:mb-4`}>
        <p className="text-xs sm:text-sm md:text-base font-semibold text-text-main">
          {rule}
        </p>
      </div>

      {/* Example Correct */}
      <div className="mb-2 sm:mb-3">
        <div className="flex items-start gap-2">
          <Ui.Check className="text-[#6B8C6E] shrink-0 mt-0.5" size={18} />
          <p className="text-xs sm:text-sm md:text-base font-serif text-text-main flex-1">
            {exampleCorrect}
          </p>
        </div>
      </div>

      {/* Example Wrong (optional) */}
      {exampleWrong && (
        <div className="mb-3 sm:mb-4">
          <div className="flex items-start gap-2">
            <Ui.Close className="text-[#C07766] shrink-0 mt-0.5" size={18} />
            <p className="text-xs sm:text-sm md:text-base font-serif text-text-muted line-through flex-1">
              {exampleWrong}
            </p>
          </div>
        </div>
      )}

      {/* Note */}
      <div className="border-t border-dashed border-[rgba(0,0,0,0.1)] pt-3 sm:pt-4">
        <p className="text-[0.65rem] sm:text-xs md:text-sm text-text-muted italic">
          {note}
        </p>
      </div>
    </div>
  );
}

export function AdversativeComparison() {
  return (
    <section className="mb-8 sm:mb-12 md:mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <ComparisonCard
          type="aber"
          title="Aber"
          rule="Zusatz trotz Gegensatz. Die erste Aussage bleibt wahr."
          exampleCorrect={
            <>
              Der Test war schwer, <strong>aber</strong> ich habe bestanden.
            </>
          }
          note='Bedeutung: "Trotzdem" – beide Aussagen sind gleichzeitig wahr.'
        />

        <ComparisonCard
          type="sondern"
          title="Sondern"
          rule="Korrektur nach Verneinung. Ersetzt die erste Aussage."
          exampleCorrect={
            <>
              Ich komme nicht heute, <strong>sondern</strong> morgen.
            </>
          }
          exampleWrong={
            <>
              Ich komme nicht heute, <strong>aber</strong> morgen.
            </>
          }
          note='Bedeutung: "Stattdessen" – nur die zweite Aussage ist wahr. Immer nach "nicht"!'
        />
      </div>
    </section>
  );
}
