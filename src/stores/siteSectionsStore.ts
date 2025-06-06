
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type SiteSection = Database['public']['Tables']['site_sections']['Row'];
type SiteSectionInsert = Database['public']['Tables']['site_sections']['Insert'];
type SiteSectionUpdate = Database['public']['Tables']['site_sections']['Update'];

interface SiteSectionsState {
  sections: SiteSection[];
  loading: boolean;
  error: string | null;
  
  fetchSections: () => Promise<void>;
  fetchEnabledSections: () => Promise<void>;
  updateSection: (id: number, updates: SiteSectionUpdate) => Promise<{ error?: string }>;
  toggleSectionEnabled: (id: number) => Promise<{ error?: string }>;
  getSectionByKey: (key: string) => SiteSection | undefined;
  getEnabledSections: () => SiteSection[];
}

export const useSiteSectionsStore = create<SiteSectionsState>()(
  persist(
    (set, get) => ({
      sections: [],
      loading: false,
      error: null,

      fetchSections: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('site_sections')
            .select('*')
            .order('section_key', { ascending: true });

          if (error) throw error;
          set({ sections: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching site sections:', error);
          set({ error: 'Erro ao carregar seções do site', loading: false });
        }
      },

      fetchEnabledSections: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('site_sections')
            .select('*')
            .eq('enabled', true)
            .order('section_key', { ascending: true });

          if (error) throw error;
          set({ sections: data || [], loading: false });
        } catch (error) {
          console.error('Error fetching enabled site sections:', error);
          set({ error: 'Erro ao carregar seções do site', loading: false });
        }
      },

      updateSection: async (id, updates) => {
        try {
          const { error } = await supabase
            .from('site_sections')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id);

          if (error) throw error;
          await get().fetchSections();
          return {};
        } catch (error) {
          console.error('Error updating section:', error);
          return { error: 'Erro ao atualizar seção' };
        }
      },

      toggleSectionEnabled: async (id) => {
        try {
          const section = get().sections.find(s => s.id === id);
          if (!section) return { error: 'Seção não encontrada' };

          const { error } = await supabase
            .from('site_sections')
            .update({ enabled: !section.enabled, updated_at: new Date().toISOString() })
            .eq('id', id);

          if (error) throw error;
          await get().fetchSections();
          return {};
        } catch (error) {
          console.error('Error toggling section enabled:', error);
          return { error: 'Erro ao alterar status da seção' };
        }
      },

      getSectionByKey: (key: string) => {
        return get().sections.find(section => section.section_key === key);
      },

      getEnabledSections: () => {
        return get().sections.filter(section => section.enabled);
      },
    }),
    {
      name: 'site-sections-store',
      partialize: (state) => ({ sections: state.sections }),
    }
  )
);
