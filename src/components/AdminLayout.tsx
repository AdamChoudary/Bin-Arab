'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'DASHBOARD', href: '/admin', icon: '📊' },
    { label: 'ALL POSTS', href: '/admin?view=list', icon: '📝' },
    { label: 'NEW POST', href: '/admin?view=create', icon: '✨' },
    { label: 'VIEW SITE', href: '/', icon: '🌐' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-gold/10 md:sticky md:top-0 md:h-screen z-40">
        <div className="p-8 border-b border-gold/10">
          <h1 className="font-serif text-gold text-2xl tracking-widest font-bold">BIN ARAB</h1>
          <p className="text-[10px] tracking-[4px] text-white/40 mt-2 uppercase">Admin Portal</p>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive ? 'bg-gold/10 text-gold' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-lg opacity-70 group-hover:opacity-100">{item.icon}</span>
                <span className="text-xs tracking-[2px] font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_#c4a45a]" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8">
          <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
            <p className="text-[9px] tracking-[2px] text-gold/60 uppercase mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[11px] font-medium">LIVE CONNECTED</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .admin-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(196, 164, 90, 0.1);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .admin-card:hover {
          border-color: rgba(196, 164, 90, 0.3);
          transform: translateY(-5px);
        }
        .focus-gold:focus {
          border-color: #c4a45a !important;
          box-shadow: 0 0 0 2px rgba(196, 164, 90, 0.2) !important;
          outline: none;
        }
      `}</style>
    </div>
  );
}
