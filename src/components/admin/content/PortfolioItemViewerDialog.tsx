
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PortfolioItem } from '@/stores/portfolioStore';

interface PortfolioItemViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

export const PortfolioItemViewerDialog: React.FC<PortfolioItemViewerDialogProps> = ({
  isOpen,
  onClose,
  item
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Visualizar Item do Portfólio
            <Badge variant={item.enabled ? "default" : "secondary"}>
              {item.enabled ? 'Ativo' : 'Inativo'}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {item.image && (
            <div className="relative h-48 overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400?text=Imagem+Não+Encontrada';
                }}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <Badge variant="outline" className="capitalize">
              {item.category === 'all' ? 'Todos' : item.category}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-1">Descrição</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            
            {item.detailed_description && (
              <div>
                <h4 className="font-medium mb-1">Descrição Detalhada</h4>
                <p className="text-sm text-muted-foreground">{item.detailed_description}</p>
              </div>
            )}
            
            {item.client && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">Cliente:</span> {item.client}
              </div>
            )}
            
            {item.completion_date && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Conclusão:</span> {new Date(item.completion_date).toLocaleDateString('pt-BR')}
              </div>
            )}
            
            {item.technologies && item.technologies.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-1">
                  {item.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {item.url && (
              <div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visitar Projeto
                </a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
