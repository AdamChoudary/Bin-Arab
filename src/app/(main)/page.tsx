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
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    budget: '',
    location: '',
    purpose: ''
  });

  useEffect(() => {
    // Initial check for desktop
    if (window.innerWidth > 768) {
      setShowRequirement(true);
    }

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 800; // Buffer for footer
      
      if (scrollPosition > threshold) {
        // Automatically "submerge" (hide) when hitting the bottom
        setShowRequirement(false);
      } else if (window.innerWidth > 768 && !isManuallyClosed) {
        // Only show back if it wasn't manually closed by the user
        setShowRequirement(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [isManuallyClosed]);

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
        setShowRequirement={(show) => {
          setShowRequirement(show);
          if (!show) setIsManuallyClosed(true); // Mark as manually closed
        }}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSendToWhatsApp={handleSendToWhatsApp}
      />

      <FloatingActions 
        setShowRequirement={(show) => {
          setShowRequirement(show);
          if (show) setIsManuallyClosed(false); // Reset manual close when clicking the button
        }}
        setIsFormOpen={setIsFormOpen}
      />
    </>
  );
}
