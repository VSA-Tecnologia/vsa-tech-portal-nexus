
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import HeroSection from '@/components/public/sections/HeroSection';
import AboutSection from '@/components/public/sections/AboutSection';
import ServicesSection from '@/components/public/sections/ServicesSection';
import PortfolioSection from '@/components/public/sections/PortfolioSection';
import PlansSection from '@/components/public/sections/PlansSection';
import BlogSection from '@/components/public/sections/BlogSection';
import ContactSection from '@/components/public/sections/ContactSection';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import BackToTopButton from '@/components/public/BackToTopButton';

const Home: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollButton && window.pageYOffset > 400) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.pageYOffset <= 400) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollButton]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <PlansSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton visible={showScrollButton} />
    </>
  );
};

export default Home;
