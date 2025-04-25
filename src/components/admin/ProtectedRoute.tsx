
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-vsa-blue" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if role restriction applies
  if (requiredRole && user?.role !== requiredRole) {
    if (requiredRole === 'admin' && user?.role !== 'admin') {
      return <Navigate to="/admin" replace />;
    }

    if (requiredRole === 'editor' && user?.role === 'viewer') {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
