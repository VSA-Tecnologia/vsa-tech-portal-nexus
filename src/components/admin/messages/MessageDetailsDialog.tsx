
import React from 'react';
import { Clock, UserCheck } from 'lucide-react';
import { Message } from '@/types/message';
import { MessageActions } from './MessageActions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageDetailsDialogProps {
  message: Message | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleImportant: (messageId: number) => void;
  onArchive: (messageId: number) => void;
  onMarkAsResponded: (messageId: number) => void;
  onDelete: (messageId: number) => void;
}

export const MessageDetailsDialog: React.FC<MessageDetailsDialogProps> = ({
  message,
  open,
  onOpenChange,
  onToggleImportant,
  onArchive,
  onMarkAsResponded,
  onDelete,
}) => {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{message.subject}</DialogTitle>
          <DialogDescription className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 text-sm">
            <div className="flex items-center">
              <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">{message.name}</span>
              <span className="mx-2 text-gray-500">&lt;{message.email}&gt;</span>
            </div>
            <div className="flex items-center ml-auto">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-gray-500">{message.date}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[300px] mt-2">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="whitespace-pre-line">{message.message}</p>
          </div>
        </ScrollArea>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <MessageActions
            message={message}
            onToggleImportant={onToggleImportant}
            onArchive={onArchive}
            onMarkAsResponded={onMarkAsResponded}
            onDelete={onDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
