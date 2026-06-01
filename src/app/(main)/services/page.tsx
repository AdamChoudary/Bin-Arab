import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import servicesData from '@/data/services.json';
import { Service } from '@/types';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, itemListLd } from '@/lib/structuredData';

const services = servicesData as Service[];

export const metadata: Metadata = buildMetadata({
  title: 'Premium Services — Real Estate, Construction & Design in Islamabad',
  description:
    'Property sales, investment consulting, rental management, construction, premium renovation, and architectural design from Bin Arab Real Estate & Builders in Bahria Town, Islamabad.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#020202] pt-32 pb-24 px-6">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          itemListLd(
            'Bin Arab Premium Services',
            services.map((s) => ({ title: s.title, path: `/services/${s.slug}` }))
          ),
        ]}
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-gold mb-6 tracking-tight">Premium Services</h1>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-gold/40" />
            <p className="text-white/40 tracking-[6px] text-xs uppercase font-medium">Bin Arab Excellence</p>
            <span className="w-12 h-[1px] bg-gold/40" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative block bg-[#080808] border border-white/5 rounded-2xl overflow-hidden transition-all duration-700 hover:border-gold/30"
            >
              <div className="w-full">
                <Image
                  src={service.cardImage}
                  alt={service.title}
                  width={1560}
                  height={1060}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <div className="p-8">
                <div className="text-gold/60 text-[9px] tracking-[3px] uppercase font-bold mb-4">{service.category}</div>
                <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors mb-4">{service.title}</h3>
                <p className="text-white/50 text-[13px] leading-[1.6] line-clamp-2 font-light mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[10px] tracking-[4px] text-gold uppercase font-bold border-b border-gold/20 pb-1">View Service</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
