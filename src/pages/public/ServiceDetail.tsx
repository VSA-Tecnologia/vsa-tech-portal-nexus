
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, Star, Tag, Eye } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/types/service';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { format } from 'date-fns';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, categories, isLoading } = useServices();
  const [service, setService] = useState<Service | null>(null);
  
  useEffect(() => {
    if (services.length > 0 && slug) {
      const foundService = services.find(s => s.slug === slug && s.status === 'published');
      setService(foundService || null);
    }
  }, [services, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return <Navigate to="/servicos" replace />;
  }

  const category = categories.find(c => c.id === service.category_id);
  
  const getComplexityText = (complexity: string) => {
    const map: Record<string, string> = {
      'basic': 'Básico',
      'intermediate': 'Intermediário',
      'advanced': 'Avançado'
    };
    return map[complexity] || complexity;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {category && (
              <Badge variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {category.name}
              </Badge>
            )}
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              {getComplexityText(service.complexity)}
            </Badge>
            {service.featured && (
              <Badge variant="default">
                <Star className="h-3 w-3 mr-1" />
                Destaque
              </Badge>
            )}
            <Badge variant="outline">
              <Eye className="h-3 w-3 mr-1" />
              {service.view_count} visualizações
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          
          {service.cover_image && (
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={service.cover_image}
                alt={service.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <p className="text-lg text-gray-600 mb-6">
                  {service.short_description}
                </p>
                
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Benefícios</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Tecnologias</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact CTA */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Interessado?</h3>
                <p className="text-gray-600 mb-4">
                  Entre em contato conosco para discutir seu projeto.
                </p>
                <Button className="w-full">
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>

            {/* Service Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Informações</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoria:</span>
                    <span className="font-medium">{category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexidade:</span>
                    <span className="font-medium">{getComplexityText(service.complexity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Atualizado:</span>
                    <span className="font-medium">
                      {format(new Date(service.updated_at), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
