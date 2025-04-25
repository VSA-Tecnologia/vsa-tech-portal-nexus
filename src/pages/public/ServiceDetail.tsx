
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { mockServices, mockServiceCategories, Service } from '@/types/service';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import BackToTopButton from '@/components/public/BackToTopButton';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
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
    // Simulate API call to fetch service by slug
    const fetchService = async () => {
      setLoading(true);
      
      // Find service in mock data
      const foundService = mockServices.find(s => s.slug === slug && s.status === 'published');
      
      if (foundService) {
        // Increment view count
        foundService.viewCount += 1;
        
        // Find category
        const category = mockServiceCategories.find(c => c.id === foundService.categoryId);
        if (category) {
          setService({
            ...foundService,
            category
          });
        } else {
          setService(foundService);
        }
      } else {
        setService(null);
      }
      
      setLoading(false);
    };
    
    fetchService();
  }, [slug]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto py-32 px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!service) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto py-32 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-vsa-blue mb-6">Serviço não encontrado</h1>
            <p className="text-gray-600 mb-8">
              O serviço que você está procurando não existe ou não está disponível no momento.
            </p>
            <Link to="/servicos">
              <Button className="bg-vsa-teal hover:bg-vsa-teal-dark">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Serviços
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Banner */}
        <div 
          className="w-full h-80 bg-center bg-cover relative"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${service.coverImage})` 
          }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <div className="mb-4">
                <span className="inline-block bg-vsa-teal text-white px-3 py-1 text-sm font-medium rounded-full">
                  {service.category?.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-gray-100 mb-6">
                {service.shortDescription}
              </p>
              <Link to="#contato" className="btn-primary text-lg">
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div 
                className="prose max-w-none prose-headings:text-vsa-blue prose-a:text-vsa-teal mb-10"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
              
              {/* Benefits */}
              {service.benefits.length > 0 && (
                <div className="border rounded-lg p-6 bg-gray-50 mb-10">
                  <h3 className="text-xl font-bold text-vsa-blue mb-6">Benefícios</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-vsa-teal mt-0.5 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Technologies */}
              {service.technologies.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-vsa-blue mb-4">Tecnologias Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="bg-vsa-teal/10 text-vsa-teal px-4 py-2 rounded-full"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* CTA */}
              <div className="bg-vsa-blue rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Pronto para transformar seu negócio?</h3>
                <p className="text-gray-200 mb-6">
                  Nossa equipe está pronta para ajudar você a implementar as melhores soluções tecnológicas para sua empresa.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/contato" className="bg-white text-vsa-blue hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
                    Entrar em Contato
                  </Link>
                  <Link to="/servicos" className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                    Explorar Outros Serviços
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Service Info Card */}
              <div className="bg-white rounded-lg shadow-md mb-8 sticky top-24">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold text-vsa-blue mb-4">Informações do Serviço</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Categoria:</span>
                      <span className="font-medium">{service.category?.name}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Nível de Complexidade:</span>
                      <span className="font-medium">
                        {service.complexity === 'basic' && 'Básico'}
                        {service.complexity === 'intermediate' && 'Intermediário'}
                        {service.complexity === 'advanced' && 'Avançado'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Ideal para:</span>
                      <span className="font-medium">
                        {service.complexity === 'basic' && 'Pequenas Empresas e Startups'}
                        {service.complexity === 'intermediate' && 'Empresas de Médio Porte'}
                        {service.complexity === 'advanced' && 'Grandes Empresas e Corporações'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Button className="w-full bg-vsa-teal hover:bg-vsa-teal-dark mb-3">
                    Solicitar Orçamento
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
              
              {/* More Services */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-vsa-blue mb-4">Outros Serviços</h3>
                <div className="space-y-4">
                  {mockServices
                    .filter(s => s.id !== service.id && s.status === 'published')
                    .slice(0, 3)
                    .map(s => (
                      <Link 
                        key={s.id} 
                        to={`/servicos/${s.slug}`}
                        className="block bg-white p-3 rounded-md hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-vsa-blue">{s.title}</h4>
                        <p className="text-sm text-gray-500 truncate">{s.shortDescription}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton visible={showScrollButton} />
    </>
  );
};

export default ServiceDetail;
