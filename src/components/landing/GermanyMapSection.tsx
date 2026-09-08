import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GermanyMap from './GermanyMap';
import { STATE_SLUGS } from '../../lib/publicRoutes';

export function GermanyMapSection() {
    const { t } = useTranslation('landing');

    return (
        <section className="py-24 bg-page overflow-hidden">
            <div className="max-w-[1100px] mx-auto px-6 text-center">
                <h2 className="text-[40px] font-bold mb-6">{t('map.title')}</h2>
                <p className="text-text-muted text-lg mb-12 max-w-[700px] mx-auto">
                    {t('map.description')}
                </p>

                <div className="relative w-full max-w-[500px] mx-auto">
                    <GermanyMap className="w-full h-auto" />
                </div>

                <nav aria-label="German states" className="mt-10">
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {STATE_SLUGS.map((slug) => (
                            <Link
                                key={slug}
                                to={`/state/${slug}`}
                                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-main transition-colors hover:border-primary hover:text-primary"
                            >
                                {t(`statesContent:${slug}.name`, { defaultValue: slug })}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </section>
    );
}
