
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Page, PageCategory } from '@/types/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Tag, X, Loader2, FileImage, Save, ArrowLeft 
} from 'lucide-react';
import { slugify } from '@/lib/utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PageEditorProps {
  page: Page | null;
  categories: PageCategory[];
  onSave: (page: Page) => void;
  onCancel: () => void;
  isNew?: boolean;
}

export const PageEditor: React.FC<PageEditorProps> = ({ 
  page, 
  categories, 
  onSave, 
  onCancel, 
  isNew = false 
}) => {
  const [form, setForm] = useState<Page>({
    id: 0,
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured: false,
    categoryId: 1,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
  });
  
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(isNew);
  
  useEffect(() => {
    if (page) {
      setForm(page);
      setAutoSlug(false);
    }
  }, [page]);
  
  const handleChange = (
    field: keyof Page,
    value: string | boolean | number | string[]
  ) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug when title changes if autoSlug is enabled
      if (field === 'title' && autoSlug) {
        updated.slug = slugify(value as string);
      }
      
      return updated;
    });
  };
  
  const handleContentChange = (content: string) => {
    setForm(prev => ({ ...prev, content }));
  };
  
  const addTag = () => {
    if (!newTag.trim()) return;
    
    if (!form.tags.includes(newTag.trim())) {
      handleChange('tags', [...form.tags, newTag.trim()]);
    }
    
    setNewTag('');
  };
  
  const removeTag = (tag: string) => {
    handleChange('tags', form.tags.filter(t => t !== tag));
  };
  
  const handleSubmit = () => {
    if (!form.title.trim()) {
      // Show an error message
      return;
    }
    
    setIsLoading(true);
    
    // Ensuring updatedAt is set to current time
    const updatedPage = {
      ...form,
      updatedAt: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      onSave(updatedPage);
      setIsLoading(false);
    }, 800);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>{isNew ? 'Criar Nova Página' : 'Editar Página'}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Título da página"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <div className="min-h-[400px]">
                <ReactQuill 
                  theme="snow" 
                  value={form.content} 
                  onChange={handleContentChange}
                  modules={quillModules}
                  className="h-[350px] mb-12"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Publicação</h3>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {form.status === 'published' ? 'Atualizar' : 'Publicar'}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex space-x-2 items-center">
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="slug-da-pagina"
                    disabled={autoSlug}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <Switch
                    checked={autoSlug}
                    onCheckedChange={setAutoSlug}
                    id="auto-slug"
                  />
                  <Label htmlFor="auto-slug" className="text-sm text-gray-500">
                    Gerar automaticamente do título
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  placeholder="Breve descrição da página"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={form.categoryId.toString()}
                  onValueChange={(value) => handleChange('categoryId', parseInt(value, 10))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Destaque</Label>
                  <Switch
                    id="featured"
                    checked={form.featured}
                    onCheckedChange={(checked) => handleChange('featured', checked)}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Páginas destacadas aparecem em locais de maior visibilidade no site.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Imagem Destaque</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center">
                  {form.image ? (
                    <div className="relative">
                      <img 
                        src={form.image} 
                        alt={form.title}
                        className="max-h-[200px] mx-auto mb-2"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChange('image', '')}
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400">
                      <FileImage className="h-10 w-10 mx-auto mb-2" />
                      <p>Clique para adicionar uma imagem</p>
                      <p className="text-xs">ou arraste e solte aqui</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between bg-gray-50 dark:bg-gray-800">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
};
