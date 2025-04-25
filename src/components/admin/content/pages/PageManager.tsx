import React from 'react';
import { Page, PageCategory } from '@/types/page';
import { ContentTabs } from '../ContentTabs';
import { PageEditor } from '../PageEditor';
import { PageCategoriesManager } from '../PageCategoriesManager';
import { toast } from '@/hooks/use-toast';

interface PageManagerProps {
  pages: Page[];
  categories: PageCategory[];
  isListView: boolean;
  setIsListView: (value: boolean) => void;
}

export const PageManager: React.FC<PageManagerProps> = ({
  pages,
  categories,
  isListView,
  setIsListView
}) => {
  const [editingPage, setEditingPage] = React.useState<Page | null>(null);
  const [isCreatingPage, setIsCreatingPage] = React.useState(false);
  const [showCategoryManager, setShowCategoryManager] = React.useState(false);

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
      pages.push(newPage);
      toast({
        title: "Sucesso",
        description: "Página criada com sucesso!"
      });
    } else {
      const index = pages.findIndex(p => p.id === page.id);
      if (index !== -1) {
        pages[index] = page;
      }
      toast({
        title: "Sucesso",
        description: "Página atualizada com sucesso!"
      });
    }
    setEditingPage(null);
    setIsCreatingPage(false);
  };

  const handleCancelPage = () => {
    setEditingPage(null);
    setIsCreatingPage(false);
  };

  const handleTogglePageFeatured = (pageId: number, featured: boolean) => {
    const index = pages.findIndex(p => p.id === pageId);
    if (index !== -1) {
      pages[index].featured = featured;
    }
    toast({
      title: "Sucesso",
      description: `Página ${featured ? 'destacada' : 'removida dos destaques'} com sucesso!`
    });
  };

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

  if (showCategoryManager) {
    return (
      <PageCategoriesManager 
        categories={categories}
        onSave={(updatedCategories) => {
          categories.splice(0, categories.length, ...updatedCategories);
          setShowCategoryManager(false);
        }}
        onBack={() => setShowCategoryManager(false)}
      />
    );
  }

  return (
    <ContentTabs 
      pages={pages}
      categories={categories}
      onNewPage={handleNewPage}
      onEditPage={handleEditPage}
      onTogglePageFeatured={handleTogglePageFeatured}
      onManageCategories={() => setShowCategoryManager(true)}
      isListView={isListView}
      toggleView={() => setIsListView(!isListView)}
    >
      <></>
    </ContentTabs>
  );
};
