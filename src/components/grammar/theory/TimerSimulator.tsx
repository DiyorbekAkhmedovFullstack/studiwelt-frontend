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

  // Calculate SVG circle progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = ((60 - timeLeft) / 60) * circumference;

  return (
    <section className="text-white bg-text-main rounded-[24px] p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Left: Content */}
      <div className="max-w-[60%]">
        <h2 className="text-base sm:text-xs md:text-[1.3rem] font-serif mb-2">Zeitdruck-Simulator</h2>
        <p className="opacity-80 mb-4">
          In TestDaF Aufgabe 4 hast du oft nur 2 Minuten Sprechzeit für eine komplexe
          Argumentation. Übe, auf den Punkt zu kommen.
        </p>
        <button
          onClick={handleStart}
          className="text-text-main bg-white px-6 py-2.5 rounded-full font-semibold transition-transform hover:-translate-y-0.5"
        >
          Start 60s
        </button>
      </div>

      {/* Right: Timer Circle */}
      <div className="relative w-[120px] h-[120px]">
        {/* Background Circle */}
        <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
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
        <div className="text-[2rem] absolute inset-0 flex items-center justify-center font-mono font-bold">
          {timeLeft}
        </div>
      </div>
    </section>
  );
}
