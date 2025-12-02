import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard';
import { AvatarPicker, MfaSection } from '../components/profile';
import { useAuth } from '../contexts/AuthContext';
import { toastService } from '../services/toastService';
import { profileService } from '../services/profileService';

export function ProfilePage() {
  const { user, setUser } = useAuth();

  // Avatar state
  const [avatarSeed, setAvatarSeed] = useState('Felix');

  const [avatarSaving, setAvatarSaving] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      if (user.imageUrl) {
        try {
          const url = new URL(user.imageUrl);
          const seedParam = url.searchParams.get('seed');
          if (seedParam) {
            setAvatarSeed(seedParam);
            return;
          }
        } catch {
          // If imageUrl is not a valid URL, fall through to fallback seed
        }
      }

      setAvatarSeed(user.firstName || 'Felix');
    }
  }, [user]);

  const handleAvatarSave = async () => {
    setAvatarSaving(true);

    try {
      const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
        avatarSeed || 'User',
      )}`;

      const data = await profileService.updateAvatar({ imageUrl: avatarUrl });
      setUser(data.user);

      toastService.success('Avatar updated.');
    } catch (error) {
      toastService.error(
        error instanceof Error ? error.message : 'Avatar update failed.'
      );
    } finally {
      setAvatarSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-10 border-b border-[rgba(0,0,0,0.05)] pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-serif font-bold mb-1 sm:mb-2">Your Profile</h1>
          <p className="text-sm sm:text-base text-text-muted">
            Manage your appearance and security settings.
          </p>
        </header>

        {/* Avatar Picker */}
        <div className="mb-6 sm:mb-10">
          <AvatarPicker
            currentSeed={avatarSeed}
            onSeedChange={setAvatarSeed}
            onSave={() => void handleAvatarSave()}
            saving={avatarSaving}
          />
        </div>

        {/* MFA Section */}
        <MfaSection />
      </div>

      <div className="h-16"></div>
    </DashboardLayout>
  );
}
