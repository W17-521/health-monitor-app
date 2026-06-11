import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

export function useUserData() {
  const store = useUserStore();

  useEffect(() => {
    store.fetchProfile();
    store.fetchBodyData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return store;
}
