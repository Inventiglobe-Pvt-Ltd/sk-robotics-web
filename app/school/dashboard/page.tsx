'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { Calendar, Users, Loader2, PlayCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function SchoolDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const schoolId = localStorage.getItem('schoolId');
    if (!schoolId) {
      router.push('/school/login');
      return;
    }

    fetch(`/api/schools/${schoolId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        router.push('/school/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!data || !data.school) return null;

  // We want to show only "completed" visits or any visit that has session entries for transparency
  const recentVisits = data.school.visits.slice(0, 5);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <PageHeader 
        title="School Dashboard"
        description={`Welcome back, ${data.school.name}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-blue-400">Total Visits</p>
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-4xl font-syne font-black">{data.totalVisits}</h3>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-gold/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-gold">Sessions Taught</p>
            <PlayCircle className="w-4 h-4 text-gold" />
          </div>
          <h3 className="text-4xl font-syne font-black">
            {data.school.visits.reduce((acc: number, v: any) => acc + v.sessionEntries.length, 0)}
          </h3>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-emerald-400">Total Strength</p>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-4xl font-syne font-black">{data.totalStrength}</h3>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-purple-400">Total Present</p>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-4xl font-syne font-black">{data.totalStudents}</h3>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-red-500/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-red-400">Total Absents</p>
            <Users className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-4xl font-syne font-black">{data.totalAbsents}</h3>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-syne font-black text-xl text-white">Recent Trainer Visits</h3>
          <Link href="/school/visits" className="text-xs font-bold text-gold hover:underline">View All</Link>
        </div>

        <div className="space-y-4">
          {recentVisits.length === 0 ? (
            <p className="text-text-dim text-sm text-center py-6">No recent visits recorded.</p>
          ) : (
            recentVisits.map((visit: any) => (
              <Link href={`/school/visits/${visit.id}`} key={visit.id}>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                      <Clock className="w-4 h-4 text-text-dim group-hover:text-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white mb-0.5">Session {visit.sessionNumber}</p>
                      <p className="text-[0.65rem] text-text-dim font-black uppercase tracking-widest">
                        {new Date(visit.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-white text-right">{visit.trainer?.name || 'Assigned'}</p>
                    <p className="text-[0.65rem] text-text-dim font-black uppercase tracking-widest text-right">
                      {visit.sessionEntries.map((s: any) => `${s.className} - ${s.topicName}`).join(', ') || `${visit.sessionEntries.length} Classes`}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
