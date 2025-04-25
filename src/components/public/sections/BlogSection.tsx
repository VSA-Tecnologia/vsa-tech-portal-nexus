
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CalendarDays, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Como a Inteligência Artificial está transformando o mercado de TI',
    excerpt: 'Descubra como as empresas estão implementando IA para automação e otimização de processos.',
    image: 'https://images.unsplash.com/photo-1677693560570-65373f29c438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D',
    date: '10 Jan 2023',
    author: 'Carlos Mendes',
    category: 'Tecnologia'
  },
  {
    id: 2,
    title: 'Segurança cibernética: como proteger sua empresa em 2024',
    excerpt: 'Um guia completo sobre as melhores práticas de segurança para proteger dados empresariais.',
    image: 'https://images.unsplash.com/photo-1580894895938-bd31a62ed8ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D',
    date: '25 Fev 2024',
    author: 'Mariana Torres',
    category: 'Segurança'
  },
  {
    id: 3,
    title: 'Os benefícios da migração para a nuvem em pequenas empresas',
    excerpt: 'Como a computação em nuvem pode reduzir custos e aumentar a eficiência operacional.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdWQlMjBjb21wdXRpbmd8ZW58MHx8MHx8fDA%3D',
    date: '03 Mar 2024',
    author: 'Paulo Silva',
    category: 'Cloud'
  }
];

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Blog e Insights</h2>
          <p className="section-subtitle">
            Artigos, dicas e novidades sobre tecnologia e transformação digital
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              
              <CardHeader className="p-5 pb-0">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                  <span className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-vsa-blue line-clamp-2 hover:text-vsa-teal transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="p-5">
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              
              <CardFooter className="p-5 pt-0">
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-vsa-teal hover:text-vsa-teal-dark hover:bg-transparent group"
                >
                  Ler mais 
                  <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-vsa-blue hover:bg-vsa-blue-dark">
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
