
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Eye, Pencil, Trash2, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { toast } from 'sonner';
import { PortfolioItemEditorDialog } from '@/components/admin/content/PortfolioItemEditorDialog';
import { PortfolioItemViewerDialog } from '@/components/admin/content/PortfolioItemViewerDialog';
import type { PortfolioItem } from '@/stores/portfolioStore';

const Portfolio: React.FC = () => {
  const { 
    items, 
    loading, 
    fetchItems, 
    createItem,
    updateItem,
    deleteItem, 
    toggleEnabled 
  } = usePortfolioStore();
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = () => {
    const newItem: PortfolioItem = {
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      category: 'web',
      enabled: true,
      detailed_description: null,
      technologies: null,
      client: null,
      completion_date: null,
      url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSelectedItem(newItem);
    setIsCreating(true);
    setIsEditorOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsCreating(false);
    setIsEditorOpen(true);
  };

  const handleView = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsViewerOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item do portfólio?')) {
      const result = await deleteItem(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Item removido com sucesso!');
      }
    }
  };

  const handleToggleEnabled = async (id: number) => {
    const result = await toggleEnabled(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      const item = items.find(i => i.id === id);
      toast.success(`Item ${item?.enabled ? 'desabilitado' : 'habilitado'} com sucesso!`);
    }
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
    setSelectedItem(null);
    setIsCreating(false);
  };

  const handleViewerClose = () => {
    setIsViewerOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (item: PortfolioItem) => {
    try {
      if (isCreating) {
        await createItem(item);
        toast.success('Item criado com sucesso!');
      } else {
        await updateItem(item.id, item);
        toast.success('Item atualizado com sucesso!');
      }
      handleEditorClose();
    } catch (error) {
      toast.error('Erro ao salvar item');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Portfólio</h1>
            <p className="text-muted-foreground">
              Gerencie os projetos que aparecem no seu portfólio
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfólio</h1>
          <p className="text-muted-foreground">
            Gerencie os projetos que aparecem no seu portfólio
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{items.length}</div>
            <div className="text-sm text-muted-foreground">Total de Projetos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {items.filter(item => item.enabled).length}
            </div>
            <div className="text-sm text-muted-foreground">Projetos Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {new Set(items.map(item => item.category)).size}
            </div>
            <div className="text-sm text-muted-foreground">Categorias</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {items.filter(item => item.completion_date && 
                new Date(item.completion_date).getFullYear() === new Date().getFullYear()
              ).length}
            </div>
            <div className="text-sm text-muted-foreground">Este Ano</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Items Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(item)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleEnabled(item.id)}>
                        <span className="mr-2 h-4 w-4">
                          {item.enabled ? '👁️' : '🙈'}
                        </span>
                        {item.enabled ? 'Desabilitar' : 'Habilitar'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="absolute top-2 left-2">
                  <Badge variant={item.enabled ? "default" : "secondary"}>
                    {item.enabled ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">
                    {item.category}
                  </Badge>
                  {item.completion_date && (
                    <Badge variant="secondary">
                      {new Date(item.completion_date).getFullYear()}
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                {item.client && (
                  <p className="text-xs text-muted-foreground">
                    Cliente: {item.client}
                  </p>
                )}
                
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {item.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto adicionado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Comece adicionando seu primeiro projeto ao portfólio.
            </p>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Projeto
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <PortfolioItemEditorDialog
        isOpen={isEditorOpen}
        onClose={handleEditorClose}
        item={selectedItem}
        isCreating={isCreating}
        onSave={handleSave}
      />

      <PortfolioItemViewerDialog
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
        item={selectedItem}
      />
    </div>
  );
};

export default Portfolio;
