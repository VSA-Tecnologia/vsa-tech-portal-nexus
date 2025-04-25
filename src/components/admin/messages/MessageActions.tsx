
import React from 'react';
import { Star, Archive, Mail, Trash2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Message } from '@/types/message';

interface MessageActionsProps {
  message: Message;
  onToggleImportant: (messageId: number) => void;
  onArchive: (messageId: number) => void;
  onMarkAsResponded: (messageId: number) => void;
  onDelete: (messageId: number) => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  onToggleImportant,
  onArchive,
  onMarkAsResponded,
  onDelete,
}) => {
  return (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
      <Button 
        variant="outline"
        onClick={() => onToggleImportant(message.id)}
      >
        <Star className={`h-4 w-4 mr-2 ${message.important ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        {message.important ? 'Remover importância' : 'Marcar como importante'}
      </Button>
      
      <Button
        variant="outline"
        onClick={() => onArchive(message.id)}
      >
        <Archive className="h-4 w-4 mr-2" />
        Arquivar
      </Button>

      <Button
        variant="destructive"
        onClick={() => onDelete(message.id)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Excluir
      </Button>
      
      <Button 
        onClick={() => onMarkAsResponded(message.id)}
        className="bg-vsa-teal hover:bg-vsa-teal-dark"
      >
        <Mail className="h-4 w-4 mr-2" />
        Responder
      </Button>
    </div>
  );
};
