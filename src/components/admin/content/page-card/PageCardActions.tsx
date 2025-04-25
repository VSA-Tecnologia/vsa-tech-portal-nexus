
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, StarOff, Pencil } from 'lucide-react';

interface PageCardActionsProps {
  onEdit: () => void;
  onToggleFeatured: () => void;
  isFeatured: boolean;
}

export const PageCardActions = ({ onEdit, onToggleFeatured, isFeatured }: PageCardActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleFeatured}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {isFeatured ? (
          <StarOff className="h-4 w-4" />
        ) : (
          <Star className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-vsa-teal hover:text-vsa-teal-dark hover:bg-vsa-teal/10"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4 mr-2" />
        Editar
      </Button>
    </div>
  );
};
