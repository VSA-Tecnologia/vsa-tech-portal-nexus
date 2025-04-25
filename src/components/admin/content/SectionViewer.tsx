
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface SectionContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  enabled: boolean;
}

interface SectionViewerProps {
  section: string;
  content: SectionContent;
  isEditor: boolean;
  onEdit: (section: string) => void;
  onToggleEnabled: (section: string) => void;
}

export const SectionViewer: React.FC<SectionViewerProps> = ({
  section,
  content,
  isEditor,
  onEdit,
  onToggleEnabled,
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{content.content}</p>
        {content.image && (
          <div className="relative h-40 rounded-md overflow-hidden">
            <img 
              src={content.image} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant={content.enabled ? "outline" : "default"}
          className={
            content.enabled 
              ? "border-red-500 text-red-500 hover:bg-red-50" 
              : "bg-green-600 hover:bg-green-700"
          }
          onClick={() => onToggleEnabled(section)}
          disabled={!isEditor}
        >
          {content.enabled ? "Desativar Seção" : "Ativar Seção"}
        </Button>
        <Button 
          onClick={() => onEdit(section)}
          disabled={!isEditor}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </CardFooter>
    </>
  );
};
