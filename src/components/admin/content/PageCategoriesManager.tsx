
import React, { useState } from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageCategory } from '@/types/page';
import { Pencil, Trash2, Plus, X, Save, Loader2 } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

interface PageCategoriesManagerProps {
  categories: PageCategory[];
  onSave: (categories: PageCategory[]) => void;
  onBack: () => void;
}

export const PageCategoriesManager: React.FC<PageCategoriesManagerProps> = ({
  categories,
  onSave,
  onBack
}) => {
  const [localCategories, setLocalCategories] = useState<PageCategory[]>(categories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleEdit = (category: PageCategory) => {
    setEditingId(category.id);
  };
  
  const handleDelete = (id: number) => {
    setLocalCategories(localCategories.filter(cat => cat.id !== id));
    toast.success('Categoria removida.');
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  const handleChange = (id: number, field: keyof PageCategory, value: string) => {
    setLocalCategories(cats => cats.map(cat => {
      if (cat.id === id) {
        const updatedCategory = { ...cat, [field]: value };
        
        // Auto-generate slug when name changes
        if (field === 'name') {
          updatedCategory.slug = slugify(value);
        }
        
        return updatedCategory;
      }
      return cat;
    }));
  };
  
  const handleNewCategoryNameChange = (value: string) => {
    setNewCategory({
      name: value,
      slug: slugify(value)
    });
  };
  
  const handleNewCategorySlugChange = (value: string) => {
    setNewCategory({
      ...newCategory,
      slug: value
    });
  };
  
  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error('O nome da categoria é obrigatório.');
      return;
    }
    
    const newId = Math.max(...localCategories.map(c => c.id), 0) + 1;
    
    const newCategoryObj: PageCategory = {
      id: newId,
      name: newCategory.name,
      slug: newCategory.slug || slugify(newCategory.name)
    };
    
    setLocalCategories([...localCategories, newCategoryObj]);
    setNewCategory({ name: '', slug: '' });
    toast.success('Categoria adicionada com sucesso!');
  };
  
  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(localCategories);
      setIsLoading(false);
      setEditingId(null);
      toast.success('Categorias salvas com sucesso!');
    }, 800);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Categorias de Páginas</CardTitle>
            <CardDescription>
              Crie, edite e remova categorias para suas páginas
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Categorias Existentes</h3>
          
          <div className="space-y-2">
            {localCategories.map(category => (
              <div 
                key={category.id}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
              >
                {editingId === category.id ? (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`name-${category.id}`} className="sr-only">
                        Nome
                      </Label>
                      <Input
                        id={`name-${category.id}`}
                        value={category.name}
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
                        value={category.slug}
                        onChange={(e) => handleChange(category.id, 'slug', e.target.value)}
                        placeholder="Slug (URL)"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500 ml-2">/{category.slug}</span>
                  </div>
                )}
                
                <div className="flex gap-2 ml-4">
                  {editingId === category.id ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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
            ))}
            
            {localCategories.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Nenhuma categoria adicionada.
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Adicionar Nova Categoria</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-category-name">Nome</Label>
              <Input
                id="new-category-name"
                value={newCategory.name}
                onChange={(e) => handleNewCategoryNameChange(e.target.value)}
                placeholder="Ex: Blog"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-category-slug">Slug (URL)</Label>
              <Input
                id="new-category-slug"
                value={newCategory.slug}
                onChange={(e) => handleNewCategorySlugChange(e.target.value)}
                placeholder="Ex: blog"
              />
              <p className="text-xs text-gray-500">
                URL amigável gerada automaticamente a partir do nome.
              </p>
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={handleAddCategory}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Categoria
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="ml-auto" 
          onClick={handleSaveChanges}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
};
