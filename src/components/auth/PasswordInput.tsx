import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="mb-5">
        <label
          htmlFor={inputId}
          className="block mb-2 text-[14px] font-medium text-text-main"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className={`w-full px-4 py-3.5 border border-border rounded-lg font-sans text-base text-text-main bg-white transition-all shadow-[0_2px_6px_rgba(62,54,48,0.04)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(166,123,91,0.15)] ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-text-muted hover:text-text-main transition-colors pr-4"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </>
              )}
            </svg>
          </button>
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
