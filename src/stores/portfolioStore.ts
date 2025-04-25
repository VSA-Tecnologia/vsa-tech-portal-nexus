
import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  detailedDescription?: string;
  technologies?: string[];
  client?: string;
  completionDate?: string;
  url?: string;
  enabled: boolean;
  lastUpdated?: string;
}

// Initial portfolio data
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Portal Corporativo',
    description: 'Desenvolvimento de portal corporativo com intranet para uma grande empresa de tecnologia.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'web',
    detailedDescription: 'Projeto completo de portal corporativo incluindo área pública, intranet segura e sistema de gestão de conteúdo personalizado. Implementação de autenticação integrada com Active Directory, dashboards personalizados e ferramentas colaborativas.',
    technologies: ['React', 'Node.js', 'SQL Server', 'Azure AD'],
    client: 'TechCorp Solutions',
    completionDate: '2023-05-15',
    url: 'https://exemplo.com/portal',
    enabled: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    title: 'ERP para Indústria',
    description: 'Implementação de sistema ERP para gestão de processos industriais.',
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa2e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXJwfGVufDB8fDB8fHww',
    category: 'erp',
    detailedDescription: 'Customização e implantação de sistema ERP para controle de produção, estoque, vendas e finanças. Integração com sistemas legados e desenvolvimento de módulos específicos para o setor industrial.',
    technologies: ['SAP', 'Oracle Database', 'C#', '.NET'],
    client: 'Indústrias Metalúrgicas Brasil',
    completionDate: '2022-11-30',
    url: 'https://exemplo.com/erp-case',
    enabled: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Migração para Cloud',
    description: 'Projeto de migração de infraestrutura on-premise para ambiente AWS.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fHww',
    category: 'cloud',
    detailedDescription: 'Migração completa de infraestrutura local para a nuvem AWS, incluindo redesenho da arquitetura para aproveitar serviços gerenciados, implementação de CI/CD e automação de infraestrutura.',
    technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    client: 'Finantech Serviços',
    completionDate: '2023-02-20',
    url: 'https://exemplo.com/cloud-migration',
    enabled: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 4,
    title: 'App Mobile B2B',
    description: 'Desenvolvimento de aplicativo mobile para gestão de vendas B2B.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww',
    category: 'app',
    detailedDescription: 'Aplicativo mobile multiplataforma para força de vendas com funcionalidades offline, catálogo de produtos, emissão de pedidos e relatórios em tempo real.',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    client: 'Distribuidora Nacional',
    completionDate: '2023-08-10',
    url: 'https://exemplo.com/app-b2b',
    enabled: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 5,
    title: 'E-commerce Completo',
    description: 'Plataforma completa de e-commerce com integração a ERPs e gateways de pagamento.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
    category: 'web',
    detailedDescription: 'Desenvolvimento de plataforma de e-commerce personalizada com integração a múltiplos ERPs, gateways de pagamento e operadores logísticos. Sistema completo de gestão de pedidos, estoque e clientes.',
    technologies: ['Next.js', 'Strapi', 'PostgreSQL', 'Stripe'],
    client: 'Varejo Fashion Store',
    completionDate: '2023-07-05',
    url: 'https://exemplo.com/ecommerce',
    enabled: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 6,
    title: 'Segurança Corporativa',
    description: 'Implementação de políticas de segurança e sistemas de proteção contra ataques.',
    image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'security',
    detailedDescription: 'Auditoria completa de segurança, implementação de políticas de proteção, firewall de próxima geração, sistema de detecção e prevenção de intrusões, e treinamento de equipes.',
    technologies: ['Fortinet', 'Splunk', 'Kali Linux', 'Active Directory'],
    client: 'Banco Regional',
    completionDate: '2023-04-18',
    url: 'https://exemplo.com/security-case',
    enabled: false,
    lastUpdated: new Date().toISOString()
  },
];

interface PortfolioStore {
  items: PortfolioItem[];
  setItems: (items: PortfolioItem[]) => void;
  addItem: (item: PortfolioItem) => void;
  updateItem: (item: PortfolioItem) => void;
  toggleItemEnabled: (id: number, enabled: boolean) => void;
  getEnabledItems: () => PortfolioItem[];
  forceUpdate: () => void;
}

// Create a store with persistence
export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      items: initialPortfolioItems,
      
      setItems: (items) => set(() => ({ 
        items: items.map(item => ({
          ...item,
          lastUpdated: new Date().toISOString()
        }))
      })),
      
      addItem: (item) => {
        const newId = Math.max(...get().items.map(i => i.id), 0) + 1;
        set((state) => ({ 
          items: [
            ...state.items, 
            { 
              ...item, 
              id: newId,
              lastUpdated: new Date().toISOString()
            }
          ] 
        }));
        console.log("Added new portfolio item with ID:", newId);
      },
      
      updateItem: (item) => {
        set((state) => ({
          items: state.items.map(i => 
            i.id === item.id 
              ? { ...item, lastUpdated: new Date().toISOString() } 
              : i
          )
        }));
        console.log("Updated portfolio item with ID:", item.id);
      },
      
      toggleItemEnabled: (id, enabled) => {
        set((state) => ({
          items: state.items.map(i => 
            i.id === id 
              ? { ...i, enabled, lastUpdated: new Date().toISOString() } 
              : i
          )
        }));
        console.log("Toggled portfolio item enabled state. ID:", id, "Enabled:", enabled);
      },
      
      getEnabledItems: () => get().items.filter(item => item.enabled),
      
      forceUpdate: () => {
        // Force a state update with the same items but updated timestamp
        const currentItems = get().items;
        set({ 
          items: currentItems.map(item => ({
            ...item,
            lastUpdated: new Date().toISOString()
          }))
        });
        console.log("Forced portfolio store update");
      }
    }),
    {
      name: 'portfolio-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
      partialize: (state) => ({ 
        items: state.items 
      }),
    }
  )
);

// Hook to handle hydration
export function useHydratedPortfolioStore() {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    // This forces a rerender once the store is hydrated
    const unsubscribe = usePortfolioStore.persist.onHydrate(() => {
      console.log("Portfolio store hydration started");
      setHydrated(false);
    });
    
    const unsubscribeFinishHydration = usePortfolioStore.persist.onFinishHydration(() => {
      console.log("Portfolio store hydration finished with", usePortfolioStore.getState().items.length, "items");
      setHydrated(true);
    });
    
    // Check initial hydration state
    const initialHydration = usePortfolioStore.persist.hasHydrated();
    setHydrated(initialHydration);
    console.log("Initial portfolio store hydration state:", initialHydration);
    
    return () => {
      unsubscribe();
      unsubscribeFinishHydration();
    };
  }, []);
  
  return hydrated;
}
