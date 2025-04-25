
import React from 'react';
import { Message } from '@/types/message';
import { MoreHorizontal, Star, Mail, Archive, Trash2, CheckCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MessagesTableProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onToggleImportant: (messageId: number) => void;
  onArchive: (messageId: number) => void;
  onMarkAsResponded: (messageId: number) => void;
  onDelete: (messageId: number) => void;
}

export const MessagesTable: React.FC<MessagesTableProps> = ({
  messages,
  onMessageClick,
  onToggleImportant,
  onArchive,
  onMarkAsResponded,
  onDelete,
}) => {
  return (
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
          {messages.length > 0 ? (
            messages.map((message) => (
              <TableRow 
                key={message.id} 
                className={message.read ? '' : 'font-medium bg-vsa-teal/5'}
                onClick={() => onMessageClick(message)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Button 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleImportant(message.id);
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
                    message.status === 'responded' ? 'secondary' : 'outline'
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
                        onMessageClick(message);
                      }}>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Ver mensagem</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsResponded(message.id);
                      }}>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        <span>Marcar como respondida</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onArchive(message.id);
                      }}>
                        <Archive className="mr-2 h-4 w-4" />
                        <span>Arquivar</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(message.id);
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
  );
};
