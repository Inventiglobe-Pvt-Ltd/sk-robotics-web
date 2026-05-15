'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  School, 
  Users, 
  History, 
  PieChart, 
  Settings,
  LogOut,
  Menu,
  X,
  Database
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: School, label: 'Schools', href: '/admin/schools' },
  { icon: History, label: 'Visits', href: '/admin/visits' },
  { icon: Database, label: 'Logs', href: '/admin/logs' },
  { icon: Users, label: 'Trainers', href: '/admin/trainers' },
  { icon: PieChart, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-bg-black flex text-text-primary">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border-medium bg-bg-surface-2/50 backdrop-blur-xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
              <span className="font-syne font-black text-bg-black text-xl">SK</span>
            </div>
            <span className="font-syne font-extrabold text-xl tracking-tight">Robotics</span>
          </div>

          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                    ? 'bg-gold text-bg-black shadow-[0_10px_20px_-5px_rgba(245,197,24,0.3)]' 
                    : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-bg-black' : 'group-hover:text-gold transition-colors'}`} />
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-border-medium">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all w-full group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-border-medium bg-bg-surface-2/20 backdrop-blur-md flex items-center justify-between px-8 lg:px-12 sticky top-0 z-30">
          <button 
            className="lg:hidden w-10 h-10 rounded-xl bg-bg-surface-3 flex items-center justify-center border border-border-medium"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-dim">
              Admin / <span className="text-text-primary">{pathname.split('/').pop() || 'Overview'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-gold font-extrabold">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-blue-500 p-0.5">
              <div className="w-full h-full rounded-full bg-bg-surface-3" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden p-6"
        >
          <div className="flex justify-between items-center mb-12">
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
                <span className="font-syne font-black text-bg-black text-xl">SK</span>
              </div>
              <span className="font-syne font-extrabold text-xl tracking-tight text-white">Robotics</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-4">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 text-white"
              >
                <item.icon className="w-6 h-6 text-gold" />
                <span className="font-bold text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
}
