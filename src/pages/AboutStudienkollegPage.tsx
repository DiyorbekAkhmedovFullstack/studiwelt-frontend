import { Link } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Icons for course types
const HumanitiesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const MedicalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>
);

const TechnicalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const BusinessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const LanguagesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const BridgeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

const GermanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const PathIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const courseTypes = [
  {
    letter: 'G',
    name: 'G-Kurs',
    fullName: 'Humanities & Arts',
    description: 'Prepares for studies in humanities, social sciences, German studies, and arts.',
    examples: 'History, Philosophy, Law, Journalism, Art History',
    icon: HumanitiesIcon,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    letter: 'M',
    name: 'M-Kurs',
    fullName: 'Medicine & Biology',
    description: 'For medical, biological, and pharmaceutical degree programs.',
    examples: 'Medicine, Dentistry, Pharmacy, Biology, Veterinary',
    icon: MedicalIcon,
    color: 'bg-red-100 text-red-600',
  },
  {
    letter: 'T',
    name: 'T-Kurs',
    fullName: 'Technical & Engineering',
    description: 'Prepares for technical subjects including engineering and natural sciences.',
    examples: 'Engineering, Physics, Chemistry, Mathematics, IT',
    icon: TechnicalIcon,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    letter: 'W',
    name: 'W-Kurs',
    fullName: 'Business & Economics',
    description: 'For business, economics, and social science degree programs.',
    examples: 'Business Administration, Economics, Sociology',
    icon: BusinessIcon,
    color: 'bg-green-100 text-green-600',
  },
  {
    letter: 'S',
    name: 'S-Kurs',
    fullName: 'Languages',
    description: 'For language studies and programs requiring strong linguistic skills.',
    examples: 'Linguistics, Translation, Foreign Languages',
    icon: LanguagesIcon,
    color: 'bg-amber-100 text-amber-600',
  },
];

