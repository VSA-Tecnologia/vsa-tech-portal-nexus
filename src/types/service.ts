
export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  category?: ServiceCategory;
  iconType: 'lucide' | 'image';
  iconName?: string;
  iconImage?: string;
  coverImage: string;
  shortDescription: string;
  content: string;
  benefits: string[];
  technologies: string[];
  complexity: 'basic' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  order: number;
}

// Temporary mock data until we fully migrate to Supabase
export const mockServiceCategories: ServiceCategory[] = [
  { id: 1, name: 'Desenvolvimento Web', slug: 'desenvolvimento-web' },
  { id: 2, name: 'Infraestrutura', slug: 'infraestrutura' },
  { id: 3, name: 'Segurança', slug: 'seguranca' },
  { id: 4, name: 'Consultoria', slug: 'consultoria' }
];

export const mockServices: Service[] = [
  {
    id: 1,
    title: 'Desenvolvimento de Sites Responsivos',
    slug: 'desenvolvimento-sites-responsivos',
    categoryId: 1,
    iconType: 'lucide',
    iconName: 'Globe',
    iconImage: '',
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
    shortDescription: 'Criação de sites modernos e responsivos para sua empresa.',
    content: '<p>Desenvolvemos sites profissionais com design moderno e responsivo.</p>',
    benefits: ['Design responsivo', 'SEO otimizado', 'Performance alta'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    complexity: 'intermediate',
    status: 'published',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 245,
    order: 1
  },
  {
    id: 2,
    title: 'Hospedagem em Nuvem',
    slug: 'hospedagem-nuvem',
    categoryId: 2,
    iconType: 'lucide',
    iconName: 'Cloud',
    iconImage: '',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    shortDescription: 'Soluções de hospedagem seguras e escaláveis na nuvem.',
    content: '<p>Oferecemos hospedagem em nuvem com alta disponibilidade.</p>',
    benefits: ['99.9% uptime', 'Backup automático', 'Suporte 24/7'],
    technologies: ['AWS', 'Docker', 'Kubernetes'],
    complexity: 'advanced',
    status: 'published',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 189,
    order: 2
  }
];
