import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { OptimizedImage } from '../common/OptimizedImage';
import { Icon, Ui } from '../../lib/icons';
import { getAllStudienkollegs } from '../../data/studienkollegData';

// Helper function to get image path with fallback
const getImagePath = (cityName: string): string => {
  return `/studienkollegs/${cityName}.png`;
};

// Derive carousel data from the single source of truth in studienkollegData.ts
const studienkollegs = getAllStudienkollegs().map((stk) => ({
  slug: stk.slug,
  name: stk.name,
  location: stk.location,
  badge: stk.badge,
  courses: stk.courses,
  applicationMethod: stk.application.method,
  imageUrl: getImagePath(stk.slug),
}));

export function StudienkollegCarousel() {
  const { t } = useTranslation('landing');
  const [sectionRef, sectionVisible] = useScrollAnimation();
  const navigate = useNavigate();

  // Handle card click navigation
  const handleCardClick = (slug: string) => {
    navigate(`/studienkolleg/${slug}`);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle image load errors by using placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/studienkollegs/placeholder.svg';
  };

  // Responsive card count: 1 for mobile, 2 for tablet, 3 for desktop
  const getCardsToShow = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  // Update cards to show on resize
  useEffect(() => {
    const handleResize = () => setCardsToShow(getCardsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload images for next/prev cards for instant navigation
  useEffect(() => {
    const preloadImages = () => {
      const nextCards = studienkollegs.slice(
        currentIndex + cardsToShow,
        currentIndex + cardsToShow + 3
      );
      const prevCards = studienkollegs.slice(
        Math.max(0, currentIndex - 3),
        currentIndex
      );

      [...nextCards, ...prevCards].forEach((stk) => {
        const webpSrc = stk.imageUrl.replace(/\.png$/, '.webp');
        const img = new Image();
        img.src = webpSrc;
      });
    };

    preloadImages();
  }, [currentIndex, cardsToShow]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < studienkollegs.length - cardsToShow;

  const handlePrev = () => {
    if (canGoPrev && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (canGoNext && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const visibleCards = studienkollegs.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <section className="py-24 bg-page">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`text-center max-w-[700px] mx-auto mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
        >
          <h2 className="text-[32px] md:text-[40px] font-bold mb-3 sm:mb-4">{t('carousel.title')}</h2>
          <p className="text-text-muted text-sm sm:text-base md:text-lg px-4">
            {t('carousel.description')}
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="relative px-12 md:px-0">
          {/* Navigation Buttons - Visible on all devices */}
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="flex absolute left-0 md:left-2 lg:-translate-x-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-50 shadow-md"
            aria-label="Previous"
          >
            <Ui.ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex absolute right-0 md:right-2 lg:translate-x-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-50 shadow-md"
            aria-label="Next"
          >
            <Ui.ChevronRight size={18} />
          </button>

          {/* Responsive Cards Grid: 1 on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-5">
            {visibleCards.map((stk, index) => (
              <div
                key={stk.slug}
                className={`transition-all duration-500 ${isAnimating
                  ? 'opacity-0 scale-95'
                  : sectionVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 translate-y-5'
                  }`}
                style={{ transitionDelay: isAnimating ? '0ms' : `${index * 50}ms` }}
              >
                <div
                  onClick={() => handleCardClick(stk.slug)}
                  className="bg-surface rounded-[20px] md:rounded-[24px] shadow-[0_12px_40px_-8px_rgba(166,123,91,0.15)] transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(166,123,91,0.25)] hover:-translate-y-3 cursor-pointer h-[420px] md:h-[480px] flex flex-col relative border border-[rgba(0,0,0,0.02)] overflow-hidden w-full"
                >
                  {/* Image */}
                  <div className="h-[160px] md:h-[200px] w-full relative bg-primary-light overflow-hidden">
                    <OptimizedImage
                      src={stk.imageUrl}
                      alt={stk.name}
                      priority={index === 0} // Prioritize first visible card
                      onError={handleImageError}
                      className="w-full h-full object-cover object-center transition-transform duration-[600ms] hover:scale-105 block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(62,54,48,0.2)] pointer-events-none" />

                    {/* Badge */}
                    <span className="absolute top-3 right-3 md:top-5 md:right-5 bg-[rgba(255,255,255,0.9)] backdrop-blur-sm px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-[30px] text-[0.65rem] md:text-[0.75rem] font-bold uppercase tracking-wide text-text-main shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-10">
                      {stk.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-[0.75rem] md:text-[0.85rem] text-text-muted font-semibold uppercase tracking-wide mb-2">
                      <Icon.Location size={12} stroke={2.5} />
                      {stk.location}
                    </div>

                    <h3 className="font-serif text-[1.15rem] md:text-[1.4rem] leading-[1.3] text-text-main mb-3 md:mb-4">
                      {stk.name}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-auto">
                      {stk.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="text-[0.7rem] md:text-[0.75rem] px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg bg-primary-subtle text-text-main font-semibold border border-[rgba(0,0,0,0.03)]"
                        >
                          {course.code}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 md:mt-6 pt-4 md:pt-5 border-t border-dashed border-[rgba(0,0,0,0.1)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 md:gap-2 text-[0.75rem] md:text-[0.85rem] font-semibold text-text-muted">
                        <div
                          className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${stk.applicationMethod === 'assist'
                            ? 'bg-[#D9A441] shadow-[0_0_0_3px_rgba(217,164,65,0.15)]'
                            : 'bg-[#6B8C6E] shadow-[0_0_0_3px_rgba(107,140,110,0.15)]'
                            }`}
                        />
                        {stk.applicationMethod === 'assist' ? 'Uni-Assist' : 'Direkt'}
                      </div>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-page text-text-main flex items-center justify-center transition-all duration-200 text-sm md:text-base">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
