import React, { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react'; 
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PlansList from '@/components/admin/plans/PlansList';
import PlanEditor from '@/components/admin/plans/PlanEditor';
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
      {isEditorOpen && (
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <PlanEditor
              plan={currentPlan}
              onSave={handleSavePlan}
              onCancel={() => setIsEditorOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Plan View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingPlan && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{viewingPlan.name}</h2>
                {viewingPlan.popular && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                    Popular
                  </span>
                )}
              </div>
              
              <div className="text-3xl font-bold text-vsa-teal">{viewingPlan.price}</div>
              
              <p className="text-gray-600">{viewingPlan.description}</p>
              
              <div>
                <h3 className="font-semibold mb-3">Recursos inclusos:</h3>
                <ul className="space-y-2">
                  {viewingPlan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start">
                      <div className={`flex-shrink-0 rounded-full p-1 ${
                        feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <span className={`ml-3 ${!feature.included ? 'text-gray-400' : ''}`}>
                        {feature.feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Botão:</span>
                    <p>{viewingPlan.buttonText}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <p>{viewingPlan.status === 'published' ? 'Publicado' : 'Rascunho'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Plans;
