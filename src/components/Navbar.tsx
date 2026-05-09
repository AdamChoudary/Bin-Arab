'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('scrolled', window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${isMenuOpen ? 'menu-open' : ''}`} ref={navbarRef}>
      <div className="container">
        <Link className="navbar-brand" href="/" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Logo" className="logo-img" />
        </Link>
        
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#properties" onClick={closeMenu}>Properties</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about" onClick={closeMenu}>About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#services" onClick={closeMenu}>Services</a>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname.startsWith('/blogs') ? 'text-gold' : ''}`} href="/blogs" onClick={closeMenu}>
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contact" onClick={closeMenu}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
