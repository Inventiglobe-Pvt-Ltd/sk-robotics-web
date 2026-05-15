'use client';

import { getAuthUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { User, Bell, Search } from 'lucide-react';

export default function TrainerTopbar() {
  const [userName, setUserName] = useState('Trainer');

  useEffect(() => {
    const fetchUser = async () => {
      // In a real app we'd fetch from session or context
      // For now we'll check cookies or decoded JWT
      const cookies = document.cookie.split(';');
      const token = cookies.find(c => c.trim().startsWith('token='));
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserName(payload.name || 'Trainer');
        } catch (e) {}
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="h-20 border-b border-white/5 bg-bg-black/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-4 h-4 text-text-dim absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks, schools..."
            className="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-text-dim hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-bg-black" />
        </button>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-white uppercase tracking-widest">{userName}</p>
            <p className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">Active Now</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
