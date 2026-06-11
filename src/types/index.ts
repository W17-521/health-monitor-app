// ========== User ==========

export interface UserProfile {
  id: string;
  nickname: string;
  avatarUrl: string;
  level: number;
  totalExerciseDays: number;
}

export interface BodyData {
  height: number;      // cm
  weight: number;      // kg
  targetWeight: number; // kg
  chest?: number;      // cm
  waist?: number;      // cm
  hip?: number;        // cm
}

// ========== Health / Dashboard ==========

export interface DailyStats {
  date: string;             // ISO date YYYY-MM-DD
  caloriesBurned: number;   // kcal
  calorieGoal: number;      // kcal
  steps: number;
  exerciseMinutes: number;
  intensity: 'low' | 'medium' | 'high';
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface WomenHealth {
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  nextPeriodDate: string;
  ovulationDate: string;
}

export interface PetStatus {
  name: string;
  type: 'dog' | 'cat';
  hunger: number;   // 0-100
  mood: 'happy' | 'neutral' | 'sad';
  level: number;
}

export interface DietSummary {
  caloriesConsumed: number;
  carbsPercent: number;
  proteinPercent: number;
  fatPercent: number;
}

// ========== Exercise ==========

export type ExerciseCategory = 'all' | 'fat-burn' | 'yoga' | 'gymnastics' | 'strength';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  coverUrl: string;
  durationMinutes: number;
  difficulty: Difficulty;
  caloriesBurn: number;
  rating: number;
  completions: number;
  category: ExerciseCategory;
  description?: string;
}

// ========== Achievements ==========

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlockedAt?: string;
}

// ========== Settings ==========

export interface AppSettings {
  calorieGoal: number;
  stepGoal: number;
  exerciseGoalMinutes: number;
  targetWeight: number;
  remindersEnabled: boolean;
  privacyMode: boolean;
}
