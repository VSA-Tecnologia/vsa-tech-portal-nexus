
import React from 'react';
import { Check } from 'lucide-react';
import { Plan } from '@/types/plan';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface PlanViewDialogProps {
  plan: Plan | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlanViewDialog: React.FC<PlanViewDialogProps> = ({ plan, isOpen, onOpenChange }) => {
  if (!plan) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            {plan.popular && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                Popular
              </span>
            )}
          </div>
          
          <div className="text-3xl font-bold text-vsa-teal">{plan.price}</div>
          
          <p className="text-gray-600">{plan.description}</p>
          
          <div>
            <h3 className="font-semibold mb-3">Recursos inclusos:</h3>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
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
                <p>{plan.button_text}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <p>{plan.status === 'published' ? 'Publicado' : 'Rascunho'}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanViewDialog;
