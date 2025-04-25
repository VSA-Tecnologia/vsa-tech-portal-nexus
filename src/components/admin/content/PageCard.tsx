
import React from 'react';
import { ScrollText, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

interface PageCardProps {
  title: string;
}

export const PageCard: React.FC<PageCardProps> = ({ title }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center border-b">
        <ScrollText className="h-12 w-12 text-gray-400" />
      </div>
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="text-vsa-teal hover:text-vsa-teal-dark hover:bg-vsa-teal/10">
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
};
