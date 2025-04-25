
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';
import { UserActions } from './UserActions';

interface UsersTableProps {
  users: User[];
  onDeleteClick: (user: User) => void;
  onStatusChange: (userId: number, newStatus: 'active' | 'inactive') => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ 
  users, onDeleteClick, onStatusChange 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Último Login</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={
                  user.role === 'admin' ? 'default' : 
                  user.role === 'editor' ? 'secondary' : 'outline'
                }>
                  {user.role === 'admin' ? 'Administrador' : 
                   user.role === 'editor' ? 'Editor' : 'Visualizador'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <UserActions 
                  user={user} 
                  onDelete={onDeleteClick} 
                  onStatusChange={onStatusChange}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              Nenhum usuário encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
