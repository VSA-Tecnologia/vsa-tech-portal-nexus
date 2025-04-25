
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  subject: z.string().min(1, { message: 'Assunto é obrigatório' }),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Entre em Contato</h2>
          <p className="section-subtitle">
            Estamos prontos para transformar a tecnologia da sua empresa
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-vsa-blue mb-6">Envie-nos uma mensagem</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Como podemos ajudar?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva sua necessidade em detalhes..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-vsa-teal hover:bg-vsa-teal-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-vsa-blue mb-6">Informações de Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-vsa-teal/10 text-vsa-teal mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Nosso Escritório</h4>
                  <address className="not-italic text-gray-600">
                    Av. Tecnologia, 1000<br />
                    Bairro Inovação<br />
                    São Paulo - SP, 01234-000
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-vsa-teal/10 text-vsa-teal mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Telefones</h4>
                  <p className="text-gray-600">
                    <a href="tel:+551155555555" className="hover:text-vsa-teal">+55 (11) 5555-5555</a><br />
                    <a href="tel:+551155555556" className="hover:text-vsa-teal">+55 (11) 5555-5556</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-vsa-teal/10 text-vsa-teal mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:contato@vsatecnologia.com.br" className="hover:text-vsa-teal">contato@vsatecnologia.com.br</a><br />
                    <a href="mailto:suporte@vsatecnologia.com.br" className="hover:text-vsa-teal">suporte@vsatecnologia.com.br</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-vsa-teal/10 text-vsa-teal mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Horário de Atendimento</h4>
                  <p className="text-gray-600">
                    Segunda - Sexta: 9:00 - 18:00<br />
                    Suporte 24/7 para clientes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">Localização</h4>
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234055.2391429248!2d-46.91236955556642!3d-23.6824124168582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo%2C%20Brazil!5e0!3m2!1sen!2sus!4v1681748984960!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  title="Localização do escritório da VSA Tecnologia"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
