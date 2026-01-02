import { useTranslation } from 'react-i18next';
import GermanyMap from './GermanyMap';

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
            </div>
        </section>
    );
}
