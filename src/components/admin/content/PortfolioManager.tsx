
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import { PortfolioItemViewer } from './PortfolioItemViewer';
import { toast } from 'sonner';
import { usePortfolioStore, useHydratedPortfolioStore, type PortfolioItem } from '@/stores/portfolioStore';

interface PortfolioManagerProps {
  sectionContent: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    enabled: boolean;
  };
  onUpdateSectionContent: (content: any) => void;
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  sectionContent,
  onUpdateSectionContent
}) => {
  // Use the portfolio store
  const { 
    items: portfolioItems, 
    loading,
    fetchItems,
    createItem,
    updateItem,
    toggleEnabled
  } = usePortfolioStore();
  const isHydrated = useHydratedPortfolioStore();
  
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Force update when component mounts to ensure sync between admin and public views
  useEffect(() => {
    if (isHydrated) {
      console.log("PortfolioManager: Initial sync of portfolio data");
      fetchItems();
    }
  }, [isHydrated, fetchItems]);
  
  // Ensure we update the section content whenever the portfolio items change
  useEffect(() => {
    if (isHydrated) {
      // This ensures the section content is updated with the latest state from the store
      onUpdateSectionContent({
        ...sectionContent,
        // Add a timestamp to force the parent component to recognize the change
        lastUpdate: new Date().toISOString()
      });
      
      console.log("PortfolioManager: Updated section content due to portfolio changes");
    }
  }, [portfolioItems, isHydrated, sectionContent, onUpdateSectionContent]);
  
  const handleCreateNew = () => {
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
    setCurrentItem(newItem);
    setIsEditorOpen(true);
  };
  
  const handleEdit = (item: PortfolioItem) => {
    setCurrentItem({...item});
    setIsEditorOpen(true);
  };
  
  const handleSave = async (item: PortfolioItem) => {
    setIsLoading(true);
    
    try {
      if (portfolioItems.some(i => i.id === item.id)) {
        // Update existing item
        await updateItem(item.id, item);
        toast.success('Item do portfólio atualizado com sucesso!');
        console.log("Portfolio item updated:", item.id, item.title);
      } else {
        // Add new item
        await createItem(item);
        toast.success('Item do portfólio criado com sucesso!');
        console.log("New portfolio item created:", item.title);
      }
      
      setIsEditorOpen(false);
      setCurrentItem(null);
      
      // Force update of section content to parent
      onUpdateSectionContent({
        ...sectionContent,
        lastUpdate: new Date().toISOString()
      });
    } catch (error) {
      toast.error('Erro ao salvar item do portfólio');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggleEnabled = async (id: number, enabled: boolean) => {
    await toggleEnabled(id);
    toast.success(`Item ${enabled ? 'ativado' : 'desativado'} com sucesso!`);
    console.log("Toggled item enabled state:", id, enabled);
    
    // Force update of section content to parent
    onUpdateSectionContent({
      ...sectionContent,
      lastUpdate: new Date().toISOString()
    });
  };
  
  // If the store is not hydrated yet, use the items from it once it is
  useEffect(() => {
    if (!isHydrated) {
      console.log("Portfolio store is hydrating...");
    } else {
      console.log("Portfolio store hydrated with", portfolioItems.length, "items");
    }
  }, [isHydrated, portfolioItems.length]);
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);
    
  const categories = Array.from(
    new Set(['all', ...portfolioItems.map(item => item.category)])
  );
  
  if (loading) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-vsa-teal" />
        <p className="mt-2 text-gray-500">Carregando portfólio...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Gerenciar Seção de Portfólio</h3>
        
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                {category === 'all' ? 'Todos' : category}
              </Button>
            ))}
          </div>
          
          <Button onClick={handleCreateNew} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Item
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <PortfolioItemViewer
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onToggleEnabled={handleToggleEnabled}
            />
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500">
              Nenhum item encontrado nesta categoria.
            </div>
          )}
        </div>
      </Card>
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {currentItem && (
            <>
              <h3 className="text-lg font-medium mb-4">
                {portfolioItems.some(i => i.id === currentItem.id)
                  ? 'Editar Item do Portfólio'
                  : 'Novo Item do Portfólio'
                }
              </h3>
              
              {isLoading ? (
                <div className="py-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-vsa-teal" />
                  <p className="mt-2 text-gray-500">Processando...</p>
                </div>
              ) : (
                <PortfolioItemEditor 
                  item={currentItem}
                  onSave={handleSave}
                  onCancel={() => setIsEditorOpen(false)}
                />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManager;
