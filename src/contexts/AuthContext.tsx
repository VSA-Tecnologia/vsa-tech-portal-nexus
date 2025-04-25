
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock API functions that would be replaced with actual API calls
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Demo users
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@vsa.com', role: 'admin' as UserRole, password: 'admin123' },
    { id: 2, name: 'Editor User', email: 'editor@vsa.com', role: 'editor' as UserRole, password: 'editor123' },
    { id: 3, name: 'Viewer User', email: 'viewer@vsa.com', role: 'viewer' as UserRole, password: 'viewer123' }
  ];
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Remove password before returning
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  
  throw new Error('Invalid email or password');
};

const mockRegister = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would send the data to an API
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    role: 'viewer' // New users are viewers by default
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('vsa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await mockLogin(email, password);
      setUser(userData);
      localStorage.setItem('vsa_user', JSON.stringify(userData));
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await mockRegister(name, email, password);
      setUser(userData);
      localStorage.setItem('vsa_user', JSON.stringify(userData));
      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vsa_user');
    toast.info('You have been logged out');
  };
  
  const forgotPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.success('If your email exists in our system, you will receive a password reset link shortly.');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
