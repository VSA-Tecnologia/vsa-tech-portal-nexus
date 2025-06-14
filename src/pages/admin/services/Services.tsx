
import React, { useState } from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import ServicesList from '@/components/admin/services/ServicesList';
import ServiceEditor from '@/components/admin/services/ServiceEditor';
import CategoriesManager from '@/components/admin/services/CategoriesManager';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/types/service';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const {
    services,
    categories,
    isLoading,
    error,
    createService,
    updateService,
    deleteService,
    toggleServiceFeatured,
    reorderService
  } = useServices();
  
  const [currentService, setCurrentService] = useState<Service | undefined>(undefined);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  
  const handleCreateNew = () => {
    setCurrentService(undefined);
    setIsEditorOpen(true);
  };
  
  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsEditorOpen(true);
  };
  
  const handleSaveService = async (serviceData: any) => {
    try {
      if (currentService) {
        // Update existing
        await updateService(currentService.id, serviceData);
        toast.success('Serviço atualizado com sucesso!');
      } else {
        // Create new
        await createService(serviceData);
        toast.success('Serviço criado com sucesso!');
      }
      setIsEditorOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Erro ao salvar serviço. Tente novamente.');
    }
  };
  
  const handleDeleteService = async (serviceId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await deleteService(serviceId);
        toast.success('Serviço excluído com sucesso!');
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Erro ao excluir serviço. Tente novamente.');
      }
    }
  };
  
  const handleViewService = (service: Service) => {
    setViewingService(service);
    setIsViewDialogOpen(true);
  };
  
  const handleToggleFeatured = async (serviceId: number) => {
    try {
      await toggleServiceFeatured(serviceId);
      const service = services.find(s => s.id === serviceId);
      toast.success(`Serviço ${service?.featured ? 'removido dos' : 'adicionado aos'} destaques!`);
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Erro ao alterar destaque. Tente novamente.');
    }
  };
  
  const handleReorderService = async (serviceId: number, direction: 'up' | 'down') => {
    try {
      await reorderService(serviceId, direction);
    } catch (error) {
      console.error('Error reordering service:', error);
      toast.error('Erro ao reordenar serviço. Tente novamente.');
    }
  };
  
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sem categoria';
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Erro ao carregar serviços</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Serviços</h1>
        <p className="text-muted-foreground">
          Gerencie os serviços exibidos no seu site, com visualizações, categorias e organização.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Serviços</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <ServicesList 
            services={services}
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDeleteService}
            onView={handleViewService}
            onToggleFeatured={handleToggleFeatured}
            onCreateNew={handleCreateNew}
            onReorder={handleReorderService}
          />
        </TabsContent>
        
        <TabsContent value="categories">
          <CategoriesManager 
            categories={categories}
            onSave={() => {
              // Categories are managed in real-time through the store
              toast.success('Categorias atualizadas com sucesso!');
            }}
          />
        </TabsContent>
      </Tabs>
      
      {/* Service Editor Dialog */}
      {isEditorOpen && (
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <ServiceEditor
              service={currentService}
              categories={categories}
              onSave={handleSaveService}
              onCancel={() => setIsEditorOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Service View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingService && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{viewingService.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted-foreground">
                    {getCategoryName(viewingService.category_id)}
                  </span>
                  {viewingService.featured && (
                    <span className="text-yellow-500 text-sm flex items-center">
                      <PlusCircle className="h-3 w-3 mr-1" /> 
                      Em destaque
                    </span>
                  )}
                </div>
              </div>
              
              {viewingService.cover_image && (
                <div className="rounded-md overflow-hidden h-60">
                  <img 
                    src={viewingService.cover_image} 
                    alt={viewingService.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <p className="text-muted-foreground">{viewingService.short_description}</p>
                
                <div 
                  className="prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: viewingService.content }}
                />
              </div>
              
              {viewingService.benefits && viewingService.benefits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefícios</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {viewingService.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {viewingService.technologies && viewingService.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tecnologias</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingService.technologies.map((tech, index) => (
                      <div 
                        key={index}
                        className="bg-vsa-teal/10 text-vsa-teal px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
