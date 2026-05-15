'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Calendar, CreditCard, LogOut, School } from 'lucide-react';

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/school/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/school/dashboard', icon: LayoutDashboard },
    { name: 'Visits', href: '/school/visits', icon: Calendar },
    { name: 'Payments', href: '/school/payments', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-bg-black text-text-primary font-inter flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-bg-surface border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <School className="w-8 h-8 text-gold" />
            <span className="font-syne font-black text-xl tracking-wider">PORTAL</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gold/10 text-gold font-bold' 
                    : 'text-text-dim hover:bg-white/5 hover:text-text-primary font-medium'
                }`}>
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => {
              document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              localStorage.removeItem('schoolId');
              window.location.href = '/school/login';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-bg-surface">
          <div className="flex items-center gap-2">
            <School className="w-6 h-6 text-gold" />
            <span className="font-syne font-black text-lg">PORTAL</span>
          </div>
          <button 
            onClick={() => {
              document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              localStorage.removeItem('schoolId');
              window.location.href = '/school/login';
            }}
            className="text-red-400 p-2"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto border-b border-white/5 bg-bg-surface/50 scrollbar-hide">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex-1">
              <div className={`flex flex-col items-center gap-1 p-3 text-xs font-bold whitespace-nowrap ${
                pathname.startsWith(item.href) ? 'text-gold border-b-2 border-gold' : 'text-text-dim'
              }`}>
                <item.icon className="w-4 h-4" />
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
