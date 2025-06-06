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

// Note: Service categories and services are now managed through Supabase
// Use the existing services store for data management
