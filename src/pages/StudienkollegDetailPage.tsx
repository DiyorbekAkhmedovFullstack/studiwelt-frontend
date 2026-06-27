import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getStudienkollegBySlug } from '../data/studienkollegData';
import { StudienkollegHeader } from '../components/studienkolleg/StudienkollegHeader';
import { CityInfoCard } from '../components/studienkolleg/CityInfoCard';
import { CoursesCard } from '../components/studienkolleg/CoursesCard';
import { ApplicationCard } from '../components/studienkolleg/ApplicationCard';
import { ExamCard } from '../components/studienkolleg/ExamCard';
import { Ui } from '../lib/icons';
import { SEO, getStudienkollegSEO } from '../components/common/SEO';

export function StudienkollegDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const studienkolleg = id ? getStudienkollegBySlug(id) : undefined;

  useEffect(() => {
    if (!studienkolleg) {
      // If invalid studienkolleg ID, redirect to home
      navigate('/');
    }
  }, [studienkolleg, navigate]);

  if (!studienkolleg) {
    return null;
  }

  const seoProps = getStudienkollegSEO(
    studienkolleg.name,
    studienkolleg.city,
    studienkolleg.location
  );

  return (
    <div className="min-h-screen bg-page">
      <SEO {...seoProps} />

      {/* Navigation Bar */}
      <nav className="h-[72px] flex items-center px-10 max-w-[1200px] mx-auto w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-muted hover:text-text-main font-semibold text-sm transition-all duration-200 hover:-translate-x-1"
        >
          <Ui.ArrowLeft size={20} />
          Back to Directory
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Header - Full Width */}
        <div className="lg:col-span-3">
          <StudienkollegHeader
            name={studienkolleg.name}
            location={studienkolleg.location}
            institutionType={studienkolleg.institutionType}
            badge={studienkolleg.badge}
          />
        </div>

        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          <CityInfoCard
            cityName={studienkolleg.city}
            description={studienkolleg.cityInfo.description}
            costOfLiving={studienkolleg.cityInfo.costOfLiving}
            transit={studienkolleg.cityInfo.transit}
          />

          <CoursesCard courses={studienkolleg.courses} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ApplicationCard application={studienkolleg.application} />
            <ExamCard exam={studienkolleg.exam} />
          </div>
        </div>
      </div>
    </div>
  );
}
