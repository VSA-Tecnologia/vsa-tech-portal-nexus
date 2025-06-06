
import React from 'react';
import { Edit, Trash2, Check, X, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserProfile } from '@/hooks/useUsers';

interface UserActionsProps {
  user: UserProfile;
  onDelete: (user: UserProfile) => void;
  onStatusChange: (userId: string, newStatus: 'active' | 'inactive') => void;
}

export const UserActions: React.FC<UserActionsProps> = ({ user, onDelete, onStatusChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>
        {user.status === 'active' ? (
          <DropdownMenuItem onClick={() => onStatusChange(user.id, 'inactive')}>
            <X className="mr-2 h-4 w-4" />
            <span>Desativar</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onStatusChange(user.id, 'active')}>
            <Check className="mr-2 h-4 w-4" />
            <span>Ativar</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => onDelete(user)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
