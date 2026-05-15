'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { Calendar, CheckCircle, Clock, LayoutDashboard, Loader2, PlayCircle, School } from 'lucide-react';
import Link from 'next/link';

export default function TrainerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trainer/stats')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-black pb-20">
      {/* Top Header */}
      <div className="glass-panel p-8 border-b border-white/5 rounded-b-[3rem] mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gold mb-2">Trainer Portal</p>
            <h1 className="text-3xl font-syne font-black text-white">Hello, {data?.trainerName}</h1>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <LayoutDashboard className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-[0.55rem] uppercase font-black tracking-widest text-text-dim mb-1">Total Assigned</p>
            <h3 className="text-3xl font-syne font-black text-white">{data?.stats?.totalAssigned}</h3>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[0.55rem] uppercase font-black tracking-widest text-text-dim mb-1">Completed</p>
            <h3 className="text-3xl font-syne font-black text-white">{data?.stats?.completedCount}</h3>
          </motion.div>
        </div>

        {/* Today's Schedule */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-text-dim">Today's Schedule</h2>
            <Link href="/trainer/visits" className="text-[0.6rem] font-black uppercase tracking-widest text-gold hover:underline">View All</Link>
          </div>

          <div className="space-y-3">
            {data?.todaysVisits?.length === 0 ? (
              <div className="glass-panel p-10 rounded-3xl border-white/5 text-center">
                <p className="text-text-dim text-xs font-bold">No visits scheduled for today.</p>
              </div>
            ) : (
              data?.todaysVisits?.map((visit: any) => (
                <Link href={`/trainer/visits/${visit.id}`} key={visit.id}>
                  <div className="glass-panel p-5 rounded-2xl border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                        <School className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-gold transition-colors">{visit.schoolName}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-[0.65rem] text-text-dim font-black uppercase tracking-widest">Session {visit.sessionNumber}</p>
                          {visit.trainerAttendance && (
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                              visit.trainerAttendance === 'PRESENT' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                              {visit.trainerAttendance}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-black uppercase tracking-widest ${
                        visit.status === 'ASSIGNED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {visit.status}
                      </span>
                      <PlayCircle className="w-4 h-4 text-text-dim group-hover:text-gold transition-all" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="glass-panel p-4 rounded-3xl border-white/10 shadow-2xl flex items-center justify-around backdrop-blur-xl bg-black/40">
          <Link href="/trainer/dashboard" className="flex flex-col items-center gap-1 text-gold">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
          </Link>
          <Link href="/trainer/visits" className="flex flex-col items-center gap-1 text-text-dim hover:text-gold transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Visits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
