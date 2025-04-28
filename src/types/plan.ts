
export interface PlanFeature {
  id: number;
  feature: string;
  included: boolean;
}

export interface Plan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  order: number;
  status: 'draft' | 'published';
  serviceType: 'cloud' | 'server' | 'database' | 'wifi' | 'hard-drive' | 'archive' | 'signal';
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for testing
export const mockPlans: Plan[] = [
  {
    id: 1,
    name: 'Starter',
    price: 'R$ 1.999/mês',
    description: 'Ideal para pequenas empresas iniciando na transformação digital',
    features: [
      { id: 1, feature: 'Infraestrutura básica de TI', included: true },
      { id: 2, feature: 'Suporte 8x5', included: true },
      { id: 3, feature: 'Site responsivo', included: true },
      { id: 4, feature: 'Email corporativo (5 contas)', included: true },
      { id: 5, feature: 'Backups semanais', included: true },
      { id: 6, feature: 'Segurança básica', included: true },
      { id: 7, feature: 'Integrações com ERPs', included: false },
      { id: 8, feature: 'Monitoramento 24/7', included: false },
    ],
    buttonText: 'Começar agora',
    order: 1,
    status: 'published',
    serviceType: 'cloud',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15'),
  },
  {
    id: 2,
    name: 'Business',
    price: 'R$ 3.999/mês',
    description: 'Para empresas em fase de crescimento que precisam de mais recursos',
    features: [
      { id: 1, feature: 'Infraestrutura avançada de TI', included: true },
      { id: 2, feature: 'Suporte 12x6', included: true },
      { id: 3, feature: 'Portal corporativo completo', included: true },
      { id: 4, feature: 'Email corporativo (20 contas)', included: true },
      { id: 5, feature: 'Backups diários', included: true },
      { id: 6, feature: 'Segurança avançada', included: true },
      { id: 7, feature: 'Integrações com ERPs', included: true },
      { id: 8, feature: 'Monitoramento 24/7', included: false },
    ],
    popular: true,
    buttonText: 'Escolher este plano',
    order: 2,
    status: 'published',
    serviceType: 'server',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15'),
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 'R$ 7.999/mês',
    description: 'Solução completa para grandes empresas com necessidades complexas',
    features: [
      { id: 1, feature: 'Infraestrutura premium de TI', included: true },
      { id: 2, feature: 'Suporte 24/7', included: true },
      { id: 3, feature: 'Portal corporativo + intranet', included: true },
      { id: 4, feature: 'Email corporativo (ilimitado)', included: true },
      { id: 5, feature: 'Backups contínuos', included: true },
      { id: 6, feature: 'Segurança enterprise', included: true },
      { id: 7, feature: 'Integrações completas', included: true },
      { id: 8, feature: 'Monitoramento 24/7', included: true },
    ],
    buttonText: 'Fale com um consultor',
    order: 3,
    status: 'published',
    serviceType: 'database',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15'),
  }
];
