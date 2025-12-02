import { Link } from 'react-router-dom';
import { Button } from '../components/landing/Button';
import { FeatureCard } from '../components/landing/FeatureCard';
import { PlatformPreview } from '../components/landing/PlatformPreview';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { GermanyMapSection } from '../components/landing/GermanyMapSection';
import { StudienkollegCarousel } from '../components/landing/StudienkollegCarousel';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAuth } from '../contexts/AuthContext';

export function LandingPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [heroRef, heroVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [curriculumRef, curriculumVisible] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20 lg:pb-24 text-center relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={heroRef}
            className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
          >
            <span className="inline-block px-2 sm:px-4 py-0.5 sm:py-1 bg-primary-light text-primary rounded-[20px] text-[9px] sm:text-xs font-semibold mb-5 sm:mb-6 tracking-wider">
              The only Platform you need to chase your dreams
            </span>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[60px] leading-tight sm:leading-[1.2] lg:leading-[1.1] font-bold mb-6 sm:mb-6 max-w-[800px] mx-auto px-2">
              Get in Studienkolleg{' '}
              <br className="hidden sm:block" />
              this year,{' '}
              <span className="text-primary italic">Calmly.</span>
            </h1>

            <p className="text-[11px] sm:text-sm md:text-base text-text-muted max-w-[600px] mx-auto mb-8 sm:mb-10 px-4">
              Stop cramming. Start absorbing. A guided, step-by-step roadmap to Studienkolleg entrance exam without the burnout.
            </p>

            <div className="flex justify-center items-center px-4">
              <Link to={isAuthenticated ? "/course" : "/register"}>
                <Button variant="primary">Start Your 30-Day Plan</Button>
              </Link>
            </div>
          </div>

          {/* Platform Preview */}
          <PlatformPreview />
        </div>
      </section>

      {/* Features Section */}
      <section id="method" className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={featuresRef}
            className={`text-center max-w-[700px] mx-auto mb-12 md:mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
          >
            <h2 className="text-[32px] md:text-[40px] font-bold mb-3 sm:mb-4 px-4">The Anti-Burnout Method</h2>
            <p className="text-text-muted text-base sm:text-lg px-4">
              Most courses dump content on you. We structure it. Our "Daily Progress" method ensures you retain what you learn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              }
              title="Structured Pacing"
              description="Content is unlocked daily. Progress through lessons systematically, forcing your brain to enter 'diffuse mode' and actually process information."
              delay={0}
            />

            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              }
              title="Curated Resources"
              description="No more hunting for materials. Every lesson comes with targeted exercises, flashcards, and reading comprehension tailored for quick mastery."
              delay={100}
            />

            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              }
              title="Progress Tracking"
              description="Built-in progress bars and completion tracking help you focus on what matters. See your improvement in real-time across all sections."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Studienkolleg Carousel */}
      <StudienkollegCarousel />

      {/* Curriculum Preview */}
      <section id="curriculum" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={curriculumRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start transition-all duration-700 ${curriculumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold mb-4 sm:mb-6">
                What you'll achieve
              </h2>
              <p className="text-text-muted text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                The journey is designed to take you from beginner to Studienkolleg-ready in exactly five weeks.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex gap-3 items-center text-text-main text-sm sm:text-base">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium">Foundation & Core Grammar</span>
                </li>
                <li className="flex gap-3 items-center text-text-main text-sm sm:text-base">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium">Advanced Reading & C-Tests</span>
                </li>
                <li className="flex gap-3 items-center text-text-main text-sm sm:text-base">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium">Exam-Ready Confidence</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Lesson Cards */}
            <div className="space-y-3">
              {/* Lesson 01 */}
              <div className="flex items-center bg-page rounded-xl p-3 sm:p-4 gap-3 shadow-sm">
                <div className="flex-shrink-0 min-w-[60px] sm:min-w-[70px]">
                  <div className="font-serif font-bold text-primary text-xs sm:text-sm">
                    Lesson 01
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text-main text-xs sm:text-sm">
                    Basic Grammar Foundations
                  </div>
                </div>
              </div>

              {/* Lesson 05 */}
              <div className="flex items-center bg-page rounded-xl p-3 sm:p-4 gap-3 shadow-sm">
                <div className="flex-shrink-0 min-w-[60px] sm:min-w-[70px]">
                  <div className="font-serif font-bold text-primary text-xs sm:text-sm">
                    Lesson 05
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text-main text-xs sm:text-sm">
                    Reading Comprehension Basics
                  </div>
                </div>
              </div>

              {/* Lesson 12 - Highlighted */}
              <div className="flex items-center bg-white rounded-xl p-3 sm:p-4 gap-3 border-2 border-primary shadow-md">
                <div className="flex-shrink-0 min-w-[60px] sm:min-w-[70px]">
                  <div className="font-serif font-bold text-primary text-xs sm:text-sm">
                    Lesson 12
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text-main text-xs sm:text-sm">
                    C-Test Strategies
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block px-2 py-0.5 bg-primary-light text-primary text-[9px] sm:text-[10px] font-bold rounded-full whitespace-nowrap">
                    PREVIEW
                  </span>
                </div>
              </div>

              {/* Lesson 30 */}
              <div className="flex items-center bg-page rounded-xl p-3 sm:p-4 gap-3 shadow-sm">
                <div className="flex-shrink-0 min-w-[60px] sm:min-w-[70px]">
                  <div className="font-serif font-bold text-primary text-xs sm:text-sm">
                    Lesson 30
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text-main text-xs sm:text-sm">
                    Final Assessment & Review
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Germany Map Section */}
      <GermanyMapSection />

    </div>
  );
}
