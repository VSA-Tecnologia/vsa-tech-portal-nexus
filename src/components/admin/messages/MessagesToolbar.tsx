
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Message } from '@/types/message';

interface MessagesToolbarProps {
  messages: Message[];
  searchTerm: string;
  activeTab: string;
  onSearchChange: (value: string) => void;
  onTabChange: (value: string) => void;
}

export const MessagesToolbar: React.FC<MessagesToolbarProps> = ({
  messages,
  searchTerm,
  activeTab,
  onSearchChange,
  onTabChange,
}) => {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
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
  );
};
