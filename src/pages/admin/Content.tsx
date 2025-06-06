
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SectionManager } from '@/components/admin/content/sections/SectionManager';
import { PageManager } from '@/components/admin/content/pages/PageManager';
import { usePagesStore } from '@/stores/pagesStore';
import { useSiteSectionsStore } from '@/stores/siteSectionsStore';

const Content: React.FC = () => {
  const { user } = useAuth();
  const isEditor = user?.role === 'admin' || user?.role === 'editor';
  
  const { 
    pages, 
    categories, 
    fetchPages, 
    fetchCategories,
    togglePageFeatured 
  } = usePagesStore();
  
  const { 
    sections,
    fetchSections,
    updateSection
  } = useSiteSectionsStore();
  
  const [isListView, setIsListView] = React.useState(false);

  // Load data on component mount
  useEffect(() => {
    fetchPages();
    fetchCategories();
    fetchSections();
  }, [fetchPages, fetchCategories, fetchSections]);

  // Convert sections array to the format expected by SectionManager
  const siteContent = React.useMemo(() => {
    const content: Record<string, any> = {};
    sections.forEach(section => {
      content[section.section_key] = {
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        image: section.image || '',
        enabled: section.enabled
      };
    });
    return content;
  }, [sections]);

  const setSiteContent = React.useCallback(async (newContent: Record<string, any>) => {
    // Update each section that has changed
    for (const [sectionKey, sectionData] of Object.entries(newContent)) {
      const existingSection = sections.find(s => s.section_key === sectionKey);
      if (existingSection) {
        await updateSection(existingSection.id, {
          title: sectionData.title,
          subtitle: sectionData.subtitle,
          content: sectionData.content,
          image: sectionData.image || null,
          enabled: sectionData.enabled
        });
      }
    }
  }, [sections, updateSection]);

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
