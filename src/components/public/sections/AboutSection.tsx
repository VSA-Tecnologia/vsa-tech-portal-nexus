
import React from 'react';
import { CheckCircle2, Award, Users2, Clock } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Sobre a VSA Tecnologia</h2>
          <p className="section-subtitle">
            Há mais de uma década transformando negócios através de soluções tecnológicas inovadoras
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2970&auto=format&fit=crop" 
              alt="Equipe VSA Tecnologia" 
              className="rounded-lg shadow-xl"
              width="600"
              height="400"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-vsa-blue mb-6">
              Nossa Jornada de Inovação
            </h3>
            
            <p className="text-gray-700 mb-6">
              A VSA Tecnologia nasceu da visão de um grupo de especialistas determinados a transformar o mercado de TI no Brasil. Desde 2010, trabalhamos para trazer as melhores soluções tecnológicas personalizadas para empresas de todos os portes.
            </p>
            
            <p className="text-gray-700 mb-8">
              Nossa missão é simplificar a tecnologia e torná-la uma aliada estratégica para o crescimento do seu negócio, oferecendo serviços de alta qualidade e suporte contínuo.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-vsa-teal mr-3 flex-shrink-0" />
                <span>Especialistas certificados com anos de experiência no mercado</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-vsa-teal mr-3 flex-shrink-0" />
                <span>Metodologias ágeis que garantem entregas rápidas e eficientes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-vsa-teal mr-3 flex-shrink-0" />
                <span>Soluções personalizadas que atendem às necessidades específicas do seu negócio</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-vsa-teal mr-3 flex-shrink-0" />
                <span>Compromisso com inovação e excelência em todos os projetos</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center card-hover">
            <div className="bg-vsa-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-vsa-blue" />
            </div>
            <h4 className="text-xl font-bold text-vsa-blue mb-2">+500</h4>
            <p className="text-gray-600">Projetos Entregues</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center card-hover">
            <div className="bg-vsa-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users2 className="h-8 w-8 text-vsa-blue" />
            </div>
            <h4 className="text-xl font-bold text-vsa-blue mb-2">+200</h4>
            <p className="text-gray-600">Clientes Satisfeitos</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center card-hover">
            <div className="bg-vsa-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-vsa-blue" />
            </div>
            <h4 className="text-xl font-bold text-vsa-blue mb-2">+12</h4>
            <p className="text-gray-600">Anos de Experiência</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center card-hover">
            <div className="bg-vsa-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users2 className="h-8 w-8 text-vsa-blue" />
            </div>
            <h4 className="text-xl font-bold text-vsa-blue mb-2">+50</h4>
            <p className="text-gray-600">Especialistas na Equipe</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
