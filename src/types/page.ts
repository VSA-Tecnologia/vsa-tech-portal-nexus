
export interface PageCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured: boolean;
  categoryId: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  image?: string;
  tags: string[];
}

export const mockPageCategories: PageCategory[] = [
  { id: 1, name: 'Páginas Principais', slug: 'principais' },
  { id: 2, name: 'Institucional', slug: 'institucional' },
  { id: 3, name: 'Suporte', slug: 'suporte' },
  { id: 4, name: 'Legal', slug: 'legal' },
];

export const mockPages: Page[] = [
  {
    id: 1,
    title: 'Blog',
    slug: 'blog',
    content: '<p>Conteúdo do blog vai aqui.</p>',
    excerpt: 'Página do blog da VSA Tecnologia',
    featured: true,
    categoryId: 1,
    status: 'published',
    createdAt: '2023-05-15T14:00:00Z',
    updatedAt: '2023-06-20T10:30:00Z',
    tags: ['blog', 'noticias']
  },
  {
    id: 2,
    title: 'Sobre',
    slug: 'sobre',
    content: '<p>A VSA Tecnologia é uma empresa...</p>',
    excerpt: 'Conheça mais sobre a VSA Tecnologia',
    featured: true,
    categoryId: 2,
    status: 'published',
    createdAt: '2023-04-10T09:00:00Z',
    updatedAt: '2023-04-10T09:00:00Z',
    tags: ['institucional', 'empresa']
  },
  {
    id: 3,
    title: 'Contato',
    slug: 'contato',
    content: '<p>Entre em contato conosco...</p>',
    excerpt: 'Entre em contato com a VSA Tecnologia',
    featured: false,
    categoryId: 1,
    status: 'published',
    createdAt: '2023-04-12T11:00:00Z',
    updatedAt: '2023-05-22T16:45:00Z',
    tags: ['contato', 'suporte']
  },
  {
    id: 4,
    title: 'Serviços',
    slug: 'servicos',
    content: '<p>Oferecemos diversos serviços...</p>',
    excerpt: 'Conheça os serviços da VSA Tecnologia',
    featured: true,
    categoryId: 1,
    status: 'published',
    createdAt: '2023-04-15T13:30:00Z',
    updatedAt: '2023-05-18T09:20:00Z',
    tags: ['serviços', 'soluções']
  },
  {
    id: 5,
    title: 'Termos de Uso',
    slug: 'termos-de-uso',
    content: '<p>Os termos de uso da VSA Tecnologia...</p>',
    excerpt: 'Termos de uso da VSA Tecnologia',
    featured: false,
    categoryId: 4,
    status: 'published',
    createdAt: '2023-03-05T10:00:00Z',
    updatedAt: '2023-03-05T10:00:00Z',
    tags: ['legal', 'termos']
  },
  {
    id: 6,
    title: 'Política de Privacidade',
    slug: 'politica-de-privacidade',
    content: '<p>Política de privacidade da VSA Tecnologia...</p>',
    excerpt: 'Política de privacidade da VSA Tecnologia',
    featured: false,
    categoryId: 4,
    status: 'published',
    createdAt: '2023-03-05T11:30:00Z',
    updatedAt: '2023-03-05T11:30:00Z',
    tags: ['legal', 'privacidade']
  }
];
