'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { ArrowLeft, BookOpen, Calendar, LayoutDashboard, Loader2, Search, School, Users } from 'lucide-react';
import Link from 'next/link';

export default function TrainerSessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/trainer/sessions')
      .then(res => res.json())
      .then(json => {
        setSessions(json.entries || []);
        setLoading(false);
      });
  }, []);

  const filteredSessions = sessions.filter(s => 
    s.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.topicName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-black pb-32">
      {/* Header */}
      <div className="glass-panel sticky top-0 z-40 p-6 border-b border-white/5 rounded-b-[2.5rem] bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/trainer/dashboard" className="p-2 bg-white/5 rounded-xl text-text-dim">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-syne font-black text-text-primary">Session History</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search class, topic or school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all"
          />
        </div>
      </div>

      <div className="px-6 py-8">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="glass-panel p-20 rounded-[2.5rem] border-white/5 text-center">
              <p className="text-text-dim text-sm font-bold uppercase tracking-widest">No sessions logged yet</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <motion.div variants={fadeUp} key={session.id}>
                <div className="glass-panel p-6 rounded-3xl border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] -mr-16 -mt-16" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-widest text-gold">
                          <Calendar className="w-3 h-3" />
                          {new Date(session.visitDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 font-bold text-text-dim">
                          {session.className}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-syne font-black text-white group-hover:text-gold transition-colors">{session.topicName}</h3>
                        <div className="flex items-center gap-2 text-xs text-text-dim mt-1">
                          <School className="w-3 h-3" />
                          {session.schoolName}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[0.5rem] uppercase font-black tracking-widest text-text-muted">Present</span>
                          <span className="text-sm font-black text-emerald-400">{session.attendanceCount}</span>
                        </div>
                        <div className="flex flex-col border-x border-white/5 px-2">
                          <span className="text-[0.5rem] uppercase font-black tracking-widest text-text-muted">Total</span>
                          <span className="text-sm font-black text-white">{session.totalStrength}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[0.5rem] uppercase font-black tracking-widest text-text-muted">Absents</span>
                          <span className="text-sm font-black text-red-400">{session.absentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="glass-panel p-4 rounded-3xl border-white/10 shadow-2xl flex items-center justify-around backdrop-blur-xl bg-black/40">
          <Link href="/trainer/dashboard" className="flex flex-col items-center gap-1 text-text-dim hover:text-gold transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
          </Link>
          <Link href="/trainer/visits" className="flex flex-col items-center gap-1 text-text-dim hover:text-gold transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Visits</span>
          </Link>
          <Link href="/trainer/sessions" className="flex flex-col items-center gap-1 text-gold">
            <BookOpen className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Sessions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
