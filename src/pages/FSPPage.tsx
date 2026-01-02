import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Icons
const CertificateIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2"></rect>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M12 16v4"></path>
        <path d="M8 20h8"></path>
    </svg>
);

const DocumentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
    </svg>
);

const GlobeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const PenIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
    </svg>
);



const LightbulbIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
        <path d="M9 18h6"></path>
        <path d="M10 22h4"></path>
    </svg>
);

const TrophyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5 text-danger flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const AlertIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

type CourseType = 'T' | 'M' | 'W' | 'G' | 'S';

const courseExamData: Record<CourseType, { name: string; fullName: string; color: string; written: string[] }> = {
    T: {
        name: 'T-Kurs',
        fullName: 'Technical & Engineering',
        color: 'bg-blue-100 text-blue-600 border-blue-200',
        written: ['German (DaF)', 'Mathematics', 'Physics or Chemistry/IT'],
    },
    M: {
        name: 'M-Kurs',
        fullName: 'Medicine & Biology',
        color: 'bg-red-100 text-red-600 border-red-200',
        written: ['German (DaF)', 'Biology or Chemistry', 'Mathematics or Physics'],
    },
    W: {
        name: 'W-Kurs',
        fullName: 'Business & Economics',
        color: 'bg-green-100 text-green-600 border-green-200',
        written: ['German (DaF)', 'Mathematics', 'Economics/Business Administration'],
    },
    G: {
        name: 'G-Kurs',
        fullName: 'Humanities & Arts',
        color: 'bg-purple-100 text-purple-600 border-purple-200',
        written: ['German (DaF)', 'History', 'Social Sciences/Geography'],
    },
    S: {
        name: 'S-Kurs',
        fullName: 'Languages',
        color: 'bg-amber-100 text-amber-600 border-amber-200',
        written: ['German (DaF)', 'German Literature', 'Second Language'],
    },
};

const gradingScale = [
    { range: '1.0 - 1.5', meaning: 'Very Good (Sehr gut)', pass: true, color: 'bg-green-100 text-green-700' },
    { range: '1.6 - 2.5', meaning: 'Good (Gut)', pass: true, color: 'bg-green-50 text-green-600' },
    { range: '2.6 - 3.5', meaning: 'Satisfactory (Befriedigend)', pass: true, color: 'bg-amber-50 text-amber-600' },
    { range: '3.6 - 4.0', meaning: 'Sufficient (Ausreichend)', pass: true, color: 'bg-amber-100 text-amber-700' },
    { range: '4.1 - 5.0', meaning: 'Fail (Nicht bestanden)', pass: false, color: 'bg-red-50 text-red-600' },
];

const preparationTips = [
    { title: 'Attend All Classes', description: 'Consistent attendance is crucial for understanding material' },
    { title: 'Structured Study Plan', description: 'Create a schedule covering all subjects systematically' },
    { title: 'Form Study Groups', description: 'Collaborate with classmates to discuss and review' },
    { title: 'Practice Past Exams', description: 'Familiarize yourself with question formats and timing' },
    { title: 'Master Time Management', description: 'Practice completing tasks within time limits' },
    { title: 'Use Professor Materials', description: 'Review all provided practice problems and guides' },
    { title: 'Take Mock Exams', description: 'Simulate real exam conditions before the test' },
    { title: 'Rest and Manage Stress', description: 'Maintain healthy sleep and stress management' },
];

