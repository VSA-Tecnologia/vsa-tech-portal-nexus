
import React, { useState } from 'react';
import { 
  ScrollText, Layers, PlusCircle, Image, Pencil, Save, Undo
} from 'lucide-react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

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
      
      <Tabs defaultValue="sections">
        <TabsList>
          <TabsTrigger value="sections">
            <Layers className="h-4 w-4 mr-2" />
            Seções
          </TabsTrigger>
          <TabsTrigger value="pages">
            <ScrollText className="h-4 w-4 mr-2" />
            Páginas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sections" className="mt-6">
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
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Título</label>
                              <Input
                                value={tempContent?.title || ''}
                                onChange={(e) => handleChange(section, 'title', e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Subtítulo</label>
                              <Input
                                value={tempContent?.subtitle || ''}
                                onChange={(e) => handleChange(section, 'subtitle', e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Conteúdo</label>
                              <Textarea
                                rows={4}
                                value={tempContent?.content || ''}
                                onChange={(e) => handleChange(section, 'content', e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">URL da Imagem</label>
                              <Input
                                value={tempContent?.image || ''}
                                onChange={(e) => handleChange(section, 'image', e.target.value)}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Insira a URL da imagem ou deixe em branco se não houver imagem.
                              </p>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-2">
                              <Button variant="outline" onClick={handleCancel}>
                                <Undo className="h-4 w-4 mr-2" />
                                Cancelar
                              </Button>
                              <Button className="bg-vsa-teal hover:bg-vsa-teal-dark" onClick={() => handleSave(section)}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      ) : (
                        <>
                          <CardHeader>
                            <CardTitle>{siteContent[section].title}</CardTitle>
                            <CardDescription>{siteContent[section].subtitle}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4">{siteContent[section].content}</p>
                            {siteContent[section].image && (
                              <div className="relative h-40 rounded-md overflow-hidden">
                                <img 
                                  src={siteContent[section].image} 
                                  alt={siteContent[section].title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button
                              variant={siteContent[section].enabled ? "outline" : "default"}
                              className={
                                siteContent[section].enabled 
                                  ? "border-red-500 text-red-500 hover:bg-red-50" 
                                  : "bg-green-600 hover:bg-green-700"
                              }
                              onClick={() => toggleSectionEnabled(section)}
                              disabled={!isEditor}
                            >
                              {siteContent[section].enabled ? "Desativar Seção" : "Ativar Seção"}
                            </Button>
                            <Button 
                              onClick={() => handleEdit(section)}
                              disabled={!isEditor}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          </CardFooter>
                        </>
                      )}
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="pages">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Páginas do Site</h2>
              <Button variant="outline" className="text-vsa-teal border-vsa-teal">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Página
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Blog', 'Sobre', 'Contato', 'Serviços', 'Termos de Uso', 'Política de Privacidade'].map((page) => (
                <Card key={page} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center border-b">
                    <ScrollText className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardHeader className="py-4">
                    <CardTitle className="text-lg">{page}</CardTitle>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" className="text-vsa-teal hover:text-vsa-teal-dark hover:bg-vsa-teal/10">
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="overflow-hidden border-dashed border-2 flex flex-col items-center justify-center h-[248px]">
                <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-medium">Nova Página</p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;
