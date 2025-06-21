-- Initial schema migration
-- Generated from Supabase types

-- Enums
CREATE TYPE public.dpia_status AS ENUM ('draft','review','approved','expired');
CREATE TYPE public.plan_status AS ENUM ('draft','published');
CREATE TYPE public.risk_impact AS ENUM ('low','medium','high','critical');
CREATE TYPE public.risk_type AS ENUM ('access','modification','disappearance');
CREATE TYPE public.service_complexity AS ENUM ('basic','intermediate','advanced');
CREATE TYPE public.service_status AS ENUM ('draft','published');
CREATE TYPE public.service_type AS ENUM ('cloud','server','database','wifi','hard-drive','archive','signal');
CREATE TYPE public.task_module AS ENUM ('governance','documents','dpia','training','third_parties','reports','consents','general');
CREATE TYPE public.task_priority AS ENUM ('high','medium','low');
CREATE TYPE public.task_status AS ENUM ('planned','in_progress','completed','delayed');
CREATE TYPE public.team_member_status AS ENUM ('active','inactive');
CREATE TYPE public.user_role AS ENUM ('admin','editor','viewer');

-- Tables
CREATE TABLE public.contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.dpias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  responsible TEXT NOT NULL,
  sector TEXT NOT NULL,
  completion_percentage INTEGER DEFAULT 0,
  status public.dpia_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  module public.task_module NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE public.page_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.pages (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES public.page_categories(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  button_text TEXT,
  service_type public.service_type,
  status public.plan_status DEFAULT 'draft',
  popular BOOLEAN DEFAULT false,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.plan_features (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER NOT NULL REFERENCES public.plans(id),
  feature TEXT NOT NULL,
  included BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.portfolio_items (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  client TEXT,
  completion_date DATE,
  description TEXT NOT NULL,
  detailed_description TEXT,
  image TEXT NOT NULL,
  technologies TEXT[],
  title TEXT NOT NULL,
  url TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role public.user_role DEFAULT 'viewer',
  status TEXT DEFAULT 'active',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dpia_id UUID REFERENCES public.dpias(id),
  name TEXT NOT NULL,
  impact public.risk_impact NOT NULL,
  probability public.risk_impact NOT NULL,
  type public.risk_type NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE public.service_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.services (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES public.service_categories(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  benefits TEXT[],
  technologies TEXT[],
  complexity public.service_complexity DEFAULT 'basic',
  status public.service_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  order_position INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.site_sections (
  id SERIAL PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  module public.task_module NOT NULL,
  priority public.task_priority DEFAULT 'medium',
  status public.task_status DEFAULT 'planned',
  responsible TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  progress INTEGER DEFAULT 0,
  milestone_id UUID REFERENCES public.milestones(id),
  assignees TEXT[],
  dependencies TEXT[],
  documents TEXT[],
  tags TEXT[],
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE public.milestones_tasks (
  milestone_id UUID REFERENCES public.milestones(id),
  task_id UUID REFERENCES public.tasks(id)
);

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL,
  status public.team_member_status DEFAULT 'active',
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
