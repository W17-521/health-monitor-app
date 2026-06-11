import { create } from 'zustand';
import type { UserProfile, BodyData } from '@/types';

interface UserState {
  profile: UserProfile | null;
  bodyData: BodyData | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  fetchBodyData: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  bodyData: null,
  isLoading: false,

  fetchProfile: async () => {
    set({ isLoading: true });
    const res = await fetch('/api/user/profile');
    const profile = await res.json();
    set({ profile, isLoading: false });
  },

  fetchBodyData: async () => {
    const res = await fetch('/api/user/body-data');
    const bodyData = await res.json();
    set({ bodyData });
  },
}));
