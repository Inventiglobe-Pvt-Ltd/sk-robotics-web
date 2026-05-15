'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { User, Calendar, MapPin, Users, Loader2, PlayCircle, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function TrainerDetailPage() {
  const params = useParams();
  const trainerId = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trainers/${trainerId}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [trainerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!data || !data.trainer) return <div className="p-12 text-center text-text-dim">Trainer not found</div>;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <div className="flex items-center gap-4 text-text-dim mb-4">
        <Link href="/admin/trainers" className="hover:text-gold text-xs font-black uppercase tracking-widest transition-colors">
          ← Back to Trainers
        </Link>
      </div>

      <PageHeader 
        title={data.trainer.name}
        description={`Email: ${data.trainer.email} • Phone: ${data.trainer.phone || 'N/A'}`}
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <PlayCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Total Visits Assigned</p>
            <p className="font-syne font-bold text-lg">{data.totalVisits}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Students Taught</p>
            <p className="font-syne font-bold text-lg">{data.totalStudents}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
            <ShieldCheck className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Attendance Rate</p>
            <p className="font-syne font-bold text-lg">{data.attendancePercentage}% <span className="text-[10px] text-text-dim font-normal">({data.markedAttendancesCount} records)</span></p>
          </div>
        </motion.div>
      </div>

      {/* Visit History */}
      <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-gold" />
          <h3 className="font-syne font-black text-xl text-white">Execution History</h3>
        </div>

        <div className="space-y-4">
          {data.trainer.visits?.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl text-text-dim">
              No visits assigned to this trainer yet.
            </div>
          ) : (
            data.trainer.visits.map((visit: any) => {
              const statusColors: any = {
                ASSIGNED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
                IN_PROGRESS: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                SUBMITTED: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
                COMPLETED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
              };
              
              const attendance = visit.trainerAttendances?.find((a: any) => a.trainerId === data.trainer.id);

              return (
                <Link key={visit.id} href={`/admin/visits/${visit.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                        <MapPin className="w-5 h-5 text-text-dim group-hover:text-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">{visit.school?.name}</p>
                        <p className="text-xs text-text-dim font-medium flex items-center gap-2">
                          <span>Session {visit.sessionNumber}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span>{new Date(visit.date).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {attendance && (
                        <div className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
                          attendance.status === 'PRESENT' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          {attendance.status}
                        </div>
                      )}
                      <div className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border", statusColors[visit.status])}>
                        {visit.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
