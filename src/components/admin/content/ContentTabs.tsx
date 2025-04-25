
import React from 'react';
import { Layers, ScrollText, PlusCircle, List, LayoutGrid, Tag } from 'lucide-react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { PageCard } from './page-card/PageCard';
import { Page, PageCategory } from '@/types/page';

interface ContentTabsProps {
  children?: React.ReactNode;
  pages: Page[];
  categories: PageCategory[];
  onNewPage: () => void;
  onEditPage: (pageId: number) => void;
  onTogglePageFeatured: (pageId: number, featured: boolean) => void;
  onManageCategories: () => void;
  isListView?: boolean;
  toggleView: () => void;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({ 
  children, 
  pages, 
  categories,
  onNewPage,
  onEditPage,
  onTogglePageFeatured,
  onManageCategories,
  isListView = false,
  toggleView
}) => {
  // Helper function to get category by ID
  const getCategoryById = (categoryId: number) => {
    return categories.find(cat => cat.id === categoryId);
  };

  return (
    <Tabs defaultValue="pages">
      <TabsList>
        <TabsTrigger value="pages">
          <ScrollText className="h-4 w-4 mr-2" />
          Páginas
        </TabsTrigger>
        <TabsTrigger value="sections">
          <Layers className="h-4 w-4 mr-2" />
          Seções
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="sections" className="mt-6">
        {children}
      </TabsContent>
      
      <TabsContent value="pages">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-medium">Páginas do Site</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleView}
                className="h-9"
              >
                {isListView ? (
                  <>
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Grade
                  </>
                ) : (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    Lista
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onManageCategories}
                className="h-9"
              >
                <Tag className="h-4 w-4 mr-2" />
                Categorias
              </Button>
              <Button 
                variant="outline" 
                className="text-vsa-teal border-vsa-teal h-9"
                onClick={onNewPage}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Página
              </Button>
            </div>
          </div>
          
          {isListView ? (
            <div className="space-y-4">
              {pages.map((page) => (
                <PageCard 
                  key={page.id} 
                  page={page}
                  category={getCategoryById(page.categoryId)}
                  onEdit={onEditPage}
                  onToggleFeatured={onTogglePageFeatured}
                  isListView={true}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <PageCard 
                  key={page.id} 
                  page={page}
                  category={getCategoryById(page.categoryId)}
                  onEdit={onEditPage}
                  onToggleFeatured={onTogglePageFeatured}
                />
              ))}
              
              <Card 
                className="overflow-hidden border-dashed border-2 flex flex-col items-center justify-center h-[248px] cursor-pointer"
                onClick={onNewPage}
              >
                <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-medium">Nova Página</p>
              </Card>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
