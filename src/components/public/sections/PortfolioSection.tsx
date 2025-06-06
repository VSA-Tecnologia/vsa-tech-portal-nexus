
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolioStore';

const PortfolioSection: React.FC = () => {
  const { items, loading, fetchEnabledItems } = usePortfolioStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  
  useEffect(() => {
    fetchEnabledItems();
  }, [fetchEnabledItems]);
  
  const categories = ['all', 'web', 'erp', 'cloud', 'app', 'security'];
  
  const filteredItems = items.filter(
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
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-vsa-teal border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando projetos...</p>
          </div>
        ) : (
          <>
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
                    
                    {selectedItem.detailed_description && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Descrição Detalhada</h4>
                        <p className="text-gray-700">{selectedItem.detailed_description}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {selectedItem.client && (
                        <div>
                          <h4 className="font-semibold">Cliente</h4>
                          <p>{selectedItem.client}</p>
                        </div>
                      )}
                      
                      {selectedItem.completion_date && (
                        <div>
                          <h4 className="font-semibold">Data de Conclusão</h4>
                          <p>{new Date(selectedItem.completion_date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Tecnologias</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.technologies.map((tech: string, index: number) => (
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
          </>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
