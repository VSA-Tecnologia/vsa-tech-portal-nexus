
-- Inserir categorias de serviços padrão se não existirem
INSERT INTO service_categories (name, description, slug, order_position, enabled) 
VALUES 
  ('Desenvolvimento Web', 'Criação de sites e aplicações web', 'desenvolvimento-web', 1, true),
  ('E-commerce', 'Lojas virtuais e soluções de vendas online', 'e-commerce', 2, true),
  ('Mobile', 'Aplicativos para dispositivos móveis', 'mobile', 3, true),
  ('Consultoria', 'Consultoria em tecnologia e estratégia digital', 'consultoria', 4, true),
  ('SEO e Marketing', 'Otimização e marketing digital', 'seo-marketing', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- Inserir alguns serviços de exemplo se a tabela estiver vazia
INSERT INTO services (
  title, slug, category_id, short_description, content, 
  benefits, technologies, complexity, status, featured, order_position
)
SELECT 
  'Desenvolvimento de Site Institucional', 'site-institucional', 
  (SELECT id FROM service_categories WHERE slug = 'desenvolvimento-web' LIMIT 1),
  'Criação de site profissional para apresentar sua empresa na internet.',
  '<p>Desenvolvemos sites institucionais modernos e responsivos que apresentam sua empresa de forma profissional na internet.</p><p>Nossos sites são otimizados para SEO e têm carregamento rápido.</p>',
  ARRAY['Design responsivo', 'Otimização SEO', 'Carregamento rápido', 'Formulário de contato'],
  ARRAY['React', 'TypeScript', 'Tailwind CSS'],
  'basic', 'published', true, 1
WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);

INSERT INTO services (
  title, slug, category_id, short_description, content, 
  benefits, technologies, complexity, status, featured, order_position
)
SELECT 
  'E-commerce Completo', 'e-commerce-completo',
  (SELECT id FROM service_categories WHERE slug = 'e-commerce' LIMIT 1),
  'Loja virtual completa com sistema de pagamento e gestão de produtos.',
  '<p>Desenvolvemos lojas virtuais completas com todas as funcionalidades necessárias para vender online.</p><p>Integração com gateways de pagamento e sistemas de gestão.</p>',
  ARRAY['Sistema de pagamento', 'Gestão de produtos', 'Relatórios de vendas', 'App mobile'],
  ARRAY['React', 'Node.js', 'Stripe', 'PostgreSQL'],
  'advanced', 'published', true, 2
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'e-commerce-completo');

INSERT INTO services (
  title, slug, category_id, short_description, content, 
  benefits, technologies, complexity, status, featured, order_position
)
SELECT 
  'Consultoria em Tecnologia', 'consultoria-tecnologia',
  (SELECT id FROM service_categories WHERE slug = 'consultoria' LIMIT 1),
  'Consultoria especializada para otimizar seus processos tecnológicos.',
  '<p>Oferecemos consultoria especializada para empresas que desejam otimizar seus processos tecnológicos.</p><p>Análise completa e recomendações personalizadas.</p>',
  ARRAY['Análise completa', 'Recomendações personalizadas', 'Acompanhamento', 'Relatório detalhado'],
  ARRAY['Análise de sistemas', 'Auditoria', 'Documentação'],
  'intermediate', 'published', false, 3
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'consultoria-tecnologia');
