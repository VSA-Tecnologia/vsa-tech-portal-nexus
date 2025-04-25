
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useMediaQuery } from '@/hooks/use-media-query';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <AdminSidebar 
        open={isDesktop || sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
