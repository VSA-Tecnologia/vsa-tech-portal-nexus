
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-white dark:bg-vsa-blue-dark border-b border-gray-200 dark:border-gray-800 px-4 shadow-sm">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <Menu className="h-5 w-5" />
      </button>
      
      <div className="hidden md:flex md:w-64 lg:w-96 mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-md border border-transparent focus:bg-white focus:border-gray-300 focus:ring-0 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-gray-700"
            placeholder="Pesquisar..."
          />
        </div>
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute top-0 right-0 h-5 w-5 p-0 flex items-center justify-center">
                2
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium text-sm">Notificações</div>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col w-full">
                <span className="font-medium">Nova mensagem recebida</span>
                <span className="text-gray-500 text-sm">Há 5 minutos</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col w-full">
                <span className="font-medium">Usuário cadastrado</span>
                <span className="text-gray-500 text-sm">Há 1 hora</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="text-sm font-medium">
          <span className="hidden md:inline text-gray-700 dark:text-gray-300 mr-2">
            Olá,
          </span>
          <span className="text-vsa-blue dark:text-white">
            {user?.name?.split(' ')[0] || 'Usuário'}
          </span>
        </div>

        <div className="h-8 w-8 rounded-full bg-vsa-purple/20 text-vsa-purple flex items-center justify-center">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
