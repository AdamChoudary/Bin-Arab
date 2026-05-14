import Image from 'next/image';
import Link from 'next/link';
import propertiesData from '@/data/properties.json';
import { Property } from '@/types';

const properties = propertiesData as Property[];

export default function Properties() {
  return (
    <section id="properties" className="py-24 bg-black">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="text-gold uppercase tracking-[4px] font-medium text-[28px]">Property Collections</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {properties.map((property) => (
            <div key={property.id} className="group relative brand-card flex flex-col h-full w-full max-w-[400px]">
              <div className="overflow-hidden relative h-[240px]">
                <Image 
                  src={property.cardImage} 
                  alt={property.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale-[30%] brightness-75 transition-all duration-1000 ease-cinematic group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow text-center">
                <div className="mb-auto">
                  <h4 className="text-gold text-[16px] font-medium mb-6 uppercase tracking-[2px]">
                    {property.title}
                  </h4>
                  <p className="leading-[1.8] font-light text-[14px] mb-12 text-white/80">
                    {property.description}
                  </p>
                </div>
                <Link 
                  href={`/properties/${property.slug}`} 
                  className="brand-button inline-block mx-auto"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
