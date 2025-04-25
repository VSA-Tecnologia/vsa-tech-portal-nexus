import React from 'react';
import { ScrollText, Pencil, Star, StarOff, Calendar, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PageCardProps {
  page: Page;
  category?: PageCategory;
  onEdit: (pageId: number) => void;
  onToggleFeatured: (pageId: number, featured: boolean) => void;
  isListView?: boolean;
}

export const PageCard: React.FC<PageCardProps> = ({ 
  page, 
  category,
  onEdit,
  onToggleFeatured,
  isListView = false
}) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isListView) {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {page.image && (
            <div className="w-full md:w-48 h-32 md:h-auto bg-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-r">
              <img 
                src={page.image} 
                alt={page.title} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          {!page.image && (
            <div className="w-full md:w-48 h-32 md:h-auto bg-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-r">
              <ScrollText className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  {category && (
                    <Badge variant="outline" className="mt-1">
                      {category.name}
                    </Badge>
                  )}
                </div>
                {page.featured && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Página em destaque</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardHeader>
            <CardContent className="py-0">
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {page.excerpt || truncateText(page.content.replace(/<[^>]*>/g, ''), 120)}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {page.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {page.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{page.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-between items-center">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(page.updatedAt), "d 'de' MMMM, yyyy", { locale: ptBR })}
                <div className="flex items-center ml-4">
                  {page.status === 'published' ? (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      <span>Publicado</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      <span>Rascunho</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => onToggleFeatured(page.id, !page.featured)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {page.featured ? (
                    <StarOff className="h-4 w-4" />
                  ) : (
                    <Star className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-vsa-teal hover:text-vsa-teal-dark hover:bg-vsa-teal/10"
                  onClick={() => onEdit(page.id)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center border-b relative">
        {page.image ? (
          <img 
            src={page.image} 
            alt={page.title} 
            className="h-full w-full object-cover"
          />
        ) : (
          <ScrollText className="h-12 w-12 text-gray-400" />
        )}
        {page.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-1">
            <Star className="h-4 w-4 fill-white" />
          </div>
        )}
        {page.status === 'draft' && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Rascunho
          </div>
        )}
      </div>
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{page.title}</CardTitle>
        {category && (
          <Badge variant="outline" className="mt-1">
            {category.name}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="py-0">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {page.excerpt || truncateText(page.content.replace(/<[^>]*>/g, ''), 100)}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {page.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {page.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{page.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="text-xs text-gray-500">
            {format(new Date(page.updatedAt), "dd/MM/yyyy", { locale: ptBR })}
          </div>
          <Button 
            variant="ghost" 
            className="text-vsa-teal hover:text-vsa-teal-dark hover:bg-vsa-teal/10"
            onClick={() => onEdit(page.id)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
