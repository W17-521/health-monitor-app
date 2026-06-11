import { create } from 'zustand';
import type { DailyStats, WeightRecord, WomenHealth, PetStatus, DietSummary } from '@/types';

interface HealthState {
  dailyStats: DailyStats | null;
  weightRecords: WeightRecord[];
  womenHealth: WomenHealth | null;
  petStatus: PetStatus | null;
  dietSummary: DietSummary | null;
  isLoading: boolean;
  fetchDailyStats: () => Promise<void>;
  fetchWeightRecords: () => Promise<void>;
  fetchWomenHealth: () => Promise<void>;
  fetchPetStatus: () => Promise<void>;
  fetchDietSummary: () => Promise<void>;
}

export const useHealthStore = create<HealthState>((set) => ({
  dailyStats: null,
  weightRecords: [],
  womenHealth: null,
  petStatus: null,
  dietSummary: null,
  isLoading: false,

  fetchDailyStats: async () => {
    set({ isLoading: true });
    const res = await fetch('/api/health/daily');
    const dailyStats = await res.json();
    set({ dailyStats, isLoading: false });
  },

  fetchWeightRecords: async () => {
    const res = await fetch('/api/health/weight');
    const weightRecords = await res.json();
    set({ weightRecords });
  },

  fetchWomenHealth: async () => {
    const res = await fetch('/api/health/women');
    const womenHealth = await res.json();
    set({ womenHealth });
  },

  fetchPetStatus: async () => {
    const res = await fetch('/api/health/pet');
    const petStatus = await res.json();
    set({ petStatus });
  },

  fetchDietSummary: async () => {
    const res = await fetch('/api/health/diet-summary');
    const dietSummary = await res.json();
    set({ dietSummary });
  },
}));
