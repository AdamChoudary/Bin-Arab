'use client';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto z-10 object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-20 bg-black/40"></div>
      
      <div className="container relative z-30 mx-auto px-4">
        <div className="text-center animate-fadeInUp">
          <h1 className="hero-heading mx-auto max-w-5xl">
            Luxury Living in Bahria Islamabad
          </h1>
          <p className="text-[16px] md:text-xl tracking-widest uppercase text-white/80 mb-10 font-light">
            Buy • Sell • Invest with Confidence
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
