'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Restore system cursor for precise admin work
    document.body.style.cursor = 'auto';
    return () => {
      document.body.style.cursor = 'none';
    };
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { 
      label: 'DASHBOARD', 
      href: '/admin', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ) 
    },
    { 
      label: 'ALL POSTS', 
      href: '/admin?view=list', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 4v4h4"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h2m-2 4h6m-6 4h6"></path>
        </svg>
      ) 
    },
    { 
      label: 'NEW POST', 
      href: '/admin?view=create', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
        </svg>
      ) 
    },
    { 
      label: 'MEMBERS', 
      href: '/admin?view=members', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ) 
    },
    { 
      label: 'ANALYTICS', 
      href: '/admin?view=analytics', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ) 
    },
    { 
      label: 'SETTINGS', 
      href: '/admin?view=settings', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ) 
    },
    { 
      label: 'VIEW SITE', 
      href: '/', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      ) 
    },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setIsMobileMenuOpen(false)} />

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-[#050505] border-r border-gold/10 z-50 flex flex-col transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gold/5 flex items-center justify-between">
          <Link href="/admin" className="block">
            <h1 className="font-serif text-gold text-lg tracking-widest font-bold">BIN ARAB</h1>
            <p className="text-[9px] tracking-[4px] text-white/40 uppercase font-medium mt-1">Journal Admin</p>
          </Link>
          <button className="md:hidden text-white/40 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-1 flex-1 overflow-y-auto scrollbar-none">
          <p className="text-[10px] tracking-[2px] text-white/30 uppercase font-bold mb-4 px-3">Management</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-all duration-200 group relative ${
                  isActive 
                    ? 'text-white bg-gold/10 shadow-sm border border-gold/20' 
                    : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                <span className={`transition-opacity duration-200 ${isActive ? 'opacity-100 text-gold' : 'opacity-60 group-hover:opacity-100'}`}>
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' })}
                </span>
                <span className="text-[13px] font-medium tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold/5">
          <p className="text-[10px] text-white/20 uppercase tracking-[2px] text-center font-medium">Bin Arab Systems</p>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 h-14 bg-[#050505] border-b border-gold/10 sticky top-0 z-40">
        <h1 className="font-serif text-gold text-base tracking-widest font-bold">BIN ARAB</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-8 h-8 rounded-md bg-white/5 border border-gold/20 flex items-center justify-center text-white"
        >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-12 border-b border-gold/5 bg-[#020202] px-8 flex items-center justify-between z-30 sticky top-0">
          <div className="flex items-center gap-2 text-[12px] text-white/50 font-medium">
            <Link href="/admin" className="hover:text-gold transition-colors">Admin</Link>
            <span>/</span>
            <span className="text-white tracking-tight">
              {pathname === '/admin' ? 'Overview' : 'Editorial Archive'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-bold text-white uppercase tracking-widest">Administrator</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-thin">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
          
          <footer className="mt-20 pt-10 border-t border-gold/5 text-center">
            <p className="text-[9px] tracking-[4px] text-white/20 uppercase">
              Bin Arab Luxury Editorial Systems © 2026
            </p>
          </footer>
        </div>
      </main>

      <style jsx global>{`
        .admin-card {
          background: #080808;
          border: 1px solid rgba(196, 164, 90, 0.15);
          border-radius: 6px;
          padding: 24px;
          transition: all 0.2s ease;
        }
        .admin-card:hover {
          border-color: rgba(196, 164, 90, 0.3);
          background: #0a0a0a;
        }
        .admin-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: white;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .admin-input {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid rgba(196, 164, 90, 0.2);
          border-radius: 4px;
          padding: 8px 12px;
          color: white;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        .admin-input:focus {
          outline: none;
          border-color: #c4a45a;
          box-shadow: 0 0 0 2px rgba(196, 164, 90, 0.15);
        }
        .admin-input::placeholder {
          color: rgba(255, 255, 255, 0.15);
        }
        .focus-gold:focus {
          border-color: #c4a45a !important;
          box-shadow: 0 0 0 4px rgba(196, 164, 90, 0.1) !important;
          outline: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(196, 164, 90, 0.1);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(196, 164, 90, 0.3);
        }
      `}</style>
    </div>
  );
}
