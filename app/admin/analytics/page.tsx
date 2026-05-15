'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { Loader2, TrendingUp, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="p-12 text-center text-text-dim">No analytics data available</div>;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <PageHeader 
        title="Analytics & Insights"
        description="Data-driven overview of school performance and trainer operations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Students Per School */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-syne font-black text-xl text-white">Top Schools by Reach</h3>
          </div>
          <div className="space-y-4">
            {data.studentsPerSchool?.length === 0 && (
              <p className="text-text-dim text-sm text-center py-4">No data available.</p>
            )}
            {data.studentsPerSchool?.map((school: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="font-bold text-sm text-text-primary">{school.name}</span>
                <div className="text-right">
                  <span className="text-xl font-black text-white">{school.students}</span>
                  <span className="text-[10px] uppercase tracking-widest text-text-dim block">Students</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sessions Per Trainer */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-syne font-black text-xl text-white">Top Trainers by Activity</h3>
          </div>
          <div className="space-y-4">
            {data.sessionsPerTrainer?.length === 0 && (
              <p className="text-text-dim text-sm text-center py-4">No data available.</p>
            )}
            {data.sessionsPerTrainer?.map((trainer: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="font-bold text-sm text-text-primary">{trainer.name}</span>
                <div className="text-right">
                  <span className="text-xl font-black text-white">{trainer.sessions}</span>
                  <span className="text-[10px] uppercase tracking-widest text-text-dim block">Sessions Logged</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visit Trends */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-syne font-black text-xl text-white">Visit Status Distribution</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED'].map(status => {
              const count = data.visitTrends?.find((t: any) => t.status === status)?.count || 0;
              const colors: any = {
                ASSIGNED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
                IN_PROGRESS: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                SUBMITTED: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
                COMPLETED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
              };
              
              return (
                <div key={status} className={cn("p-6 rounded-3xl border flex flex-col items-center justify-center text-center", colors[status])}>
                  <span className="text-3xl font-black mb-2">{count}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">{status.replace('_', ' ')}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
