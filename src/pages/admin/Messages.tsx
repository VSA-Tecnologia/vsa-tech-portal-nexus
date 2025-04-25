
import React, { useState } from 'react';
import { 
  Search, Filter, Mail, Archive, Star, Trash2, MoreHorizontal, Clock, CheckCheck, UserCheck
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  status: 'pending' | 'responded' | 'archived';
  important: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    subject: 'Orçamento para desenvolvimento web',
    message: 'Gostaria de solicitar um orçamento para o desenvolvimento de um site institucional para minha empresa de consultoria.',
    date: '2024-04-24 09:30',
    read: false,
    status: 'pending',
    important: true
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    subject: 'Dúvida sobre hospedagem',
    message: 'Olá, gostaria de saber se vocês oferecem serviços de hospedagem de sites e qual o valor mensal.',
    date: '2024-04-23 14:20',
    read: true,
    status: 'responded',
    important: false
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    email: 'carlos@example.com',
    subject: 'Suporte técnico urgente',
    message: 'Estamos enfrentando problemas com nosso servidor. Precisamos de suporte técnico urgente.',
    date: '2024-04-23 08:45',
    read: false,
    status: 'pending',
    important: true
  },
  {
    id: 4,
    name: 'Ana Santos',
    email: 'ana.santos@example.com',
    subject: 'Vaga de emprego',
    message: 'Gostaria de enviar meu currículo para a vaga de desenvolvedor front-end anunciada no LinkedIn.',
    date: '2024-04-22 16:10',
    read: true,
    status: 'archived',
    important: false
  },
  {
    id: 5,
    name: 'Roberto Almeida',
    email: 'roberto@example.com',
    subject: 'Parceria comercial',
    message: 'Somos uma empresa de marketing digital e gostaríamos de propor uma parceria comercial para atender nossos clientes.',
    date: '2024-04-21 11:25',
    read: true,
    status: 'responded',
    important: false
  }
];

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMessageModal, setViewMessageModal] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
    // Mark as read if it wasn't already
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="unread">Não lidos ({messages.filter(m => !m.read).length})</TabsTrigger>
            <TabsTrigger value="important">Importantes</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="responded">Respondidos</TabsTrigger>
            <TabsTrigger value="archived">Arquivados</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar mensagens..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Select defaultValue="date-desc">
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Ordenar</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Mais recentes</SelectItem>
                <SelectItem value="date-asc">Mais antigos</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="subject">Assunto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Remetente</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <TableRow 
                      key={message.id} 
                      className={message.read ? '' : 'font-medium bg-vsa-teal/5'}
                      onClick={() => viewMessage(message)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleImportant(message.id);
                          }}
                        >
                          <Star 
                            className={`h-4 w-4 ${message.important ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        </Button>
                      </TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{message.email}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell className="hidden md:table-cell">{message.date}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={
                          message.status === 'pending' ? 'default' : 
                          message.status === 'responded' ? 'success' : 'secondary'
                        }>
                          {message.status === 'pending' ? 'Pendente' : 
                           message.status === 'responded' ? 'Respondido' : 'Arquivado'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              viewMessage(message);
                            }}>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Ver mensagem</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              markAsResponded(message.id);
                            }}>
                              <CheckCheck className="mr-2 h-4 w-4" />
                              <span>Marcar como respondida</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              archiveMessage(message.id);
                            }}>
                              <Archive className="mr-2 h-4 w-4" />
                              <span>Arquivar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message.id);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      Nenhuma mensagem encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* View Message Modal */}
      <Dialog open={viewMessageModal} onOpenChange={setViewMessageModal}>
        <DialogContent className="max-w-3xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedMessage.subject}</DialogTitle>
                <DialogDescription className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 text-sm">
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{selectedMessage.name}</span>
                    <span className="mx-2 text-gray-500">&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="flex items-center ml-auto">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-500">{selectedMessage.date}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[300px] mt-2">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-line">{selectedMessage.message}</p>
                </div>
              </ScrollArea>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start">
                  <Button 
                    variant="outline"
                    onClick={() => toggleImportant(selectedMessage.id)}
                  >
                    <Star className={`h-4 w-4 mr-2 ${selectedMessage.important ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    {selectedMessage.important ? 'Remover importância' : 'Marcar como importante'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => archiveMessage(selectedMessage.id)}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Arquivar
                  </Button>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="destructive"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                  
                  <Button 
                    onClick={() => markAsResponded(selectedMessage.id)}
                    className="bg-vsa-teal hover:bg-vsa-teal-dark"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Responder
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
