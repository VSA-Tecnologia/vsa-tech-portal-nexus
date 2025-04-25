
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface StatusBadgeProps {
  status: 'draft' | 'published';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div className="flex items-center">
      {status === 'published' ? (
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
  );
};
