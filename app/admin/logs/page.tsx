'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { 
  Database, 
  Search, 
  Loader2, 
  Filter, 
  Calendar, 
  School, 
  User, 
  LayoutList, 
  Layers,
  Download,
  Users,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewType, setViewType] = useState<'flat' | 'grouped'>('flat');
  const [mounted, setMounted] = useState(false);

  // Filters
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [logsRes, schoolsRes, trainersRes] = await Promise.all([
        fetch('/api/sessions'),
        fetch('/api/schools'),
        fetch('/api/trainers')
      ]);

      const [logsData, schoolsData, trainersData] = await Promise.all([
        logsRes.json(),
        schoolsRes.json(),
        trainersRes.json()
      ]);

      // Sort logs by date (latest first) by default
      const sortedLogs = (logsData.data || []).sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setLogs(sortedLogs);
      setSchools(Array.isArray(schoolsData) ? schoolsData : []);
      setTrainers(Array.isArray(trainersData) ? trainersData : []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log: any) => {
      const term = search.toLowerCase();
      const matchesSearch = !search || 
        log.visit?.school?.name?.toLowerCase().includes(term) ||
        log.trainer?.name?.toLowerCase().includes(term) ||
        log.topicName?.toLowerCase().includes(term) ||
        log.className?.toLowerCase().includes(term) ||
        log.class?.name?.toLowerCase().includes(term);

      const matchesSchool = !selectedSchool || log.visit?.schoolId === selectedSchool;
      const matchesTrainer = !selectedTrainer || log.trainerId === selectedTrainer;
      
      const logDate = new Date(log.createdAt);
      const matchesStartDate = !startDate || logDate >= new Date(startDate);
      const matchesEndDate = !endDate || logDate <= new Date(endDate);

      return matchesSearch && matchesSchool && matchesTrainer && matchesStartDate && matchesEndDate;
    });
  }, [logs, search, selectedSchool, selectedTrainer, startDate, endDate]);

  const groupedLogs = useMemo(() => {
    const groups: any = {};
    filteredLogs.forEach((log: any) => {
      const visitId = log.visitId;
      if (!groups[visitId]) {
        groups[visitId] = {
          visit: log.visit,
          trainer: log.trainer,
          date: log.createdAt,
          sessions: []
        };
      }
      groups[visitId].sessions.push(log);
    });
    return Object.values(groups).sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredLogs]);

  const stats = useMemo(() => {
    return {
      totalSessions: filteredLogs.length,
      totalStudents: filteredLogs.reduce((acc, curr) => acc + (curr.attendanceCount || 0), 0)
    };
  }, [filteredLogs]);

  if (!mounted) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-syne font-black text-white tracking-tighter">
            OPERATIONAL LOGS
          </h1>
          <p className="text-text-dim mt-2 font-medium">Global registry of educational field data.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="glass-panel px-6 py-4 rounded-3xl border-white/5 flex items-center gap-6 bg-gradient-to-r from-gold/5 to-transparent">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-1">Total Sessions</p>
              <p className="text-2xl font-syne font-black text-white">{stats.totalSessions}</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-1">Student Reach</p>
              <p className="text-2xl font-syne font-black text-gold">{stats.totalStudents.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search */}
          <div className="space-y-2 lg:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Quick Search</label>
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="School, trainer or topic..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:outline-none focus:border-gold/30 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          {/* School Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Institution</label>
            <div className="relative">
              <School className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
              <select 
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:outline-none focus:border-gold/30 appearance-none [color-scheme:dark]"
              >
                <option value="">All Schools</option>
                {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
            </div>
          </div>

          {/* Trainer Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Trainer</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
              <select 
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:outline-none focus:border-gold/30 appearance-none [color-scheme:dark]"
              >
                <option value="">All Trainers</option>
                {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
            </div>
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Date Range</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-[10px] font-bold focus:outline-none focus:border-gold/30 [color-scheme:dark]"
                />
              </div>
              <div className="relative flex-1">
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-[10px] font-bold focus:outline-none focus:border-gold/30 [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setViewType('flat')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                viewType === 'flat' ? "bg-white/10 text-white shadow-lg" : "text-text-dim hover:text-white"
              )}
            >
              <LayoutList className="w-4 h-4" />
              Flat View
            </button>
            <button 
              onClick={() => setViewType('grouped')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                viewType === 'grouped' ? "bg-white/10 text-white shadow-lg" : "text-text-dim hover:text-white"
              )}
            >
              <Layers className="w-4 h-4" />
              Grouped
            </button>
          </div>

        </div>
      </motion.div>

      {/* Content Table */}
      <motion.div variants={fadeUp} className="glass-panel rounded-[2.5rem] border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-text-dim font-bold text-sm tracking-widest uppercase">Fetching Records...</p>
          </div>
        ) : viewType === 'flat' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5">
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-dim">Date</th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-dim">Institution</th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-dim">Trainer</th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-dim">Class</th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-dim">Topic</th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-dim text-right">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <p className="text-text-dim font-bold">No records found matching your filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log: any) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-5 px-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{new Date(log.createdAt).toLocaleDateString('en-GB')}</span>
                          <span className="text-[10px] text-text-dim uppercase tracking-tighter">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <School className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="text-sm font-bold text-white">{log.visit?.school?.name}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <User className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-sm font-bold text-text-primary">{log.trainer?.name}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8 text-sm font-black text-text-dim uppercase tracking-widest">{log.className || log.class?.name}</td>
                      <td className="py-5 px-8 text-sm font-medium text-white">{log.topicName}</td>
                      <td className="py-5 px-8 text-right">
                        <span className="text-2xl font-syne font-black text-gold leading-none">{log.attendanceCount}</span>
                        <span className="text-[10px] font-black uppercase text-text-dim ml-2 tracking-widest">Students</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 space-y-6">
            {groupedLogs.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-text-dim font-bold">No records found matching your filters.</p>
              </div>
            ) : (
              groupedLogs.map((group: any) => (
                <div key={group.visit.id} className="rounded-[2rem] border border-white/5 bg-white/[0.02] overflow-hidden group">
                  <div className="p-6 bg-white/[0.03] border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim">Execution Date</span>
                        <span className="text-lg font-syne font-black text-white">{new Date(group.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="w-px h-10 bg-white/10 hidden md:block" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim">Institution</span>
                        <span className="text-lg font-syne font-black text-blue-400">{group.visit.school?.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">Assigned Trainer</p>
                        <p className="text-sm font-bold text-white">{group.trainer?.name}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <User className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.sessions.map((session: any) => (
                        <div key={session.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-gold/20 transition-all flex justify-between items-center group/card">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gold/60 mb-1">{session.className || session.class?.name}</p>
                            <p className="text-sm font-bold text-white group-hover/card:text-gold transition-colors">{session.topicName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-syne font-black text-white">{session.attendanceCount}</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-text-dim">Students</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
