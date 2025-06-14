
import React, { useState } from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ServiceCategory } from '@/stores/servicesStore';
import { useServicesStore } from '@/stores/servicesStore';
import { Pencil, Trash2, Plus, X, Save, Loader2 } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface CategoriesManagerProps {
  categories: ServiceCategory[];
  onSave: (categories: ServiceCategory[]) => void;
}

const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  onSave
}) => {
  const { createCategory, updateCategory, deleteCategory } = useServicesStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [editingData, setEditingData] = useState<Record<number, Partial<ServiceCategory>>>({});
  
  const handleEdit = (category: ServiceCategory) => {
    setEditingId(category.id);
    setEditingData(prev => ({
      ...prev,
      [category.id]: { ...category }
    }));
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await deleteCategory(id);
        toast.success('Categoria removida com sucesso!');
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Erro ao remover categoria. Tente novamente.');
      }
    }
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData(prev => {
      const newData = { ...prev };
      if (editingId) {
        delete newData[editingId];
      }
      return newData;
    });
  };
  
  const handleSaveEdit = async (id: number) => {
    const data = editingData[id];
    if (!data || !data.name?.trim()) {
      toast.error('O nome da categoria é obrigatório.');
      return;
    }
    
    try {
      setIsLoading(true);
      await updateCategory(id, {
        name: data.name,
        slug: data.slug || slugify(data.name),
        description: data.description || null
      });
      
      setEditingId(null);
      setEditingData(prev => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });
      
      toast.success('Categoria atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Erro ao atualizar categoria. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (id: number, field: keyof ServiceCategory, value: string) => {
    setEditingData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
        // Auto-generate slug when name changes
        ...(field === 'name' ? { slug: slugify(value) } : {})
      }
    }));
  };
  
  const handleNewCategoryNameChange = (value: string) => {
    setNewCategory({
      ...newCategory,
      name: value,
      slug: slugify(value)
    });
  };
  
  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error('O nome da categoria é obrigatório.');
      return;
    }
    
    try {
      setIsLoading(true);
      const maxOrder = Math.max(...categories.map(c => c.order_position), 0);
      
      await createCategory({
        name: newCategory.name,
        slug: newCategory.slug || slugify(newCategory.name),
        description: newCategory.description || null,
        order_position: maxOrder + 1,
        enabled: true
      });
      
      setNewCategory({ name: '', slug: '', description: '' });
      toast.success('Categoria adicionada com sucesso!');
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Erro ao criar categoria. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Categorias</CardTitle>
        <CardDescription>
          Crie, edite e remova categorias para seus serviços
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Categorias Existentes</h3>
          
          <div className="space-y-2">
            {categories.map(category => {
              const isEditing = editingId === category.id;
              const editData = editingData[category.id] || category;
              
              return (
                <div 
                  key={category.id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                >
                  {isEditing ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor={`name-${category.id}`} className="sr-only">
                          Nome
                        </Label>
                        <Input
                          id={`name-${category.id}`}
                          value={editData.name || ''}
                          onChange={(e) => handleChange(category.id, 'name', e.target.value)}
                          placeholder="Nome da categoria"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`slug-${category.id}`} className="sr-only">
                          Slug
                        </Label>
                        <Input
                          id={`slug-${category.id}`}
                          value={editData.slug || ''}
                          onChange={(e) => handleChange(category.id, 'slug', e.target.value)}
                          placeholder="Slug (URL)"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${category.id}`} className="sr-only">
                          Descrição
                        </Label>
                        <Input
                          id={`description-${category.id}`}
                          value={editData.description || ''}
                          onChange={(e) => handleChange(category.id, 'description', e.target.value)}
                          placeholder="Descrição (opcional)"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500 ml-2">/{category.slug}</span>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2 ml-4">
                    {isEditing ? (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSaveEdit(category.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {categories.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Nenhuma categoria adicionada.
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Adicionar Nova Categoria</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-category-name">Nome</Label>
              <Input
                id="new-category-name"
                value={newCategory.name}
                onChange={(e) => handleNewCategoryNameChange(e.target.value)}
                placeholder="Ex: Desenvolvimento Mobile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-category-slug">Slug (URL)</Label>
              <Input
                id="new-category-slug"
                value={newCategory.slug}
                onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="Ex: desenvolvimento-mobile"
              />
              <p className="text-xs text-gray-500">
                URL amigável gerada automaticamente a partir do nome.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-category-description">Descrição</Label>
              <Input
                id="new-category-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição da categoria (opcional)"
              />
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={handleAddCategory}
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
            Adicionar Categoria
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesManager;
