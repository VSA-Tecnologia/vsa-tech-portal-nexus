
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword } = useAuth();
  
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      setIsLoading(true);
      await forgotPassword(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset request failed:', error);
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
            <CardTitle className="text-center">Recuperação de Senha</CardTitle>
            <CardDescription className="text-center">
              {emailSent
                ? 'Enviamos instruções para seu email'
                : 'Digite seu email para receber instruções de recuperação'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="text-vsa-teal bg-vsa-teal/10 p-4 rounded-md">
                  <p>Um link de redefinição de senha foi enviado para seu email.</p>
                  <p>Verifique sua caixa de entrada e siga as instruções.</p>
                </div>
                <Link to="/admin/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o login
                  </Button>
                </Link>
              </div>
            ) : (
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
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-vsa-teal hover:bg-vsa-teal-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Enviar Instruções
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

export default ForgotPassword;
