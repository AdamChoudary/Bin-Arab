import Image from 'next/image';
import Link from 'next/link';
import servicesData from '@/data/services.json';
import { Service } from '@/types';

const services = servicesData as Service[];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#050505] text-center relative">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-gold uppercase tracking-[4px] font-medium text-[28px]">Premium Services</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {services.map((service) => (
            <div key={service.id} className="group relative brand-card flex flex-col h-full w-full max-w-[400px]">
              <div className="overflow-hidden relative h-[240px]">
                <Image 
                  src={service.cardImage} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale-[30%] brightness-75 transition-all duration-1000 ease-cinematic group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-auto">
                  <h4 className="text-gold text-[16px] font-medium mb-6 uppercase tracking-[2px]">{service.title}</h4>
                  <p className="leading-[1.8] font-light text-[14px] mb-12 text-white/70">
                    {service.description}
                  </p>
                </div>
                <Link 
                  href={`/services/${service.slug}`} 
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
