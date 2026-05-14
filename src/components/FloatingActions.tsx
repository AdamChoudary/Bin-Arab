'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface FloatingActionsProps {
  setShowRequirement: (show: boolean) => void;
  setIsFormOpen: (open: boolean) => void;
}

export default function FloatingActions({ setShowRequirement, setIsFormOpen }: FloatingActionsProps) {
  return (
    <div className="fixed bottom-5 md:bottom-8 right-5 md:right-8 flex flex-row items-center gap-4 transition-all duration-500 z-[1000]">
      <button 
        onClick={() => { setShowRequirement(true); setIsFormOpen(false); }} 
        className="brand-button-dashed"
        title="Submit Requirement"
      >
        Submit Requirement
      </button>
      <a 
        href="whatsapp://send?phone=923335965199" 
        className="whatsapp-circle" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="w-6 h-6 md:w-[35px] md:h-[35px]" />
      </a>
    </div>
  );
}
