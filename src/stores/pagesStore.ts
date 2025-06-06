
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type PageItem = Database['public']['Tables']['pages']['Row'];
export type PageCategory = Database['public']['Tables']['page_categories']['Row'];
type PageInsert = Database['public']['Tables']['pages']['Insert'];
type PageUpdate = Database['public']['Tables']['pages']['Update'];
type CategoryInsert = Database['public']['Tables']['page_categories']['Insert'];
type CategoryUpdate = Database['public']['Tables']['page_categories']['Update'];

interface PagesState {
  pages: PageItem[];
  categories: PageCategory[];
  loading: boolean;
  error: string | null;
  
  // Pages methods
  fetchPages: () => Promise<void>;
  fetchPublishedPages: () => Promise<void>;
  createPage: (page: PageInsert) => Promise<{ error?: string }>;
  updatePage: (id: number, updates: PageUpdate) => Promise<{ error?: string }>;
  deletePage: (id: number) => Promise<{ error?: string }>;
  togglePageFeatured: (id: number) => Promise<{ error?: string }>;
  
  // Categories methods
  fetchCategories: () => Promise<void>;
  createCategory: (category: CategoryInsert) => Promise<{ error?: string }>;
  updateCategory: (id: number, updates: CategoryUpdate) => Promise<{ error?: string }>;
  deleteCategory: (id: number) => Promise<{ error?: string }>;
  
  // Helper methods
  getPagesByCategory: (categoryId: number) => PageItem[];
  getFeaturedPages: () => PageItem[];
  getPublishedPages: () => PageItem[];
}

export const usePagesStore = create<PagesState>()(
  persist(
    (set, get) => ({
      pages: [],
      categories: [],
      loading: false,
      error: null,

      fetchPages: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('pages')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ pages: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching pages:', error);
          set({ error: 'Erro ao carregar páginas', loading: false });
        }
      },

      fetchPublishedPages: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ pages: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching published pages:', error);
          set({ error: 'Erro ao carregar páginas', loading: false });
        }
      },

      createPage: async (pageData) => {
        try {
          const { error } = await supabase
            .from('pages')
            .insert(pageData);

          if (error) throw error;
          await get().fetchPages();
          return {};
        } catch (error) {
          console.error('Error creating page:', error);
          return { error: 'Erro ao criar página' };
        }
      },

      updatePage: async (id, updates) => {
        try {
          const { error } = await supabase
            .from('pages')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id);

          if (error) throw error;
          await get().fetchPages();
          return {};
        } catch (error) {
          console.error('Error updating page:', error);
          return { error: 'Erro ao atualizar página' };
        }
      },

      deletePage: async (id) => {
        try {
          const { error } = await supabase
            .from('pages')
            .delete()
            .eq('id', id);

          if (error) throw error;
          await get().fetchPages();
          return {};
        } catch (error) {
          console.error('Error deleting page:', error);
          return { error: 'Erro ao excluir página' };
        }
      },

      togglePageFeatured: async (id) => {
        try {
          const page = get().pages.find(p => p.id === id);
          if (!page) return { error: 'Página não encontrada' };

          const { error } = await supabase
            .from('pages')
            .update({ featured: !page.featured, updated_at: new Date().toISOString() })
            .eq('id', id);

          if (error) throw error;
          await get().fetchPages();
          return {};
        } catch (error) {
          console.error('Error toggling page featured:', error);
          return { error: 'Erro ao alterar status de destaque' };
        }
      },

      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('page_categories')
            .select('*')
            .order('name', { ascending: true });

          if (error) throw error;
          set({ categories: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching categories:', error);
          set({ error: 'Erro ao carregar categorias', loading: false });
        }
      },

      createCategory: async (categoryData) => {
        try {
          const { error } = await supabase
            .from('page_categories')
            .insert(categoryData);

          if (error) throw error;
          await get().fetchCategories();
          return {};
        } catch (error) {
          console.error('Error creating category:', error);
          return { error: 'Erro ao criar categoria' };
        }
      },

      updateCategory: async (id, updates) => {
        try {
          const { error } = await supabase
            .from('page_categories')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id);

          if (error) throw error;
          await get().fetchCategories();
          return {};
        } catch (error) {
          console.error('Error updating category:', error);
          return { error: 'Erro ao atualizar categoria' };
        }
      },

      deleteCategory: async (id) => {
        try {
          const { error } = await supabase
            .from('page_categories')
            .delete()
            .eq('id', id);

          if (error) throw error;
          await get().fetchCategories();
          return {};
        } catch (error) {
          console.error('Error deleting category:', error);
          return { error: 'Erro ao excluir categoria' };
        }
      },

      getPagesByCategory: (categoryId: number) => {
        return get().pages.filter(page => page.category_id === categoryId);
      },

      getFeaturedPages: () => {
        return get().pages.filter(page => page.featured);
      },

      getPublishedPages: () => {
        return get().pages.filter(page => page.status === 'published');
      },
    }),
    {
      name: 'pages-store',
      partialize: (state) => ({ pages: state.pages, categories: state.categories }),
    }
  )
);
