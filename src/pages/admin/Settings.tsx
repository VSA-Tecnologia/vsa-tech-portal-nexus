
import React, { useState } from 'react';
import { 
  Save, Check, AlertCircle, Settings as SettingsIcon, Mail, Globe, Shield, Bell, Moon, Sun
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const generalSettingsSchema = z.object({
  siteName: z.string().min(1, { message: "Nome do site é obrigatório" }),
  companyName: z.string().min(1, { message: "Nome da empresa é obrigatório" }),
  contactEmail: z.string().email({ message: "Email inválido" }),
  contactPhone: z.string().min(1, { message: "Telefone é obrigatório" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  })
});

const emailSettingsSchema = z.object({
  smtpHost: z.string().min(1, { message: "Host SMTP é obrigatório" }),
  smtpPort: z.string().min(1, { message: "Porta SMTP é obrigatória" }),
  smtpUsername: z.string().min(1, { message: "Usuário SMTP é obrigatório" }),
  smtpPassword: z.string().min(1, { message: "Senha SMTP é obrigatória" }),
  emailFrom: z.string().email({ message: "Email de origem inválido" }),
  emailName: z.string().min(1, { message: "Nome do remetente é obrigatório" })
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type EmailSettingsValues = z.infer<typeof emailSettingsSchema>;

const Settings: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [theme, setTheme] = useState('light');
  
  const generalForm = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: 'VSA Tecnologia',
      companyName: 'VSA Tecnologia LTDA',
      contactEmail: 'contato@vsatecnologia.com.br',
      contactPhone: '(11) 5555-5555',
      address: 'Av. Tecnologia, 1000, Bairro Inovação, São Paulo - SP',
      socialMedia: {
        facebook: 'https://facebook.com/vsatecnologia',
        instagram: 'https://instagram.com/vsatecnologia',
        linkedin: 'https://linkedin.com/company/vsatecnologia',
        twitter: 'https://twitter.com/vsatecnologia',
      }
    }
  });
  
  const emailForm = useForm<EmailSettingsValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpHost: 'smtp.vsatecnologia.com.br',
      smtpPort: '587',
      smtpUsername: 'no-reply@vsatecnologia.com.br',
      smtpPassword: '********',
      emailFrom: 'no-reply@vsatecnologia.com.br',
      emailName: 'VSA Tecnologia'
    }
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newMessages: true,
    newUsers: false,
    securityAlerts: true
  });
  
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordExpiry: '90',
    loginAttempts: '5',
    sessionTimeout: '30'
  });
  
  const saveGeneralSettings = (data: GeneralSettingsValues) => {
    // In a real app, this would make an API call
    console.log('Saving general settings:', data);
    toast.success('Configurações gerais salvas com sucesso!');
  };
  
  const saveEmailSettings = (data: EmailSettingsValues) => {
    console.log('Saving email settings:', data);
    toast.success('Configurações de email salvas com sucesso!');
  };
  
  const saveNotificationSettings = () => {
    console.log('Saving notification settings:', notifications);
    toast.success('Configurações de notificações salvas com sucesso!');
  };
  
  const saveSecuritySettings = () => {
    console.log('Saving security settings:', security);
    toast.success('Configurações de segurança salvas com sucesso!');
  };
  
  const sendTestEmail = () => {
    toast.success('Email de teste enviado! Verifique sua caixa de entrada.');
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    toast.success(`Tema alterado para ${newTheme === 'light' ? 'claro' : 'escuro'}`);
  };
  
  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Acesso restrito</AlertTitle>
          <AlertDescription>
            Você não tem permissão para acessar as configurações do sistema. Entre em contato com um administrador.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais, email, notificações e segurança.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={toggleTheme}>
          {theme === 'light' ? (
            <>
              <Moon className="h-4 w-4 mr-2" />
              Modo Escuro
            </>
          ) : (
            <>
              <Sun className="h-4 w-4 mr-2" />
              Modo Claro
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Informações básicas sobre sua empresa e site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(saveGeneralSettings)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Site</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Empresa</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email de Contato</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone de Contato</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={generalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Redes Sociais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="socialMedia.facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="URL do Facebook" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="socialMedia.instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="URL do Instagram" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="socialMedia.linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="URL do LinkedIn" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="socialMedia.twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="URL do Twitter" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-vsa-teal hover:bg-vsa-teal-dark">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>
                Configure as credenciais do servidor SMTP para envio de emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(saveEmailSettings)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={emailForm.control}
                      name="smtpHost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host SMTP</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="smtpPort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porta SMTP</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="smtpUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuário SMTP</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="smtpPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha SMTP</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="emailFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email de Origem</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="emailName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Remetente</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={sendTestEmail}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Email de Teste
                    </Button>
                    
                    <Button type="submit" className="bg-vsa-teal hover:bg-vsa-teal-dark">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerencie como e quando você recebe notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificações por Email</h3>
                      <p className="text-sm text-gray-500">
                        Receber notificações por email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailNotifications: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Novas Mensagens</h3>
                      <p className="text-sm text-gray-500">
                        Notificar quando houver novas mensagens de contato
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newMessages}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, newMessages: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Novos Usuários</h3>
                      <p className="text-sm text-gray-500">
                        Notificar quando novos usuários se registrarem
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newUsers}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, newUsers: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Alertas de Segurança</h3>
                      <p className="text-sm text-gray-500">
                        Notificar sobre tentativas de login suspeitas
                      </p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, securityAlerts: checked})
                      }
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveNotificationSettings} className="bg-vsa-teal hover:bg-vsa-teal-dark">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Gerencie as configurações de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                    <p className="text-sm text-gray-500">
                      Exigir verificação adicional ao fazer login
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecurity({...security, twoFactorAuth: checked})
                    }
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <h3 className="font-medium">Expiração de Senha</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Exigir alteração de senha após um certo período
                    </p>
                    <Select
                      value={security.passwordExpiry}
                      onValueChange={(value) => 
                        setSecurity({...security, passwordExpiry: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="180">180 dias</SelectItem>
                        <SelectItem value="0">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Tentativas de Login</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Bloquear conta após certo número de tentativas falhas
                    </p>
                    <Select
                      value={security.loginAttempts}
                      onValueChange={(value) => 
                        setSecurity({...security, loginAttempts: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um número" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 tentativas</SelectItem>
                        <SelectItem value="5">5 tentativas</SelectItem>
                        <SelectItem value="10">10 tentativas</SelectItem>
                        <SelectItem value="0">Desativado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Tempo Limite da Sessão</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Encerrar sessão após período de inatividade
                    </p>
                    <Select
                      value={security.sessionTimeout}
                      onValueChange={(value) => 
                        setSecurity({...security, sessionTimeout: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tempo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                        <SelectItem value="0">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveSecuritySettings} className="bg-vsa-teal hover:bg-vsa-teal-dark">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
