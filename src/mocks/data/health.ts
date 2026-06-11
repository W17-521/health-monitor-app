import type { DailyStats, WeightRecord, WomenHealth, PetStatus, DietSummary } from '@/types';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const mockDailyStats: DailyStats = {
  date: daysAgo(0),
  caloriesBurned: 850,
  calorieGoal: 1200,
  steps: 6842,
  exerciseMinutes: 45,
  intensity: 'medium',
};

export const mockWeightRecords: WeightRecord[] = Array.from({ length: 14 }, (_, i) => ({
  date: daysAgo(13 - i),
  weight: 66.5 - (13 - i) * 0.092,
}));

const today = new Date();
export const mockWomenHealth: WomenHealth = {
  cycleDay: 3,
  cycleLength: 28,
  periodLength: 5,
  nextPeriodDate: new Date(today.getTime() + 25 * 86400000).toISOString().split('T')[0],
  ovulationDate: new Date(today.getTime() + 12 * 86400000).toISOString().split('T')[0],
};

export const mockPetStatus: PetStatus = {
  name: '小柯基',
  type: 'dog',
  hunger: 80,
  mood: 'happy',
  level: 5,
};

export const mockDietSummary: DietSummary = {
  caloriesConsumed: 980,
  carbsPercent: 40,
  proteinPercent: 25,
  fatPercent: 35,
};
