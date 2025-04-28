
import { create } from 'zustand';
import { mockPlans, Plan } from '@/types/plan';

interface PlansState {
  plans: Plan[];
  setPlan: (updatedPlan: Plan) => void;
  addPlan: (newPlan: Plan) => void;
  deletePlan: (planId: number) => void;
  toggleFeatured: (planId: number) => void;
  reorderPlan: (planId: number, direction: 'up' | 'down') => void;
}

export const usePlansStore = create<PlansState>((set) => ({
  plans: mockPlans,
  
  setPlan: (updatedPlan) => 
    set((state) => ({
      plans: state.plans.map((plan) => 
        plan.id === updatedPlan.id ? updatedPlan : plan
      ),
    })),
    
  addPlan: (newPlan) => 
    set((state) => ({
      plans: [...state.plans, newPlan],
    })),
    
  deletePlan: (planId) => 
    set((state) => ({
      plans: state.plans.filter((plan) => plan.id !== planId),
    })),
    
  toggleFeatured: (planId) => 
    set((state) => ({
      plans: state.plans.map((plan) => {
        if (plan.id === planId) {
          return { ...plan, popular: !plan.popular };
        }
        // If we're marking a new plan as popular, unmark others
        if (!state.plans.find(p => p.id === planId)?.popular && plan.popular) {
          return { ...plan, popular: false };
        }
        return plan;
      }),
    })),
    
  reorderPlan: (planId, direction) => 
    set((state) => {
      const sortedPlans = [...state.plans].sort((a, b) => a.order - b.order);
      const planIndex = sortedPlans.findIndex(p => p.id === planId);
      
      if (planIndex === -1) return state;
      
      if (direction === 'up' && planIndex > 0) {
        // Swap with the previous plan
        const temp = sortedPlans[planIndex].order;
        sortedPlans[planIndex].order = sortedPlans[planIndex - 1].order;
        sortedPlans[planIndex - 1].order = temp;
      } else if (direction === 'down' && planIndex < sortedPlans.length - 1) {
        // Swap with the next plan
        const temp = sortedPlans[planIndex].order;
        sortedPlans[planIndex].order = sortedPlans[planIndex + 1].order;
        sortedPlans[planIndex + 1].order = temp;
      }
      
      return { plans: sortedPlans };
    }),
}));
