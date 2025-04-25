
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';
import { PortfolioItem, PortfolioItemEditor } from './PortfolioItemEditor';
import { PortfolioItemViewer } from './PortfolioItemViewer';
import { toast } from 'sonner';

// Initial portfolio data
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Portal Corporativo',
    description: 'Desenvolvimento de portal corporativo com intranet para uma grande empresa de tecnologia.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'web',
    detailedDescription: 'Projeto completo de portal corporativo incluindo área pública, intranet segura e sistema de gestão de conteúdo personalizado. Implementação de autenticação integrada com Active Directory, dashboards personalizados e ferramentas colaborativas.',
    technologies: ['React', 'Node.js', 'SQL Server', 'Azure AD'],
    client: 'TechCorp Solutions',
    completionDate: '2023-05-15',
    url: 'https://exemplo.com/portal',
    enabled: true
  },
  {
    id: 2,
    title: 'ERP para Indústria',
    description: 'Implementação de sistema ERP para gestão de processos industriais.',
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa2e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXJwfGVufDB8fDB8fHww',
    category: 'erp',
    detailedDescription: 'Customização e implantação de sistema ERP para controle de produção, estoque, vendas e finanças. Integração com sistemas legados e desenvolvimento de módulos específicos para o setor industrial.',
    technologies: ['SAP', 'Oracle Database', 'C#', '.NET'],
    client: 'Indústrias Metalúrgicas Brasil',
    completionDate: '2022-11-30',
    url: 'https://exemplo.com/erp-case',
    enabled: true
  },
  {
    id: 3,
    title: 'Migração para Cloud',
    description: 'Projeto de migração de infraestrutura on-premise para ambiente AWS.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fHww',
    category: 'cloud',
    detailedDescription: 'Migração completa de infraestrutura local para a nuvem AWS, incluindo redesenho da arquitetura para aproveitar serviços gerenciados, implementação de CI/CD e automação de infraestrutura.',
    technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    client: 'Finantech Serviços',
    completionDate: '2023-02-20',
    url: 'https://exemplo.com/cloud-migration',
    enabled: true
  },
  {
    id: 4,
    title: 'App Mobile B2B',
    description: 'Desenvolvimento de aplicativo mobile para gestão de vendas B2B.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww',
    category: 'app',
    detailedDescription: 'Aplicativo mobile multiplataforma para força de vendas com funcionalidades offline, catálogo de produtos, emissão de pedidos e relatórios em tempo real.',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    client: 'Distribuidora Nacional',
    completionDate: '2023-08-10',
    url: 'https://exemplo.com/app-b2b',
    enabled: true
  },
  {
    id: 5,
    title: 'E-commerce Completo',
    description: 'Plataforma completa de e-commerce com integração a ERPs e gateways de pagamento.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
    category: 'web',
    detailedDescription: 'Desenvolvimento de plataforma de e-commerce personalizada com integração a múltiplos ERPs, gateways de pagamento e operadores logísticos. Sistema completo de gestão de pedidos, estoque e clientes.',
    technologies: ['Next.js', 'Strapi', 'PostgreSQL', 'Stripe'],
    client: 'Varejo Fashion Store',
    completionDate: '2023-07-05',
    url: 'https://exemplo.com/ecommerce',
    enabled: true
  },
  {
    id: 6,
    title: 'Segurança Corporativa',
    description: 'Implementação de políticas de segurança e sistemas de proteção contra ataques.',
    image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'security',
    detailedDescription: 'Auditoria completa de segurança, implementação de políticas de proteção, firewall de próxima geração, sistema de detecção e prevenção de intrusões, e treinamento de equipes.',
    technologies: ['Fortinet', 'Splunk', 'Kali Linux', 'Active Directory'],
    client: 'Banco Regional',
    completionDate: '2023-04-18',
    url: 'https://exemplo.com/security-case',
    enabled: false
  },
];

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
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const handleCreateNew = () => {
    const newItem: PortfolioItem = {
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      category: 'web',
      enabled: true
    };
    setCurrentItem(newItem);
    setIsEditorOpen(true);
  };
  
  const handleEdit = (item: PortfolioItem) => {
    setCurrentItem({...item});
    setIsEditorOpen(true);
  };
  
  const handleSave = (item: PortfolioItem) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (portfolioItems.some(i => i.id === item.id)) {
        // Update existing item
        setPortfolioItems(portfolioItems.map(i => 
          i.id === item.id ? item : i
        ));
        toast.success('Item do portfólio atualizado com sucesso!');
      } else {
        // Add new item
        setPortfolioItems([...portfolioItems, item]);
        toast.success('Item do portfólio criado com sucesso!');
      }
      
      setIsEditorOpen(false);
      setCurrentItem(null);
      setIsLoading(false);
    }, 500);
  };
  
  const handleToggleEnabled = (id: number, enabled: boolean) => {
    setPortfolioItems(portfolioItems.map(item => 
      item.id === id ? {...item, enabled} : item
    ));
    
    toast.success(`Item ${enabled ? 'ativado' : 'desativado'} com sucesso!`);
  };
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);
    
  const categories = Array.from(
    new Set(['all', ...portfolioItems.map(item => item.category)])
  );
  
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
