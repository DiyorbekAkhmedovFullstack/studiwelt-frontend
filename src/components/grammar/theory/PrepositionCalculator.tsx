import { useState } from 'react';

type ChartState = 'start' | 'auf' | 'um';

type ChartConfig = {
  height: number;
  color: string;
  text: string;
};

export function PrepositionCalculator() {
  const [selectedState, setSelectedState] = useState<ChartState>('start');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const configs: Record<ChartState, ChartConfig> = {
    start: { height: 100, color: '#8C8075', text: '100' },
    auf: { height: 150, color: '#6B8C6E', text: '150' },
    um: { height: 150, color: '#A67B5B', text: '100 + 50' },
  };

  const handleStateChange = (state: ChartState) => {
    if (state === selectedState) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedState(state);
      setIsTransitioning(false);
    }, 200);
  };

  const currentConfig = configs[selectedState];

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 md:mb-16">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] font-serif mb-2">Die Mathematik der Präpositionen</h2>
        <p className="text-text-muted text-xs sm:text-sm md:text-base">Der häufigste Fehler: "um" vs. "auf".</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-end">
        {/* Left: Chart */}
        <div className="bg-[#FAF6F3] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border border-[rgba(0,0,0,0.05)] p-6 sm:p-8 md:p-10 relative h-[250px] sm:h-[280px] md:h-[300px] flex items-end justify-center">
          {/* Y-Axis Labels */}
          <div className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] absolute left-1.5 sm:left-2 top-4 sm:top-5 bottom-4 sm:bottom-5 flex flex-col justify-between">
            <span>250</span>
            <span>200</span>
            <span>150</span>
            <span>100</span>
            <span>0</span>
          </div>

          {/* Y-Axis Line */}
          <div className="absolute left-6 sm:left-7 top-4 sm:top-5 bottom-4 sm:bottom-5 w-[1px] bg-[#CCC]" />

          {/* Bar Group */}
          <div className="relative w-[80px] sm:w-[90px] md:w-[100px]">
            {/* Ghost Bar (always 100) */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-[rgba(62,54,48,0.1)] border-t-2 border-dashed border-[#999] rounded-t-lg"
              style={{ height: '100px' }}
            />

            {/* Dynamic Bar */}
            <div
              className="text-white text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] absolute bottom-0 left-0 right-0 rounded-t-lg flex items-start justify-center pt-2 sm:pt-2.5 font-bold transition-all duration-500 ease-out"
              style={{
                height: `${currentConfig.height}px`,
                backgroundColor: currentConfig.color,
                opacity: isTransitioning ? 0.5 : 1,
              }}
            >
              {currentConfig.text}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-serif mb-1 sm:mb-2">
            Startwert: <strong>100</strong> Euro.
          </div>

          <button
            onClick={() => handleStateChange('start')}
            className={`p-3 sm:p-4 border-2 rounded-xl text-left transition-all ${
              selectedState === 'start'
                ? 'border-text-main bg-[#FAF6F3]'
                : 'border-[rgba(0,0,0,0.1)] bg-white hover:-translate-y-0.5'
            }`}
          >
            <span className="text-text-main text-sm sm:text-base md:text-lg lg:text-[1.1rem] block font-bold mb-1">Ausgangslage</span>
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block">
              Der Preis liegt bei 100 Euro.
            </span>
          </button>

          <button
            onClick={() => handleStateChange('auf')}
            className={`p-3 sm:p-4 border-2 rounded-xl text-left transition-all ${
              selectedState === 'auf'
                ? 'border-text-main bg-[#FAF6F3]'
                : 'border-[rgba(0,0,0,0.1)] bg-white hover:-translate-y-0.5'
            }`}
          >
            <span className="text-text-main text-sm sm:text-base md:text-lg lg:text-[1.1rem] block font-bold mb-1">
              steigen AUF (+ Akk)
            </span>
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block">
              Zielwert. Der Preis steigt <strong>auf</strong> 150 Euro.
            </span>
          </button>

          <button
            onClick={() => handleStateChange('um')}
            className={`p-3 sm:p-4 border-2 rounded-xl text-left transition-all ${
              selectedState === 'um'
                ? 'border-text-main bg-[#FAF6F3]'
                : 'border-[rgba(0,0,0,0.1)] bg-white hover:-translate-y-0.5'
            }`}
          >
            <span className="text-text-main text-sm sm:text-base md:text-lg lg:text-[1.1rem] block font-bold mb-1">
              steigen UM (+ Akk)
            </span>
            <span className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] block">
              Differenz. Der Preis steigt <strong>um</strong> 50 Euro (auf 150).
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
