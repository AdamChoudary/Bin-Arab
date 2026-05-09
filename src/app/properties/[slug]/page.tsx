'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const propertyData: Record<string, any> = {
  apartments: {
    title: 'Apartments, Houses & Villas',
    mainTitle: 'Luxury Apartments, Houses & Villas',
    description: 'Stylish and comfortable living spaces designed to suit every lifestyle, from modern apartments to luxurious villas. Located in prime areas of Bahria Islamabad, these properties offer world class amenities, security, and convenience.',
    features: [
      'Modern interior design',
      'Prime locations',
      '24/7 security & maintenance',
      'Close to schools, markets, and parks'
    ],
    image: '/images/house.jpg',
    subImages: ['/images/villa.jpg', '/images/plaza.jpg']
  },
  plots: {
    title: 'Residential and Commercial Plots',
    mainTitle: 'Prime Residential & Commercial Plots',
    description: 'Prime plots available for building your dream home or establishing a profitable business venture. These plots are strategically located to maximize value and convenience, with flexible sizes to suit individual requirements.',
    features: [
      'Ideal for residential or commercial development',
      'Near main roads and amenities',
      'Secure gated communities',
      'Easy financing options available'
    ],
    image: '/images/investmenttt.jpg',
    subImages: ['/images/house.jpg', '/images/villa.jpg']
  },
  commercial: {
    title: 'Commercial Spaces & Plazas',
    mainTitle: 'Strategically Located Commercial Spaces',
    description: 'Perfect for shops, offices, and thriving business hubs. These commercial properties are designed to help businesses flourish, with high visibility, accessibility, and modern infrastructure.',
    features: [
      'High foot traffic locations',
      'Modern architecture & facilities',
      'Secure and well maintained premises',
      'Flexible leasing and investment options'
    ],
    image: '/images/plaza.jpg',
    subImages: ['/images/building.jpg', '/images/villa.jpg']
  },
  sales: {
    title: 'Property Sales',
    mainTitle: 'Premium Property Sales Solutions',
    description: 'We guide clients through buying and selling residential and commercial assets with complete transparency. Our expert team ensures you get the best market value for your properties.',
    features: [
      'Market valuation services',
      'Legal documentation support',
      'Wide network of buyers & sellers',
      'Transparent transactions'
    ],
    image: '/images/sales-sub.jpg',
    subImages: ['/images/house.jpg', '/images/villa.jpg']
  },
  investment: {
    title: 'Investment Consulting',
    mainTitle: 'Strategic Investment Consulting',
    description: 'Our consulting focuses on identifying high-potential opportunities backed by market research. We help you build a profitable real estate portfolio in Bahria Town.',
    features: [
      'ROI analysis & projections',
      'Market trend reports',
      'Portfolio management',
      'Off-market opportunities'
    ],
    image: '/images/investment-sub.jpg',
    subImages: ['/images/investmenttt.jpg', '/images/plaza.jpg']
  },
  rental: {
    title: 'Rental Management',
    mainTitle: 'Professional Rental Management',
    description: 'We offer comprehensive rental management services designed to maximize returns while protecting your property. From tenant screening to maintenance, we handle it all.',
    features: [
      'Tenant screening & placement',
      'Rent collection & reporting',
      'Maintenance & inspections',
      'Legal lease agreements'
    ],
    image: '/images/rental-sub.jpg',
    subImages: ['/images/house.jpg', '/images/rentalll.jpg']
  }
};

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = propertyData[slug] || propertyData.apartments;
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-5">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolled" ref={navbarRef}>
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.png" alt="Logo" style={{ height: '60px' }} />
          </a>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/#properties">Properties</a></li>
              <li className="nav-item"><a className="nav-link" href="/#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="/#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="/#contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="/blogs">Blogs</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5 mt-5">
        <h1 className="text-center text-gold mb-5 mt-3" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data.title}</h1>
        <div className="gold-divider mx-auto mb-5"></div>

        <div className="row g-5">
          <div className="col-lg-7">
            <div className="property-main-img mb-4">
              <img src={data.image} alt={data.title} className="img-fluid rounded shadow-lg w-100" style={{ height: '500px', objectFit: 'cover', border: '2px solid var(--gold)' }} />
            </div>
            <div className="row g-3">
              {data.subImages.map((img: string, idx: number) => (
                <div className="col-6" key={idx}>
                  <img src={img} alt="sub" className="img-fluid rounded shadow-sm w-100" style={{ height: '200px', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="property-info p-4 h-100">
              <h2 className="text-white mb-4" style={{ fontWeight: 'bold' }}>{data.mainTitle}</h2>
              <p className="text-gray mb-4" style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>{data.description}</p>
              
              <ul className="list-unstyled mb-5">
                {data.features.map((feature: string, idx: number) => (
                  <li key={idx} className="mb-3 d-flex align-items-center">
                    <span className="text-gold me-3" style={{ fontSize: '1.5rem' }}>•</span>
                    <span style={{ fontSize: '1.1rem' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={`https://wa.me/923335965199?text=Interested in ${data.title}`} className="btn btn-gold px-5 py-3 fs-5 w-100 mt-auto">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-section mt-5">
        <div className="container py-4 text-center">
          <p className="mb-0">© 2026 Bin Arab Real Estate | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
