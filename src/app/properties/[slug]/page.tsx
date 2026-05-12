"use client";
import { useParams } from 'next/navigation';

const propertyData: Record<string, any> = {
  apartments: {
    title: "Luxury Apartments",
    mainTitle: "Premium Apartment Living",
    description: "Discover a new standard of luxury with our curated selection of high-end apartments in Bahria Islamabad.",
    image: "/images/house.jpg",
    subImages: ["/images/plaza.jpg", "/images/villa.jpg"],
    features: ["Prime Location", "24/7 Security", "Modern Amenities", "Spacious Layouts"]
  },
  villas: {
    title: "Luxury Villas",
    mainTitle: "Exclusive Villa Collections",
    description: "Experience unparalleled privacy and elegance in our handcrafted luxury villas.",
    image: "/images/villa.jpg",
    subImages: ["/images/house.jpg", "/images/plaza.jpg"],
    features: ["Private Garden", "Smart Home Ready", "Designer Interiors", "Premium Finishes"]
  },
  plots: {
    title: "Residential Plots",
    mainTitle: "Prime Land Opportunities",
    description: "Secure your future with prime residential plots in the most sought-after sectors of Bahria.",
    image: "/images/investmenttt.jpg",
    subImages: ["/images/house.jpg", "/images/villa.jpg"],
    features: ["Ready for Possession", "Level Ground", "Excellent Connectivity", "Utility Ready"]
  },
  commercial: {
    title: "Commercial Spaces",
    mainTitle: "Business & Retail Hubs",
    description: "Expand your business horizons with strategically located commercial properties and plazas.",
    image: "/images/plaza.jpg",
    subImages: ["/images/house.jpg", "/images/villa.jpg"],
    features: ["High Footfall", "Parking Facilities", "Main Boulevard Access", "Modern Infrastructure"]
  },
  sales: {
    title: "Property Sales",
    mainTitle: "Professional Sales Solutions",
    description: "Expert guidance for buying and selling premium real estate assets in Islamabad.",
    image: "/images/property-sales.jpg",
    subImages: ["/images/house.jpg", "/images/villa.jpg"],
    features: ["Market Analysis", "Legal Support", "Fast Documentation", "Verified Properties"]
  },
  investment: {
    title: "Investment Consulting",
    mainTitle: "Strategic Real Estate Portfolios",
    description: "Identify high-yield investment opportunities backed by data and market insights.",
    image: "/images/investmenttt.jpg",
    subImages: ["/images/plaza.jpg", "/images/house.jpg"],
    features: ["ROI Projection", "Risk Assessment", "Market Trends", "Portfolio Management"]
  },
  rental: {
    title: "Rental Management",
    mainTitle: "Hassle-Free Rentals",
    description: "Comprehensive management services for landlords and premium options for tenants.",
    image: "/images/rentalll.jpg",
    subImages: ["/images/house.jpg", "/images/villa.jpg"],
    features: ["Tenant Screening", "Rent Collection", "Maintenance Support", "Legal Agreements"]
  },
  construction: {
    title: "Construction",
    mainTitle: "Modern Building Excellence",
    description: "End-to-end construction services delivering quality, durability, and luxury.",
    image: "/images/house.jpg",
    subImages: ["/images/plaza.jpg", "/images/villa.jpg"],
    features: ["Quality Control", "Timely Delivery", "Modern Design", "Sustainable Materials"]
  },
  renovation: {
    title: "Renovation",
    mainTitle: "Premium Remodeling",
    description: "Transform your existing space into a masterpiece of modern luxury.",
    image: "/images/villa.jpg",
    subImages: ["/images/house.jpg", "/images/plaza.jpg"],
    features: ["Interior Upgrade", "Space Optimization", "Material Selection", "Expert Craftsmen"]
  },
  designing: {
    title: "Designing",
    mainTitle: "Architectural Artistry",
    description: "Innovative design solutions that blend functionality with breathtaking aesthetics.",
    image: "/images/plaza.jpg",
    subImages: ["/images/house.jpg", "/images/villa.jpg"],
    features: ["3D Modeling", "Concept Design", "Material Planning", "Structural Integrity"]
  }
};

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = propertyData[slug] || propertyData.apartments;

  return (
    <div className="bg-black min-h-screen text-white">

      <div className="container mx-auto px-4 pt-32 md:pt-40 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-gold uppercase tracking-[4px] font-medium text-[32px] md:text-[42px] mb-6">
            {data.title}
          </h1>
          <div className="w-24 h-0.5 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Media Section */}
          <div className="lg:col-span-7">
            <div className="relative mb-8 group">
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-[400px] md:h-[600px] object-cover brand-card !border-gold/20 grayscale-[10%]" 
              />
              <div className="absolute inset-0 border border-gold/10 pointer-events-none translate-x-4 translate-y-4 -z-10"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {data.subImages.map((img: string, idx: number) => (
                <div key={idx} className="overflow-hidden brand-card !border-gold/10">
                  <img 
                    src={img} 
                    alt="Property detail" 
                    className="w-full h-[200px] md:h-[280px] object-cover transition-transform duration-1000 hover:scale-110 grayscale-[20%]" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5">
            <div className="brand-card p-8 md:p-12 sticky top-40 !border-gold/10 bg-white/5">
              <div className="text-gold uppercase text-[10px] tracking-[4px] font-medium opacity-60 mb-6">
                Project Overview
              </div>
              
              <h2 className="text-white text-[24px] md:text-[32px] font-medium leading-tight mb-6">
                {data.mainTitle}
              </h2>
              
              <p className="text-white/60 leading-[1.8] font-light text-[15px] mb-10">
                {data.description}
              </p>
              
              <div className="mb-10">
                <div className="text-gold uppercase text-[10px] tracking-[4px] font-medium opacity-60 mb-6">
                  Key Specifications
                </div>
                <ul className="space-y-4">
                  {data.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center text-[14px] font-light text-white/80">
                      <span className="text-gold mr-4 text-[18px]">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href={`whatsapp://send?phone=923335965199&text=Interested in ${data.title}`} 
                className="brand-button w-full text-center block"
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
