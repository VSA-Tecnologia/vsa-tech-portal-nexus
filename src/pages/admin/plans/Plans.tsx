
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import PlansList from '@/components/admin/plans/PlansList';
import PlanEditorDialog from '@/components/admin/plans/PlanEditorDialog';
import PlanViewDialog from '@/components/admin/plans/PlanViewDialog';
import { usePlansStore } from '@/stores/plansStore';
import type { Database } from '@/integrations/supabase/types';

type Plan = Database['public']['Tables']['plans']['Row'] & {
  features: Database['public']['Tables']['plan_features']['Row'][];
};

const Plans: React.FC = () => {
  const { 
    plans, 
    loading, 
    fetchPlans, 
    createPlan, 
    updatePlan, 
    deletePlan, 
    togglePopular, 
    reorderPlan,
    addFeature,
    updateFeature,
    deleteFeature
  } = usePlansStore();

  const [currentPlan, setCurrentPlan] = useState<Plan | undefined>(undefined);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingPlan, setViewingPlan] = useState<Plan | null>(null);
  
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleCreateNew = () => {
    setCurrentPlan(undefined);
    setIsEditorOpen(true);
  };
  
  const handleEdit = (plan: Plan) => {
    setCurrentPlan(plan);
    setIsEditorOpen(true);
  };
  
  const handleSavePlan = async (planData: any) => {
    let result;
    
    if (currentPlan) {
      // Update existing plan
      result = await updatePlan(currentPlan.id, {
        name: planData.name,
        price: planData.price,
        description: planData.description,
        button_text: planData.buttonText,
        popular: planData.popular,
        status: planData.status,
        service_type: planData.serviceType,
      });
    } else {
      // Create new plan
      const maxOrder = Math.max(...plans.map(p => p.order_position), 0);
      result = await createPlan({
        name: planData.name,
        price: planData.price,
        description: planData.description,
        button_text: planData.buttonText,
        popular: planData.popular,
        status: planData.status,
        service_type: planData.serviceType,
        order_position: maxOrder + 1,
      });
    }

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(currentPlan ? 'Plano atualizado com sucesso!' : 'Plano criado com sucesso!');
      setIsEditorOpen(false);
    }
  };
  
  const handleDeletePlan = async (planId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      const result = await deletePlan(planId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Plano excluído com sucesso!');
      }
    }
  };
  
  const handleViewPlan = (plan: Plan) => {
    setViewingPlan(plan);
    setIsViewDialogOpen(true);
  };
  
  const handleToggleFeatured = async (planId: number) => {
    const result = await togglePopular(planId);
    if (result.error) {
      toast.error(result.error);
    } else {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        toast.success(`Plano ${!plan.popular ? 'adicionado aos' : 'removido dos'} destaques!`);
      }
    }
  };
  
  const handleReorderPlan = async (planId: number, direction: 'up' | 'down') => {
    const result = await reorderPlan(planId, direction);
    if (result.error) {
      toast.error(result.error);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Planos</h1>
        <p className="text-muted-foreground">
          Gerencie os planos de assinatura que serão exibidos no seu site.
        </p>
      </div>
      
      <PlansList 
        plans={plans}
        onEdit={handleEdit}
        onDelete={handleDeletePlan}
        onView={handleViewPlan}
        onToggleFeatured={handleToggleFeatured}
        onCreateNew={handleCreateNew}
        onReorder={handleReorderPlan}
      />
      
      {/* Plan Editor Dialog */}
      <PlanEditorDialog
        plan={currentPlan}
        isOpen={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        onSave={handleSavePlan}
      />
      
      {/* Plan View Dialog */}
      <PlanViewDialog
        plan={viewingPlan}
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
    </div>
  );
};

export default Plans;
