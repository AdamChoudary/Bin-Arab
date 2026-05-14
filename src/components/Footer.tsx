import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-16 text-white/70 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="mb-8 md:mb-0">
            <h4 className="text-gold uppercase tracking-[2px] font-medium mb-6 text-lg">Bin Arab Real Estate</h4>
            <p className="leading-relaxed font-light text-sm">
              Bin Arab Real Estate is a premium property consultancy firm based in 
              Bahria Town Islamabad. We specialize in buying, selling, rental 
              management, and profitable property investments with complete transparency and trust.
            </p>
          </div>

          <div className="mb-8 md:mb-0">
            <h4 className="text-gold uppercase tracking-[2px] font-medium mb-6 text-lg">Our Services</h4>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 text-sm font-light">
              <li><Link href="/properties/sales" className="hover:text-gold transition-colors">- Exclusive Residential Property Sales</Link></li>
              <li><Link href="/properties/commercial" className="hover:text-gold transition-colors">- Premium Commercial Property Solutions</Link></li>
              <li><Link href="/properties/investment" className="hover:text-gold transition-colors">- Strategic Investment Consulting</Link></li>
              <li><Link href="/properties/rental" className="hover:text-gold transition-colors">- Professional Rental Management</Link></li>
              <li><Link href="/blogs" className="hover:text-gold transition-colors">- Market Insights & Editorial</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold uppercase tracking-[2px] font-medium mb-6 text-lg">Contact Us</h4>
            <div className="flex flex-col gap-0 text-sm font-light leading-[1.1]">
              <p>📍 Shop#4, Embassy Gardens, Sector C1, Bahria Enclave, Islamabad</p>
              <p>📞 +92 333 5965199</p>
              <p>📧 info@binarabrealestate.com</p>
              <p>🕒 Mon – Sat | 10:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 text-center text-xs tracking-widest uppercase opacity-40">
          <p>© 2026 Bin Arab Real Estate | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
