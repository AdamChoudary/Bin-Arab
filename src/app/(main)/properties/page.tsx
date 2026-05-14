import Link from 'next/link';
import Image from 'next/image';
import propertiesData from '@/data/properties.json';
import { Property } from '@/types';

const properties = propertiesData as Property[];

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-[#020202] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-gold mb-6 tracking-tight">Curated Estates</h1>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-gold/40" />
            <p className="text-white/40 tracking-[6px] text-xs uppercase font-medium">Bin Arab Portfolio</p>
            <span className="w-12 h-[1px] bg-gold/40" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property) => (
            <Link 
              key={property.id} 
              href={`/properties/${property.slug}`}
              className="group relative block bg-[#080808] border border-white/5 rounded-2xl overflow-hidden transition-all duration-700 hover:border-gold/30"
            >
              <div className="w-full">
                <Image 
                  src={property.cardImage} 
                  alt={property.title}
                  width={1560}
                  height={1060}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <div className="p-8">
                <div className="text-gold/60 text-[9px] tracking-[3px] uppercase font-bold mb-4">{property.category}</div>
                <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors mb-4">{property.title}</h3>
                <p className="text-white/50 text-[13px] leading-[1.6] line-clamp-2 font-light mb-6">
                  {property.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[10px] tracking-[4px] text-gold uppercase font-bold border-b border-gold/20 pb-1">View Archive</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
