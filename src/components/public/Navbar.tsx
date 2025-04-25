
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', to: 'hero' },
    { name: 'Sobre', to: 'about' },
    { name: 'Serviços', to: 'services' },
    { name: 'Portfólio', to: 'portfolio' },
    { name: 'Planos', to: 'plans' },
    { name: 'Blog', to: 'blog' },
    { name: 'Contato', to: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-vsa-blue-dark/95 shadow-md backdrop-blur-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-vsa-blue dark:text-white">
            VSA<span className="text-vsa-teal">Tech</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className={`cursor-pointer font-medium hover:text-vsa-teal transition-colors ${
                scrolled ? 'text-vsa-blue dark:text-white' : 'text-vsa-blue dark:text-white'
              }`}
            >
              {link.name}
            </ScrollLink>
          ))}
          
          <Link 
            to="/admin/login"
            className="btn-primary"
          >
            Área do Cliente
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-vsa-blue dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-vsa-blue dark:text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-vsa-blue p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-vsa-blue dark:text-white font-medium hover:text-vsa-teal transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </ScrollLink>
            ))}
            <Link 
              to="/admin/login"
              className="btn-primary inline-block text-center"
              onClick={() => setIsOpen(false)}
            >
              Área do Cliente
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
