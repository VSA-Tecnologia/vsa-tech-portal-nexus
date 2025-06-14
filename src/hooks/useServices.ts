
import { useEffect } from 'react';
import { useServicesStore } from '@/stores/servicesStore';

export const useServices = () => {
  const store = useServicesStore();

  useEffect(() => {
    store.fetchServices();
    store.fetchCategories();
  }, []);

  return store;
};
