
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginValues) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center mb-8">
          <span className="text-2xl font-bold text-vsa-blue dark:text-white">
            VSA<span className="text-vsa-teal">Tech</span>
          </span>
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Acesso ao Painel</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seu@email.com" 
                          {...field} 
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="********" 
                          {...field} 
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-vsa-teal hover:bg-vsa-teal-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Entrar
                </Button>
                
                <div className="text-center text-sm">
                  <Link
                    to="/admin/forgot-password"
                    className="text-vsa-teal hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Para fins de teste use: <br />
              Email: admin@vsa.com <br />
              Senha: admin123
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Novo usuário?{' '}
            <Link
              to="/admin/register"
              className="text-vsa-teal hover:underline"
            >
              Solicite acesso
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
