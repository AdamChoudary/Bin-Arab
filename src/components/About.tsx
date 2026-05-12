'use client';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#111] text-center relative overflow-hidden">
      {/* Background Watermark */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[650px] h-[400px] md:h-[650px] bg-[url('/images/logo.png')] bg-no-repeat bg-contain opacity-5 pointer-events-none z-0"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-gold uppercase tracking-[3px] font-medium text-[28px] mb-4">About Bin Arab</h2>
        <div className="w-20 h-0.5 bg-gold mx-auto mb-10"></div>
        <p className="text-[16px] leading-[1.9] font-light text-white/70 max-w-[900px] mx-auto font-sans">
          <span className="text-gold font-medium">Bin Arab Real Estate & Builders</span> has been a trusted name in real estate marketing <span className="text-gold font-medium">since 2016</span>, delivering reliable and result-driven property solutions in Islamabad and Rawalpindi. With a strong presence in <span className="text-gold font-medium">Bahria Enclave Islamabad</span> and Bahria Town Rawalpindi, we have consistently provided expert services in property buying, selling, and rental management.
          <br /><br />
          Over the years, we have expanded our expertise beyond brokerage into <span className="text-gold font-medium">construction and development</span>, successfully delivering multiple residential and commercial projects. Our hands-on market experience and commitment to quality have positioned us among the most reliable real estate companies in the region.
          <br /><br />
          For the past 3.5 years, we have proudly served as a <span className="text-gold font-medium">land provider for Bahria Enclave Islamabad</span>, a testament to the trust and credibility we have built within the industry. Our strong relationship with Bahria Town reflects our professionalism, transparency, and <span className="text-gold font-medium">consistent performance</span>.
          <br /><br />
          At Bin Arab Real Estate & Builders, our mission is to provide secure, profitable, and transparent real estate solutions, helping our clients make <span className="text-gold font-medium">confident property decisions</span>.
        </p>
      </div>
    </section>
  );
}
