import type { Database } from '@/integrations/supabase/types';

// Use Supabase generated types
export type Plan = Database['public']['Tables']['plans']['Row'] & {
  features: Database['public']['Tables']['plan_features']['Row'][];
};

export type PlanFeature = Database['public']['Tables']['plan_features']['Row'];
export type PlanInsert = Database['public']['Tables']['plans']['Insert'];
export type PlanUpdate = Database['public']['Tables']['plans']['Update'];

// Legacy mock data - keeping for backward compatibility but will be replaced by real data
export const mockPlans: Plan[] = [];
