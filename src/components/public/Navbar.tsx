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
      <nav className="container mx-auto flex items-center justify-between py-6">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/63a9548e-8cf5-4a44-97b9-90dda37e911f.png" 
            alt="VSA Tech Logo" 
            className="h-14 w-auto mr-3" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className={`cursor-pointer text-lg font-medium hover:text-vsa-teal transition-colors ${
                scrolled ? 'text-vsa-blue dark:text-white' : 'text-vsa-blue dark:text-white'
              }`}
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-8 w-8 text-vsa-blue dark:text-white" />
          ) : (
            <Menu className="h-8 w-8 text-vsa-blue dark:text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-vsa-blue p-6 shadow-lg">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-lg text-vsa-blue dark:text-white font-medium hover:text-vsa-teal transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
