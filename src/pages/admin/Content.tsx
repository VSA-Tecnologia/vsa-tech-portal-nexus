
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SectionManager } from '@/components/admin/content/sections/SectionManager';
import { PageManager } from '@/components/admin/content/pages/PageManager';
import { mockPages, mockPageCategories } from '@/types/page';
import type { SectionContent } from '@/components/admin/content/sections/SectionManager';

const Content: React.FC = () => {
  const { user } = useAuth();
  const isEditor = user?.role === 'admin' || user?.role === 'editor';
  
  const [pages, setPages] = useState(mockPages);
  const [categories, setCategories] = useState(mockPageCategories);
  const [isListView, setIsListView] = useState(false);
  
  const [siteContent, setSiteContent] = useState<Record<string, SectionContent>>({
    hero: {
      title: 'Transformação Digital para seu Negócio',
      subtitle: 'Soluções de tecnologia personalizadas para impulsionar sua empresa para o futuro.',
      content: 'Especialistas em desenvolvimento web, infraestrutura e segurança.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
      enabled: true
    },
    about: {
      title: 'Sobre a VSA Tecnologia',
      subtitle: 'Há mais de uma década transformando negócios através de soluções tecnológicas inovadoras',
      content: 'A VSA Tecnologia nasceu da visão de um grupo de especialistas determinados a transformar o mercado de TI no Brasil. Desde 2010, trabalhamos para trazer as melhores soluções tecnológicas personalizadas para empresas de todos os portes.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      enabled: true
    },
    services: {
      title: 'Nossos Serviços',
      subtitle: 'Soluções completas em tecnologia para impulsionar a transformação digital do seu negócio',
      content: 'Oferecemos uma ampla gama de serviços, desde desenvolvimento web e sistemas ERP até infraestrutura e segurança da informação.',
      image: '',
      enabled: true
    },
    portfolio: {
      title: 'Nosso Portfólio',
      subtitle: 'Conheça alguns dos nossos principais projetos e casos de sucesso',
      content: 'Projetos que demonstram nossa capacidade de entregar soluções completas e inovadoras.',
      image: '',
      enabled: true
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Conteúdo</h1>
        <p className="text-muted-foreground">
          Edite o conteúdo do site institucional.
        </p>
      </div>
      
      <PageManager 
        pages={pages}
        categories={categories}
        isListView={isListView}
        setIsListView={setIsListView}
      />

      <SectionManager
        siteContent={siteContent}
        setSiteContent={setSiteContent}
        isEditor={isEditor}
      />
    </div>
  );
};

export default Content;
