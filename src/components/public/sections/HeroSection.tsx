
import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { useSiteSectionsStore } from '@/stores/siteSectionsStore';

const HeroSection: React.FC = () => {
  const { sections, fetchEnabledSections, getSectionByKey } = useSiteSectionsStore();
  
  useEffect(() => {
    fetchEnabledSections();
  }, [fetchEnabledSections]);
  
  const heroSection = getSectionByKey('hero');
  
  // Fallback content if section is not loaded yet
  const title = heroSection?.title || 'Transformação Digital para seu Negócio';
  const subtitle = heroSection?.subtitle || 'Soluções de tecnologia personalizadas para impulsionar sua empresa para o futuro.';
  const content = heroSection?.content || 'Especialistas em desenvolvimento web, infraestrutura e segurança.';
  const image = heroSection?.image || 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b';

  return (
    <section 
      id="hero" 
      className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden bg-gradient-to-r from-vsa-blue to-vsa-blue-dark text-white"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('${image}?q=80&w=3270&auto=format&fit=crop')` }}
      ></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            {content && (
              <p className="text-lg mb-8 text-gray-300 max-w-xl mx-auto lg:mx-0">
                {content}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn-primary text-lg px-8 py-3"
              >
                Solicitar Orçamento
              </ScrollLink>
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn-secondary text-lg px-8 py-3 text-white bg-transparent border-white/30 hover:bg-white/10"
              >
                Nossos Serviços
              </ScrollLink>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2970&auto=format&fit=crop" 
              alt="Transformação Digital" 
              className="rounded-lg shadow-2xl animate-float"
              width="600"
              height="400"
            />
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="cursor-pointer text-white"
            aria-label="Descer para próxima seção"
          >
            <ChevronDown className="h-8 w-8" />
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
