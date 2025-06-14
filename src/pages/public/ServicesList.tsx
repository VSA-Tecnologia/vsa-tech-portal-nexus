
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Star, Eye, Clock } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

const ServicesList: React.FC = () => {
  const { services, categories, isLoading } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Only show published services
      if (service.status !== 'published') return false;
      
      // Search filter
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           service.short_description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
                             service.category_id.toString() === selectedCategory;
      
      // Complexity filter
      const matchesComplexity = selectedComplexity === 'all' || 
                               service.complexity === selectedComplexity;
      
      return matchesSearch && matchesCategory && matchesComplexity;
    });
  }, [services, searchTerm, selectedCategory, selectedComplexity]);

  // Sort by featured first, then by order_position
  const sortedServices = useMemo(() => {
    return [...filteredServices].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order_position - b.order_position;
    });
  }, [filteredServices]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sem categoria';
  };

  const getComplexityText = (complexity: string) => {
    const map: Record<string, string> = {
      'basic': 'Básico',
      'intermediate': 'Intermediário',
      'advanced': 'Avançado'
    };
    return map[complexity] || complexity;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Nossos Serviços</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos soluções completas em tecnologia para impulsionar o crescimento do seu negócio.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger className="w-48">
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Complexidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Complexidades</SelectItem>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="intermediate">Intermediário</SelectItem>
                  <SelectItem value="advanced">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {sortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedServices.map(service => (
              <Card key={service.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  {service.cover_image ? (
                    <img 
                      src={service.cover_image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {service.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {service.featured && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">
                      {getCategoryName(service.category_id)}
                    </Badge>
                    <Badge variant="secondary">
                      {getComplexityText(service.complexity)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.short_description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      {service.view_count} views
                    </div>
                    
                    <Link 
                      to={`/servicos/${service.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Saiba mais →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum serviço encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-gray-600 mb-6">
            Entre em contato conosco para discutir suas necessidades específicas.
          </p>
          <Link 
            to="/#contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Fale Conosco
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesList;
