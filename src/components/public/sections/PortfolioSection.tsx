
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  detailedDescription?: string;
  technologies?: string[];
  client?: string;
  completionDate?: string;
  url?: string;
  enabled: boolean;
}

// Use only enabled portfolio items in the public view
const portfolioItems: PortfolioItem[] = [
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
].filter(item => item.enabled);

const PortfolioSection: React.FC = () => {
  const categories = ['all', 'web', 'erp', 'cloud', 'app', 'security'];
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
  const filteredItems = portfolioItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );
  
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Nosso Portfólio</h2>
          <p className="section-subtitle">
            Conheça alguns dos nossos principais projetos e casos de sucesso
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex justify-center">
            <TabsList className="bg-gray-100 p-1">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'Todos' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Button 
                        className="bg-vsa-teal hover:bg-vsa-teal-dark"
                        onClick={() => setSelectedItem(item)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-vsa-blue">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    
                    {item.client && (
                      <div className="mt-3 flex items-center text-sm">
                        <span className="font-medium mr-1">Cliente:</span> {item.client}
                      </div>
                    )}
                    
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-sm text-vsa-teal hover:underline"
                      >
                        Visitar projeto <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredItems.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Não há projetos disponíveis nesta categoria.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-60 md:h-80">
                <img 
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2"
                  onClick={() => setSelectedItem(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="mb-4">{selectedItem.description}</p>
                
                {selectedItem.detailedDescription && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Descrição Detalhada</h4>
                    <p className="text-gray-700">{selectedItem.detailedDescription}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {selectedItem.client && (
                    <div>
                      <h4 className="font-semibold">Cliente</h4>
                      <p>{selectedItem.client}</p>
                    </div>
                  )}
                  
                  {selectedItem.completionDate && (
                    <div>
                      <h4 className="font-semibold">Data de Conclusão</h4>
                      <p>{new Date(selectedItem.completionDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  )}
                </div>
                
                {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-vsa-teal/10 text-vsa-teal px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedItem.url && (
                  <div className="mt-4">
                    <a 
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-vsa-teal text-white px-4 py-2 rounded hover:bg-vsa-teal-dark transition-colors"
                    >
                      Visitar Projeto <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
