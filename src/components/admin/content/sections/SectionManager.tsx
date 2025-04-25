
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionEditor } from '../SectionEditor';
import { SectionViewer } from '../SectionViewer';
import PortfolioManager from '../PortfolioManager';
import { toast } from 'sonner';

export interface SectionContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  enabled: boolean;
}

interface SectionManagerProps {
  siteContent: Record<string, SectionContent>;
  setSiteContent: (content: Record<string, SectionContent>) => void;
  isEditor: boolean;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  siteContent,
  setSiteContent,
  isEditor
}) => {
  const [editingSection, setEditingSection] = React.useState<string | null>(null);
  const [tempContent, setTempContent] = React.useState<SectionContent | null>(null);

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

  const handleUpdatePortfolioContent = (updatedContent: SectionContent) => {
    console.log("Updating portfolio section content:", updatedContent);
    setSiteContent({
      ...siteContent,
      portfolio: updatedContent
    });
    toast.success('Configurações do portfólio atualizadas com sucesso!');
  };

  return (
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
