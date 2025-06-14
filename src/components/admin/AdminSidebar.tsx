
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Users,
  FileText,
  Briefcase,
  Image,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Usuários', href: '/admin/users', icon: Users },
  { name: 'Conteúdo', href: '/admin/content', icon: FileText },
  { name: 'Serviços', href: '/admin/services', icon: Briefcase },
  { name: 'Portfólio', href: '/admin/portfolio', icon: Image },
  { name: 'Planos', href: '/admin/plans', icon: CreditCard },
  { name: 'Mensagens', href: '/admin/messages', icon: MessageSquare },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { signOut } = useSupabaseAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 shrink-0 items-center px-4">
        <h1 className="text-xl font-bold text-gray-900">VSA Admin</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      location.pathname === item.href
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={cn(
                        location.pathname === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <button
              onClick={handleSignOut}
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 w-full text-left"
            >
              <LogOut
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
