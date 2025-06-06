
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];
type PortfolioInsert = Database['public']['Tables']['portfolio_items']['Insert'];
type PortfolioUpdate = Database['public']['Tables']['portfolio_items']['Update'];

interface PortfolioState {
  items: PortfolioItem[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  fetchEnabledItems: () => Promise<void>;
  createItem: (item: PortfolioInsert) => Promise<{ error?: string }>;
  updateItem: (id: number, updates: PortfolioUpdate) => Promise<{ error?: string }>;
  deleteItem: (id: number) => Promise<{ error?: string }>;
  toggleEnabled: (id: number) => Promise<{ error?: string }>;
  getEnabledItems: () => PortfolioItem[];
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,

      fetchItems: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          set({ items: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching portfolio items:', error);
          set({ error: 'Erro ao carregar portfólio', loading: false });
        }
      },

      fetchEnabledItems: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('enabled', true)
            .order('created_at', { ascending: false });

          if (error) throw error;

          set({ items: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching enabled portfolio items:', error);
          set({ error: 'Erro ao carregar portfólio', loading: false });
        }
      },

      createItem: async (itemData) => {
        try {
          const { error } = await supabase
            .from('portfolio_items')
            .insert(itemData);

          if (error) throw error;

          await get().fetchItems();
          return {};
        } catch (error) {
          console.error('Error creating portfolio item:', error);
          return { error: 'Erro ao criar item do portfólio' };
        }
      },

      updateItem: async (id, updates) => {
        try {
          const { error } = await supabase
            .from('portfolio_items')
            .update(updates)
            .eq('id', id);

          if (error) throw error;

          await get().fetchItems();
          return {};
        } catch (error) {
          console.error('Error updating portfolio item:', error);
          return { error: 'Erro ao atualizar item do portfólio' };
        }
      },

      deleteItem: async (id) => {
        try {
          const { error } = await supabase
            .from('portfolio_items')
            .delete()
            .eq('id', id);

          if (error) throw error;

          await get().fetchItems();
          return {};
        } catch (error) {
          console.error('Error deleting portfolio item:', error);
          return { error: 'Erro ao excluir item do portfólio' };
        }
      },

      toggleEnabled: async (id) => {
        try {
          const item = get().items.find(i => i.id === id);
          if (!item) return { error: 'Item não encontrado' };

          const { error } = await supabase
            .from('portfolio_items')
            .update({ enabled: !item.enabled })
            .eq('id', id);

          if (error) throw error;

          await get().fetchItems();
          return {};
        } catch (error) {
          console.error('Error toggling enabled:', error);
          return { error: 'Erro ao alterar status' };
        }
      },

      getEnabledItems: () => {
        return get().items.filter(item => item.enabled);
      },
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Hook for hydration check
export const useHydratedPortfolioStore = () => {
  const [hydrated, setHydrated] = React.useState(false);
  
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  
  return hydrated;
};
