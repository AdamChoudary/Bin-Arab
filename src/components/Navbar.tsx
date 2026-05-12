'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/#properties' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1100] transition-all duration-500 py-4 ${
        scrolled ? 'bg-black/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-2 shadow-2xl md:shadow-none' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="z-[1200]">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className={`transition-all duration-300 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
          />
        </Link>
        
        <button 
          className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-[1200]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-full h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
          <span className={`w-full h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></span>
        </button>

        <div 
          className={`fixed lg:static top-0 right-0 w-full lg:w-auto h-screen lg:h-auto lg:bg-transparent flex flex-col lg:flex-row justify-center lg:justify-end items-center transition-all duration-700 ease-cinematic z-[1150] ${
            isMenuOpen ? 'bg-black translate-x-0' : 'bg-transparent translate-x-full lg:translate-x-0'
          }`}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 list-none p-0 m-0 w-full lg:w-auto px-10 lg:px-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/blogs' && pathname.startsWith('/blogs'));
              return (
                <li key={link.name} className="w-full lg:w-auto text-center">
                  <Link 
                    href={link.href} 
                    onClick={closeMenu}
                    className={`nav-link py-3 lg:py-2 px-4 block transition-all duration-300 ${
                      isActive ? '!text-gold' : 'hover:!text-gold'
                    } ${isMenuOpen ? 'text-[16px] tracking-[3px]' : 'text-[13px]'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Minimalist CTA for Mobile */}
          <div className="lg:hidden mt-16 flex flex-col items-center gap-8 w-full px-10">
            <Link 
              href="/#contact" 
              onClick={closeMenu}
              className="text-gold uppercase tracking-[4px] text-[12px] font-medium border-b border-gold/30 pb-1"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay (Only for partial menus, but we use full screen now) */}
    </nav>
  );
}
