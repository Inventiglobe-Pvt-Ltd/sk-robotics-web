'use client';

import { motion } from 'framer-motion';
import { LogOut, Activity } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Basic logout logic: clear cookie and redirect
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login');
  };

  return (
    <header className="h-20 border-b border-border-medium bg-bg-surface-2/20 backdrop-blur-md flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 right-0 z-50">
      <Link href="/trainer" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
          <span className="font-syne font-black text-bg-black text-xl">SK</span>
        </div>
        <span className="font-syne font-extrabold text-xl tracking-tight hidden sm:block">Robotics</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-sm font-bold">Trainer Portal</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[0.6rem] uppercase tracking-widest text-text-dim font-black">Live Operations</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
}
