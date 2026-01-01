import { Link } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Icons
const UniAssistIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const DirectIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ExamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"></path>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const VisaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <line x1="7" y1="15" x2="7.01" y2="15"></line>
    <line x1="11" y1="15" x2="17" y2="15"></line>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const requiredDocuments = [
  'High school diploma/certificate (translated & certified)',
  'Academic transcripts with grades',
  'German language certificate (B1/B2)',
  'Passport copy (valid for at least 6 months)',
  'Passport-size photos',
  'CV/Resume',
  'Motivation letter (some universities)',
  'Proof of university admission qualification',
];

const applicationSteps = [
  {
    number: '01',
    title: 'Research & Choose',
    description: 'Research Studienkollegs and choose your target universities. Decide on your course track (G, M, T, W, or S).',
    tip: 'Apply to multiple Studienkollegs to increase your chances.',
  },
  {
    number: '02',
    title: 'Prepare Documents',
    description: 'Gather all required documents. Get translations certified and authenticate your certificates.',
    tip: 'Start 3-6 months before the deadline.',
  },
  {
    number: '03',
    title: 'Submit Application',
    description: 'Apply through uni-assist or directly to the university, depending on their requirements.',
    tip: 'Double-check deadlines for each institution.',
  },
  {
    number: '04',
    title: 'Entrance Exam',
    description: 'Take the Aufnahmeprüfung (entrance exam) testing German and sometimes math skills.',
    tip: 'Practice with past exam papers.',
  },
  {
    number: '05',
    title: 'Visa & Arrival',
    description: 'After acceptance, open a blocked account, get health insurance, and apply for your student visa.',
    tip: 'Book embassy appointment early.',
  },
];

