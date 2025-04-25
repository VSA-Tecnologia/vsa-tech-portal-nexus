
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, Undo } from 'lucide-react';

interface SectionContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  enabled: boolean;
}

interface SectionEditorProps {
  section: string;
  content: SectionContent;
  onCancel: () => void;
  onChange: (section: string, field: keyof SectionContent, value: string | boolean) => void;
  onSave: (section: string) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  content,
  onCancel,
  onChange,
  onSave,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Título</label>
        <Input
          value={content.title}
          onChange={(e) => onChange(section, 'title', e.target.value)}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Subtítulo</label>
        <Input
          value={content.subtitle}
          onChange={(e) => onChange(section, 'subtitle', e.target.value)}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Conteúdo</label>
        <Textarea
          rows={4}
          value={content.content}
          onChange={(e) => onChange(section, 'content', e.target.value)}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">URL da Imagem</label>
        <Input
          value={content.image}
          onChange={(e) => onChange(section, 'image', e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Insira a URL da imagem ou deixe em branco se não houver imagem.
        </p>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          <Undo className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button className="bg-vsa-teal hover:bg-vsa-teal-dark" onClick={() => onSave(section)}>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
