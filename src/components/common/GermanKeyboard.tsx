import { useEffect, useRef } from 'react';

interface GermanKeyboardProps {
  onCharacterClick: (char: string) => void;
}

const GERMAN_CHARACTERS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];

export function GermanKeyboard({ onCharacterClick }: GermanKeyboardProps) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Cleanup function
    return () => {
      buttonsRef.current = [];
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent the input from losing focus when clicking the button
    e.preventDefault();
  };

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {GERMAN_CHARACTERS.map((char, index) => (
        <button
          key={char}
          ref={(el) => {
            buttonsRef.current[index] = el;
          }}
          type="button"
          onMouseDown={handleMouseDown}
          onClick={() => onCharacterClick(char)}
          className="inline-flex items-center justify-center bg-surface px-2.5 sm:px-3 py-1.5 sm:py-2 rounded border border-[#ccc] font-mono text-sm sm:text-base shadow-[0_1px_0_rgba(0,0,0,0.1)] hover:bg-highlight hover:border-primary transition-colors font-semibold min-w-[32px] sm:min-w-[36px]"
          aria-label={`Insert character ${char}`}
        >
          {char}
        </button>
      ))}
    </div>
  );
}
