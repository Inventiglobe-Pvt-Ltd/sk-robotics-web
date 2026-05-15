'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { Lock, Mail, Loader2, School } from 'lucide-react';
import Link from 'next/link';

export default function TrainerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/trainer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('trainerId', data.user.id);
        localStorage.setItem('trainerName', data.user.name);
        router.push('/trainer/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent">
      <motion.div 
        variants={fadeUp} 
        initial="hidden" 
        animate="visible" 
        className="w-full max-w-md glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 border border-gold/20">
            <School className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-3xl font-syne font-black text-text-primary text-center">Trainer Portal</h1>
          <p className="text-text-dim text-sm mt-2 font-medium">Access your assigned school visits</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-text-muted px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                required
                type="email"
                placeholder="trainer@skrobotics.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all placeholder:text-text-dim/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-text-muted px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all placeholder:text-text-dim/50"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-xs font-black text-red-400 text-center uppercase tracking-widest bg-red-400/5 py-3 rounded-xl border border-red-400/10"
            >
              {error}
            </motion.p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-gold text-bg-black rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Portal'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[0.65rem] font-black uppercase tracking-widest text-text-dim hover:text-gold transition-colors">
            Back to Hub
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
