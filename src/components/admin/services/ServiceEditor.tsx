
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem 
} from '@/components/ui/select';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { Service, ServiceCategory, ServiceComplexity, ServiceStatus } from '@/stores/servicesStore';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface ServiceEditorProps {
  service?: Service;
  categories: ServiceCategory[];
  onSave: (service: Partial<Service>) => void;
  onCancel: () => void;
}

const ServiceEditor: React.FC<ServiceEditorProps> = ({ 
  service, categories, onSave, onCancel 
}) => {
  const isNewService = !service;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>(() => {
    const maxOrder = Math.max(...(categories.map(c => c.order_position) || [0]), 0);
    return service || {
      title: '',
      slug: '',
      category_id: categories[0]?.id || 1,
      short_description: '',
      content: '',
      benefits: [],
      technologies: [],
      complexity: 'basic' as ServiceComplexity,
      status: 'draft' as ServiceStatus,
      featured: false,
      order_position: maxOrder + 1,
      cover_image: null,
    };
  });
  
  const [newBenefit, setNewBenefit] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  
  const handleChange = (field: keyof Service, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug when title changes
    if (field === 'title') {
      setFormData(prev => ({ ...prev, slug: slugify(value) }));
    }
  };
  
  const handleQuillChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };
  
  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    setFormData(prev => ({
      ...prev,
      benefits: [...(prev.benefits || []), newBenefit]
    }));
    setNewBenefit('');
  };
  
  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: (prev.benefits || []).filter((_, i) => i !== index)
    }));
  };
  
  const addTechnology = () => {
    if (!newTechnology.trim()) return;
    setFormData(prev => ({
      ...prev,
      technologies: [...(prev.technologies || []), newTechnology]
    }));
    setNewTechnology('');
  };
  
  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate required fields
    if (!formData.title || !formData.short_description || !formData.content) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isNewService ? 'Novo Serviço' : 'Editar Serviço'}</CardTitle>
          <CardDescription>
            Preencha os detalhes do serviço para exibição no site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Serviço*</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)*</Label>
                <Input
                  id="slug"
                  value={formData.slug || ''}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  URL amigável para o serviço, gerada automaticamente a partir do título.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria*</Label>
                <Select 
                  value={formData.category_id?.toString()}
                  onValueChange={(value) => handleChange('category_id', parseInt(value, 10))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="complexity">Nível de Complexidade*</Label>
                <Select 
                  value={formData.complexity}
                  onValueChange={(value) => handleChange('complexity', value as ServiceComplexity)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a complexidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status*</Label>
                <Select 
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value as ServiceStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="featured"
                checked={formData.featured || false}
                onCheckedChange={(checked) => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">Destacar na página inicial</Label>
            </div>
          </div>
          
          {/* Imagem de Capa */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Imagem de Capa</h3>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">URL da Imagem de Capa</Label>
              <Input
                id="coverImage"
                value={formData.cover_image || ''}
                onChange={(e) => handleChange('cover_image', e.target.value || null)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              
              {formData.cover_image && (
                <div className="mt-2 relative rounded-md overflow-hidden h-40">
                  <img 
                    src={formData.cover_image} 
                    alt="Prévia da imagem de capa" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Descrições */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Descrições</h3>
            
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Descrição Curta*</Label>
              <Textarea
                id="shortDescription"
                value={formData.short_description || ''}
                onChange={(e) => handleChange('short_description', e.target.value)}
                rows={2}
                placeholder="Uma breve descrição do serviço (exibida na listagem)"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo Completo*</Label>
              <div className="min-h-[200px]">
                <ReactQuill
                  theme="snow"
                  value={formData.content || ''}
                  onChange={handleQuillChange}
                  modules={modules}
                  formats={formats}
                  className="h-64"
                />
              </div>
            </div>
          </div>
          
          {/* Benefícios */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Benefícios</h3>
            
            <div className="flex gap-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Adicionar novo benefício"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
              />
              <Button 
                type="button"
                onClick={addBenefit}
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
            
            <div className="space-y-2">
              {(formData.benefits || []).map((benefit, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                  <span>{benefit}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeBenefit(index)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {(formData.benefits || []).length === 0 && (
                <p className="text-muted-foreground text-sm">
                  Nenhum benefício adicionado ainda.
                </p>
              )}
            </div>
          </div>
          
          {/* Tecnologias */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tecnologias</h3>
            
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Adicionar nova tecnologia"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button 
                type="button"
                onClick={addTechnology}
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(formData.technologies || []).map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-vsa-teal/10 text-vsa-teal px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="text-vsa-teal hover:text-vsa-teal-dark"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {(formData.technologies || []).length === 0 && (
                <p className="text-muted-foreground text-sm">
                  Nenhuma tecnologia adicionada ainda.
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            {isNewService ? 'Criar Serviço' : 'Salvar Alterações'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ServiceEditor;
