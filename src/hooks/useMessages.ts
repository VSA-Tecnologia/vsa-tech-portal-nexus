
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
type MessageInsert = Database['public']['Tables']['contact_messages']['Insert'];
type MessageUpdate = Database['public']['Tables']['contact_messages']['Update'];

export const useMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Erro ao carregar mensagens');
    } finally {
      setLoading(false);
    }
  };

  const createMessage = async (messageData: MessageInsert) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert(messageData);

      if (error) throw error;
      await fetchMessages();
      return {};
    } catch (error) {
      console.error('Error creating message:', error);
      return { error: 'Erro ao criar mensagem' };
    }
  };

  const updateMessage = async (id: number, updates: MessageUpdate) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchMessages();
      return {};
    } catch (error) {
      console.error('Error updating message:', error);
      return { error: 'Erro ao atualizar mensagem' };
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchMessages();
      return {};
    } catch (error) {
      console.error('Error deleting message:', error);
      return { error: 'Erro ao excluir mensagem' };
    }
  };

  const markAsRead = async (id: number) => {
    return updateMessage(id, { status: 'read' });
  };

  const markAsResponded = async (id: number) => {
    return updateMessage(id, { status: 'responded' });
  };

  const archiveMessage = async (id: number) => {
    return updateMessage(id, { status: 'archived' });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    markAsRead,
    markAsResponded,
    archiveMessage,
  };
};