export function ApplicationPage() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [routesRef, routesVisible] = useScrollAnimation();
  const [stepsRef, stepsVisible] = useScrollAnimation();
  const [docsRef, docsVisible] = useScrollAnimation();
  const [deadlinesRef, deadlinesVisible] = useScrollAnimation();
  const [examRef, examVisible] = useScrollAnimation();
  const [visaRef, visaVisible] = useScrollAnimation();
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
              STEP-BY-STEP GUIDE
            </span>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold mb-6 max-w-[800px] mx-auto">
              How to Apply to{' '}
              <span className="text-primary italic">Studienkolleg</span>
            </h1>

            <p className="text-base sm:text-lg text-text-muted max-w-[650px] mx-auto mb-8 leading-relaxed">
              A complete guide to navigating the application process, from gathering documents
              to receiving your acceptance letter. Start your journey to studying in Germany.
            </p>
          </div>
        </div>
      </section>

      {/* Two Application Routes */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={routesRef}
            className={`transition-all duration-700 ${routesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Two Ways to Apply</h2>
              <p className="text-text-muted text-base sm:text-lg">
                You cannot apply directly to a Studienkolleg. Applications must go through the university.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* uni-assist Route */}
              <div className="bg-page p-6 sm:p-8 rounded-[20px] border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                  <UniAssistIcon />
                </div>
                <h3 className="text-xl font-bold mb-3">Via uni-assist</h3>
                <p className="text-text-muted text-[15px] mb-4 leading-relaxed">
                  Many German universities use uni-assist to process international applications.
                  You submit documents once, and they verify and forward them.
                </p>
                <ul className="space-y-2 text-[14px] text-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Centralized platform for multiple applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Document verification included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Processing fee: ~€75 per application</span>
                  </li>
                </ul>
              </div>

              {/* Direct Route */}
              <div className="bg-page p-6 sm:p-8 rounded-[20px] border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-5">
                  <DirectIcon />
                </div>
                <h3 className="text-xl font-bold mb-3">Direct to University</h3>
                <p className="text-text-muted text-[15px] mb-4 leading-relaxed">
                  Some universities accept direct applications. Check the specific
                  university's international office for their process.
                </p>
                <ul className="space-y-2 text-[14px] text-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Apply directly through university portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Requirements vary by institution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>Often faster processing time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={stepsRef}
            className={`transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Application Steps</h2>
              <p className="text-text-muted text-base sm:text-lg">
                Follow these steps to successfully apply to a Studienkolleg.
              </p>
            </div>

            <div className="space-y-4">
              {applicationSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white font-bold text-lg rounded-xl">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-text-muted text-[15px] mb-3">{step.description}</p>
                    <p className="text-sm text-primary font-medium flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      Tip: {step.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={docsRef}
            className={`transition-all duration-700 ${docsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Required Documents</h2>
              <p className="text-text-muted text-base sm:text-lg">
                Prepare these documents before starting your application.
              </p>
            </div>

            <div className="bg-page p-6 sm:p-8 md:p-10 rounded-[24px] max-w-[800px] mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center">
                  <DocumentIcon />
                </div>
                <h3 className="text-xl font-bold">Document Checklist</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3 bg-surface p-4 rounded-xl">
                    <CheckIcon />
                    <span className="text-[15px]">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>
                    <strong>Important:</strong> Each Studienkolleg may have additional requirements.
                    Always check the specific institution's website for their complete checklist.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={deadlinesRef}
            className={`transition-all duration-700 ${deadlinesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Application Deadlines</h2>
              <p className="text-text-muted text-base sm:text-lg">
                Mark these dates in your calendar. Studienkolleg deadlines are often earlier than university deadlines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
              {/* Winter Semester */}
              <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon />
                </div>
                <h3 className="text-xl font-bold mb-2">Winter Semester</h3>
                <p className="text-3xl font-bold text-primary mb-2">July 15</p>
                <p className="text-text-muted text-sm">Classes start in October</p>
              </div>

              {/* Summer Semester */}
              <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon />
                </div>
                <h3 className="text-xl font-bold mb-2">Summer Semester</h3>
                <p className="text-3xl font-bold text-primary mb-2">January 15</p>
                <p className="text-text-muted text-sm">Classes start in April</p>
              </div>
            </div>

            <p className="text-center text-text-muted text-sm mt-6 max-w-[600px] mx-auto">
              Some universities have earlier deadlines. Always verify with your target institution.
            </p>
          </div>
        </div>
      </section>

      {/* Entrance Exam */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={examRef}
            className={`transition-all duration-700 ${examVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-[24px] p-8 md:p-12">
              <div className="max-w-[800px] mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center">
                    <ExamIcon />
                  </div>
                  <div>
                    <h2 className="text-[28px] md:text-[36px] font-bold">Entrance Exam</h2>
                    <p className="text-text-muted">Aufnahmeprüfung</p>
                  </div>
                </div>

                <p className="text-text-muted text-base sm:text-lg mb-8 leading-relaxed">
                  Public Studienkollegs require you to pass an entrance exam. This tests your German language
                  skills and, for technical tracks (M, T, W), basic mathematics.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-surface p-5 rounded-xl">
                    <h4 className="font-bold mb-2">German Test</h4>
                    <p className="text-sm text-text-muted">Reading, writing, grammar, and listening comprehension.</p>
                  </div>
                  <div className="bg-surface p-5 rounded-xl">
                    <h4 className="font-bold mb-2">Math Test</h4>
                    <p className="text-sm text-text-muted">For M, T, W courses. Covers algebra, geometry, functions.</p>
                  </div>
                  <div className="bg-surface p-5 rounded-xl">
                    <h4 className="font-bold mb-2">When</h4>
                    <p className="text-sm text-text-muted">September (for winter) and February (for summer semester).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div
            ref={visaRef}
            className={`transition-all duration-700 ${visaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold mb-4">After Acceptance</h2>
              <p className="text-text-muted text-base sm:text-lg">
                Once accepted, complete these steps before traveling to Germany.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
              {/* Blocked Account */}
              <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Blocked Account</h3>
                <p className="text-text-muted text-[15px] mb-3">
                  Open a blocked account (Sperrkonto) with approximately €11,904/year to prove financial stability.
                </p>
                <p className="text-sm text-primary font-medium">Required for visa application</p>
              </div>

              {/* Health Insurance */}
              <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Health Insurance</h3>
                <p className="text-text-muted text-[15px] mb-3">
                  Get German health insurance (public or private). Mandatory for enrollment and visa.
                </p>
                <p className="text-sm text-primary font-medium">~€110/month for public insurance</p>
              </div>

              {/* Student Visa */}
              <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <VisaIcon />
                  </div>
                  <h3 className="text-lg font-bold">Student Visa</h3>
                </div>
                <p className="text-text-muted text-[15px] mb-4">
                  Apply for a student visa at the German Embassy in your country. Book your appointment early
                  as wait times can be several weeks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Admission letter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Blocked account proof</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Health insurance</span>
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
            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Ready to Start Your Application?</h2>
            <p className="text-text-muted text-base sm:text-lg max-w-[600px] mx-auto mb-8">
              Begin your preparation today. Our structured course helps you master the entrance exam.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-primary-hover shadow-[0_4px_12px_rgba(166,123,91,0.3)] active:scale-[0.98]"
              >
                Start Preparing
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>

              <Link
                to="/about-studienkolleg"
                className="inline-flex items-center gap-2 bg-transparent text-text-main font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-page border border-border"
              >
                Learn About Studienkolleg
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
