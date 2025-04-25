
import React from 'react';
import { MessageCircleMore } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '5500000000000'; // Replace with actual number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Olá! Gostaria de saber mais sobre os serviços da VSA Tecnologia.`;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircleMore className="h-6 w-6" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Fale conosco pelo WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
