import { useEffect } from 'react';
import { useExerciseStore } from '@/stores/exerciseStore';

export function useExerciseData() {
  const store = useExerciseStore();

  useEffect(() => {
    store.fetchCourses(store.category);
  }, [store.category]); // eslint-disable-line react-hooks/exhaustive-deps

  return store;
}
