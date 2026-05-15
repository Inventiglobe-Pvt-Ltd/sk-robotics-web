'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  User as UserIcon, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  Loader2,
  Users,
  BookOpen,
  School,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function VisitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const visitId = params.id as string;

  const [visit, setVisit] = useState<any>(null);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState('');

  useEffect(() => {
    fetchData();
  }, [visitId]);

  const fetchData = async () => {
    try {
      const [visitRes, trainersRes] = await Promise.all([
        fetch(`/api/visits/${visitId}`),
        fetch('/api/trainers')
      ]);
      
      const visitData = await visitRes.json();
      const trainersData = await trainersRes.json();
      
      setVisit(visitData);
      setTrainers(trainersData);
      if (visitData.trainerId) setSelectedTrainer(visitData.trainerId);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTrainer = async () => {
    if (!selectedTrainer) return;
    setActionLoading('assign');
    try {
      const res = await fetch(`/api/visits?id=${visitId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          trainerId: selectedTrainer,
          status: 'ASSIGNED'
        }),
      });
      if (res.ok) await fetchData();
    } catch (err) {
      console.error('Failed to assign trainer:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkAttendance = async (status: 'PRESENT' | 'ABSENT') => {
    if (!visit.trainerId) {
      alert('Please assign a trainer to this visit before marking attendance.');
      return;
    }
    setActionLoading('attendance');
    try {
      const res = await fetch(`/api/visits/${visitId}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status,
          trainerId: visit.trainerId,
          markedByAdmin: true
        }),
      });
      if (res.ok) {
        await fetchData();
      } else {
        const errorData = await res.json();
        alert(`Failed to mark attendance: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Failed to mark attendance:', err);
      alert('Network error while marking attendance.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    setActionLoading('status');
    try {
      const res = await fetch(`/api/visits?id=${visitId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) await fetchData();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!visit || visit.message || !visit.school) {
    return (
      <div className="min-h-screen bg-bg-black flex items-center justify-center flex-col">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-syne font-bold text-white mb-2">Visit Not Found</h2>
        <p className="text-text-muted mb-6">The visit you are looking for does not exist or has been deleted.</p>
        <Link href="/admin/visits" className="text-sm font-bold text-gold uppercase tracking-widest hover:underline">
          Return to Visits
        </Link>
      </div>
    );
  }

  const attendance = visit.trainerAttendances?.[0];
  const canComplete = visit.sessionEntries?.length > 0;

  const statusColors: any = {
    ASSIGNED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    IN_PROGRESS: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    SUBMITTED: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    COMPLETED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  };

  return (
    <div className="min-h-screen bg-bg-black pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <Link 
              href="/admin/visits"
              className="inline-flex items-center gap-2 text-text-dim hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Visits</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-syne font-black text-white mb-2">
              Visit Details
            </h1>
            <p className="text-text-muted">Manage field operations and trainer execution.</p>
          </div>

          <div className={cn(
            "px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest",
            statusColors[visit?.status || 'ASSIGNED']
          )}>
            {(visit?.status || 'ASSIGNED').replace('_', ' ')}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info & Assignment */}
          <div className="lg:col-span-2 space-y-8">
            {/* School Info */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-panel p-8 rounded-[2.5rem] border-white/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-syne font-bold text-white mb-2">{visit.school.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-text-dim">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(visit.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Session #{visit.sessionNumber}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Session Entries Report */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-panel p-8 rounded-[2.5rem] border-white/5"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-syne font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Session Execution Report
                </h3>
                <span className="text-xs font-bold text-text-dim uppercase tracking-widest">
                  {visit.sessionEntries?.length || 0} Sessions Logged
                </span>
              </div>

              {visit.sessionEntries?.length > 0 ? (
                <div className="space-y-4">
                  {visit.sessionEntries.map((session: any) => (
                    <div 
                      key={session.id}
                      className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <School className="w-3.5 h-3.5 text-gold" />
                          <p className="text-xs font-black text-gold uppercase tracking-widest">
                            {session.className || session.class?.name || 'Manual Entry'}
                          </p>
                        </div>
                        <h4 className="text-lg font-bold text-white">{session.topicName}</h4>
                        <p className="text-[10px] text-text-dim mt-1 font-medium italic">
                          Logged by {session.trainer?.name || visit.trainer?.name || 'Trainer'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-syne font-black text-white">{session.attendanceCount}</p>
                        <p className="text-[10px] font-bold text-text-dim uppercase tracking-tighter">Attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-6 rounded-[2rem] border border-dashed border-white/10">
                  <p className="text-text-muted text-sm font-medium">No sessions have been logged for this visit yet.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Controls */}
          <div className="space-y-8">
            {/* Assignment Section */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-panel p-8 rounded-[2.5rem] border-white/5"
            >
              <h3 className="text-xl font-syne font-bold text-white mb-6 flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-gold" />
                Trainer Assignment
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim px-2">Select Trainer</label>
                  <div className="relative group">
                    <select 
                      value={selectedTrainer}
                      onChange={(e) => setSelectedTrainer(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer font-bold text-sm"
                    >
                      <option value="" className="bg-bg-black">Choose a trainer...</option>
                      {trainers.map((t) => (
                        <option key={t.id} value={t.id} className="bg-bg-black">{t.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim group-hover:text-gold transition-colors">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleAssignTrainer}
                  loading={actionLoading === 'assign'}
                  disabled={!selectedTrainer || visit.status === 'COMPLETED'}
                  variant="primary"
                  className="w-full py-4 rounded-xl"
                >
                  {visit.trainerId ? 'Reassign Trainer' : 'Assign Trainer'}
                </Button>
              </div>
            </motion.div>

            {/* Attendance Section */}
            <AnimatePresence>
              {visit.trainerId && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-panel p-8 rounded-[2.5rem] border-white/5 overflow-hidden"
                >
                  <h3 className="text-xl font-syne font-bold text-white mb-6 flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-400" />
                    Attendance
                  </h3>

                  {attendance ? (
                    <div className={cn(
                      "p-4 rounded-2xl flex items-center justify-between mb-6",
                      attendance.status === 'PRESENT' ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-red-500/10 border border-red-500/20"
                    )}>
                      <div className="flex items-center gap-3">
                        {attendance.status === 'PRESENT' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className={cn(
                          "text-sm font-bold uppercase tracking-widest",
                          attendance.status === 'PRESENT' ? "text-emerald-400" : "text-red-400"
                        )}>
                          {attendance.status}
                        </span>
                      </div>
                      {attendance.markedByAdmin && (
                        <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">By Admin</span>
                      )}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => handleMarkAttendance('PRESENT')}
                      loading={actionLoading === 'attendance' && attendance?.status !== 'PRESENT'}
                      className="bg-emerald-500 text-bg-black hover:bg-emerald-400 rounded-xl py-3 text-xs font-black uppercase tracking-widest shadow-none"
                    >
                      Mark Present
                    </Button>
                    <Button 
                      onClick={() => handleMarkAttendance('ABSENT')}
                      loading={actionLoading === 'attendance' && attendance?.status !== 'ABSENT'}
                      className="bg-red-500 text-white hover:bg-red-600 rounded-xl py-3 text-xs font-black uppercase tracking-widest shadow-none"
                    >
                      Mark Absent
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Management */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-panel p-8 rounded-[2.5rem] border-white/5"
            >
              <h3 className="text-xl font-syne font-bold text-white mb-6">Status Control</h3>
              
              <div className="space-y-4">
                {visit.status === 'ASSIGNED' && (
                  <Button 
                    onClick={() => handleUpdateStatus('IN_PROGRESS')}
                    loading={actionLoading === 'status'}
                    className="w-full bg-amber-500 text-bg-black hover:bg-amber-600 rounded-xl py-4 font-black uppercase tracking-widest text-xs shadow-none"
                  >
                    Start Field Work
                  </Button>
                )}

                {(visit.status === 'IN_PROGRESS' || visit.status === 'SUBMITTED') && (
                  <Button 
                    onClick={() => handleUpdateStatus('SUBMITTED')}
                    loading={actionLoading === 'status'}
                    className="w-full bg-purple-500 text-white hover:bg-purple-600 rounded-xl py-4 font-black uppercase tracking-widest text-xs shadow-none"
                  >
                    {visit.status === 'SUBMITTED' ? 'Submit for Review' : 'Force Submission'}
                  </Button>
                )}

                {visit.status !== 'COMPLETED' && (
                  <Button 
                    onClick={() => handleUpdateStatus('COMPLETED')}
                    loading={actionLoading === 'status'}
                    disabled={!canComplete}
                    className="w-full bg-emerald-500 text-bg-black hover:bg-emerald-600 rounded-xl py-4 font-black uppercase tracking-widest text-xs shadow-none"
                  >
                    Visit Finalized
                  </Button>
                )}

                {visit.status === 'COMPLETED' && (
                  <div className="text-center py-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Visit Finalized</p>
                  </div>
                )}

                {!canComplete && visit.status !== 'COMPLETED' && (
                  <p className="text-[10px] text-red-400 font-bold text-center mt-2 px-4 italic">
                    * Cannot complete until sessions are logged.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
