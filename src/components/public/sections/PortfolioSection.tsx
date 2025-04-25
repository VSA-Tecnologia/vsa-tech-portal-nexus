
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Portal Corporativo',
    description: 'Desenvolvimento de portal corporativo com intranet para uma grande empresa de tecnologia.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'web',
  },
  {
    id: 2,
    title: 'ERP para Indústria',
    description: 'Implementação de sistema ERP para gestão de processos industriais.',
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa2e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXJwfGVufDB8fDB8fHww',
    category: 'erp',
  },
  {
    id: 3,
    title: 'Migração para Cloud',
    description: 'Projeto de migração de infraestrutura on-premise para ambiente AWS.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fHww',
    category: 'cloud',
  },
  {
    id: 4,
    title: 'App Mobile B2B',
    description: 'Desenvolvimento de aplicativo mobile para gestão de vendas B2B.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww',
    category: 'app',
  },
  {
    id: 5,
    title: 'E-commerce Completo',
    description: 'Plataforma completa de e-commerce com integração a ERPs e gateways de pagamento.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
    category: 'web',
  },
  {
    id: 6,
    title: 'Segurança Corporativa',
    description: 'Implementação de políticas de segurança e sistemas de proteção contra ataques.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
    category: 'security',
  },
];

const PortfolioSection: React.FC = () => {
  const categories = ['all', 'web', 'erp', 'cloud', 'app', 'security'];
  const [activeCategory, setActiveCategory] = useState('all');
  
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
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map(item => (
                  <div 
                    key={item.id}
                    className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <Button className="bg-vsa-teal hover:bg-vsa-teal-dark">Ver detalhes</Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-vsa-blue">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
