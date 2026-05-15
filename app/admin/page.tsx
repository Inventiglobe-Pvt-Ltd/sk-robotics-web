'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { 
  School, 
  Users, 
  Calendar, 
  Award, 
  Plus, 
  UserPlus, 
  Clock, 
  Loader2,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboardRoot() {
  const formatNumber = (val: any) => {
    try {
      const n = Number(val);
      if (isNaN(n)) return "0";
      return n.toLocaleString();
    } catch (e) {
      return "0";
    }
  };
  const [kpis, setKpis] = useState<any>(null);
  const [todayVisits, setTodayVisits] = useState<any[]>([]);
  const [recentVisits, setRecentVisits] = useState<any[]>([]);
  const [topTrainers, setTopTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchDashboardData() {
      try {
        const [kpiRes, todayRes, recentRes, trainerRes] = await Promise.all([
          fetch('/api/dashboard/overview'),
          fetch('/api/dashboard/today'),
          fetch('/api/dashboard/recent'),
          fetch('/api/dashboard/trainers')
        ]);

        const [kpiData, todayData, recentData, trainerData] = await Promise.all([
          kpiRes.json(),
          todayRes.json(),
          recentRes.json(),
          trainerRes.json()
        ]);

        console.log('KPI DATA:', kpiData);
        setKpis(kpiData);
        setTodayVisits(Array.isArray(todayData) ? todayData : []);
        setRecentVisits(Array.isArray(recentData) ? recentData : []);
        setTopTrainers(Array.isArray(trainerData) ? trainerData : []);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
        <p className="text-text-dim font-medium animate-pulse">Initializing Command Center...</p>
      </div>
    );
  }

  const isEmpty = !kpis || (kpis.totalSchools === 0 && recentVisits.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6 border border-white/10">
          <TrendingUp className="w-10 h-10 text-gold/30" />
        </div>
        <h2 className="text-3xl font-syne font-black text-white mb-2">No Data Available</h2>
        <p className="text-text-dim max-w-md mb-10">
          Your dashboard is ready, but we haven't found any active records. 
          Start by adding a school or creating your first training visit.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/admin/schools/create" className="px-8 py-4 bg-gold text-bg-black rounded-2xl font-black text-sm hover:scale-105 transition-all">
            Add School
          </Link>
          <Link href="/admin/trainers" className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all">
            Add Trainer
          </Link>
          <Link href="/admin/visits" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm hover:bg-white/10 transition-all">
            Create Visit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainer} 
      initial="hidden" 
      animate="visible" 
      className="space-y-10 pb-20"
    >
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-syne font-black text-white tracking-tighter">
            OVERVIEW
          </h1>
          <p className="text-text-dim mt-2 font-medium">Real-time operational intelligence.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/schools/create" className="p-4 bg-white/5 hover:bg-gold hover:text-bg-black rounded-2xl border border-white/10 transition-all group flex items-center gap-3">
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest text-text-dim group-hover:text-bg-black">School</span>
          </Link>
          <Link href="/admin/trainers" className="p-4 bg-white/5 hover:bg-blue-500 hover:text-white rounded-2xl border border-white/10 transition-all group flex items-center gap-3">
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest text-text-dim group-hover:text-white">Trainer</span>
          </Link>
          <Link href="/admin/visits" className="p-4 bg-gold text-bg-black rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(245,197,24,0.3)]">
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">Create Visit</span>
          </Link>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Total Schools" 
          value={formatNumber(kpis?.totalSchools)} 
          icon={School} 
          color="gold" 
        />
        <KPICard 
          label="Total Sessions" 
          value={formatNumber(kpis?.totalSessions)} 
          icon={Calendar} 
          color="blue" 
        />
        <KPICard 
          label="Total Students" 
          value={formatNumber(kpis?.totalStudents)} 
          icon={Users} 
          color="emerald" 
        />
        <KPICard 
          label="Total Trainers" 
          value={formatNumber(kpis?.totalTrainers)} 
          icon={Award} 
          color="purple" 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Visits */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xl font-syne font-black text-white flex items-center gap-3">
            <Clock className="w-5 h-5 text-gold" />
            TODAY'S SCHEDULE
          </h3>
          <div className="space-y-4">
            {todayVisits.length === 0 ? (
              <div className="p-8 rounded-[2rem] border border-dashed border-white/10 text-center">
                <p className="text-sm text-text-dim">No visits scheduled for today.</p>
              </div>
            ) : (
              todayVisits.map((visit) => (
                <div key={visit.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      (visit.status === 'COMPLETED' || visit.status === 'FINALIZED') ? "bg-emerald-500/10 text-emerald-400" : 
                      visit.status === 'SUBMITTED' ? "bg-purple-500/10 text-purple-400" : "bg-gold/10 text-gold"
                    )}>
                      {visit.status}
                    </div>
                    <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Session {visit.sessionNumber}</span>
                  </div>
                  <h4 className="font-syne font-black text-white group-hover:text-gold transition-colors">{visit.school?.name}</h4>
                  <p className="text-xs text-text-dim mt-1 font-medium flex items-center gap-2">
                    <Users className="w-3 h-3" /> {visit.trainer?.name || 'Unassigned'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-syne font-black text-white flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              RECENT VISITS
            </h3>
            <Link href="/admin/visits" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim hover:text-white transition-colors">
              View All
            </Link>
          </div>
          
          <div className="glass-panel rounded-[2rem] border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5">
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-text-dim">School</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-text-dim">Trainer</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-text-dim">Date</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-text-dim">Students</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-text-dim text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentVisits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-bold text-sm text-white">{visit.school?.name || 'Deleted School'}</td>
                      <td className="py-4 px-6 text-sm text-text-dim">{visit.trainer?.name || 'Unassigned'}</td>
                      <td className="py-4 px-6 text-xs text-text-dim">{new Date(visit.date).toLocaleDateString('en-GB')}</td>
                      <td className="py-4 px-6 font-black text-sm text-white">{visit.totalStudents || 0}</td>
                      <td className="py-4 px-6 text-right">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase",
                          (visit.status === 'COMPLETED' || visit.status === 'FINALIZED') ? "text-emerald-400" : 
                          visit.status === 'SUBMITTED' ? "text-purple-400" : "text-gold"
                        )}>
                          {visit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Trainer Snapshot */}
      <section className="space-y-6">
        <h3 className="text-xl font-syne font-black text-white flex items-center gap-3">
          <Award className="w-5 h-5 text-purple-400" />
          TRAINER PERFORMANCE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTrainers.map((trainer, idx) => (
            <div key={trainer.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-syne font-black">{idx + 1}</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-4">Top Performer</p>
              <h4 className="text-2xl font-syne font-black text-white mb-6 truncate">{trainer.name}</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-widest mb-1">Total Visits</p>
                  <p className="text-xl font-syne font-black text-gold">{trainer?.totalVisits || 0}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-widest mb-1">Students</p>
                  <p className="text-xl font-syne font-black text-blue-400">{formatNumber(trainer?.totalStudents)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function KPICard({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    gold: "from-gold/10 to-transparent text-gold",
    blue: "from-blue-500/10 to-transparent text-blue-400",
    emerald: "from-emerald-500/10 to-transparent text-emerald-400",
    purple: "from-purple-500/10 to-transparent text-purple-400",
  };

  return (
    <motion.div 
      variants={fadeUp} 
      className={cn(
        "glass-panel p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br relative overflow-hidden group",
        colors[color]
      )}
    >
      <Icon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform duration-700" />
      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{label}</p>
      <h3 className="text-4xl font-syne font-black text-white tracking-tighter">{value}</h3>
    </motion.div>
  );
}
