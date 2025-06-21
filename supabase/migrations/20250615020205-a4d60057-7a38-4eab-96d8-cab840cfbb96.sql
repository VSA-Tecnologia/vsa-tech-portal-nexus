
-- depends_on: 20250613000000-initial_schema.sql
-- Criar usuário administrativo diretamente no banco
-- Note: Este é um approach alternativo para criar um usuário admin inicial
-- O usuário precisará fazer login normalmente, mas já terá perfil admin configurado

-- Inserir perfil administrativo diretamente (assumindo que o usuário será criado via auth depois)
-- Primeiro, vamos criar uma entrada temporária que será atualizada quando o usuário fizer login
INSERT INTO public.profiles (id, name, email, role, status, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid, -- ID temporário que será atualizado
  'Vinícius Andrade',
  'vinicius.andrade@vsatecnologia.com.br',
  'admin'::user_role,
  'active',
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin'::user_role,
  status = 'active',
  updated_at = now();

-- Criar função para promover usuário a admin por email
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin'::user_role, 
      updated_at = now()
  WHERE email = user_email;
  
  -- Retorna true se alguma linha foi afetada
  RETURN FOUND;
END;
$$;

-- Garantir que o usuário específico seja admin
SELECT public.promote_user_to_admin('vinicius.andrade@vsatecnologia.com.br');
-- depends_on: 20250613000000-initial_schema.sql
