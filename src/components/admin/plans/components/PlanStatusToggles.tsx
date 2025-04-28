
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface PlanStatusTogglesProps {
  form: UseFormReturn<any>;
}

const PlanStatusToggles: React.FC<PlanStatusTogglesProps> = ({ form }) => {
  return (
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
  );
};

export default PlanStatusToggles;
