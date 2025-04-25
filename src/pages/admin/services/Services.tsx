
import React, { useState } from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import ServicesList from '@/components/admin/services/ServicesList';
import ServiceEditor from '@/components/admin/services/ServiceEditor';
import CategoriesManager from '@/components/admin/services/CategoriesManager';
import { Service, ServiceCategory, mockServices, mockServiceCategories } from '@/types/service';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [services, setServices] = useState<Service[]>(mockServices);
  const [categories, setCategories] = useState<ServiceCategory[]>(mockServiceCategories);
  
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
  
  const handleSaveService = (service: Service) => {
    if (services.find(s => s.id === service.id)) {
      // Update existing
      setServices(services.map(s => s.id === service.id ? service : s));
    } else {
      // Add new
      setServices([...services, service]);
    }
    setIsEditorOpen(false);
  };
  
  const handleDeleteService = (serviceId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setServices(services.filter(s => s.id !== serviceId));
      toast.success('Serviço excluído com sucesso!');
    }
  };
  
  const handleViewService = (service: Service) => {
    setViewingService(service);
    setIsViewDialogOpen(true);
  };
  
  const handleToggleFeatured = (serviceId: number) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          featured: !service.featured
        };
      }
      return service;
    }));
    
    const service = services.find(s => s.id === serviceId);
    if (service) {
      toast.success(`Serviço ${service.featured ? 'removido dos' : 'adicionado aos'} destaques!`);
    }
  };
  
  const handleReorderService = (serviceId: number, direction: 'up' | 'down') => {
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) return;
    
    const newServices = [...services];
    
    if (direction === 'up' && serviceIndex > 0) {
      // Move up
      newServices[serviceIndex].order--;
      newServices[serviceIndex - 1].order++;
    } else if (direction === 'down' && serviceIndex < services.length - 1) {
      // Move down
      newServices[serviceIndex].order++;
      newServices[serviceIndex + 1].order--;
    }
    
    // Re-sort based on order
    newServices.sort((a, b) => a.order - b.order);
    setServices(newServices);
  };
  
  const handleSaveCategories = (updatedCategories: ServiceCategory[]) => {
    setCategories(updatedCategories);
  };
  
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sem categoria';
  };
  
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
            onSave={handleSaveCategories}
          />
        </TabsContent>
      </Tabs>
      
      {/* Service Editor Dialog */}
      {isEditorOpen && (
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <ServiceEditor
              service={currentService}
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
                    {getCategoryName(viewingService.categoryId)}
                  </span>
                  {viewingService.featured && (
                    <span className="text-yellow-500 text-sm flex items-center">
                      <PlusCircle className="h-3 w-3 mr-1" /> 
                      Em destaque
                    </span>
                  )}
                </div>
              </div>
              
              {viewingService.coverImage && (
                <div className="rounded-md overflow-hidden h-60">
                  <img 
                    src={viewingService.coverImage} 
                    alt={viewingService.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <p className="text-muted-foreground">{viewingService.shortDescription}</p>
                
                <div 
                  className="prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: viewingService.content }}
                />
              </div>
              
              {viewingService.benefits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefícios</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {viewingService.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {viewingService.technologies.length > 0 && (
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
