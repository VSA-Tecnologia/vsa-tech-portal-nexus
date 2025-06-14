
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import type { PortfolioItem } from '@/stores/portfolioStore';

interface PortfolioItemEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
  isCreating: boolean;
}

export const PortfolioItemEditorDialog: React.FC<PortfolioItemEditorDialogProps> = ({
  isOpen,
  onClose,
  item,
  isCreating
}) => {
  if (!item) return null;

  const handleSave = async (updatedItem: PortfolioItem) => {
    // The actual save logic will be handled by the parent component
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? 'Novo Item do Portfólio' : 'Editar Item do Portfólio'}
          </DialogTitle>
        </DialogHeader>
        <PortfolioItemEditor 
          item={item}
          onSave={handleSave}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
