import { create } from 'zustand';
import type { Course, ExerciseCategory } from '@/types';

interface ExerciseState {
  courses: Course[];
  category: ExerciseCategory;
  isLoading: boolean;
  setCategory: (cat: ExerciseCategory) => void;
  fetchCourses: (category: ExerciseCategory) => Promise<void>;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  courses: [],
  category: 'all',
  isLoading: false,

  setCategory: (category) => {
    set({ category });
  },

  fetchCourses: async (category) => {
    set({ isLoading: true });
    const url = category === 'all' ? '/api/exercise/courses' : `/api/exercise/courses?category=${category}`;
    const res = await fetch(url);
    const courses = await res.json();
    set({ courses, isLoading: false });
  },
}));
