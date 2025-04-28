
import React, { useState } from 'react';
import { toast } from 'sonner';
import PlansList from '@/components/admin/plans/PlansList';
import PlanEditorDialog from '@/components/admin/plans/PlanEditorDialog';
import PlanViewDialog from '@/components/admin/plans/PlanViewDialog';
import { Plan } from '@/types/plan';
import { usePlansStore } from '@/stores/plansStore';

const Plans: React.FC = () => {
  const { plans, setPlan, addPlan, deletePlan, toggleFeatured, reorderPlan } = usePlansStore();
  const [currentPlan, setCurrentPlan] = useState<Plan | undefined>(undefined);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingPlan, setViewingPlan] = useState<Plan | null>(null);
  
  const handleCreateNew = () => {
    setCurrentPlan(undefined);
    setIsEditorOpen(true);
  };
  
  const handleEdit = (plan: Plan) => {
    setCurrentPlan(plan);
    setIsEditorOpen(true);
  };
  
  const handleSavePlan = (plan: Plan) => {
    if (plans.find(p => p.id === plan.id)) {
      // Update existing plan
      setPlan(plan);
      toast.success('Plano atualizado com sucesso!');
    } else {
      // Add new plan
      // Set the order to be after the last plan
      const newPlan = {
        ...plan,
        order: plans.length > 0 
          ? Math.max(...plans.map(p => p.order)) + 1 
          : 1
      };
      addPlan(newPlan);
      toast.success('Plano criado com sucesso!');
    }
    setIsEditorOpen(false);
  };
  
  const handleDeletePlan = (planId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      deletePlan(planId);
      toast.success('Plano excluído com sucesso!');
    }
  };
  
  const handleViewPlan = (plan: Plan) => {
    setViewingPlan(plan);
    setIsViewDialogOpen(true);
  };
  
  const handleToggleFeatured = (planId: number) => {
    toggleFeatured(planId);
    
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast.success(`Plano ${plan.popular ? 'removido dos' : 'adicionado aos'} destaques!`);
    }
  };
  
  const handleReorderPlan = (planId: number, direction: 'up' | 'down') => {
    reorderPlan(planId, direction);
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
