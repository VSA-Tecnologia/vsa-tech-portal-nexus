
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string().min(6, { message: 'Confirmação de senha é obrigatória' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    // Check if we have the necessary tokens in the URL
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      console.error('Missing tokens in URL for password reset');
      toast.error('Link de redefinição inválido ou expirado');
      navigate('/admin/forgot-password');
    }
  }, [searchParams, navigate]);
  
  const onSubmit = async (data: ResetPasswordValues) => {
    try {
      setIsLoading(true);
      console.log('Updating password...');
      
      const result = await updatePassword(data.password);
      
      if (result.error) {
        console.error('Password update failed:', result.error);
        toast.error(result.error);
      } else {
        console.log('Password updated successfully');
        setIsSuccess(true);
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/admin/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Erro inesperado ao redefinir senha');
    } finally {
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
            <CardTitle className="text-center">Redefinir Senha</CardTitle>
            <CardDescription className="text-center">
              {isSuccess
                ? 'Senha redefinida com sucesso!'
                : 'Digite sua nova senha abaixo'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="text-vsa-teal bg-vsa-teal/10 p-4 rounded-md flex items-center justify-center flex-col space-y-2">
                  <CheckCircle className="h-8 w-8 text-vsa-teal" />
                  <p>Sua senha foi redefinida com sucesso!</p>
                  <p className="text-sm">Você será redirecionado para o login em instantes...</p>
                </div>
                <Link to="/admin/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Ir para o login agora
                  </Button>
                </Link>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Digite sua nova senha" 
                            {...field} 
                            autoComplete="new-password"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nova Senha</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Confirme sua nova senha" 
                            {...field} 
                            autoComplete="new-password"
                            disabled={isLoading}
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
                    Redefinir Senha
                  </Button>
                  
                  <div className="text-center">
                    <Link
                      to="/admin/login"
                      className="text-vsa-teal hover:underline text-sm"
                    >
                      Voltar para o login
                    </Link>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
