import { useLessons } from '../../hooks/queries/useLessons';
import { Icon, Ui } from '../../lib/icons';

export function PlatformPreview() {
  const { data: lessons = [] } = useLessons();

  // Get week 3 lessons (days 13-18, index 12-17)
  const week3Lessons = lessons.slice(12, 18);

  // Fallback titles if lessons not loaded yet
  const fallbackTitles = [
    'Komplexe Grammatik',
    'Hörverständnis',
    'Fortgeschrittene Grammatik',
    'Leseübung',
    'Vokabelquiz',
    'Schreibübung',
  ];

  // Get lesson title by index (0-5 for week 3)
  const getLessonTitle = (index: number) => {
    return week3Lessons[index]?.title || fallbackTitles[index];
  };

  return (
    <div className="mt-12 md:mt-16 bg-surface rounded-[20px] shadow-soft w-full max-w-[900px] mx-auto p-2 sm:p-3 border border-[rgba(0,0,0,0.05)] relative transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(0deg)] [transform:perspective(1000px)_rotateX(2deg)]">
      {/* Browser Dots */}
      <div className="flex gap-1.5 mb-3 pl-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] border border-[#1AAB29]"></div>
      </div>

      {/* App Mockup Inner */}
      <div className="bg-page h-[480px] sm:h-[520px] md:h-[550px] rounded-xl overflow-hidden text-left relative flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden relative">
          <div className="max-w-[800px] mx-auto">
            {/* Header */}
            <header className="mb-6 sm:mb-10">
              <div className="text-xl sm:text-2xl md:text-[32px] font-bold mb-1 sm:mb-2 text-text-main">Dein Lernweg</div>
              <p className="text-text-muted text-xs sm:text-sm">
                Du bist gerade bei <strong>Tag 15</strong> von 30. Bleib am Ball!
              </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              {/* Completion */}
              <div className="bg-surface rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-card border border-[rgba(0,0,0,0.02)]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-[#E8F5E9] flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                  <Ui.Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B8C6E]" stroke={2.5} />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-text-main mb-0.5 sm:mb-1">48%</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-text-muted">Fortschritt</div>
              </div>

              {/* Lessons Done */}
              <div className="bg-surface rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-card border border-[rgba(0,0,0,0.02)]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-[#E6F0FF] flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                  <Icon.Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A90E2]" stroke={2.5} />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-text-main mb-0.5 sm:mb-1">14/30</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-text-muted">Abgeschlossen</div>
              </div>

              {/* Current Day */}
              <div className="bg-surface rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-card border border-[rgba(0,0,0,0.02)]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-[#FFF4E6] flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                  <Icon.Bolt className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9F43]" stroke={2.5} />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-text-main mb-0.5 sm:mb-1">Tag 15</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-text-muted">Aktueller Tag</div>
              </div>
            </div>

            {/* Week 3 Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                <div className="text-2xl sm:text-3xl md:text-[48px] font-serif font-black leading-none mr-2 sm:mr-3 md:mr-4 text-primary/40">
                  3
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-text-main">Woche 3</h3>
                  <span className="text-[10px] sm:text-xs md:text-[15px] text-primary font-medium">
                    Tage 13–18 • In Bearbeitung
                  </span>
                </div>
              </div>

              {/* Lesson Grid - Horizontal scroll on mobile, grid on desktop */}
              <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-3 md:gap-5 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
                {/* Day 13 - Completed */}
                <div className="bg-[#FCFCFC] rounded-xl p-4 sm:p-5 shadow-card border border-transparent min-w-[180px] sm:min-w-0 flex-shrink-0 snap-start">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tag 13</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E6F0E7] text-success flex items-center justify-center flex-shrink-0">
                      <Ui.Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" stroke={3} />
                    </div>
                  </div>
                  <h4 className="font-semibold text-[15px] sm:text-[17px] text-text-muted line-through decoration-success mb-2 leading-snug">{getLessonTitle(0)}</h4>
                </div>

                {/* Day 14 - Completed */}
                <div className="bg-[#FCFCFC] rounded-xl p-4 sm:p-5 shadow-card border border-transparent min-w-[180px] sm:min-w-0 flex-shrink-0 snap-start">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tag 14</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E6F0E7] text-success flex items-center justify-center flex-shrink-0">
                      <Ui.Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" stroke={3} />
                    </div>
                  </div>
                  <h4 className="font-semibold text-[15px] sm:text-[17px] text-text-muted line-through decoration-success mb-2 leading-snug">{getLessonTitle(1)}</h4>
                </div>

                {/* Day 15 - Active */}
                <div className="bg-[#FFFCFA] border-primary rounded-xl p-4 sm:p-5 shadow-card border transition-all duration-300 cursor-pointer hover:-translate-y-1 min-w-[180px] sm:min-w-0 flex-shrink-0 snap-start">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tag 15</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      <Ui.Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-[15px] sm:text-[17px] text-primary mb-2 leading-snug">{getLessonTitle(2)}</h4>
                  <div className="mt-auto font-semibold text-xs text-primary">Weiter lernen</div>
                </div>

                {/* Day 16 */}
                <div className="opacity-60 bg-[#F5F5F5] rounded-xl p-4 sm:p-5 shadow-none border border-transparent min-w-[180px] sm:min-w-0 flex-shrink-0 snap-start">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tag 16</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F0EBE5] text-text-muted flex items-center justify-center flex-shrink-0">
                      <Ui.Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-[15px] sm:text-[17px] text-text-main mb-2 leading-snug">{getLessonTitle(3)}</h4>
                  <div className="text-xs text-text-muted">Gesperrt</div>
                </div>

                {/* Day 17 */}
                <div className="opacity-60 bg-[#F5F5F5] rounded-xl p-4 sm:p-5 shadow-none border border-transparent min-w-[180px] sm:min-w-0 flex-shrink-0 snap-start">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tag 17</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F0EBE5] text-text-muted flex items-center justify-center flex-shrink-0">
                      <Ui.Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-[15px] sm:text-[17px] text-text-main mb-2 leading-snug">{getLessonTitle(4)}</h4>
                  <div className="text-xs text-text-muted">Gesperrt</div>
                </div>

                {/* Day 18 */}
                <div className="opacity-60 bg-[#F5F5F5] rounded-xl p-4 sm:p-5 shadow-none border border-transparent min-w-[180px] sm:min-w-0 flex-shrink-0 snap-start">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tag 18</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F0EBE5] text-text-muted flex items-center justify-center flex-shrink-0">
                      <Ui.Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-[15px] sm:text-[17px] text-text-main mb-2 leading-snug">{getLessonTitle(5)}</h4>
                  <div className="text-xs text-text-muted">Gesperrt</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Gradient Blur */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
