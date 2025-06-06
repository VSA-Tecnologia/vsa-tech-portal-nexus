
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type UserProfile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const useUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: ProfileUpdate) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchUsers();
      return {};
    } catch (error) {
      console.error('Error updating user:', error);
      return { error: 'Erro ao atualizar usuário' };
    }
  };

  const updateUserStatus = async (id: string, status: 'active' | 'inactive') => {
    return updateUser(id, { status });
  };

  const updateUserRole = async (id: string, role: 'admin' | 'editor' | 'viewer') => {
    return updateUser(id, { role });
  };

  const deleteUser = async (id: string) => {
    try {
      // Note: This will also delete the user from auth.users due to CASCADE
      const { error } = await supabase.auth.admin.deleteUser(id);
      
      if (error) throw error;
      await fetchUsers();
      return {};
    } catch (error) {
      console.error('Error deleting user:', error);
      return { error: 'Erro ao excluir usuário' };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUser,
    updateUserStatus,
    updateUserRole,
    deleteUser,
  };
};
