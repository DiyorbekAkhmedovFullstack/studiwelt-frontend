import type { ReactNode } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Ui } from "../../lib/icons";

interface LessonCardProps {
  lessonNumber: number;
  title: string;
  state: "completed" | "active" | "locked";
  duration?: string;
  type?: string;
  to?: string;
}

export const LessonCard = memo(function LessonCard({
  lessonNumber,
  title,
  state,
  duration,
  type,
  to,
}: LessonCardProps) {
  const stateStyles = {
    completed: "bg-[#FCFCFC] hover:shadow-[0_10px_30px_rgba(62,54,48,0.08)]",
    active:
      "border-primary bg-[#FFFCFA] hover:shadow-[0_10px_30px_rgba(62,54,48,0.08)]",
    locked:
      "opacity-60 cursor-pointer bg-[#F5F5F5] shadow-none hover:opacity-70 transition-opacity",
  };

  const iconStyles = {
    completed: "bg-[#E6F0E7] text-success",
    active: "bg-primary text-white",
    locked: "bg-[#F0EBE5] text-text-muted",
  };

  const titleStyles = {
    completed: "text-text-muted line-through decoration-success",
    active: "text-primary",
    locked: "text-text-main",
  };

  const getIcon = (): ReactNode => {
    if (state === "completed") {
      return <Ui.Check className="w-4 h-4" stroke={3} />;
    }
    if (state === "active") {
      return <Ui.Play className="w-4 h-4 text-white" />;
    }
    return <Ui.Lock className="w-4 h-4" />;
  };

  const content = (
    <>
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Tag {lessonNumber.toString().padStart(2, "0")}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${iconStyles[state]}`}
        >
          {getIcon()}
        </div>
      </div>

      <div
        className={`font-semibold text-[17px] mb-2 leading-snug ${titleStyles[state]}`}
      >
        {title}
      </div>

      {(duration || type || state === "active") && (
        <div className="mt-auto flex gap-3 text-xs text-text-muted items-center">
          {state === "active" ? (
            <div className="font-semibold text-primary">Weiter lernen</div>
          ) : (
            <>
              {duration && (
                <div className="flex items-center gap-1">
                  <Ui.Play className="w-4 h-4" />
                  {duration}
                </div>
              )}
              {type && <div>{type}</div>}
              {state === "locked" && <div>Gesperrt</div>}
            </>
          )}
        </div>
      )}
    </>
  );

  if (state === "locked" || !to) {
    return (
      <div
        className={`bg-surface rounded-xl p-5 shadow-card border border-transparent transition-all duration-300 flex flex-col ${stateStyles[state]}`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={`block bg-surface rounded-xl p-5 shadow-card border border-transparent transition-all duration-300 cursor-pointer hover:-translate-y-1 ${stateStyles[state]}`}
    >
      {content}
    </Link>
  );
});
