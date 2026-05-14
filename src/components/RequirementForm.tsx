'use client';

interface RequirementFormProps {
  showRequirement: boolean;
  setShowRequirement: (show: boolean) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  formData: {
    budget: string;
    location: string;
    purpose: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSendToWhatsApp: () => void;
}

export default function RequirementForm({
  showRequirement,
  setShowRequirement,
  isFormOpen,
  setIsFormOpen,
  formData,
  handleInputChange,
  handleSendToWhatsApp
}: RequirementFormProps) {
  return (
    <div 
      className={`fixed right-5 md:right-8 bottom-20 md:bottom-24 w-[calc(100%-40px)] max-w-[320px] brand-card p-5 md:p-8 z-[1050] transition-all duration-700 ease-cinematic origin-bottom-right shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        showRequirement 
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
          : 'opacity-0 translate-y-20 scale-75 pointer-events-none'
      }`}
    >
      <button 
        className="absolute top-5 right-5 text-white/30 hover:text-white transition-all hover:rotate-90" 
        onClick={() => { setShowRequirement(false); setIsFormOpen(false); }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      {!isFormOpen ? (
        <>
          <p className="font-bold text-white mb-2 font-display">Didn’t find what you’re looking for?</p>
          <p className="text-white/60 text-sm mb-6 leading-relaxed font-light">
            We have access to multiple projects and off-market opportunities. Share your requirement and our team will find the best match for you.
          </p>
          <button 
            onClick={() => setIsFormOpen(true)} 
            className="w-full bg-gold text-black py-2.5 !rounded-xl text-[12px] font-bold hover:bg-white transition-all shadow-lg shadow-gold/5"
          >
            Submit Your Requirement
          </button>
        </>
      ) : (
        <>
          <h6 className="mb-6 text-gold uppercase tracking-[2px] text-sm font-medium">Requirement Details</h6>
          
          <div className="mb-4">
            <label htmlFor="budget" className="block uppercase text-[10px] tracking-[1px] text-white/50 mb-1">Budget</label>
            <input 
              id="budget"
              type="text" 
              name="budget" 
              placeholder="e.g. 1.5 Crore" 
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-gold transition-all placeholder:text-white/10"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block uppercase text-[10px] tracking-[1px] text-white/50 mb-1">Location</label>
            <input 
              id="location"
              type="text" 
              name="location" 
              placeholder="Preferred Location" 
              value={formData.location}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-gold transition-all placeholder:text-white/10"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="purpose" className="block uppercase text-[10px] tracking-[1px] text-white/50 mb-1">Purpose</label>
            <select 
              id="purpose"
              name="purpose" 
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-gold transition-all appearance-none"
            >
              <option value="" className="bg-[#1a1a1a]">Select Purpose</option>
              <option value="Residential" className="bg-[#1a1a1a]">Residential</option>
              <option value="Commercial" className="bg-[#1a1a1a]">Commercial</option>
              <option value="Investment" className="bg-[#1a1a1a]">Investment</option>
            </select>
          </div>

          <button 
            onClick={handleSendToWhatsApp} 
            className="w-full bg-gold text-black py-2.5 !rounded-full text-[13px] font-bold hover:bg-white transition-all shadow-lg shadow-gold/5 disabled:opacity-50 disabled:grayscale"
            disabled={!formData.budget || !formData.location || !formData.purpose}
          >
            Send Requirement
          </button>
        </>
      )}
    </div>
  );
}
