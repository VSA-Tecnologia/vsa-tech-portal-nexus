
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  // Legacy method names for compatibility
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetch to avoid callback issues
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile fetched:', data);
      setProfile(data);
      
      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);
        
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message || 'Erro no login');
        return { error: error.message };
      }

      console.log('Sign in successful:', data.user?.email);
      toast.success('Login realizado com sucesso!');
      return {};
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      toast.error('Erro inesperado no login');
      return { error: 'Erro inesperado no login' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting sign up for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/admin`
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message || 'Erro no cadastro');
        return { error: error.message };
      }

      console.log('Sign up successful:', data.user?.email);
      
      if (data.user && !data.session) {
        toast.success('Cadastro realizado! Verifique seu email para confirmar a conta.');
      } else {
        toast.success('Cadastro realizado com sucesso!');
      }
      
      return {};
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
      toast.error('Erro inesperado no cadastro');
      return { error: 'Erro inesperado no cadastro' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Erro ao fazer logout');
      } else {
        toast.success('Logout realizado com sucesso!');
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast.error('Erro inesperado no logout');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Requesting password reset for:', email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`
      });

      if (error) {
        console.error('Password reset error:', error);
        toast.error(error.message || 'Erro ao enviar email de recuperação');
        return { error: error.message };
      }

      toast.success('Email de recuperação enviado!');
      return {};
    } catch (error) {
      console.error('Unexpected error during password reset:', error);
      toast.error('Erro ao enviar email de recuperação');
      return { error: 'Erro ao enviar email de recuperação' };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: 'Usuário não autenticado' };
    }

    try {
      console.log('Updating profile for user:', user.id);
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        toast.error(error.message || 'Erro ao atualizar perfil');
        return { error: error.message };
      }

      // Refresh profile
      await fetchProfile(user.id);
      toast.success('Perfil atualizado com sucesso!');
      return {};
    } catch (error) {
      console.error('Unexpected error during profile update:', error);
      toast.error('Erro ao atualizar perfil');
      return { error: 'Erro ao atualizar perfil' };
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user,
    isLoading: loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    // Legacy method names for compatibility
    login: signIn,
    register: signUp,
    logout: signOut,
    forgotPassword: resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
