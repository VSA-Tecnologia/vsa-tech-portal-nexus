
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Cloud, Server, Database, Wifi, HardDrive, Archive, Signal } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlanServiceTypeSelectorProps {
  form: UseFormReturn<any>;
}

const PlanServiceTypeSelector: React.FC<PlanServiceTypeSelectorProps> = ({ form }) => {
  return (
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
              <SelectItem value="archive">
                <div className="flex items-center">
                  <Archive className="h-4 w-4 mr-2" /> Backup
                </div>
              </SelectItem>
              <SelectItem value="signal">
                <div className="flex items-center">
                  <Signal className="h-4 w-4 mr-2" /> Hotspot
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PlanServiceTypeSelector;
