'use client';

export default function Properties() {
  const propertyItems = [
    { 
      title: "Apartments & Villas", 
      img: "house.jpg", 
      desc: "Stylish and comfortable living spaces designed to suit every lifestyle, from modern apartments to luxurious villas.",
      link: "apartments"
    },
    { 
      title: "Residential Plots", 
      img: "investmenttt.jpg", 
      desc: "Prime plots available for building your dream home or establishing a profitable business venture.",
      link: "plots"
    },
    { 
      title: "Commercial Plazas", 
      img: "plaza.jpg", 
      desc: "Strategically located commercial properties perfect for shops, offices, and thriving business hubs.",
      link: "commercial"
    }
  ];

  return (
    <section id="properties" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-gold uppercase tracking-[4px] font-medium text-[28px]">Property Collections</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {propertyItems.map((item, idx) => (
            <div key={idx} className="group relative brand-card flex flex-col h-full">
              <div className="overflow-hidden relative">
                <img 
                  src={`/images/${item.img}`} 
                  alt={item.title} 
                  className="w-full h-[260px] object-cover grayscale-[20%] transition-all duration-1000 ease-cinematic group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h5 className="text-gold text-[16px] font-medium tracking-[1px] uppercase mb-5">
                  {item.title}
                </h5>
                <p className="leading-[1.8] font-light text-[15px] mb-12">
                  {item.desc}
                </p>
                <a 
                  href={`/properties/${item.link}`} 
                  className="mt-auto w-full brand-button text-center"
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
