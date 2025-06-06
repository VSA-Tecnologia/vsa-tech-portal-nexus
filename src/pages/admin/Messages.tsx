
import React, { useState } from 'react';
import { useMessages, ContactMessage } from '@/hooks/useMessages';
import { MessagesTable } from '@/components/admin/messages/MessagesTable';
import { MessagesToolbar } from '@/components/admin/messages/MessagesToolbar';
import { MessageDetailsDialog } from '@/components/admin/messages/MessageDetailsDialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Convert ContactMessage to Message format for components
const convertToMessageFormat = (message: ContactMessage) => ({
  id: message.id,
  name: message.name,
  email: message.email,
  subject: message.subject,
  message: message.message,
  date: message.created_at,
  read: message.status !== 'unread',
  important: false, // We'll need to add this field to DB later if needed
  status: message.status as 'pending' | 'responded' | 'archived'
});

const Messages: React.FC = () => {
  const { 
    messages: dbMessages, 
    loading, 
    updateMessage, 
    deleteMessage,
    markAsRead,
    markAsResponded,
    archiveMessage
  } = useMessages();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [viewMessageModal, setViewMessageModal] = useState(false);
  
  // Convert database messages to component format
  const messages = dbMessages.map(convertToMessageFormat);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return !message.read && matchesSearch;
    if (activeTab === 'important') return message.important && matchesSearch;
    if (activeTab === 'pending') return message.status === 'pending' && matchesSearch;
    if (activeTab === 'responded') return message.status === 'responded' && matchesSearch;
    if (activeTab === 'archived') return message.status === 'archived' && matchesSearch;
    
    return matchesSearch;
  });
  
  const viewMessage = async (message: any) => {
    if (!message.read) {
      await markAsRead(message.id);
    }
    setSelectedMessage(message);
    setViewMessageModal(true);
  };
  
  const toggleImportant = (messageId: number) => {
    // For now, just show a toast since we don't have important field in DB
    toast.success('Funcionalidade de importantes será implementada em breve');
  };
  
  const handleArchiveMessage = async (messageId: number) => {
    const result = await archiveMessage(messageId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Mensagem arquivada');
      if (selectedMessage?.id === messageId) {
        setViewMessageModal(false);
      }
    }
  };
  
  const handleMarkAsResponded = async (messageId: number) => {
    const result = await markAsResponded(messageId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Mensagem marcada como respondida');
      if (selectedMessage?.id === messageId) {
        setViewMessageModal(false);
      }
    }
  };
  
  const handleDeleteMessage = async (messageId: number) => {
    const result = await deleteMessage(messageId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Mensagem excluída');
      if (selectedMessage?.id === messageId) {
        setViewMessageModal(false);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mensagens de Contato</h1>
          <p className="text-muted-foreground">
            Carregando mensagens...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mensagens de Contato</h1>
        <p className="text-muted-foreground">
          Gerencie mensagens recebidas através do formulário de contato.
        </p>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={setActiveTab}
      >
        <MessagesToolbar
          messages={messages}
          searchTerm={searchTerm}
          activeTab={activeTab}
          onSearchChange={handleSearch}
          onTabChange={setActiveTab}
        />
        
        <TabsContent value={activeTab} className="mt-0">
          <MessagesTable
            messages={filteredMessages}
            onMessageClick={viewMessage}
            onToggleImportant={toggleImportant}
            onArchive={handleArchiveMessage}
            onMarkAsResponded={handleMarkAsResponded}
            onDelete={handleDeleteMessage}
          />
        </TabsContent>
      </Tabs>
      
      <MessageDetailsDialog
        message={selectedMessage}
        open={viewMessageModal}
        onOpenChange={setViewMessageModal}
        onToggleImportant={toggleImportant}
        onArchive={handleArchiveMessage}
        onMarkAsResponded={handleMarkAsResponded}
        onDelete={handleDeleteMessage}
      />
    </div>
  );
};

export default Messages;
