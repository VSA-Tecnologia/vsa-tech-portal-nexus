
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Plan = Database['public']['Tables']['plans']['Row'] & {
  features: Database['public']['Tables']['plan_features']['Row'][];
};

type PlanInsert = Database['public']['Tables']['plans']['Insert'];
type PlanUpdate = Database['public']['Tables']['plans']['Update'];

interface PlansState {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  fetchPlans: () => Promise<void>;
  fetchPublicPlans: () => Promise<void>;
  createPlan: (plan: PlanInsert) => Promise<{ error?: string }>;
  updatePlan: (id: number, updates: PlanUpdate) => Promise<{ error?: string }>;
  deletePlan: (id: number) => Promise<{ error?: string }>;
  togglePopular: (id: number) => Promise<{ error?: string }>;
  reorderPlan: (id: number, direction: 'up' | 'down') => Promise<{ error?: string }>;
  addFeature: (planId: number, feature: string, included: boolean) => Promise<{ error?: string }>;
  updateFeature: (featureId: number, updates: { feature?: string; included?: boolean }) => Promise<{ error?: string }>;
  deleteFeature: (featureId: number) => Promise<{ error?: string }>;
}

export const usePlansStore = create<PlansState>()(
  persist(
    (set, get) => ({
      plans: [],
      loading: false,
      error: null,

      fetchPlans: async () => {
        set({ loading: true, error: null });
        try {
          const { data: plans, error: plansError } = await supabase
            .from('plans')
            .select(`
              *,
              plan_features (*)
            `)
            .order('order_position');

          if (plansError) throw plansError;

          const formattedPlans = (plans || []).map(plan => ({
            ...plan,
            features: plan.plan_features || []
          }));

          set({ plans: formattedPlans, loading: false });
        } catch (error) {
          console.error('Error fetching plans:', error);
          set({ error: 'Erro ao carregar planos', loading: false });
        }
      },

      fetchPublicPlans: async () => {
        set({ loading: true, error: null });
        try {
          const { data: plans, error: plansError } = await supabase
            .from('plans')
            .select(`
              *,
              plan_features!inner (*)
            `)
            .eq('status', 'published')
            .order('order_position');

          if (plansError) throw plansError;

          const formattedPlans = (plans || []).map(plan => ({
            ...plan,
            features: plan.plan_features || []
          }));

          set({ plans: formattedPlans, loading: false });
        } catch (error) {
          console.error('Error fetching public plans:', error);
          set({ error: 'Erro ao carregar planos', loading: false });
        }
      },

      createPlan: async (planData) => {
        try {
          const { data: plan, error } = await supabase
            .from('plans')
            .insert(planData)
            .select()
            .single();

          if (error) throw error;

          // Refresh plans
          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error creating plan:', error);
          return { error: 'Erro ao criar plano' };
        }
      },

      updatePlan: async (id, updates) => {
        try {
          const { error } = await supabase
            .from('plans')
            .update(updates)
            .eq('id', id);

          if (error) throw error;

          // Refresh plans
          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error updating plan:', error);
          return { error: 'Erro ao atualizar plano' };
        }
      },

      deletePlan: async (id) => {
        try {
          const { error } = await supabase
            .from('plans')
            .delete()
            .eq('id', id);

          if (error) throw error;

          // Refresh plans
          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error deleting plan:', error);
          return { error: 'Erro ao excluir plano' };
        }
      },

      togglePopular: async (id) => {
        try {
          const plan = get().plans.find(p => p.id === id);
          if (!plan) return { error: 'Plano não encontrado' };

          const { error } = await supabase
            .from('plans')
            .update({ popular: !plan.popular })
            .eq('id', id);

          if (error) throw error;

          // Refresh plans
          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error toggling popular:', error);
          return { error: 'Erro ao alterar destaque' };
        }
      },

      reorderPlan: async (id, direction) => {
        try {
          const plans = get().plans;
          const planIndex = plans.findIndex(p => p.id === id);
          if (planIndex === -1) return { error: 'Plano não encontrado' };

          const currentPlan = plans[planIndex];
          let targetPlan: Plan | undefined;

          if (direction === 'up' && planIndex > 0) {
            targetPlan = plans[planIndex - 1];
          } else if (direction === 'down' && planIndex < plans.length - 1) {
            targetPlan = plans[planIndex + 1];
          }

          if (!targetPlan) return { error: 'Não é possível mover nesta direção' };

          // Swap order positions
          const updates = [
            supabase.from('plans').update({ order_position: targetPlan.order_position }).eq('id', currentPlan.id),
            supabase.from('plans').update({ order_position: currentPlan.order_position }).eq('id', targetPlan.id)
          ];

          await Promise.all(updates);
          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error reordering plan:', error);
          return { error: 'Erro ao reordenar plano' };
        }
      },

      addFeature: async (planId, feature, included) => {
        try {
          const { error } = await supabase
            .from('plan_features')
            .insert({
              plan_id: planId,
              feature,
              included,
              order_position: 1
            });

          if (error) throw error;

          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error adding feature:', error);
          return { error: 'Erro ao adicionar recurso' };
        }
      },

      updateFeature: async (featureId, updates) => {
        try {
          const { error } = await supabase
            .from('plan_features')
            .update(updates)
            .eq('id', featureId);

          if (error) throw error;

          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error updating feature:', error);
          return { error: 'Erro ao atualizar recurso' };
        }
      },

      deleteFeature: async (featureId) => {
        try {
          const { error } = await supabase
            .from('plan_features')
            .delete()
            .eq('id', featureId);

          if (error) throw error;

          await get().fetchPlans();
          return {};
        } catch (error) {
          console.error('Error deleting feature:', error);
          return { error: 'Erro ao excluir recurso' };
        }
      },
    }),
    {
      name: 'plans-store',
      partialize: (state) => ({ plans: state.plans }),
    }
  )
);
