
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Tables, Enums } from '@/integrations/supabase/types';

// Types based on Supabase schema
export type Service = Tables<'services'> & {
  category?: ServiceCategory;
};

export type ServiceCategory = Tables<'service_categories'>;

export type ServiceComplexity = Enums<'service_complexity'>;
export type ServiceStatus = Enums<'service_status'>;

interface ServicesState {
  services: Service[];
  categories: ServiceCategory[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchServices: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createService: (service: Omit<Service, 'id' | 'created_at' | 'updated_at' | 'view_count'>) => Promise<Service>;
  updateService: (id: number, updates: Partial<Service>) => Promise<Service>;
  deleteService: (id: number) => Promise<void>;
  toggleServiceFeatured: (id: number) => Promise<void>;
  reorderService: (id: number, direction: 'up' | 'down') => Promise<void>;
  
  // Categories
  createCategory: (category: Omit<ServiceCategory, 'id' | 'created_at' | 'updated_at'>) => Promise<ServiceCategory>;
  updateCategory: (id: number, updates: Partial<ServiceCategory>) => Promise<ServiceCategory>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          category:service_categories(*)
        `)
        .order('order_position', { ascending: true });

      if (error) throw error;
      
      set({ services: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching services:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      
      set({ categories: data || [] });
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  },

  createService: async (serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select(`
          *,
          category:service_categories(*)
        `)
        .single();

      if (error) throw error;

      const newService = data as Service;
      set(state => ({ 
        services: [...state.services, newService]
      }));
      
      return newService;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  updateService: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          category:service_categories(*)
        `)
        .single();

      if (error) throw error;

      const updatedService = data as Service;
      set(state => ({
        services: state.services.map(service => 
          service.id === id ? updatedService : service
        )
      }));

      return updatedService;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  deleteService: async (id) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        services: state.services.filter(service => service.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  toggleServiceFeatured: async (id) => {
    const service = get().services.find(s => s.id === id);
    if (!service) return;

    await get().updateService(id, { featured: !service.featured });
  },

  reorderService: async (id, direction) => {
    const services = get().services;
    const serviceIndex = services.findIndex(s => s.id === id);
    if (serviceIndex === -1) return;

    const service = services[serviceIndex];
    let targetService: Service | undefined;

    if (direction === 'up' && serviceIndex > 0) {
      targetService = services[serviceIndex - 1];
    } else if (direction === 'down' && serviceIndex < services.length - 1) {
      targetService = services[serviceIndex + 1];
    }

    if (targetService) {
      // Swap order positions
      await Promise.all([
        get().updateService(service.id, { order_position: targetService.order_position }),
        get().updateService(targetService.id, { order_position: service.order_position })
      ]);
      
      // Refresh to get updated order
      await get().fetchServices();
    }
  },

  createCategory: async (categoryData) => {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;

      set(state => ({ 
        categories: [...state.categories, data]
      }));
      
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        categories: state.categories.map(category => 
          category.id === id ? data : category
        )
      }));

      return data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const { error } = await supabase
        .from('service_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        categories: state.categories.filter(category => category.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
}));
