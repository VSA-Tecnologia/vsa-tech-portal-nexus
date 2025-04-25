
import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { 
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-vsa-blue text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              VSA<span className="text-vsa-teal">Tech</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Transformando negócios através da tecnologia desde 2010. Soluções inovadoras para empresas de todos os portes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-vsa-teal transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-vsa-teal transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-vsa-teal transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-vsa-teal transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {['Início', 'Sobre', 'Serviços', 'Portfólio', 'Blog', 'Contato'].map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item === 'Início' ? 'hero' : item.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-gray-300 hover:text-vsa-teal transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              {['Desenvolvimento Web', 'Sistemas ERP', 'Cloud Computing', 'Infraestrutura de TI', 'Segurança Digital', 'Suporte Técnico'].map((service) => (
                <li key={service}>
                  <ScrollLink
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-gray-300 hover:text-vsa-teal transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {service}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-vsa-teal mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Av. Tecnologia, 1000<br />
                  Bairro Inovação<br />
                  São Paulo - SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-vsa-teal mr-3 flex-shrink-0" />
                <span className="text-gray-300">(11) 5555-5555</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-vsa-teal mr-3 flex-shrink-0" />
                <a href="mailto:contato@vsatecnologia.com.br" className="text-gray-300 hover:text-vsa-teal transition-colors">
                  contato@vsatecnologia.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} VSA Tecnologia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-vsa-teal transition-colors">
              Termos de Serviço
            </Link>
            <Link to="#" className="hover:text-vsa-teal transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
