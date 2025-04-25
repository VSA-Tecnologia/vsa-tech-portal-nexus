
import React from 'react';
import { 
  Globe, Database, Shield, Laptop, Code, Server, BarChart3, Headphones 
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: 'Desenvolvimento Web',
      description: 'Criamos sites e aplicações web responsivas, modernas e otimizadas para seus objetivos de negócio.',
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: 'Sistemas ERP',
      description: 'Implementamos sistemas de gestão empresarial personalizados para otimizar seus processos.',
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'Segurança da Informação',
      description: 'Protegemos seus ativos digitais com soluções robustas de segurança e compliance.',
    },
    {
      icon: <Laptop className="h-12 w-12" />,
      title: 'Infraestrutura de TI',
      description: 'Planejamos e implementamos infraestrutura escalável e confiável para seu negócio.',
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: 'Desenvolvimento de Software',
      description: 'Desenvolvemos soluções de software customizadas para atender às necessidades específicas da sua empresa.',
    },
    {
      icon: <Server className="h-12 w-12" />,
      title: 'Cloud Computing',
      description: 'Serviços de migração, gestão e otimização de ambientes em nuvem.',
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: 'Business Intelligence',
      description: 'Transformamos seus dados em insights estratégicos para tomada de decisões.',
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: 'Suporte Técnico',
      description: 'Oferecemos suporte técnico especializado 24/7 para manter seus sistemas funcionando sem interrupções.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Nossos Serviços</h2>
          <p className="section-subtitle">
            Soluções completas em tecnologia para impulsionar a transformação digital do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-vsa-teal mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-vsa-blue mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="btn-primary text-lg px-8 py-3 inline-block"
          >
            Solicitar Consultoria
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
