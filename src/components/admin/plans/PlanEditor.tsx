
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Plan, PlanFeature } from '@/types/plan';
import { DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Import the new components
import PlanBasicInfo from './components/PlanBasicInfo';
import PlanServiceTypeSelector from './components/PlanServiceTypeSelector';
import PlanStatusToggles from './components/PlanStatusToggles';
import PlanFeatureManager from './components/PlanFeatureManager';

interface PlanEditorProps {
  plan?: Plan;
  onSave: (plan: Plan) => void;
  onCancel: () => void;
}

const PlanEditor: React.FC<PlanEditorProps> = ({ plan, onSave, onCancel }) => {
  const generateId = () => Math.max(0, ...[plan?.id ?? 0]) + 1;
  
  const [features, setFeatures] = useState<PlanFeature[]>(plan?.features ?? []);
  
  const defaultValues = {
    name: plan?.name || '',
    price: plan?.price || '',
    description: plan?.description || '',
    buttonText: plan?.button_text || 'Contratar',
    popular: plan?.popular || false,
    status: plan?.status || 'draft',
    serviceType: plan?.service_type || 'cloud',
  };

  const form = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    const updatedPlan: Plan = {
      id: plan?.id || generateId(),
      name: data.name,
      price: data.price,
      description: data.description,
      features: features,
      button_text: data.buttonText,
      popular: data.popular,
      status: data.status,
      service_type: data.serviceType,
      order_position: plan?.order_position || 999,
      created_at: plan?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(updatedPlan);
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>{plan ? 'Editar Plano' : 'Novo Plano'}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <PlanBasicInfo form={form} />
          
          <PlanServiceTypeSelector form={form} />
          
          <PlanStatusToggles form={form} />
          
          <PlanFeatureManager 
            features={features}
            setFeatures={setFeatures}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {plan ? 'Salvar Alterações' : 'Criar Plano'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default PlanEditor;
