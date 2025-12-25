import { forwardRef, useId, type InputHTMLAttributes, type Ref } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    { label, error, className = "", id, ...props },
    ref: Ref<HTMLInputElement>,
  ) {
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
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={`w-full px-4 py-3.5 border border-border rounded-lg font-sans text-base text-text-main bg-white transition-all shadow-[0_2px_6px_rgba(62,54,48,0.04)] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(166,123,91,0.15)] ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
