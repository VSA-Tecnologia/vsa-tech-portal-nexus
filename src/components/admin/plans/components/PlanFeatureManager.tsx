
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Plus, Trash2 } from 'lucide-react';
import { PlanFeature } from '@/types/plan';

interface PlanFeatureManagerProps {
  features: PlanFeature[];
  setFeatures: React.Dispatch<React.SetStateAction<PlanFeature[]>>;
}

const PlanFeatureManager: React.FC<PlanFeatureManagerProps> = ({ features, setFeatures }) => {
  const generateFeatureId = () => 
    features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      { id: generateFeatureId(), feature: '', included: true }
    ]);
  };

  const handleRemoveFeature = (featureId: number) => {
    setFeatures(features.filter(feature => feature.id !== featureId));
  };

  const handleFeatureChange = (id: number, value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, feature: value } : feature
    ));
  };

  const handleToggleFeature = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, included: !feature.included } : feature
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recursos do Plano</h3>
        <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar Recurso
        </Button>
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={feature.id} className="flex items-center space-x-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={`h-8 w-8 rounded-full p-0 ${
                feature.included 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              onClick={() => handleToggleFeature(feature.id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Input
              value={feature.feature}
              onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
              placeholder="Descreva o recurso"
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleRemoveFeature(feature.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {features.length === 0 && (
          <div className="text-center p-4 border border-dashed rounded-md">
            <p className="text-sm text-muted-foreground">
              Nenhum recurso adicionado. Clique em "Adicionar Recurso" para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanFeatureManager;
