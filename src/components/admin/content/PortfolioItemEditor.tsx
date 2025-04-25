
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { PortfolioItem } from '@/stores/portfolioStore';

interface PortfolioItemEditorProps {
  item: PortfolioItem;
  onSave: (item: PortfolioItem) => void;
  onCancel: () => void;
}

export const PortfolioItemEditor: React.FC<PortfolioItemEditorProps> = ({
  item,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<PortfolioItem>({...item});
  
  const handleChange = (field: keyof PortfolioItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      toast.error('O título é obrigatório');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('A descrição é obrigatória');
      return;
    }
    
    if (!formData.image.trim()) {
      toast.error('A URL da imagem é obrigatória');
      return;
    }
    
    onSave(formData);
    toast.success('Item do portfólio salvo com sucesso!');
  };

  const categories = [
    'all', 'web', 'erp', 'cloud', 'app', 'security'
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Título do projeto"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'Todos' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição Breve</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Breve descrição do projeto"
            required
            rows={2}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="detailedDescription">Descrição Detalhada</Label>
          <Textarea
            id="detailedDescription"
            value={formData.detailedDescription || ''}
            onChange={(e) => handleChange('detailedDescription', e.target.value)}
            placeholder="Descrição detalhada do projeto"
            rows={4}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="image">URL da Imagem</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.image && (
            <div className="mt-2 rounded-md overflow-hidden h-40 bg-gray-100">
              <img 
                src={formData.image} 
                alt="Prévia" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400?text=Imagem+Inválida';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="client">Cliente</Label>
          <Input
            id="client"
            value={formData.client || ''}
            onChange={(e) => handleChange('client', e.target.value)}
            placeholder="Nome do cliente (opcional)"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="completionDate">Data de Conclusão</Label>
          <Input
            id="completionDate"
            type="date"
            value={formData.completionDate || ''}
            onChange={(e) => handleChange('completionDate', e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="url">URL do Projeto</Label>
          <Input
            id="url"
            type="url"
            value={formData.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="https://exemplo.com"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => handleChange('enabled', checked)}
          />
          <Label htmlFor="enabled">Ativo</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" className="bg-vsa-teal hover:bg-vsa-teal-dark">
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </form>
  );
};
