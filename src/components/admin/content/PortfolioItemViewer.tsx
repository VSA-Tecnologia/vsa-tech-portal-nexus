
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PortfolioItem } from '@/stores/portfolioStore';

interface PortfolioItemViewerProps {
  item: PortfolioItem;
  onEdit: (item: PortfolioItem) => void;
  onToggleEnabled: (id: number, enabled: boolean) => void;
}

export const PortfolioItemViewer: React.FC<PortfolioItemViewerProps> = ({
  item,
  onEdit,
  onToggleEnabled
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-opacity",
      !item.enabled && "opacity-60"
    )}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400?text=Imagem+Não+Encontrada';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white font-medium">{item.title}</h3>
        </div>
        <Badge 
          className="absolute top-2 right-2 capitalize" 
          variant="secondary"
        >
          {item.category === 'all' ? 'Todos' : item.category}
        </Badge>
        {!item.enabled && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center">
            <Badge variant="destructive">Inativo</Badge>
          </div>
        )}
      </div>

      <CardContent className="pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {item.description}
        </p>
        
        {item.client && (
          <div className="mt-2 text-xs">
            <span className="font-medium">Cliente:</span> {item.client}
          </div>
        )}
        
        {item.completionDate && (
          <div className="mt-1 text-xs">
            <span className="font-medium">Conclusão:</span> {new Date(item.completionDate).toLocaleDateString('pt-BR')}
          </div>
        )}
        
        {item.url && (
          <div className="mt-2">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs inline-flex items-center text-vsa-teal hover:underline"
            >
              Visitar Projeto <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <Button
            variant={item.enabled ? "outline" : "default"}
            size="sm"
            className={
              item.enabled
                ? "border-red-500 text-red-500 hover:bg-red-50"
                : "bg-green-600 hover:bg-green-700"
            }
            onClick={() => onToggleEnabled(item.id, !item.enabled)}
          >
            {item.enabled ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Desativar
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Ativar
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-vsa-teal hover:text-vsa-teal-dark hover:bg-vsa-teal/10"
            onClick={() => onEdit(item)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
