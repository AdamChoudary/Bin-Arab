'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#080808] border-r border-gold/10 md:sticky md:top-0 md:h-screen z-40 flex flex-col">
        <div className="p-10 border-b border-gold/5">
          <Link href="/admin" className="block">
            <h1 className="font-serif text-gold text-2xl tracking-[4px] font-bold">BIN ARAB</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-8 h-[1px] bg-gold/30" />
              <p className="text-[9px] tracking-[4px] text-white/40 uppercase font-medium">Editorial Hub</p>
            </div>
          </Link>
        </div>

        <nav className="mt-10 px-6 space-y-3 flex-1 overflow-y-auto scrollbar-none">
          <p className="text-[9px] tracking-[3px] text-white/20 uppercase font-bold mb-6 px-4">System Management</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 group ${
                  isActive 
                    ? 'bg-gold/10 text-gold shadow-[inset_0_0_20px_rgba(196,164,90,0.05)] border border-gold/10' 
                    : 'text-white/30 hover:bg-white/[0.03] hover:text-white border border-transparent'
                }`}
              >
                <span className={`transition-transform duration-500 group-hover:scale-110 ${isActive ? 'text-gold opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span className="text-[11px] tracking-[3px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-1 h-4 rounded-full bg-gold shadow-[0_0_15px_#c4a45a]" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/10 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-700" />
            <p className="text-[9px] tracking-[3px] text-gold/60 uppercase mb-3 font-bold">System Status</p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-40" />
              </div>
              <p className="text-[10px] font-bold tracking-widest text-white/80">CORE LIVE</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-24 border-b border-gold/5 bg-[#020202]/80 backdrop-blur-md px-12 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <div className="h-1 w-8 bg-gold rounded-full" />
            <h2 className="text-[11px] tracking-[5px] uppercase text-white/50 font-bold">
              {pathname === '/admin' ? 'System Overview' : 'Editorial Management'}
            </h2>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex flex-col items-end">
              <p className="text-[11px] font-bold text-white/90 tracking-widest">ADMINISTRATOR</p>
              <p className="text-[9px] text-gold/60 tracking-widest uppercase">Full Access Tier</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center shadow-lg text-gold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
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
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(196, 164, 90, 0.08);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .admin-card:hover {
          border-color: rgba(196, 164, 90, 0.2);
          transform: translateY(-8px);
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 20px rgba(196, 164, 90, 0.05);
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
