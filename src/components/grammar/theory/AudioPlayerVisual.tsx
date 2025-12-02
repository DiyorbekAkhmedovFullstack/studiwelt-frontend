import { useState } from 'react';

export function AudioPlayerVisual() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="text-white bg-text-main rounded-[24px] p-10 mb-16 shadow-float">
      <div className="grid grid-cols-[80px_1fr] gap-8 items-center">
        {/* Play Button */}
        <button
          onClick={handleToggle}
          className="text-text-main w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-105"
        >
          {isPlaying ? (
            // Pause Icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            // Play Icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Waveform */}
        <div>
          <div className="font-semibold mb-2 opacity-80">
            TRACK 04: Die Zukunft der Mobilität
          </div>
          <div className="flex items-center gap-1 h-[60px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded transition-all ${
                  isPlaying
                    ? 'bg-primary animate-wave'
                    : 'bg-[rgba(255,255,255,0.3)] animate-none'
                }`}
                style={{
                  height: `${getBarHeight(i)}%`,
                  animationDuration: `${getAnimationDuration(i)}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

// Helper functions for bar heights and animation
function getBarHeight(index: number): number {
  const pattern = [40, 70, 100, 50, 40, 70, 100, 50, 40, 70, 100, 50, 40, 70, 100, 50, 40, 70, 100, 50];
  return pattern[index % pattern.length];
}

function getAnimationDuration(index: number): number {
  if (index % 4 === 0) return 0.9;
  if (index % 3 === 0) return 1.3;
  if (index % 2 === 0) return 1.1;
  return 0.8;
}
