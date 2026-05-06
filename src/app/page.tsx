'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [showRequirement, setShowRequirement] = useState(true);

  useEffect(() => {
    // Import Bootstrap JS
    import('bootstrap/dist/js/bootstrap.bundle.min.js' as any);

    // Sticky Navbar Effect
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('scrolled', window.scrollY > 50);
      }
    };

    // Custom Cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    // Auto close mobile menu
    const handleNavLinkClick = () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      navLinks.forEach(link => link.removeEventListener('click', handleNavLinkClick));
    };
  }, []);

  return (
    <>
      <div className="cursor-circle" ref={cursorRef}></div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" ref={navbarRef}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/images/logo.png" alt="Logo" style={{ height: '60px' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#properties">Properties</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="/blogs">Blogs</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Luxury Living in Bahria Islamabad</h1>
            <p>Buy • Sell • Invest with Confidence</p>
            <a href="#properties" className="btn btn-gold">View Properties</a>
          </div>
        </div>

        {/* Floating Requirement Box */}
        {showRequirement && (
          <div className="requirement-box d-none d-md-block">
            <button className="close-btn" onClick={() => setShowRequirement(false)}>×</button>
            <h6>Didn't find what you're looking for?</h6>
            <p>We have access to multiple projects and off-market opportunities. Share your requirement and our team will find the best match for you.</p>
            <button className="btn btn-gold btn-sm w-100">Submit Your Requirement</button>
          </div>
        )}
      </section>

      {/* EXPLORE PROPERTY OPTIONS */}
      <section id="properties" className="section bg-black">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="text-gold">Explore Property Options</h2>
            <div className="gold-divider mx-auto"></div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="property-card">
                <div className="img-container">
                  <img src="/images/house.jpg" alt="Apartments" />
                </div>
                <div className="content">
                  <h5>Apartments, Houses & Villas</h5>
                  <p>Stylish and comfortable living spaces designed to suit every lifestyle, from modern apartments to luxurious villas.</p>
                  <button className="btn btn-gold w-100">Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="property-card">
                <div className="img-container">
                  <img src="/images/investmenttt.jpg" alt="Plots" />
                </div>
                <div className="content">
                  <h5>Residential and Commercial Plots</h5>
                  <p>Prime plots available for building your dream home or establishing a profitable business venture.</p>
                  <button className="btn btn-gold w-100">Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="property-card">
                <div className="img-container">
                  <img src="/images/plaza.jpg" alt="Commercial" />
                </div>
                <div className="content">
                  <h5>Commercial Spaces & Plazas</h5>
                  <p>Strategically located commercial properties perfect for shops, offices, and thriving business hubs.</p>
                  <button className="btn btn-gold w-100">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section text-center">
        <div className="container">
          <div className="section-title">
            <h2 className="text-gold">Our Premium Services</h2>
            <div className="gold-divider mx-auto"></div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-img"><img src="/images/property-sales.jpg" alt="Property Sales" /></div>
                <div className="service-content">
                  <h4>Property Sales</h4>
                  <p>We deliver premium property sales solutions, guiding clients through buying and selling residential and commercial assets.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-img"><img src="/images/investmenttt.jpg" alt="Investment Consulting" /></div>
                <div className="service-content">
                  <h4>Investment Consulting</h4>
                  <p>Our investment consulting focuses on identifying high potential opportunities backed by market research.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-img"><img src="/images/rentalll.jpg" alt="Rental Management" /></div>
                <div className="service-content">
                  <h4>Rental Management</h4>
                  <p>We offer comprehensive rental management services designed to maximize returns while protecting your property.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-img"><img src="/images/house.jpg" alt="Construction" /></div>
                <div className="service-content">
                  <h4>Construction</h4>
                  <p>We provide end-to-end construction solutions, delivering high-quality residential and commercial projects.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-img"><img src="/images/villa.jpg" alt="Renovation" /></div>
                <div className="service-content">
                  <h4>Renovation</h4>
                  <p>Transform your living spaces with our premium renovation and remodeling services, tailored to your preferences.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-img"><img src="/images/plaza.jpg" alt="Designing" /></div>
                <div className="service-content">
                  <h4>Designing</h4>
                  <p>Our expert team provides architectural and interior design solutions to bring your vision to life.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section bg-dark text-center about-section">
        <div className="container">
          <h2 className="section-title text-gold">About Us</h2>
          <div className="gold-divider mx-auto"></div>
          <p className="about-text">
            <span>Bin Arab Real Estate & Builders</span> has been a trusted name in real estate marketing <span>since 2016</span>, delivering reliable and result-driven property solutions in Islamabad and Rawalpindi. With a strong presence in <span>Bahria Enclave Islamabad</span> and Bahria Town Rawalpindi, we have consistently provided expert services in property buying, selling, and rental management.
            <br /><br />
            Over the years, we have expanded our expertise beyond brokerage into <span>construction and development</span>, successfully delivering multiple residential and commercial projects. Our hands-on market experience and commitment to quality have positioned us among the most reliable real estate companies in the region.
            <br /><br />
            For the past 3.5 years, we have proudly served as a <span>land provider for Bahria Enclave Islamabad</span>, a testament to the trust and credibility we have built within the industry. Our strong relationship with Bahria Town reflects our professionalism, transparency, and <span>consistent performance</span>.
            <br /><br />
            At Bin Arab Real Estate & Builders, our mission is to provide secure, profitable, and transparent real estate solutions, helping our clients make <span>confident property decisions</span>.
          </p>
        </div>
      </section>

      {/* OUR WORK SHOWCASE */}
      <section className="section bg-black text-center">
        <div className="container">
          <div className="section-title">
            <h2 className="text-gold">Our Work Showcase</h2>
            <div className="gold-divider mx-auto"></div>
          </div>
          <div className="showcase-container">
            <div id="showcaseCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner rounded shadow-lg">
                <div className="carousel-item active">
                  <img src="/images/building.jpg" className="d-block w-100" alt="Work Showcase 1" />
                </div>
                <div className="carousel-item">
                  <img src="/images/plaza.jpg" className="d-block w-100" alt="Work Showcase 2" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#showcaseCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#showcaseCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer id="contact" className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h4 className="footer-title">About Bin Arab Real Estate</h4>
              <p>
                Bin Arab Real Estate is a premium property consultancy firm based in 
                Bahria Town Islamabad. We specialize in buying, selling, rental 
                management, and profitable property investments with complete transparency and trust.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-list">
                <li>- Exclusive Residential Property Sales</li>
                <li>- Premium Commercial Property Solutions</li>
                <li>- Strategic Investment Consulting</li>
                <li>- Professional Rental Management</li>
                <li>- Property Documentation & Legal Support</li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 mb-4">
              <h4 className="footer-title">Contact Us</h4>
              <p>📍 Shop#4, Embassy Gardens, Sector C1, Bahria Enclave, Islamabad</p>
              <p>📞 +92 333 5965199</p>
              <p>📧 info@binarabrealestate.com</p>
              <p>🕒 Mon – Sat | 10:00 AM – 7:00 PM</p>
            </div>
          </div>

          <div className="footer-bottom text-center">
            <p>© 2026 Bin Arab Real Estate | All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/923335965199" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </>
  );
}
