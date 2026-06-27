import { useState } from 'react';
import type { DragEvent } from 'react';
import { Ui } from '../../../lib/icons';

type PrepositionOption = {
  value: string;
  isCorrect: boolean;
};

type ReactionChamberProps = {
  title?: string;
  subtitle?: string;
  verb: string;
  sentenceEnding: string;
  options: PrepositionOption[];
  successMessage: string;
  errorMessage: string;
};

export function ReactionChamber({
  verb,
  sentenceEnding,
  options,
  successMessage,
}: ReactionChamberProps) {
  const [selectedPrep, setSelectedPrep] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingValue, setDraggingValue] = useState<string | null>(null);

  const handleSelect = (option: PrepositionOption) => {
    if (isCorrect || selectedPrep) return;

    if (option.isCorrect) {
      setSelectedPrep(option.value);
      setIsCorrect(true);
    }
    // Wrong answers are simply ignored - no visual feedback needed
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, value: string) => {
    if (isCorrect || selectedPrep) return;
    e.dataTransfer.setData('text/plain', value);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingValue(value);
  };

  const handleDragEnd = () => {
    setDraggingValue(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isCorrect && !selectedPrep) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDropOnTarget = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isCorrect || selectedPrep) return;

    const value = e.dataTransfer.getData('text/plain');
    const option = options.find((o) => o.value === value);
    if (option) {
      handleSelect(option);
    }
  };

  return (
    <div className="bg-surface rounded-xl sm:rounded-[20px] p-4 sm:p-6 shadow-card">
      {/* Sentence with inline drop zone */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-serif text-text-main mb-5 sm:mb-6">
        <span>{verb}</span>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnTarget}
          className={`inline-flex items-center justify-center min-w-[70px] sm:min-w-[80px] h-[38px] sm:h-[44px] px-4 rounded-xl transition-all duration-200 ${
            isCorrect
              ? 'bg-[#6B8C6E] text-white font-semibold shadow-sm'
              : isDragOver
                ? 'bg-[#4A7C8C]/15 border-2 border-[#4A7C8C] border-dashed scale-105'
                : 'bg-[#F5F1ED] border-2 border-dashed border-[#D4C8BC]'
          }`}
        >
          {selectedPrep ? (
            <span className="font-semibold">{selectedPrep}</span>
          ) : (
            <Ui.Plus
              className={`w-5 h-5 transition-colors ${isDragOver ? 'text-[#4A7C8C]' : 'text-[#C4B5A8]'}`}
              stroke={1.5}
            />
          )}
        </div>

        <span>{sentenceEnding}</span>
      </div>

      {/* Draggable Chips */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {options.map((option) => {
          const isSelected = selectedPrep === option.value;
          const isDragging = draggingValue === option.value;
          const isDisabled = isCorrect || !!selectedPrep;

          if (isSelected) return null;

          return (
            <div
              key={option.value}
              draggable={!isDisabled}
              onDragStart={(e) => handleDragStart(e, option.value)}
              onDragEnd={handleDragEnd}
              onClick={() => handleSelect(option)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all select-none ${
                isDragging
                  ? 'bg-[#4A7C8C]/10 text-[#4A7C8C] opacity-40 scale-95'
                  : isDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-default'
                    : 'bg-white text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] cursor-grab active:cursor-grabbing active:scale-95'
              }`}
            >
              {option.value}
            </div>
          );
        })}
      </div>

      {/* Success Message */}
      {isCorrect && (
        <p className="mt-4 text-sm text-[#6B8C6E]">
          {successMessage}
        </p>
      )}
    </div>
  );
}
