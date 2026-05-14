import Image from 'next/image';

const services = [
  { title: "Property Sales", img: "property-sales.jpg", desc: "We deliver premium property sales solutions, guiding clients through buying and selling residential and commercial assets.", link: "sales" },
  { title: "Investment Consulting", img: "investmenttt.jpg", desc: "Our investment consulting focuses on identifying high potential opportunities backed by market research.", link: "investment" },
  { title: "Rental Management", img: "rentalll.jpg", desc: "We offer comprehensive rental management services designed to maximize returns while protecting your property.", link: "rental" },
  { title: "Construction", img: "house.jpg", desc: "We provide end-to-end construction solutions, delivering high-quality residential and commercial projects.", link: "construction" },
  { title: "Renovation", img: "villa.jpg", desc: "Transform your living spaces with our premium renovation and remodeling services, tailored to your preferences.", link: "renovation" },
  { title: "Designing", img: "plaza.jpg", desc: "Our expert team provides architectural and interior design solutions to bring your vision to life.", link: "designing" }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#050505] text-center relative">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-gold uppercase tracking-[4px] font-medium text-[28px]">Premium Services</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {services.map((service, index) => (
            <div key={index} className="group relative brand-card flex flex-col h-full w-full max-w-[400px]">
              <div className="overflow-hidden relative h-[240px]">
                <Image 
                  src={`/images/${service.img}`} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale-[30%] brightness-75 transition-all duration-1000 ease-cinematic group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-auto">
                  <h4 className="text-gold text-[16px] font-medium mb-6 uppercase tracking-[2px]">{service.title}</h4>
                  <p className="leading-[1.8] font-light text-[14px] mb-12">
                    {service.desc}
                  </p>
                </div>
                <a 
                  href={`/properties/${service.link}`} 
                  className="brand-button inline-block mx-auto"
                >
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
