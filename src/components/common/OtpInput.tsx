import { useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';

type OtpInputProps = {
  /** Current digits (controlled by the parent). Length defines the number of boxes. */
  digits: string[];
  onDigitsChange: (next: string[]) => void;
  /** Called once all boxes are filled (auto-submit). Receives the joined code. */
  onComplete?: (code: string) => void;
  error?: boolean;
  autoFocus?: boolean;
};

/**
 * Six-box numeric OTP input with auto-advance, backspace, and paste handling.
 * Extracted so the email-verification and MFA flows can share one control.
 */
export function OtpInput({ digits, onDigitsChange, onComplete, error, autoFocus = true }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  const handleDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const next = [...digits];
    next[index] = cleanValue.slice(-1); // only the last typed character
    onDigitsChange(next);

    if (cleanValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (cleanValue && index === inputRefs.current.length - 1) {
      onComplete?.(next.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, digits.length);
    if (!pasteData) return;

    const next = [...digits];
    pasteData.split('').forEach((char, i) => {
      if (i < next.length) next[i] = char;
    });
    onDigitsChange(next);

    const focusIndex = Math.min(pasteData.length, digits.length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pasteData.length === digits.length) {
      onComplete?.(next.join(''));
    }
  };

  return (
    <div className="flex justify-center gap-2.5">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleDigitChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={`w-[50px] h-16 border-2 rounded-xl bg-white text-center text-[28px] font-semibold text-text-main transition-all caret-primary focus:outline-none focus:border-primary focus:-translate-y-1 focus:shadow-[0_8px_20px_rgba(166,123,91,0.15)] ${
            error ? 'border-danger animate-shake' : 'border-[#E0E0E0]'
          }`}
        />
      ))}
    </div>
  );
}
