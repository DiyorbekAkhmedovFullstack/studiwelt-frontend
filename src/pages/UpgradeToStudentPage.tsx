import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { paymentService } from '../services/paymentService';
import { toastService } from '../services/toastService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { DashboardLayout } from '../components/dashboard';

export function UpgradeToStudentPage() {
  const { t } = useTranslation('upgrade');
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await paymentService.createStudentUpgradeSession();
      window.location.href = response.session.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create checkout session';
      toastService.error(message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Pricing Card */}
        <div style={{ width: '100%', maxWidth: '420px' }} className="bg-surface rounded-[24px] shadow-card">
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t('pricing.plan')}
              </span>
              <span className="px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                {t('pricing.badge')}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[64px] font-serif font-bold leading-none tracking-tight">
                {t('pricing.price')}
              </span>
              <span className="text-2xl text-text-muted font-serif">{t('pricing.priceCents')}</span>
            </div>

            <p className="text-text-muted text-sm mb-6">{t('pricing.terms')}</p>
          </div>

          {/* Divider */}
          <div className="mx-8 h-px bg-border" />

          {/* Features */}
          <div className="p-8 pt-6 space-y-4">
            <FeatureItem text={t('features.lessons.title')} />
            <FeatureItem text={t('features.activities.title')} />
            <FeatureItem text={t('features.lifetime.title')} />
            <FeatureItem text={t('features.devices.title')} />
          </div>

          {/* CTA */}
          <div className="p-8 pt-0">
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-4 px-6 bg-text-main text-white rounded-2xl font-semibold text-[15px] hover:bg-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(166,123,91,0.25)] flex items-center justify-center gap-2"
            >
              {loading ? (
                t('cta.processing')
              ) : (
                <>
                  {t('cta.button')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Trust badge */}
          <div className="px-8 pb-6 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {t('trust.stripe')}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            to="/course"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('backToCourse')}
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}
