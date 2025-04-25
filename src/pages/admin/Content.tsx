
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ContentTabs } from '@/components/admin/content/ContentTabs';
import { SectionEditor } from '@/components/admin/content/SectionEditor';
import { SectionViewer } from '@/components/admin/content/SectionViewer';

interface SectionContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  enabled: boolean;
}

interface ContentState {
  [key: string]: SectionContent;
}

const Content: React.FC = () => {
  const { user } = useAuth();
  const isEditor = user?.role === 'admin' || user?.role === 'editor';
  
  const [siteContent, setSiteContent] = useState<ContentState>({
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
  
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<SectionContent | null>(null);
  
  const handleEdit = (section: string) => {
    setEditingSection(section);
    setTempContent({...siteContent[section]});
  };
  
  const handleCancel = () => {
    setEditingSection(null);
    setTempContent(null);
  };
  
  const handleChange = (
    section: string,
    field: keyof SectionContent,
    value: string | boolean
  ) => {
    if (!tempContent) return;
    
    setTempContent({
      ...tempContent,
      [field]: value
    });
  };
  
  const handleSave = (section: string) => {
    if (!tempContent) return;
    
    setSiteContent({
      ...siteContent,
      [section]: {...tempContent}
    });
    
    setEditingSection(null);
    setTempContent(null);
    
    toast.success(`Seção ${section} atualizada com sucesso!`);
  };
  
  const toggleSectionEnabled = (section: string) => {
    if (!isEditor) {
      toast.error('Você não tem permissão para esta ação.');
      return;
    }
    
    const newState = !siteContent[section].enabled;
    
    setSiteContent({
      ...siteContent,
      [section]: {
        ...siteContent[section],
        enabled: newState
      }
    });
    
    toast.success(`Seção ${section} ${newState ? 'ativada' : 'desativada'}.`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Conteúdo</h1>
        <p className="text-muted-foreground">
          Edite o conteúdo do site institucional.
        </p>
      </div>
      
      <ContentTabs>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Seções do Site</h2>
            <Button variant="outline" className="text-vsa-teal border-vsa-teal">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Seção
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {Object.keys(siteContent).map((section) => (
              <AccordionItem key={section} value={section}>
                <AccordionTrigger className="hover:bg-gray-50 px-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="capitalize">{section}</span>
                    {!siteContent[section].enabled && (
                      <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        Inativo
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    {editingSection === section ? (
                      <SectionEditor
                        section={section}
                        content={tempContent!}
                        onCancel={handleCancel}
                        onChange={handleChange}
                        onSave={handleSave}
                      />
                    ) : (
                      <SectionViewer
                        section={section}
                        content={siteContent[section]}
                        isEditor={isEditor}
                        onEdit={handleEdit}
                        onToggleEnabled={toggleSectionEnabled}
                      />
                    )}
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContentTabs>
    </div>
  );
};

export default Content;
