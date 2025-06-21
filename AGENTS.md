# Prompt Completo: Migração de Projeto Lovable.dev para Arquitetura Fullstack

## Contexto Inicial
Tenho um projeto desenvolvido no Lovable.dev que precisa ser transformado em uma aplicação fullstack profissional com frontend e backend separados, seguindo as melhores práticas de desenvolvimento.

## Stack Tecnológica Desejada

### Backend
- **Framework**: Fastify (Node.js)
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT
- **Validação**: Zod
- **Documentação API**: Swagger/OpenAPI
- **Testes**: Jest + Supertest
- **Docker**: Para containerização

### Frontend
- **Framework**: React com TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Estado Global**: Zustand ou React Query
- **Formulários**: React Hook Form + Zod
- **Testes**: Vitest + React Testing Library

### DevOps e Ferramentas
- **Monorepo**: Turborepo
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions
- **Deploy**: Docker + Nginx

## Estrutura de Projeto Solicitada

```
projeto-fullstack/
├── README.md
├── package.json
├── turbo.json
├── .gitignore
├── .env.example
├── docker-compose.yml
├── nginx.conf
├──
├── apps/
│   ├── api/                          # Backend Fastify
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   ├── database.ts
│   │   │   │   ├── env.ts
│   │   │   │   └── swagger.ts
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   └── index.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── error.middleware.ts
│   │   │   │   ├── cors.middleware.ts
│   │   │   │   └── validation.middleware.ts
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── users.routes.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── email.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── jwt.ts
│   │   │   │   ├── bcrypt.ts
│   │   │   │   ├── logger.ts
│   │   │   │   └── validators.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   ├── user.types.ts
│   │   │   │   └── api.types.ts
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── tests/
│   │   │   ├── setup.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── routes/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── jest.config.js
│   │   └── Dockerfile
│   │
│   └── web/                          # Frontend React
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/              # Shadcn components
│       │   │   ├── forms/
│       │   │   ├── layout/
│       │   │   └── common/
│       │   ├── pages/
│       │   │   ├── auth/
│       │   │   ├── dashboard/
│       │   │   └── public/
│       │   ├── hooks/
│       │   │   ├── useAuth.ts
│       │   │   ├── useApi.ts
│       │   │   └── useLocalStorage.ts
│       │   ├── services/
│       │   │   ├── api.service.ts
│       │   │   ├── auth.service.ts
│       │   │   └── http.service.ts
│       │   ├── store/
│       │   │   ├── auth.store.ts
│       │   │   ├── user.store.ts
│       │   │   └── index.ts
│       │   ├── utils/
│       │   │   ├── constants.ts
│       │   │   ├── helpers.ts
│       │   │   └── validators.ts
│       │   ├── types/
│       │   │   ├── auth.types.ts
│       │   │   ├── user.types.ts
│       │   │   └── api.types.ts
│       │   ├── styles/
│       │   │   └── globals.css
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── tests/
│       │   ├── setup.ts
│       │   ├── components/
│       │   └── pages/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── vitest.config.ts
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       └── Dockerfile
│
├── packages/                         # Shared packages
│   ├── shared/
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   ├── user.types.ts
│   │   │   │   └── api.types.ts
│   │   │   ├── schemas/
│   │   │   │   ├── auth.schemas.ts
│   │   │   │   ├── user.schemas.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── api.constants.ts
│   │   │   │   └── app.constants.ts
│   │   │   └── utils/
│   │   │       ├── validation.utils.ts
│   │   │       └── format.utils.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                       # Shared configs
│       ├── eslint-config/
│       ├── prettier-config/
│       └── tsconfig/
│
└── docs/                            # Documentação
    ├── API.md
    ├── DEPLOYMENT.md
    ├── DEVELOPMENT.md
    └── ARCHITECTURE.md
```

## Requisitos Específicos

### 1. Backend (Fastify + Prisma + PostgreSQL)
- Configurar servidor Fastify com TypeScript
- Implementar middleware de autenticação JWT
- Criar sistema de validação com Zod
- Configurar Prisma com PostgreSQL
- Implementar CRUD completo para entidades principais
- Adicionar logging estruturado
- Configurar Swagger para documentação da API
- Implementar tratamento de erros centralizado
- Adicionar rate limiting e security headers
- Criar seeds para popular banco de dados

### 2. Frontend (React + TypeScript + Shadcn/ui)
- Configurar Vite com React e TypeScript
- Implementar sistema de autenticação
- Criar componentes reutilizáveis com Shadcn/ui
- Configurar roteamento protegido
- Implementar gerenciamento de estado
- Adicionar formulários com validação
- Criar sistema de notificações/toast
- Implementar loading states e error boundaries
- Configurar interceptors para requisições HTTP

### 3. Shared Package
- Tipos TypeScript compartilhados
- Schemas de validação Zod reutilizáveis
- Constantes e utilitários comuns
- Configurações compartilhadas

### 4. DevOps e Configurações
- Docker Compose para desenvolvimento
- Scripts de build e deploy
- Configuração de CI/CD
- Configuração de linting e formatação
- Setup de testes automatizados
- Configuração de variáveis de ambiente

## Instruções de Implementação

### Passo 1: Análise do Projeto Atual
Por favor, analise o código fornecido do Lovable.dev e identifique:
- Funcionalidades principais
- Modelos de dados utilizados
- Fluxos de autenticação
- Componentes UI existentes
- Lógica de negócio implementada

### Passo 2: Migração do Backend
1. Criar a estrutura base do Fastify
2. Definir schema Prisma baseado nos dados existentes
3. Implementar controllers e services
4. Criar rotas da API RESTful
5. Configurar middleware de autenticação
6. Implementar validações com Zod
7. Adicionar documentação Swagger

### Passo 3: Migração do Frontend
1. Criar projeto React com Vite
2. Migrar componentes existentes para Shadcn/ui
3. Implementar sistema de autenticação
4. Criar páginas e rotas
5. Configurar estado global
6. Implementar formulários com validação
7. Adicionar interceptors para API

### Passo 4: Configuração do Monorepo
1. Configurar Turborepo
2. Criar package shared
3. Configurar scripts de build
4. Implementar linting e formatação
5. Configurar testes

### Passo 5: DevOps
1. Criar Dockerfiles
2. Configurar Docker Compose
3. Setup do CI/CD
4. Configurar deployment

## Entregáveis Esperados

1. **Código Completo**: Todos os arquivos da estrutura acima
2. **Documentação**: README detalhado com instruções de setup
3. **Scripts**: Package.json com todos os comandos necessários
4. **Configurações**: Docker, CI/CD, linting, etc.
5. **Testes**: Cobertura básica de testes unitários e integração
6. **Migrations**: Scripts de migração do banco de dados
7. **Seeds**: Dados iniciais para desenvolvimento

## Observações Importantes

- Manter compatibilidade total com funcionalidades existentes
- Implementar boas práticas de segurança
- Seguir padrões de clean architecture
- Garantir type safety em todo o projeto
- Implementar logging e monitoramento adequados
- Criar documentação clara e completa
- Seguir convenções de nomenclatura consistentes
- Implementar tratamento de erros robusto

## Código do Projeto Atual (Lovable.dev)
[Colar aqui o código do projeto atual que será migrado]

---

Por favor, implemente esta migração seguindo rigorosamente a estrutura e requisitos especificados acima.
