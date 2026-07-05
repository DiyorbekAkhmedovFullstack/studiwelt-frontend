import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ui } from '../../lib/icons';

export function AboutTeaser() {
  const { t } = useTranslation('about');

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-surface rounded-[28px] shadow-card border border-[rgba(0,0,0,0.03)] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
          <picture>
            <source srcSet="/about.webp" type="image/webp" />
            <img
              src="/about.jpg"
              alt={t('photoAlt')}
              width={1200}
              height={900}
              loading="lazy"
              className="w-full md:w-[220px] aspect-[4/3] object-cover rounded-[20px] border border-[rgba(0,0,0,0.04)]"
            />
          </picture>

          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-main mb-3">
              {t('teaser.heading')}
            </h2>
            <p className="text-text-muted leading-relaxed mb-6 max-w-[520px] mx-auto md:mx-0">
              {t('teaser.text')}
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {t('teaser.cta')}
              <Ui.ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
