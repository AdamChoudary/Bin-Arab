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
  isAtBottom: boolean;
}

export default function RequirementForm({
  showRequirement,
  setShowRequirement,
  isFormOpen,
  setIsFormOpen,
  formData,
  handleInputChange,
  handleSendToWhatsApp,
  isAtBottom
}: RequirementFormProps) {
  if (!showRequirement) return null;

  return (
    <div 
      className={`fixed right-5 md:right-8 bottom-20 md:bottom-24 w-[calc(100%-40px)] max-w-[320px] brand-card p-5 md:p-8 z-[1050] transition-all duration-700 ease-cinematic origin-bottom-right ${
        isAtBottom ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 animate-fadeInUp'
      }`}
    >
      <button 
        className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl leading-none transition-colors" 
        onClick={() => { setShowRequirement(false); setIsFormOpen(false); }}
      >
        &times;
      </button>
      
      {!isFormOpen ? (
        <>
          <p className="font-bold text-white mb-2 font-display">Didn’t find what you’re looking for?</p>
          <p className="text-white/60 text-sm mb-6 leading-relaxed font-light">
            We have access to multiple projects and off-market opportunities. Share your requirement and our team will find the best match for you.
          </p>
          <button 
            onClick={() => setIsFormOpen(true)} 
            className="w-full brand-button"
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
              className="w-full bg-white/5 border border-gold/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-gold transition-colors"
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
              className="w-full bg-white/5 border border-gold/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="purpose" className="block uppercase text-[10px] tracking-[1px] text-white/50 mb-1">Purpose</label>
            <select 
              id="purpose"
              name="purpose" 
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-gold/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
            >
              <option value="" className="bg-[#1a1a1a]">Select Purpose</option>
              <option value="Residential" className="bg-[#1a1a1a]">Residential</option>
              <option value="Commercial" className="bg-[#1a1a1a]">Commercial</option>
              <option value="Investment" className="bg-[#1a1a1a]">Investment</option>
            </select>
          </div>

          <button 
            onClick={handleSendToWhatsApp} 
            className="w-full brand-button disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.budget || !formData.location || !formData.purpose}
          >
            Send Requirement
          </button>
        </>
      )}
    </div>
  );
}
