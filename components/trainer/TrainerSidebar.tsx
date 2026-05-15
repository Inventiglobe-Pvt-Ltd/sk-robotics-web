'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  User, 
  LogOut,
  Zap,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/trainer/dashboard' },
  { icon: Calendar, label: 'My Visits', href: '/trainer/visits' },
  { icon: BookOpen, label: 'My Sessions', href: '/trainer/sessions' },
  { icon: User, label: 'Profile', href: '/trainer/profile' },
];

export default function TrainerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-bg-black border-r border-white/5 flex flex-col z-50">
      {/* Logo Section */}
      <div className="p-8">
        <Link href="/trainer/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,197,24,0.3)]">
            <Zap className="w-6 h-6 text-bg-black fill-current" />
          </div>
          <span className="text-xl font-syne font-black tracking-tighter text-white">
            SK <span className="text-gold">TRAINER</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all relative group",
                isActive 
                  ? "text-bg-black" 
                  : "text-text-dim hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gold rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 relative z-10 transition-colors",
                isActive ? "text-bg-black" : "group-hover:text-gold"
              )} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status & User */}
      <div className="p-6">
        <div className="glass-panel p-4 rounded-2xl border-white/5 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full absolute -top-0.5 -right-0.5 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-dim leading-none mb-1">Status</p>
              <p className="text-xs font-black text-green-400 uppercase tracking-tighter">Live Operations</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
