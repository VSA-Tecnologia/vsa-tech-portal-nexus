
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, Plus, Trash2, X, Cloud, Server, Database, Wifi, HardDrive, Backup, Hotspot } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plan, PlanFeature } from '@/types/plan';
import { DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface PlanEditorProps {
  plan?: Plan;
  onSave: (plan: Plan) => void;
  onCancel: () => void;
}

const serviceTypeIcons = {
  cloud: <Cloud className="h-4 w-4 mr-2" />,
  server: <Server className="h-4 w-4 mr-2" />,
  database: <Database className="h-4 w-4 mr-2" />,
  wifi: <Wifi className="h-4 w-4 mr-2" />,
  'hard-drive': <HardDrive className="h-4 w-4 mr-2" />,
  backup: <Backup className="h-4 w-4 mr-2" />,
  hotspot: <Hotspot className="h-4 w-4 mr-2" />,
};

const PlanEditor: React.FC<PlanEditorProps> = ({ plan, onSave, onCancel }) => {
  // Generate a unique ID for new plans
  const generateId = () => Math.max(0, ...[plan?.id ?? 0]) + 1;
  const generateFeatureId = (features: PlanFeature[]) => 
    features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;

  const [features, setFeatures] = useState<PlanFeature[]>(plan?.features ?? []);
  
  const defaultValues = {
    name: plan?.name || '',
    price: plan?.price || '',
    description: plan?.description || '',
    buttonText: plan?.buttonText || 'Contratar',
    popular: plan?.popular || false,
    status: plan?.status || 'draft',
    serviceType: plan?.serviceType || 'cloud',
  };

  const form = useForm({
    defaultValues,
  });

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      { id: generateFeatureId(features), feature: '', included: true }
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

  const onSubmit = (data: any) => {
    const updatedPlan: Plan = {
      id: plan?.id || generateId(),
      name: data.name,
      price: data.price,
      description: data.description,
      features: features,
      buttonText: data.buttonText,
      popular: data.popular,
      status: data.status,
      serviceType: data.serviceType,
      order: plan?.order || 999, // Will be reordered when saved
      createdAt: plan?.createdAt || new Date(),
      updatedAt: new Date(),
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Plano Básico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: R$ 99/mês" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Serviço</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de serviço" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cloud">
                      <div className="flex items-center">
                        <Cloud className="h-4 w-4 mr-2" /> Cloud
                      </div>
                    </SelectItem>
                    <SelectItem value="server">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2" /> Servidor
                      </div>
                    </SelectItem>
                    <SelectItem value="database">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2" /> Banco de Dados
                      </div>
                    </SelectItem>
                    <SelectItem value="wifi">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2" /> WiFi
                      </div>
                    </SelectItem>
                    <SelectItem value="hard-drive">
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 mr-2" /> Armazenamento
                      </div>
                    </SelectItem>
                    <SelectItem value="backup">
                      <div className="flex items-center">
                        <Backup className="h-4 w-4 mr-2" /> Backup
                      </div>
                    </SelectItem>
                    <SelectItem value="hotspot">
                      <div className="flex items-center">
                        <Hotspot className="h-4 w-4 mr-2" /> Hotspot
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Breve descrição do plano" 
                    {...field}
                    className="resize-none"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto do Botão</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Contratar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="popular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Plano em Destaque</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Exibe um rótulo especial indicando que é o plano mais popular.
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publicado</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Torna o plano visível no site.
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 'published'}
                      onCheckedChange={(checked) => 
                        field.onChange(checked ? 'published' : 'draft')
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