export function FSPPage() {
    const [selectedCourse, setSelectedCourse] = useState<CourseType>('T');
    const [heroRef, heroVisible] = useScrollAnimation();
    const [overviewRef, overviewVisible] = useScrollAnimation();
    const [structureRef, structureVisible] = useScrollAnimation();
    const [courseRef, courseVisible] = useScrollAnimation();
    const [gradingRef, gradingVisible] = useScrollAnimation();
    const [tipsRef, tipsVisible] = useScrollAnimation();
    const [afterRef, afterVisible] = useScrollAnimation();
    const [ctaRef, ctaVisible] = useScrollAnimation();

    const currentCourse = courseExamData[selectedCourse];

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
                            YOUR PATH TO UNIVERSITY
                        </span>

                        <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold mb-6 max-w-[800px] mx-auto">
                            The{' '}
                            <span className="text-primary italic">Feststellungsprüfung</span>
                        </h1>

                        <p className="text-base sm:text-lg text-text-muted max-w-[650px] mx-auto mb-8 leading-relaxed">
                            The final assessment exam at the end of Studienkolleg that certifies your readiness
                            for German university studies and grants nationwide recognition.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <span>Written Exams</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Grade 4.0 to Pass</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                <span>Nationally Recognized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is the FSP? */}
            <section className="py-16 md:py-20 lg:py-24 bg-surface">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={overviewRef}
                        className={`transition-all duration-700 ${overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">What is the FSP?</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                The Feststellungsprüfung is your final step to German university admission.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <CertificateIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Purpose</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    Certifies that your qualifications are equivalent to the German Abitur, enabling direct university admission.
                                </p>
                            </div>

                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <DocumentIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Format</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    Three written exams (3-4 hours each). Taken at the end of your second semester.
                                </p>
                            </div>

                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <GlobeIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Recognition</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    Your FSP certificate is recognized at all German universities, opening doors nationwide in your field.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exam Structure */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={structureRef}
                        className={`transition-all duration-700 ${structureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Exam Structure</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                The FSP consists of written examinations in your course subjects.
                            </p>
                        </div>

                        <div className="max-w-[600px] mx-auto">
                            {/* Written Exams */}
                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <PenIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Written Exams</h3>
                                        <span className="text-sm text-text-muted">3-4 hours per subject</span>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 bg-page p-3 rounded-lg">
                                        <CheckIcon />
                                        <div>
                                            <span className="font-semibold text-[14px]">German (DaF)</span>
                                            <p className="text-text-muted text-[13px]">Mandatory for all courses, B2/C1 level</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 bg-page p-3 rounded-lg">
                                        <CheckIcon />
                                        <div>
                                            <span className="font-semibold text-[14px]">Subject Exam 1</span>
                                            <p className="text-text-muted text-[13px]">Core subject based on your course track</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 bg-page p-3 rounded-lg">
                                        <CheckIcon />
                                        <div>
                                            <span className="font-semibold text-[14px]">Subject Exam 2</span>
                                            <p className="text-text-muted text-[13px]">Additional subject for your track</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course-Specific Subjects */}
            <section className="py-16 md:py-20 lg:py-24 bg-surface">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={courseRef}
                        className={`transition-all duration-700 ${courseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Subjects by Course</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                Select your course to see which subjects are examined.
                            </p>
                        </div>

                        {/* Course Selector Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {(Object.keys(courseExamData) as CourseType[]).map((course) => (
                                <button
                                    key={course}
                                    onClick={() => setSelectedCourse(course)}
                                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all ${selectedCourse === course
                                        ? 'bg-primary text-white'
                                        : 'bg-page text-text-muted hover:bg-highlight'
                                        }`}
                                >
                                    {courseExamData[course].name}
                                </button>
                            ))}
                        </div>

                        {/* Course Details Card */}
                        <div className={`bg-page p-6 sm:p-8 md:p-10 rounded-[24px] border-t-4 ${currentCourse.color.split(' ')[0].replace('bg-', 'border-').replace('-100', '-400')}`}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${currentCourse.color}`}>
                                    {currentCourse.name}
                                </div>
                                <span className="text-lg font-semibold">{currentCourse.fullName}</span>
                            </div>

                            <div>
                                <h4 className="font-bold mb-3 text-text-main flex items-center gap-2">
                                    <PenIcon />
                                    Written Exams
                                </h4>
                                <ul className="space-y-2">
                                    {currentCourse.written.map((subject, index) => (
                                        <li key={index} className="flex items-center gap-2 text-[15px]">
                                            <CheckIcon />
                                            <span>{subject}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grading System */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={gradingRef}
                        className={`transition-all duration-700 ${gradingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Grading System</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                Understanding how your FSP is graded.
                            </p>
                        </div>

                        <div className="max-w-[700px] mx-auto">
                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                                <div className="space-y-3 mb-6">
                                    {gradingScale.map((grade, index) => (
                                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${grade.color}`}>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-lg w-24">{grade.range}</span>
                                                <span className="text-[14px]">{grade.meaning}</span>
                                            </div>
                                            {grade.pass ? <CheckIcon /> : <XIcon />}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                                        <p className="text-sm text-amber-800 flex items-start gap-2">
                                            <AlertIcon />
                                            <span><strong>German grade:</strong> Must be at least 4.0 — no compensation available.</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <p className="text-sm text-blue-800 flex items-start gap-2">
                                            <AlertIcon />
                                            <span><strong>Compensation:</strong> One subject below 4.0 may be compensated by better grades in others.</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                        <p className="text-sm text-green-800 flex items-start gap-2">
                                            <AlertIcon />
                                            <span><strong>Better grades = better chances:</strong> Your FSP score affects university admission competitiveness.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preparation Tips */}
            <section className="py-16 md:py-20 lg:py-24 bg-surface">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={tipsRef}
                        className={`transition-all duration-700 ${tipsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Preparation Tips</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                Maximize your chances of passing with these strategies.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {preparationTips.map((tip, index) => (
                                <div
                                    key={index}
                                    className="bg-page p-5 rounded-[16px] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-10 h-10 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-3">
                                        <LightbulbIcon />
                                    </div>
                                    <h4 className="font-bold text-[15px] mb-1">{tip.title}</h4>
                                    <p className="text-text-muted text-[13px]">{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What Happens After? */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={afterRef}
                        className={`transition-all duration-700 ${afterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-[24px] p-8 md:p-12 lg:p-16">
                            <div className="max-w-[700px] mx-auto text-center">
                                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <TrophyIcon />
                                </div>

                                <h2 className="text-[28px] md:text-[40px] font-bold mb-4">After Passing the FSP</h2>

                                <p className="text-text-muted text-base sm:text-lg mb-8 leading-relaxed">
                                    Congratulations! Your FSP certificate opens the doors to German universities.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">University Access</h4>
                                        <p className="text-sm text-text-muted">Apply to any German university in your field of study.</p>
                                    </div>
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">Nationwide Recognition</h4>
                                        <p className="text-sm text-text-muted">Your certificate is valid at all universities across Germany.</p>
                                    </div>
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">Competitive Edge</h4>
                                        <p className="text-sm text-text-muted">Higher grades improve admission chances for popular programs.</p>
                                    </div>
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">Retake Options</h4>
                                        <p className="text-sm text-text-muted">If you fail, you can typically retake the FSP 1-2 times.</p>
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
                        <h2 className="text-[28px] md:text-[40px] font-bold mb-4">Ready to Prepare?</h2>
                        <p className="text-text-muted text-base sm:text-lg max-w-[600px] mx-auto mb-8">
                            Start your preparation journey today with our structured German language course.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-primary-hover shadow-[0_4px_12px_rgba(166,123,91,0.3)] active:scale-[0.98]"
                            >
                                Start Your Preparation
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
