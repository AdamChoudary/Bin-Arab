import Link from 'next/link';

export default function Footer() {
  return (
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
              <li><Link href="/properties/sales" className="text-decoration-none text-reset">- Exclusive Residential Property Sales</Link></li>
              <li><Link href="/properties/commercial" className="text-decoration-none text-reset">- Premium Commercial Property Solutions</Link></li>
              <li><Link href="/properties/investment" className="text-decoration-none text-reset">- Strategic Investment Consulting</Link></li>
              <li><Link href="/properties/rental" className="text-decoration-none text-reset">- Professional Rental Management</Link></li>
              <li><Link href="/blogs" className="text-decoration-none text-reset">- Market Insights & Editorial</Link></li>
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
  );
}
