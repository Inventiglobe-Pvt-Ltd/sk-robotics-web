'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Shield, School, Zap, ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [portal, setPortal] = useState<'admin' | 'trainer' | null>(null);
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, portal }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.user?.role === 'TRAINER') {
          router.push('/trainer/dashboard');
        } else {
          router.push('/admin');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const portalConfigs = {
    admin: {
      title: 'Admin Portal',
      desc: 'System Control & Monitoring',
      icon: Shield,
      color: 'gold',
      gradient: 'from-gold/20 to-transparent',
      hoverBorder: 'hover:border-gold/30',
      btnBg: 'bg-gold'
    },
    trainer: {
      title: 'Trainer Portal',
      desc: 'Field Execution & Sessions',
      icon: Zap,
      color: 'purple-400',
      gradient: 'from-purple-500/20 to-transparent',
      hoverBorder: 'hover:border-purple-500/30',
      btnBg: 'bg-purple-500'
    },
    school: {
      title: 'School Portal',
      desc: 'Institutional Reports & Payments',
      icon: School,
      color: 'emerald-400',
      gradient: 'from-emerald-500/20 to-blue-500/10',
      hoverBorder: 'hover:border-emerald-500/50',
      btnBg: 'bg-emerald-500'
    }
  };

  return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gold/5 blur-[150px] rounded-full" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl relative z-10"
      >
        <AnimatePresence mode="wait">
          {!portal ? (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Admin Card */}
              <PortalCard 
                config={portalConfigs.admin}
                onClick={() => setPortal('admin')}
              />

              {/* School Card - Professional Blue/Emerald */}
              <PortalCard 
                config={portalConfigs.school}
                onClick={() => router.push('/school/login')}
              />

              {/* Trainer Card */}
              <PortalCard 
                config={portalConfigs.trainer}
                onClick={() => setPortal('trainer')}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-md mx-auto"
            >
              <div className="glass-panel p-8 md:p-12 rounded-[3rem] border-white/5 relative overflow-hidden">
                <button 
                  onClick={() => setPortal(null)}
                  className="absolute top-8 left-8 text-text-dim hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to Portals
                </button>

                <div className="text-center mb-10 pt-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6",
                    portal === 'admin' ? "bg-gold/10 text-gold" : "bg-purple-500/10 text-purple-400"
                  )}>
                    {portal === 'admin' ? <Shield className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                  </div>
                  <h1 className="text-3xl font-syne font-black text-text-primary mb-2">
                    {portalConfigs[portal].title}
                  </h1>
                  <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">
                    {portalConfigs[portal].desc}
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-bold">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim px-2">Access Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold/50 outline-none transition-all text-white font-bold"
                      placeholder="name@skrobotics.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim px-2">Secure Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold/50 outline-none transition-all text-white font-bold"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3",
                      portal === 'admin' ? "bg-gold text-bg-black" : "bg-purple-500 text-white"
                    )}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Enter ${portalConfigs[portal].title}`}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PortalCard({ config, onClick }: { config: any, onClick: () => void }) {
  const Icon = config.icon;
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      className={cn(
        "glass-panel p-10 rounded-[2.5rem] border-white/5 cursor-pointer transition-all text-center group flex flex-col justify-between bg-gradient-to-br min-h-[400px]",
        config.gradient,
        config.hoverBorder
      )}
    >
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500",
          `bg-${config.color}/10`
        )}>
          <Icon className={cn("w-10 h-10", `text-${config.color}`)} />
        </div>
        <h2 className="text-3xl font-syne font-black text-white mb-4 leading-tight">{config.title}</h2>
        <p className="text-text-dim text-sm font-medium leading-relaxed px-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {config.desc}
        </p>
      </div>
      
      <div className={cn(
        "mt-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all",
        config.btnBg,
        config.color === 'gold' ? "text-bg-black" : "text-white",
        "shadow-lg group-hover:shadow-xl"
      )}>
        Initialize Access
      </div>
    </motion.div>
  );
}
