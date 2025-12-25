import type { ReactNode } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

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
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="w-4 h-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    }
    if (state === "active") {
      return (
        <svg viewBox="0 0 24 24" fill="white" stroke="none" className="w-4 h-4">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    );
  };

  const content = (
    <>
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Day {lessonNumber.toString().padStart(2, "0")}
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
            <div className="font-semibold text-primary">Resume Lesson</div>
          ) : (
            <>
              {duration && (
                <div className="flex items-center gap-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  {duration}
                </div>
              )}
              {type && <div>{type}</div>}
              {state === "locked" && <div>Locked</div>}
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
