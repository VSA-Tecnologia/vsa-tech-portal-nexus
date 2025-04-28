
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Mail, Settings, X, Package, CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Usuários', href: '/admin/users', icon: Users, requiredRole: 'admin' as const },
    { name: 'Conteúdo', href: '/admin/content', icon: FileText },
    { name: 'Serviços', href: '/admin/services', icon: Package },
    { name: 'Planos', href: '/admin/plans', icon: CreditCard },
    { name: 'Mensagens', href: '/admin/messages', icon: Mail, badge: '4' },
    { name: 'Configurações', href: '/admin/settings', icon: Settings, requiredRole: 'admin' as const },
  ];
  
  // Filter navigation items based on user role
  const filteredNav = navigation.filter(item => {
    if (item.requiredRole === 'admin') {
      return user?.role === 'admin';
    }
    return true;
  });

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-vsa-blue shadow-lg lg:shadow-none
          transform transition-transform duration-300 lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:z-0
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <NavLink to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-vsa-blue dark:text-white">
              VSA<span className="text-vsa-teal">Admin</span>
            </span>
          </NavLink>
          <button 
            onClick={onClose} 
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4">
            <div className="mb-6">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Principal
              </div>
              <nav className="mt-3 space-y-1">
                {filteredNav.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => `
                      group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
                      ${isActive 
                        ? 'bg-vsa-teal/10 text-vsa-teal dark:bg-vsa-teal/20' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}
                    `}
                    end={item.href === '/admin'}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="default" className="bg-vsa-teal ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full bg-vsa-purple/20 text-vsa-purple flex items-center justify-center">
                    {user?.name.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.role === 'admin' ? 'Administrador' : 
                     user?.role === 'editor' ? 'Editor' : 'Visualizador'}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="ml-auto p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <span className="text-xs">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default AdminSidebar;
