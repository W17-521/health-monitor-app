import type { Course } from '@/types';

export const mockCourses: Course[] = [
  {
    id: 'c1', title: '全身拉伸操', coverUrl: '',
    durationMinutes: 12, difficulty: 'beginner', caloriesBurn: 60,
    rating: 4.8, completions: 23000, category: 'gymnastics',
  },
  {
    id: 'c2', title: '活力有氧体操', coverUrl: '',
    durationMinutes: 20, difficulty: 'intermediate', caloriesBurn: 150,
    rating: 4.9, completions: 18000, category: 'gymnastics',
  },
  {
    id: 'c3', title: '垫上普拉提', coverUrl: '',
    durationMinutes: 25, difficulty: 'intermediate', caloriesBurn: 120,
    rating: 4.7, completions: 9600, category: 'yoga',
  },
  {
    id: 'c4', title: '爆汗燃脂操', coverUrl: '',
    durationMinutes: 20, difficulty: 'intermediate', caloriesBurn: 200,
    rating: 4.9, completions: 32000, category: 'fat-burn',
  },
  {
    id: 'c5', title: '晨间唤醒体操', coverUrl: '',
    durationMinutes: 10, difficulty: 'beginner', caloriesBurn: 85,
    rating: 4.6, completions: 15000, category: 'gymnastics',
  },
  {
    id: 'c6', title: '力量核心训练', coverUrl: '',
    durationMinutes: 30, difficulty: 'advanced', caloriesBurn: 280,
    rating: 4.8, completions: 8700, category: 'strength',
  },
  {
    id: 'c7', title: '流瑜伽 · 柔韧提升', coverUrl: '',
    durationMinutes: 35, difficulty: 'intermediate', caloriesBurn: 180,
    rating: 4.9, completions: 12000, category: 'yoga',
  },
  {
    id: 'c8', title: 'HIIT 高效燃脂', coverUrl: '',
    durationMinutes: 15, difficulty: 'advanced', caloriesBurn: 220,
    rating: 4.7, completions: 28000, category: 'fat-burn',
  },
];
