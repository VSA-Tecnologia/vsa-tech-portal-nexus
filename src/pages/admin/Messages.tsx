
import React, { useState } from 'react';
import { mockMessages, Message } from '@/types/message';
import { MessagesTable } from '@/components/admin/messages/MessagesTable';
import { MessagesToolbar } from '@/components/admin/messages/MessagesToolbar';
import { MessageDetailsDialog } from '@/components/admin/messages/MessageDetailsDialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMessageModal, setViewMessageModal] = useState(false);
  
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
  
  const viewMessage = (message: Message) => {
    if (!message.read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
    setSelectedMessage(message);
    setViewMessageModal(true);
  };
  
  const toggleImportant = (messageId: number) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, important: !m.important } : m
    ));
    
    const message = messages.find(m => m.id === messageId);
    const action = message?.important ? 'removida dos importantes' : 'marcada como importante';
    toast.success(`Mensagem ${action}`);
  };
  
  const archiveMessage = (messageId: number) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, status: 'archived' } : m
    ));
    
    toast.success('Mensagem arquivada');
    if (selectedMessage?.id === messageId) {
      setViewMessageModal(false);
    }
  };
  
  const markAsResponded = (messageId: number) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, status: 'responded' } : m
    ));
    
    toast.success('Mensagem marcada como respondida');
    if (selectedMessage?.id === messageId) {
      setViewMessageModal(false);
    }
  };
  
  const deleteMessage = (messageId: number) => {
    setMessages(messages.filter(m => m.id !== messageId));
    toast.success('Mensagem excluída');
    if (selectedMessage?.id === messageId) {
      setViewMessageModal(false);
    }
  };
  
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
            onArchive={archiveMessage}
            onMarkAsResponded={markAsResponded}
            onDelete={deleteMessage}
          />
        </TabsContent>
      </Tabs>
      
      <MessageDetailsDialog
        message={selectedMessage}
        open={viewMessageModal}
        onOpenChange={setViewMessageModal}
        onToggleImportant={toggleImportant}
        onArchive={archiveMessage}
        onMarkAsResponded={markAsResponded}
        onDelete={deleteMessage}
      />
    </div>
  );
};

export default Messages;
