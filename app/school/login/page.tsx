'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { School, Loader2, ArrowRight, Lock, User, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SchoolLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/school/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }
      
      // Store session
      localStorage.setItem('schoolId', data.id);
      localStorage.setItem('schoolName', data.name);
      router.push('/school/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        variants={fadeUp} 
        initial="hidden" 
        animate="visible" 
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={() => router.push('/login')}
          className="mb-8 text-emerald-400/70 hover:text-emerald-400 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Portal Hub
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-blue-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <School className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-syne font-black text-white tracking-tighter">School Portal</h1>
          <p className="text-emerald-100/40 mt-3 text-xs font-black uppercase tracking-widest">Institution Access Terminal</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-10 rounded-[3rem] border-white/5 space-y-6 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 px-2">Institutional ID</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-400 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. global_academy"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 px-2">Access Key</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-400 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/10"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-emerald-500 text-bg-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Session
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-6 text-center">
            <p className="text-[9px] text-text-dim font-bold uppercase tracking-[0.1em] leading-relaxed">
              Standard encryption active. <br />
              Authorized institutional use only.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
