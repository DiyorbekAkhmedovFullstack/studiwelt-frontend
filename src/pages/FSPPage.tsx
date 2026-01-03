import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SEO, seoConfig } from '../components/common/SEO';

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

const courseColors: Record<CourseType, string> = {
    T: 'bg-blue-100 text-blue-600 border-blue-200',
    M: 'bg-red-100 text-red-600 border-red-200',
    W: 'bg-green-100 text-green-600 border-green-200',
    G: 'bg-purple-100 text-purple-600 border-purple-200',
    S: 'bg-amber-100 text-amber-600 border-amber-200',
};

const gradingColors = [
    { pass: true, color: 'bg-green-100 text-green-700' },
    { pass: true, color: 'bg-green-50 text-green-600' },
    { pass: true, color: 'bg-amber-50 text-amber-600' },
    { pass: true, color: 'bg-amber-100 text-amber-700' },
    { pass: false, color: 'bg-red-50 text-red-600' },
];

export function FSPPage() {
    const { t } = useTranslation('fsp');
    const [selectedCourse, setSelectedCourse] = useState<CourseType>('T');
    const [heroRef, heroVisible] = useScrollAnimation();
    const [overviewRef, overviewVisible] = useScrollAnimation();
    const [structureRef, structureVisible] = useScrollAnimation();
    const [courseRef, courseVisible] = useScrollAnimation();
    const [gradingRef, gradingVisible] = useScrollAnimation();
    const [tipsRef, tipsVisible] = useScrollAnimation();
    const [afterRef, afterVisible] = useScrollAnimation();
    const [ctaRef, ctaVisible] = useScrollAnimation();

    const currentCourse = t(`courseDetails.courses.${selectedCourse}`, { returnObjects: true }) as {
        name: string;
        fullName: string;
        written: string[];
    };
    const gradingScale = t('grading.scale', { returnObjects: true }) as { range: string; meaning: string }[];
    const preparationTips = t('tips.items', { returnObjects: true }) as { title: string; description: string }[];
    const structureItems = t('structure.writtenExams.items', { returnObjects: true }) as { title: string; description: string }[];

    return (
        <div className="min-h-screen bg-page overflow-x-hidden">
            <SEO {...seoConfig.fsp} />
            <LandingNavbar />

            {/* Hero Section */}
            <section className="pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20 lg:pb-24 text-center">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={heroRef}
                        className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-6 tracking-wider">
                            {t('hero.badge')}
                        </span>

                        <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold mb-6 max-w-[800px] mx-auto">
                            {t('hero.title')}{' '}
                            <span className="text-primary italic">{t('hero.titleHighlight')}</span>
                        </h1>

                        <p className="text-base sm:text-lg text-text-muted max-w-[650px] mx-auto mb-8 leading-relaxed">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <span>{t('hero.tags.writtenExams')}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>{t('hero.tags.passingGrade')}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                <span>{t('hero.tags.nationallyRecognized')}</span>
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
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('overview.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('overview.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <CertificateIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('overview.purpose.title')}</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    {t('overview.purpose.description')}
                                </p>
                            </div>

                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <DocumentIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('overview.format.title')}</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    {t('overview.format.description')}
                                </p>
                            </div>

                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <GlobeIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('overview.recognition.title')}</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    {t('overview.recognition.description')}
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
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('structure.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('structure.description')}
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
                                        <h3 className="text-xl font-bold">{t('structure.writtenExams.title')}</h3>
                                        <span className="text-sm text-text-muted">{t('structure.writtenExams.duration')}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {structureItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 bg-page p-3 rounded-lg">
                                            <CheckIcon />
                                            <div>
                                                <span className="font-semibold text-[14px]">{item.title}</span>
                                                <p className="text-text-muted text-[13px]">{item.description}</p>
                                            </div>
                                        </li>
                                    ))}
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
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('courseDetails.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('courseDetails.description')}
                            </p>
                        </div>

                        {/* Course Selector Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {(Object.keys(courseColors) as CourseType[]).map((course) => (
                                <button
                                    key={course}
                                    onClick={() => setSelectedCourse(course)}
                                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all ${selectedCourse === course
                                        ? 'bg-primary text-white'
                                        : 'bg-page text-text-muted hover:bg-highlight'
                                        }`}
                                >
                                    {t(`courseDetails.courses.${course}.name`)}
                                </button>
                            ))}
                        </div>

                        {/* Course Details Card */}
                        <div className={`bg-page p-6 sm:p-8 md:p-10 rounded-[24px] border-t-4 ${courseColors[selectedCourse].split(' ')[0].replace('bg-', 'border-').replace('-100', '-400')}`}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${courseColors[selectedCourse]}`}>
                                    {currentCourse.name}
                                </div>
                                <span className="text-lg font-semibold">{currentCourse.fullName}</span>
                            </div>

                            <div>
                                <h4 className="font-bold mb-3 text-text-main flex items-center gap-2">
                                    <PenIcon />
                                    {t('courseDetails.writtenExams')}
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
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('grading.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('grading.description')}
                            </p>
                        </div>

                        <div className="max-w-[700px] mx-auto">
                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                                <div className="space-y-3 mb-6">
                                    {gradingScale.map((grade, index) => (
                                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${gradingColors[index].color}`}>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-lg w-24">{grade.range}</span>
                                                <span className="text-[14px]">{grade.meaning}</span>
                                            </div>
                                            {gradingColors[index].pass ? <CheckIcon /> : <XIcon />}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                                        <p className="text-sm text-amber-800 flex items-start gap-2">
                                            <AlertIcon />
                                            <span><strong>{t('grading.rules.german.label')}</strong> {t('grading.rules.german.text')}</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <p className="text-sm text-blue-800 flex items-start gap-2">
                                            <AlertIcon />
                                            <span><strong>{t('grading.rules.compensation.label')}</strong> {t('grading.rules.compensation.text')}</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                        <p className="text-sm text-green-800 flex items-start gap-2">
                                            <AlertIcon />
                                            <span><strong>{t('grading.rules.betterGrades.label')}</strong> {t('grading.rules.betterGrades.text')}</span>
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
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('tips.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('tips.description')}
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

                                <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('after.title')}</h2>

                                <p className="text-text-muted text-base sm:text-lg mb-8 leading-relaxed">
                                    {t('after.description')}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">{t('after.cards.universityAccess.title')}</h4>
                                        <p className="text-sm text-text-muted">{t('after.cards.universityAccess.description')}</p>
                                    </div>
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">{t('after.cards.nationwideRecognition.title')}</h4>
                                        <p className="text-sm text-text-muted">{t('after.cards.nationwideRecognition.description')}</p>
                                    </div>
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">{t('after.cards.competitiveEdge.title')}</h4>
                                        <p className="text-sm text-text-muted">{t('after.cards.competitiveEdge.description')}</p>
                                    </div>
                                    <div className="bg-surface p-5 rounded-xl">
                                        <h4 className="font-bold mb-2">{t('after.cards.retakeOptions.title')}</h4>
                                        <p className="text-sm text-text-muted">{t('after.cards.retakeOptions.description')}</p>
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
                        <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('cta.title')}</h2>
                        <p className="text-text-muted text-base sm:text-lg max-w-[600px] mx-auto mb-8">
                            {t('cta.description')}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-primary-hover shadow-[0_4px_12px_rgba(166,123,91,0.3)] active:scale-[0.98]"
                            >
                                {t('cta.startButton')}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>

                            <Link
                                to="/about-studienkolleg"
                                className="inline-flex items-center gap-2 bg-transparent text-text-main font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-page border border-border"
                            >
                                {t('cta.learnButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
