import type { InputHTMLAttributes } from 'react';
import { Ui } from '../../lib/icons';

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
        <Ui.Check
          size={12}
          stroke={4}
          className="text-white opacity-0 peer-checked:opacity-100"
        />
      </div>
      <span className="text-[14px]">{label}</span>
    </label>
  );
}
