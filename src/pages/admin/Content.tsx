
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
import { PageEditor } from '@/components/admin/content/PageEditor';
import { PageCategoriesManager } from '@/components/admin/content/PageCategoriesManager';
import { mockPages, mockPageCategories, Page, PageCategory } from '@/types/page';
import PortfolioManager from '@/components/admin/content/PortfolioManager';

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
  
  // Seções
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<SectionContent | null>(null);
  
  // Páginas
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [categories, setCategories] = useState<PageCategory[]>(mockPageCategories);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [isListView, setIsListView] = useState(false);
  
  // Seções handlers
  const handleEditSection = (section: string) => {
    setEditingSection(section);
    setTempContent({...siteContent[section]});
  };
  
  const handleCancelSection = () => {
    setEditingSection(null);
    setTempContent(null);
  };
  
  const handleChangeSection = (
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
  
  const handleSaveSection = (section: string) => {
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
  
  // Páginas handlers
  const handleNewPage = () => {
    setIsCreatingPage(true);
    setEditingPage(null);
  };
  
  const handleEditPage = (pageId: number) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setEditingPage({...page});
      setIsCreatingPage(false);
    }
  };
  
  const handleSavePage = (page: Page) => {
    if (isCreatingPage) {
      const newId = Math.max(...pages.map(p => p.id), 0) + 1;
      const newPage = {
        ...page,
        id: newId
      };
      setPages([...pages, newPage]);
      toast.success('Página criada com sucesso!');
    } else {
      setPages(pages.map(p => p.id === page.id ? page : p));
      toast.success('Página atualizada com sucesso!');
    }
    
    setEditingPage(null);
    setIsCreatingPage(false);
  };
  
  const handleCancelPage = () => {
    setEditingPage(null);
    setIsCreatingPage(false);
  };
  
  const handleTogglePageFeatured = (pageId: number, featured: boolean) => {
    setPages(pages.map(p => p.id === pageId ? {...p, featured} : p));
    toast.success(`Página ${featured ? 'destacada' : 'removida dos destaques'} com sucesso!`);
  };
  
  const handleManageCategories = () => {
    setShowCategoryManager(true);
  };
  
  const handleSaveCategories = (updatedCategories: PageCategory[]) => {
    setCategories(updatedCategories);
    setShowCategoryManager(false);
  };
  
  // Portfolio handlers
  const handleUpdatePortfolioContent = (updatedContent: SectionContent) => {
    setSiteContent({
      ...siteContent,
      portfolio: updatedContent
    });
    toast.success('Configurações do portfólio atualizadas com sucesso!');
  };
  
  // Se estiver editando uma página ou criando uma nova
  if (editingPage || isCreatingPage) {
    return (
      <PageEditor 
        page={editingPage}
        categories={categories}
        onSave={handleSavePage}
        onCancel={handleCancelPage}
        isNew={isCreatingPage}
      />
    );
  }
  
  // Se estiver gerenciando categorias
  if (showCategoryManager) {
    return (
      <PageCategoriesManager 
        categories={categories}
        onSave={handleSaveCategories}
        onBack={() => setShowCategoryManager(false)}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Conteúdo</h1>
        <p className="text-muted-foreground">
          Edite o conteúdo do site institucional.
        </p>
      </div>
      
      <ContentTabs 
        pages={pages}
        categories={categories}
        onNewPage={handleNewPage}
        onEditPage={handleEditPage}
        onTogglePageFeatured={handleTogglePageFeatured}
        onManageCategories={handleManageCategories}
        isListView={isListView}
        toggleView={() => setIsListView(!isListView)}
      >
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
                    {section === 'portfolio' ? (
                      <div className="p-6">
                        {editingSection === section ? (
                          <SectionEditor
                            section={section}
                            content={tempContent!}
                            onCancel={handleCancelSection}
                            onChange={handleChangeSection}
                            onSave={handleSaveSection}
                          />
                        ) : (
                          <div className="space-y-6">
                            <SectionViewer
                              section={section}
                              content={siteContent[section]}
                              isEditor={isEditor}
                              onEdit={handleEditSection}
                              onToggleEnabled={toggleSectionEnabled}
                            />
                            
                            <hr className="my-6" />
                            
                            <PortfolioManager 
                              sectionContent={siteContent.portfolio}
                              onUpdateSectionContent={handleUpdatePortfolioContent}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      editingSection === section ? (
                        <SectionEditor
                          section={section}
                          content={tempContent!}
                          onCancel={handleCancelSection}
                          onChange={handleChangeSection}
                          onSave={handleSaveSection}
                        />
                      ) : (
                        <SectionViewer
                          section={section}
                          content={siteContent[section]}
                          isEditor={isEditor}
                          onEdit={handleEditSection}
                          onToggleEnabled={toggleSectionEnabled}
                        />
                      )
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
