
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { mockServices, mockServiceCategories, Service, ServiceCategory } from '@/types/service';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import BackToTopButton from '@/components/public/BackToTopButton';

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollButton && window.pageYOffset > 400) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.pageYOffset <= 400) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollButton]);

  useEffect(() => {
    // Simulate API call to fetch services and categories
    const fetchData = async () => {
      setLoading(true);
      
      // Only get published services
      const publishedServices = mockServices.filter(s => s.status === 'published');
      
      // Sort services (featured first, then by order)
      const sortedServices = [...publishedServices].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.order - b.order;
      });
      
      setServices(sortedServices);
      setCategories(mockServiceCategories);
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === 'all' || service.categoryId === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-vsa-blue text-white pt-36 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Soluções personalizadas para impulsionar seu negócio. 
              Descubra como podemos ajudar sua empresa a se destacar no mundo digital.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-300 h-12 text-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="bg-gray-50 py-6">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 px-4">
              <Button 
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                className={activeCategory === 'all' ? 'bg-vsa-teal hover:bg-vsa-teal-dark' : ''}
                onClick={() => setActiveCategory('all')}
              >
                Todos
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className={activeCategory === category.id ? 'bg-vsa-teal hover:bg-vsa-teal-dark' : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services List */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map(service => (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48">
                      <img
                        src={service.coverImage}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      {service.featured && (
                        <div className="absolute top-0 right-0 bg-vsa-teal text-white px-3 py-1 text-sm font-medium">
                          Destaque
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 bg-vsa-blue text-white px-3 py-1 text-sm">
                        {getCategoryName(service.categoryId)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-vsa-blue mb-2 line-clamp-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {service.shortDescription}
                      </p>
                      <Link to={`/servicos/${service.slug}`}>
                        <Button className="bg-vsa-teal hover:bg-vsa-teal-dark">
                          Saiba Mais
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 3 && (
                          <span className="text-xs text-gray-500 px-1 py-1">
                            +{service.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-vsa-blue mb-2">Nenhum serviço encontrado</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Não encontramos serviços correspondentes aos seus critérios de pesquisa. Tente modificar sua busca.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-vsa-blue text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Não encontrou o serviço que procura?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Entre em contato conosco para discutir necessidades específicas do seu negócio. 
              Podemos desenvolver soluções sob medida para você.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/contato">
                <Button className="bg-white text-vsa-blue hover:bg-gray-100 text-lg px-6 py-6 h-auto">
                  Fale Conosco
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 h-auto">
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton visible={showScrollButton} />
    </>
  );
};

export default ServicesList;
