import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <label className={`flex items-center gap-2 text-text-muted cursor-pointer ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        className="peer sr-only"
        {...props}
      />
      <div className="w-[18px] h-[18px] border border-[#CCC] rounded flex items-center justify-center transition-all peer-checked:bg-primary peer-checked:border-primary">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-0 peer-checked:opacity-100"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="text-[14px]">{label}</span>
    </label>
  );
}
