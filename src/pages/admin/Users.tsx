
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers, User } from '@/types/user';
import { UsersToolbar } from '@/components/admin/users/UsersToolbar';
import { UsersTable } from '@/components/admin/users/UsersTable';

const Users: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(u => u.id !== userToDelete.id));
    toast.success(`Usuário ${userToDelete.name} excluído com sucesso!`);
    setIsDeleteDialogOpen(false);
  };
  
  const updateUserStatus = (userId: number, newStatus: 'active' | 'inactive') => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
    
    const actionText = newStatus === 'active' ? 'ativado' : 'desativado';
    toast.success(`Usuário ${actionText} com sucesso!`);
  };
  
  return (
    <div className="space-y-6">
      <UsersToolbar 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />
      
      <div className="rounded-md border">
        <UsersTable 
          users={filteredUsers}
          onDeleteClick={handleDeleteClick}
          onStatusChange={updateUserStatus}
        />
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o usuário <strong>{userToDelete?.name}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
