import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SEO, seoConfig } from '../components/common/SEO';
import { Icon, Ui } from '../lib/icons';

// Icons — mapped to the central registry (Tabler)
const GermanIcon = () => <Icon.AcademicGerman size={24} />;
const MathIcon = () => <Icon.Math size={24} />;
const ClockIcon = () => <Icon.Clock size={24} />;
const TrophyIcon = () => <Icon.Trophy size={24} />;
const BookOpenIcon = () => <Icon.Curriculum size={24} />;
const LightbulbIcon = () => <Icon.Tip size={24} />;
const CalendarIcon = () => <Icon.Timeline size={24} />;
const CheckIcon = () => <Ui.Check className="w-5 h-5 text-success flex-shrink-0" />;
const AlertIcon = () => <Icon.Info className="w-5 h-5 flex-shrink-0 mt-0.5" />;

type CourseType = 'T' | 'M' | 'W' | 'G' | 'S';

const courseColors: Record<CourseType, string> = {
    T: 'bg-blue-100 text-blue-600 border-blue-200',
    M: 'bg-red-100 text-red-600 border-red-200',
    W: 'bg-green-100 text-green-600 border-green-200',
    G: 'bg-purple-100 text-purple-600 border-purple-200',
    S: 'bg-amber-100 text-amber-600 border-amber-200',
};

