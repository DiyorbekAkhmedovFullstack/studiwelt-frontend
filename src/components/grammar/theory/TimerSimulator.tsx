import { useState, useEffect, useRef } from 'react';

export function TimerSimulator() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(60);
    setIsRunning(true);
  };

  // Calculate SVG circle progress - radius accounts for stroke width
  const radius = 44; // Smaller radius to fit within container with stroke
  const circumference = 2 * Math.PI * radius;
  const progress = ((60 - timeLeft) / 60) * circumference;

  return (
    <section className="text-white bg-text-main rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 md:mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-7 md:gap-8">
      {/* Left: Content */}
      <div className="w-full lg:max-w-[60%]">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-2">Zeitdruck-Simulator</h2>
        <p className="text-xs sm:text-sm md:text-base opacity-80">
          In TestDaF Aufgabe 4 hast du oft nur 2 Minuten Sprechzeit für eine komplexe
          Argumentation. Übe, auf den Punkt zu kommen.
        </p>
      </div>

      {/* Right: Timer Circle + Button */}
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <div className="relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] flex-shrink-0">
          {/* SVG with viewBox for responsive scaling */}
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#A67B5B"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              className="transition-all duration-1000 linear"
            />
          </svg>

          {/* Timer Value */}
          <div className="text-[1.75rem] sm:text-[1.875rem] md:text-[2rem] absolute inset-0 flex items-center justify-center font-mono font-bold">
            {timeLeft}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="text-text-main text-xs sm:text-sm md:text-base bg-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] font-semibold transition-transform hover:-translate-y-0.5"
        >
          Start 60s
        </button>
      </div>
    </section>
  );
}
