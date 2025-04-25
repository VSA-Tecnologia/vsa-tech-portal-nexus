
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
}

export const mockUsers: User[] = [
  { 
    id: 1, 
    name: 'Admin User', 
    email: 'admin@vsa.com', 
    role: 'admin', 
    status: 'active',
    lastLogin: '2024-04-22 14:30' 
  },
  { 
    id: 2, 
    name: 'Editor User', 
    email: 'editor@vsa.com', 
    role: 'editor', 
    status: 'active',
    lastLogin: '2024-04-21 09:15' 
  },
  { 
    id: 3, 
    name: 'Viewer User', 
    email: 'viewer@vsa.com', 
    role: 'viewer', 
    status: 'active',
    lastLogin: '2024-04-20 16:45' 
  },
  { 
    id: 4, 
    name: 'Maria Silva', 
    email: 'maria@example.com', 
    role: 'editor', 
    status: 'active',
    lastLogin: '2024-04-18 10:20' 
  },
  { 
    id: 5, 
    name: 'João Oliveira', 
    email: 'joao@example.com', 
    role: 'viewer', 
    status: 'inactive',
    lastLogin: '2024-03-15 08:30' 
  }
];
