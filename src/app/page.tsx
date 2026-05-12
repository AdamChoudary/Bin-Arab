'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Properties from '@/components/Properties';
import Services from '@/components/Services';
import About from '@/components/About';
import Showcase from '@/components/Showcase';
import RequirementForm from '@/components/RequirementForm';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  const [showRequirement, setShowRequirement] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    budget: '',
    location: '',
    purpose: ''
  });

  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Initial check for mobile to hide form
    if (window.innerWidth > 768) {
      setShowRequirement(true);
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + window.pageYOffset;
      const bottom = scrollHeight - scrollPos < 200;
      setIsAtBottom(bottom);
    };

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendToWhatsApp = () => {
    const { budget, location, purpose } = formData;
    if (!budget || !location || !purpose) return;

    const text = `*New Requirement Received*\n\n*Budget:* ${budget}\n*Location:* ${location}\n*Purpose:* ${purpose}`;
    const whatsappUrl = `whatsapp://send?phone=923335965199&text=${encodeURIComponent(text)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <Hero />
      <Properties />
      <Services />
      <About />
      <Showcase activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
      
      <RequirementForm 
        showRequirement={showRequirement}
        setShowRequirement={setShowRequirement}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSendToWhatsApp={handleSendToWhatsApp}
        isAtBottom={isAtBottom}
      />

      <FloatingActions 
        isAtBottom={isAtBottom}
        setShowRequirement={setShowRequirement}
        setIsFormOpen={setIsFormOpen}
      />
    </>
  );
}
