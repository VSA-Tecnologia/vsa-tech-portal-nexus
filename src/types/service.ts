
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
  iconName?: string; // Nome do ícone Lucide
  iconImage?: string; // URL da imagem do ícone
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

// Mock data for categories
export const mockServiceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: 'Desenvolvimento Web',
    slug: 'desenvolvimento-web'
  },
  {
    id: 2,
    name: 'Infraestrutura',
    slug: 'infraestrutura'
  },
  {
    id: 3,
    name: 'Segurança',
    slug: 'seguranca'
  },
  {
    id: 4,
    name: 'Consultoria',
    slug: 'consultoria'
  }
];

// Mock data for services
export const mockServices: Service[] = [
  {
    id: 1,
    title: 'Desenvolvimento de Websites',
    slug: 'desenvolvimento-de-websites',
    categoryId: 1,
    iconType: 'lucide',
    iconName: 'code',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    shortDescription: 'Sites modernos e responsivos para sua empresa',
    content: '<p>Desenvolvemos sites modernos, responsivos e otimizados para SEO que ajudam a fortalecer a presença digital da sua empresa.</p><p>Nossos websites são construídos com as tecnologias mais recentes, garantindo carregamento rápido e ótima experiência do usuário.</p>',
    benefits: [
      'Design responsivo para todos os dispositivos',
      'Otimização para mecanismos de busca (SEO)',
      'Integração com redes sociais',
      'Painel administrativo intuitivo'
    ],
    technologies: ['React', 'Next.js', 'WordPress', 'PHP', 'Laravel'],
    complexity: 'intermediate',
    status: 'published',
    featured: true,
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-11-05'),
    viewCount: 354,
    order: 1
  },
  {
    id: 2,
    title: 'Hospedagem em Cloud',
    slug: 'hospedagem-em-cloud',
    categoryId: 2,
    iconType: 'lucide',
    iconName: 'server',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    shortDescription: 'Soluções de hospedagem escaláveis e seguras',
    content: '<p>Oferecemos soluções de hospedagem em nuvem de alta performance, garantindo disponibilidade e segurança para aplicações críticas de negócios.</p><p>Nossa infraestrutura é monitorada 24/7 para prevenir interrupções e otimizar o desempenho.</p>',
    benefits: [
      'Alta disponibilidade (99.9% uptime)',
      'Backups automáticos diários',
      'Proteção contra DDoS',
      'Suporte técnico 24/7'
    ],
    technologies: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Kubernetes'],
    complexity: 'advanced',
    status: 'published',
    featured: true,
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-10-20'),
    viewCount: 286,
    order: 2
  },
  {
    id: 3,
    title: 'Auditoria de Segurança',
    slug: 'auditoria-de-seguranca',
    categoryId: 3,
    iconType: 'lucide',
    iconName: 'shield',
    coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    shortDescription: 'Identifique vulnerabilidades antes que hackers o façam',
    content: '<p>Nossa auditoria de segurança identifica e corrige vulnerabilidades em sistemas, redes e aplicações antes que possam ser exploradas por atacantes.</p><p>Utilizamos ferramentas avançadas e metodologias de pentest para garantir a segurança do seu ambiente digital.</p>',
    benefits: [
      'Identificação de vulnerabilidades críticas',
      'Recomendações de correção priorizadas',
      'Relatórios detalhados e acessíveis',
      'Conformidade com normas de segurança'
    ],
    technologies: ['OWASP', 'Kali Linux', 'Metasploit', 'Nessus', 'Burp Suite'],
    complexity: 'advanced',
    status: 'published',
    featured: false,
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-09-15'),
    viewCount: 198,
    order: 3
  }
];
