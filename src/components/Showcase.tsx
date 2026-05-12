'use client';

interface ShowcaseProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

export default function Showcase({ activeSlide, setActiveSlide }: ShowcaseProps) {
  return (
    <section className="py-24 bg-black text-center">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-gold uppercase tracking-[4px] font-medium text-[28px]">Work Showcase</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto group">
          <div className="overflow-hidden golden-card relative">
            <div 
              className="flex transition-transform duration-1000 ease-cinematic" 
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              <div className="min-w-full">
                <img 
                  src="/images/building.jpg" 
                  className="w-full h-[400px] md:h-[600px] object-cover brightness-[0.7]" 
                  alt="Building Construction" 
                />
              </div>
              <div className="min-w-full">
                <img 
                  src="/images/map-design.jpg" 
                  className="w-full h-[400px] md:h-[600px] object-cover brightness-[0.7]" 
                  alt="Map Design" 
                />
              </div>
            </div>

            {/* Controls */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 border border-gold text-gold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:!text-black"
              onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
              aria-label="Previous slide"
            >
              <span className="text-xl">←</span>
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 border border-gold text-gold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:!text-black"
              onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
              aria-label="Next slide"
            >
              <span className="text-xl">→</span>
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2 h-2 transition-all duration-300 ${
                    activeSlide === i ? 'bg-gold w-8' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
