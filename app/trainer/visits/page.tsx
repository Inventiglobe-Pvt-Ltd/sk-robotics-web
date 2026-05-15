'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { ArrowLeft, Calendar, Filter, LayoutDashboard, Loader2, Search, School } from 'lucide-react';
import Link from 'next/link';

export default function TrainerVisitsList() {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/trainer/visits')
      .then(res => res.json())
      .then(json => {
        setVisits(json.visits || []);
        setLoading(false);
      });
  }, []);

  const filteredVisits = visits.filter(v => 
    v.school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.status.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-xl font-syne font-black text-text-primary">All Visits</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search school or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all"
          />
        </div>
      </div>

      <div className="px-6 py-8">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
          {filteredVisits.length === 0 ? (
            <div className="glass-panel p-20 rounded-[2.5rem] border-white/5 text-center">
              <p className="text-text-dim text-sm font-bold uppercase tracking-widest">No visits found</p>
            </div>
          ) : (
            filteredVisits.map((visit) => (
              <motion.div variants={fadeUp} key={visit.id}>
                <Link href={`/trainer/visits/${visit.id}`}>
                  <div className="glass-panel p-6 rounded-3xl border-white/5 hover:bg-white/5 transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold/30 transition-colors">
                          <School className="w-6 h-6 text-text-dim group-hover:text-gold" />
                        </div>
                        <div>
                          <h4 className="font-syne font-bold text-white text-base group-hover:text-gold transition-colors">{visit.school.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[0.65rem] text-text-dim font-black uppercase tracking-[0.2em]">
                              {new Date(visit.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                            </p>
                            {visit.trainerAttendances?.[0] && (
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                                visit.trainerAttendances[0].status === 'PRESENT' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                              }`}>
                                {visit.trainerAttendances[0].status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[9px] px-3 py-1 rounded-full border font-black uppercase tracking-widest ${
                        (visit.status as string) === 'FINALIZED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        (visit.status as string) === 'SUBMITTED' ? 'bg-gold/10 text-gold border-gold/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {visit.status}
                      </span>
                    </div>
                  </div>
                </Link>
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
          <Link href="/trainer/visits" className="flex flex-col items-center gap-1 text-gold">
            <Calendar className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Visits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