export function EntranceExamPage() {
    const { t } = useTranslation('entranceExam');
    const [selectedCourse, setSelectedCourse] = useState<CourseType>('T');
    const [heroRef, heroVisible] = useScrollAnimation();
    const [overviewRef, overviewVisible] = useScrollAnimation();
    const [componentsRef, componentsVisible] = useScrollAnimation();
    const [courseRef, courseVisible] = useScrollAnimation();
    const [timelineRef, timelineVisible] = useScrollAnimation();
    const [tipsRef, tipsVisible] = useScrollAnimation();
    const [infoRef, infoVisible] = useScrollAnimation();
    const [ctaRef, ctaVisible] = useScrollAnimation();

    const currentCourse = t(`courseDetails.courses.${selectedCourse}`, { returnObjects: true }) as {
        name: string;
        fullName: string;
        subjects: string[];
        mathTopics?: string[];
        otherTopics?: string[];
    };

    return (
        <div className="min-h-screen bg-page overflow-x-hidden">
            <SEO {...seoConfig.entranceExam} />
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
                                <Icon.EntranceExam size={16} />
                                <span>{t('hero.tags.twoPartExam')}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <Icon.AcademicGerman size={16} />
                                <span>{t('hero.tags.germanLevel')}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm">
                                <Icon.Population size={16} />
                                <span>{t('hero.tags.competitive')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is the Aufnahmeprüfung */}
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
                                    <BookOpenIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('overview.purpose.title')}</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    {t('overview.purpose.description')}
                                </p>
                            </div>

                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <ClockIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('overview.format.title')}</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    {t('overview.format.description')}
                                </p>
                            </div>

                            <div className="bg-page p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-5">
                                    <TrophyIcon />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('overview.competitiveness.title')}</h3>
                                <p className="text-text-muted text-[15px] leading-relaxed">
                                    {t('overview.competitiveness.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exam Components */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={componentsRef}
                        className={`transition-all duration-700 ${componentsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('components.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('components.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* German Language Test */}
                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <GermanIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{t('components.germanTest.title')}</h3>
                                        <span className="text-sm text-text-muted">{t('components.germanTest.duration')}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {(t('components.germanTest.items', { returnObjects: true }) as Array<{ title: string; description: string }>).map((component, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-page p-3 rounded-lg">
                                            <CheckIcon />
                                            <div>
                                                <span className="font-semibold text-[14px]">{component.title}</span>
                                                <p className="text-text-muted text-[13px]">{component.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Subject-Specific Test */}
                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                                        <MathIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{t('components.subjectTest.title')}</h3>
                                        <span className="text-sm text-text-muted">{t('components.subjectTest.duration')}</span>
                                    </div>
                                </div>

                                <p className="text-text-muted text-[15px] mb-4">
                                    {t('components.subjectTest.description')}
                                </p>

                                <div className="space-y-2 text-[14px]">
                                    <div className="flex items-center gap-2 bg-page p-3 rounded-lg">
                                        <span className="font-bold text-blue-600 w-16">T-Kurs</span>
                                        <span className="text-text-muted">{t('components.subjectTest.courses.T')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-page p-3 rounded-lg">
                                        <span className="font-bold text-red-600 w-16">M-Kurs</span>
                                        <span className="text-text-muted">{t('components.subjectTest.courses.M')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-page p-3 rounded-lg">
                                        <span className="font-bold text-green-600 w-16">W-Kurs</span>
                                        <span className="text-text-muted">{t('components.subjectTest.courses.W')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-page p-3 rounded-lg">
                                        <span className="font-bold text-purple-600 w-16">G-Kurs</span>
                                        <span className="text-text-muted">{t('components.subjectTest.courses.G')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-page p-3 rounded-lg">
                                        <span className="font-bold text-amber-600 w-16">S-Kurs</span>
                                        <span className="text-text-muted">{t('components.subjectTest.courses.S')}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-primary font-medium mt-4 flex items-center gap-1">
                                    <Icon.Info size={14} />
                                    {t('components.subjectTest.calculatorNote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course-Specific Breakdown */}
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
                            {(['T', 'M', 'W', 'G', 'S'] as CourseType[]).map((course) => (
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold mb-3 text-text-main">{t('courseDetails.subjectsTested')}</h4>
                                    <ul className="space-y-2">
                                        {currentCourse.subjects.map((subject, index) => (
                                            <li key={index} className="flex items-center gap-2 text-[15px]">
                                                <CheckIcon />
                                                <span>{subject}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    {currentCourse.mathTopics && (
                                        <div className="mb-4">
                                            <h4 className="font-bold mb-3 text-text-main">{t('courseDetails.mathTopics')}</h4>
                                            <ul className="space-y-1 text-[14px] text-text-muted">
                                                {currentCourse.mathTopics.map((topic, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {currentCourse.otherTopics && (
                                        <div>
                                            <h4 className="font-bold mb-3 text-text-main">
                                                {currentCourse.mathTopics ? t('courseDetails.otherTopics') : t('courseDetails.keyAreas')}
                                            </h4>
                                            <ul className="space-y-1 text-[14px] text-text-muted">
                                                {currentCourse.otherTopics.map((topic, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exam Timeline */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={timelineRef}
                        className={`transition-all duration-700 ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('timeline.title')}</h2>
                            <p className="text-text-muted text-base sm:text-lg">
                                {t('timeline.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card text-center">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CalendarIcon />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t('timeline.winter.title')}</h3>
                                <p className="text-3xl font-bold text-primary mb-2">{t('timeline.winter.date')}</p>
                                <p className="text-text-muted text-sm">{t('timeline.winter.note')}</p>
                            </div>

                            <div className="bg-surface p-6 sm:p-8 rounded-[20px] shadow-card text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CalendarIcon />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t('timeline.summer.title')}</h3>
                                <p className="text-3xl font-bold text-primary mb-2">{t('timeline.summer.date')}</p>
                                <p className="text-text-muted text-sm">{t('timeline.summer.note')}</p>
                            </div>
                        </div>

                        <p className="text-center text-text-muted text-sm mt-6 max-w-[600px] mx-auto">
                            {t('timeline.disclaimer')}
                        </p>
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
                            {(t('tips.items', { returnObjects: true }) as Array<{ title: string; description: string }>).map((tip, index) => (
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

            {/* Important Information */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div
                        ref={infoRef}
                        className={`transition-all duration-700 ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    >
                        <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
                            <h2 className="text-[28px] md:text-[40px] font-bold mb-4">{t('info.title')}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
                            <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                                <p className="text-sm text-blue-800 flex items-start gap-2">
                                    <AlertIcon />
                                    <span>
                                        <strong>{t('info.items.retakes.label')}</strong> {t('info.items.retakes.text')}
                                    </span>
                                </p>
                            </div>

                            <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                                <p className="text-sm text-green-800 flex items-start gap-2">
                                    <AlertIcon />
                                    <span>
                                        <strong>{t('info.items.private.label')}</strong> {t('info.items.private.text')}
                                    </span>
                                </p>
                            </div>

                            <div className="p-5 bg-amber-50 rounded-xl border border-amber-200">
                                <p className="text-sm text-amber-800 flex items-start gap-2">
                                    <AlertIcon />
                                    <span>
                                        <strong>{t('info.items.variations.label')}</strong> {t('info.items.variations.text')}
                                    </span>
                                </p>
                            </div>

                            <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
                                <p className="text-sm text-purple-800 flex items-start gap-2">
                                    <AlertIcon />
                                    <span>
                                        <strong>{t('info.items.samples.label')}</strong> {t('info.items.samples.text')}
                                    </span>
                                </p>
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
                                <Ui.ArrowRight size={20} />
                            </Link>

                            <Link
                                to="/application"
                                className="inline-flex items-center gap-2 bg-transparent text-text-main font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-page border border-border"
                            >
                                {t('cta.applicationButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
