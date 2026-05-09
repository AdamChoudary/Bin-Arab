'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const mainCursor = useRef<HTMLDivElement>(null);
  const secondaryCursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (mainCursor.current && secondaryCursor.current) {
        mainCursor.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
        secondaryCursor.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={mainCursor}></div>
      <div className="cursor-outline" ref={secondaryCursor}></div>
    </>
  );
}