export function AboutStudienkollegPage() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [whyRef, whyVisible] = useScrollAnimation();
  const [coursesRef, coursesVisible] = useScrollAnimation();
  const [requirementsRef, requirementsVisible] = useScrollAnimation();
  const [fspRef, fspVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20 lg:pb-24 text-center">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={heroRef}
            className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-6 tracking-wider">
              YOUR PATHWAY TO GERMAN UNIVERSITIES
            </span>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold mb-6 max-w-[800px] mx-auto">
              What is a{' '}
              <span className="text-primary italic">Studienkolleg?</span>
            </h1>

            <p className="text-base sm:text-lg text-text-muted max-w-[650px] mx-auto mb-8 leading-relaxed">
              A one-year preparatory program that bridges the gap between your home country's education
              and German university requirements. Successfully complete it, and you'll have access to
              universities across Germany.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>2 Semesters</span>
              </div>
              <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>German B1-B2</span>
              </div>
              <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>Public: Tuition-Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Studienkolleg Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={whyRef}
            className={`text-center max-w-[700px] mx-auto mb-12 md:mb-16 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Why Studienkolleg?</h2>
            <p className="text-text-muted text-base sm:text-lg">
              Not all foreign qualifications are directly recognized in Germany. Studienkolleg prepares you for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                <BridgeIcon />
              </div>
              <h3 className="text-lg font-bold mb-2">Bridge Your Education</h3>
              <p className="text-text-muted text-[15px] leading-relaxed">
                Fill the gaps between your home country's education system and German academic standards with focused preparation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                <GermanIcon />
              </div>
              <h3 className="text-lg font-bold mb-2">Master Academic German</h3>
              <p className="text-text-muted text-[15px] leading-relaxed">
                Intensive language training ensures you're ready for lectures, exams, and academic writing in German.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                <PathIcon />
              </div>
              <h3 className="text-lg font-bold mb-2">Guaranteed University Path</h3>
              <p className="text-text-muted text-[15px] leading-relaxed">
                Pass the FSP exam and gain access to universities throughout Germany. Your qualification is recognized nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Types Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={coursesRef}
            className={`text-center max-w-[700px] mx-auto mb-12 md:mb-16 transition-all duration-700 ${coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Choose Your Track</h2>
            <p className="text-text-muted text-base sm:text-lg">
              Studienkolleg offers 5 specialized courses. Choose based on your intended field of study.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseTypes.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.letter}
                  className="bg-surface p-6 rounded-[20px] shadow-card border border-transparent hover:border-primary-light transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${course.color}`}>
                      <Icon />
                    </div>
                    <div>
                      <span className="font-bold text-lg">{course.name}</span>
                      <span className="block text-sm text-text-muted">{course.fullName}</span>
                    </div>
                  </div>
                  <p className="text-text-muted text-[14px] mb-3">{course.description}</p>
                  <p className="text-xs text-primary font-medium">{course.examples}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={requirementsRef}
            className={`transition-all duration-700 ${requirementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Requirements</h2>
              <p className="text-text-muted text-base sm:text-lg">
                What you need to apply for Studienkolleg admission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
              {/* Language Requirement */}
              <div className="bg-page p-6 sm:p-8 rounded-[20px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">German Language</h3>
                </div>
                <ul className="space-y-2 text-[15px] text-text-muted">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Minimum <strong>B1 level</strong> (some require B2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Certificate from Goethe-Institut or equivalent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>TestDaF or DSH accepted at higher levels</span>
                  </li>
                </ul>
              </div>

              {/* Academic Requirement */}
              <div className="bg-page p-6 sm:p-8 rounded-[20px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Academic Background</h3>
                </div>
                <ul className="space-y-2 text-[15px] text-text-muted">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Completed <strong>1 year</strong> at a university</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Minimum GPA of <strong>3.0</strong> (or equivalent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>High school diploma (translated & certified)</span>
                  </li>
                </ul>
              </div>

              {/* Application Timeline */}
              <div className="bg-page p-6 sm:p-8 rounded-[20px] md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Application Timeline</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span><strong>Winter Semester:</strong> Apply by July 15</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span><strong>Summer Semester:</strong> Apply by January 15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FSP Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={fspRef}
            className={`transition-all duration-700 ${fspVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-[24px] p-8 md:p-12 lg:p-16">
              <div className="max-w-[700px] mx-auto text-center">
                <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold mb-6 tracking-wider">
                  THE FINAL STEP
                </span>

                <h2 className="text-[28px] md:text-[40px] font-bold mb-4">
                  Feststellungsprüfung (FSP)
                </h2>

                <p className="text-text-muted text-base sm:text-lg mb-8 leading-relaxed">
                  At the end of your Studienkolleg journey, you'll take the Feststellungsprüfung —
                  the assessment test that certifies your readiness for German university studies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-surface p-5 rounded-xl">
                    <h4 className="font-bold mb-2">What's Tested</h4>
                    <p className="text-sm text-text-muted">German language proficiency and subject-specific knowledge from your track.</p>
                  </div>
                  <div className="bg-surface p-5 rounded-xl">
                    <h4 className="font-bold mb-2">Duration</h4>
                    <p className="text-sm text-text-muted">Written exams over several days, plus oral examinations in some subjects.</p>
                  </div>
                  <div className="bg-surface p-5 rounded-xl">
                    <h4 className="font-bold mb-2">After Passing</h4>
                    <p className="text-sm text-text-muted">Gain access to universities across Germany in your chosen field of study.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={ctaRef}
            className={`text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-text-muted text-base sm:text-lg max-w-[600px] mx-auto mb-8">
              Explore Studienkollegs across Germany and find the perfect fit for your academic goals.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#studienkolleg-carousel"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-primary-hover shadow-[0_4px_12px_rgba(166,123,91,0.3)] active:scale-[0.98]"
              >
                Explore Studienkollegs
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-transparent text-text-main font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-page border border-border"
              >
                Start Preparing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
