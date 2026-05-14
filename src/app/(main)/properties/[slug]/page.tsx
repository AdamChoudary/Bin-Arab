import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import propertiesData from '@/data/properties.json';
import { Property } from '@/types';

const properties = propertiesData as Property[];

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#020202] pt-32 pb-32">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* High-Visibility Navigation back to Landing Page */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[11px] tracking-[5px] text-white hover:text-gold transition-all uppercase font-black mb-12 border-b border-white/20 pb-1"
        >
          ← RETURN TO HOME
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Large Scale Original Visual */}
          <div className="lg:col-span-8 w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-gold/5">
              <Image 
                src={property.detailImage} 
                alt={property.title}
                width={1872}
                height={1272}
                className="w-full h-auto object-contain"
                priority
                unoptimized // Ensure no compression or shrinking by Next.js optimization for this large visual
              />
            </div>
          </div>

          {/* RIGHT: High-Contrast Professional Content */}
          <div className="lg:col-span-4 flex flex-col space-y-12 py-4">
            {/* Essential Identity */}
            <div className="space-y-4">
              <p className="text-gold tracking-[6px] text-[10px] uppercase font-bold">{property.category} ARCHIVE</p>
              <h1 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-[1.1]">
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <p className="text-[11px] tracking-[3px] uppercase font-bold">{property.location}</p>
              </div>
            </div>

            {/* Direct Narrative */}
            <p className="text-white text-[17px] leading-[1.6] font-light">
              {property.description}
            </p>

            {/* Specifications */}
            <div className="space-y-6 pt-10 border-t border-white/10">
              <h4 className="text-gold text-[9px] tracking-[4px] uppercase font-bold">Property Specifications</h4>
              <ul className="space-y-4">
                {property.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white text-[12px] tracking-wide uppercase font-medium">
                    <span className="text-gold">•</span>
                    {feature}
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
                Bin Arab Real Estate • Established 2016
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
