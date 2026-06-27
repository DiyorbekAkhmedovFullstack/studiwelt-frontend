import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { Icon } from "../../lib/icons";

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
            {showPassword ? <Icon.Hide size={20} /> : <Icon.Reveal size={20} />}
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
