import { useTranslation } from 'react-i18next';
import { Icon } from '../../lib/icons';

interface AvatarPickerProps {
  currentSeed: string;
  onSeedChange: (seed: string) => void;
  onSave?: () => void;
  saving?: boolean;
}

const PRESET_SEEDS = [
  'Felix',
  'Aneka',
  'Milo',
  'Sora',
  'Leo',
  'Zoe',
  'Max',
  'Luna',
  'Kai',
  'Ivy',
  'Finn',
  'Nora',
];

export function AvatarPicker({
  currentSeed,
  onSeedChange,
  onSave,
  saving,
}: AvatarPickerProps) {
  const { t } = useTranslation();

  const getAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
  };

  const handleRandomize = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    onSeedChange(randomSeed);
  };

  const handlePresetClick = (seed: string) => {
    onSeedChange(seed);
  };

  return (
    <div className="bg-surface rounded-2xl sm:rounded-[24px] shadow-card p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] gap-6 sm:gap-8 md:gap-10 items-start">
        {/* Left: Current Avatar Preview */}
        <div className="text-center">
          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-[#F0F0F0] mb-3 sm:mb-4 border-4 border-white mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-105">
            <img
              src={getAvatarUrl(currentSeed)}
              alt="Your avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-semibold text-xs sm:text-[14px] text-text-main mb-1">{t('profile.avatar.currentLook')}</div>
        </div>

        {/* Right: Controls */}
        <div>
          <h3 className="text-base sm:text-[17px] font-semibold mb-3 sm:mb-4">{t('profile.avatar.chooseAvatar')}</h3>

          {/* Preset Avatars Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2 sm:gap-3">
            {PRESET_SEEDS.map((seed) => (
              <button
                key={seed}
                type="button"
                onClick={() => handlePresetClick(seed)}
                className={`
                  w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden bg-[#F5F5F5]
                  border-2 transition-all hover:-translate-y-0.5
                  ${
                    currentSeed === seed
                      ? 'border-primary shadow-[0_0_0_2px_rgba(166,123,91,0.2)]'
                      : 'border-transparent hover:border-[rgba(166,123,91,0.3)]'
                  }
                `}
                title={seed}
              >
                <img
                  src={getAvatarUrl(seed)}
                  alt={seed}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {onSave && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 flex-wrap">
              <span className="hidden sm:block text-[12px] text-text-muted">
                {t('profile.avatar.hint')}
              </span>
              <button
                type="button"
                onClick={handleRandomize}
                className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-surface border border-[#DDD] rounded-md hover:bg-[#F5F5F5] transition-colors text-text-muted hover:text-text-main font-semibold text-sm sm:text-[14px]"
              >
                <Icon.Restart size={16} />
                {t('profile.avatar.random')}
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm sm:text-[14px] hover:bg-[#8E6A4F] transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 whitespace-nowrap"
              >
                {saving ? t('profile.avatar.savingAvatar') : t('profile.avatar.saveAvatar')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
