
import React from 'react';
import { Layers, ScrollText, PlusCircle } from 'lucide-react';
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
import { PageCard } from './PageCard';

interface ContentTabsProps {
  children: React.ReactNode;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({ children }) => {
  return (
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
        {children}
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
              <PageCard key={page} title={page} />
            ))}
            
            <Card className="overflow-hidden border-dashed border-2 flex flex-col items-center justify-center h-[248px]">
              <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">Nova Página</p>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
