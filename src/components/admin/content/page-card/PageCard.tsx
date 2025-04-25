
import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PageCardImage } from './PageCardImage';
import { PageCardActions } from './PageCardActions';
import { StatusBadge } from './StatusBadge';
import { TagsList } from './TagsList';
import type { Page, PageCategory } from '@/types/page';

interface PageCardProps {
  page: Page;
  category?: PageCategory;
  onEdit: (pageId: number) => void;
  onToggleFeatured: (pageId: number, featured: boolean) => void;
  isListView?: boolean;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const PageCard: React.FC<PageCardProps> = ({
  page,
  category,
  onEdit,
  onToggleFeatured,
  isListView = false
}) => {
  if (isListView) {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <PageCardImage
            image={page.image}
            title={page.title}
            variant="list"
          />
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
              <TagsList tags={page.tags} maxTags={3} />
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-between items-center">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(page.updatedAt), "d 'de' MMMM, yyyy", { locale: ptBR })}
                <div className="flex items-center ml-4">
                  <StatusBadge status={page.status} />
                </div>
              </div>
              <PageCardActions
                onEdit={() => onEdit(page.id)}
                onToggleFeatured={() => onToggleFeatured(page.id, !page.featured)}
                isFeatured={page.featured}
              />
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center border-b relative">
        <PageCardImage
          image={page.image}
          title={page.title}
          variant="grid"
        />
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
        <TagsList tags={page.tags} maxTags={2} />
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
