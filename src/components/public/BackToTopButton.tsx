
import React from 'react';
import { ChevronUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

interface BackToTopButtonProps {
  visible: boolean;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ visible }) => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 bg-vsa-blue hover:bg-vsa-blue-dark text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
};

export default BackToTopButton;
