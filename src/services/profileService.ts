import { api } from './api';
import type { User } from '../types/api';

type UpdateAvatarPayload = {
  imageUrl: string;
};

export const profileService = {
  updateAvatar: (payload: UpdateAvatarPayload) =>
    api.patch<{ user: User }>('/user/profile/image', payload),
};

