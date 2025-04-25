
export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  status: 'pending' | 'responded' | 'archived';
  important: boolean;
}

export const mockMessages: Message[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    subject: 'Orçamento para desenvolvimento web',
    message: 'Gostaria de solicitar um orçamento para o desenvolvimento de um site institucional para minha empresa de consultoria.',
    date: '2024-04-24 09:30',
    read: false,
    status: 'pending',
    important: true
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    subject: 'Dúvida sobre hospedagem',
    message: 'Olá, gostaria de saber se vocês oferecem serviços de hospedagem de sites e qual o valor mensal.',
    date: '2024-04-23 14:20',
    read: true,
    status: 'responded',
    important: false
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    email: 'carlos@example.com',
    subject: 'Suporte técnico urgente',
    message: 'Estamos enfrentando problemas com nosso servidor. Precisamos de suporte técnico urgente.',
    date: '2024-04-23 08:45',
    read: false,
    status: 'pending',
    important: true
  },
  {
    id: 4,
    name: 'Ana Santos',
    email: 'ana.santos@example.com',
    subject: 'Vaga de emprego',
    message: 'Gostaria de enviar meu currículo para a vaga de desenvolvedor front-end anunciada no LinkedIn.',
    date: '2024-04-22 16:10',
    read: true,
    status: 'archived',
    important: false
  },
  {
    id: 5,
    name: 'Roberto Almeida',
    email: 'roberto@example.com',
    subject: 'Parceria comercial',
    message: 'Somos uma empresa de marketing digital e gostaríamos de propor uma parceria comercial para atender nossos clientes.',
    date: '2024-04-21 11:25',
    read: true,
    status: 'responded',
    important: false
  }
];
