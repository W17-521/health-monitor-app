import { useEffect } from 'react';
import { useHealthStore } from '@/stores/healthStore';

export function useHealthData() {
  const store = useHealthStore();

  useEffect(() => {
    store.fetchDailyStats();
    store.fetchWeightRecords();
    store.fetchWomenHealth();
    store.fetchPetStatus();
    store.fetchDietSummary();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return store;
}
