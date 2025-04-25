
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'CTO',
    company: 'TechnoMarket',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww',
    content: 'A VSA Tecnologia transformou completamente nossa infraestrutura de TI. A migração para a nuvem foi executada sem qualquer interrupção nos serviços, e agora temos uma plataforma muito mais escalável e segura.',
    rating: 5
  },
  {
    id: 2,
    name: 'Ricardo Oliveira',
    role: 'CEO',
    company: 'Oliveira Imports',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    content: 'O sistema ERP desenvolvido pela VSA revolucionou nossos processos internos. Antes tínhamos muitas planilhas e processos manuais, agora tudo está centralizado e automatizado. Superou nossas expectativas!',
    rating: 5
  },
  {
    id: 3,
    name: 'Carla Mendes',
    role: 'Diretora de Marketing',
    company: 'GrupoWeb',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    content: 'Nossa experiência com o desenvolvimento do portal corporativo foi excelente. A equipe da VSA entendeu perfeitamente nossas necessidades e entregou um produto de alta qualidade dentro do prazo.',
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-vsa-blue text-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title text-white">O que Nossos Clientes Dizem</h2>
          <p className="section-subtitle text-gray-300">
            A opinião de quem já transformou seu negócio com nossas soluções
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-200 italic">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
