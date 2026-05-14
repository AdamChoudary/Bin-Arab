import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import servicesData from '@/data/services.json';
import { Service } from '@/types';

const services = servicesData as Service[];

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#020202] pt-32 pb-32">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Navigation back to Landing Page */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] tracking-[4px] text-white hover:text-gold transition-all uppercase font-black mb-12 border-b border-white/20 pb-1"
        >
          ← RETURN TO HOME
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Large Scale Original Visual */}
          <div className="lg:col-span-8 w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-gold/5">
              <Image 
                src={service.detailImage} 
                alt={service.title}
                width={1872}
                height={1272}
                className="w-full h-auto object-contain"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* RIGHT: High-Contrast Professional Content */}
          <div className="lg:col-span-4 flex flex-col space-y-12 py-4">
            {/* Identity */}
            <div className="space-y-4">
              <p className="text-gold tracking-[6px] text-[10px] uppercase font-bold">{service.category} EXCELLENCE</p>
              <h1 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-[1.1]">
                {service.title}
              </h1>
              <div className="flex items-center gap-3 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <p className="text-[11px] tracking-[3px] uppercase font-bold">Premium Consultancy</p>
              </div>
            </div>

            {/* Direct Narrative */}
            <p className="text-white text-[17px] leading-[1.6] font-light">
              {service.description}
            </p>

            {/* Highlights */}
            <div className="space-y-6 pt-10 border-t border-white/10">
              <h4 className="text-gold text-[9px] tracking-[4px] uppercase font-bold">Service Highlights</h4>
              <ul className="space-y-4">
                {service.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white text-[12px] tracking-wide uppercase font-medium">
                    <span className="text-gold">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-10 border-t border-white/10 space-y-6">
              <div className="space-y-4">
                <a href="tel:+923335965199" className="block text-white text-[13px] tracking-[3px] uppercase font-bold hover:text-gold transition-colors">
                  WhatsApp: +92 333 5965199
                </a>
                <a href="mailto:info@binarab.com" className="block text-white text-[13px] tracking-[3px] uppercase font-bold hover:text-gold transition-colors">
                  Email: info@binarab.com
                </a>
              </div>
              
              <p className="text-[9px] text-white/30 tracking-[4px] uppercase font-bold pt-8">
                Bin Arab Services • Professional Asset Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
