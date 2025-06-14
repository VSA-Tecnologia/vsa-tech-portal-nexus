
// Re-export types from the services store for backward compatibility
export type { 
  Service, 
  ServiceCategory, 
  ServiceComplexity, 
  ServiceStatus 
} from '@/stores/servicesStore';

// Legacy mock data - can be removed once fully migrated
export const mockServiceCategories = [];
export const mockServices = [];
