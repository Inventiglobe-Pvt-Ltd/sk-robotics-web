'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { Loader2, ArrowLeft, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function SchoolVisitDetail() {
  const params = useParams();
  const visitId = params.id as string;
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const schoolId = localStorage.getItem('schoolId');
    if (!schoolId) {
      router.push('/school/login');
      return;
    }

    // We can use the dashboard/visit api which returns visit details
    fetch(`/api/dashboard/visit/${visitId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(json => {
        // Verify this visit belongs to the school
        if (json.visitInfo.schoolId !== schoolId) {
          throw new Error('Unauthorized');
        }
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        router.push('/school/visits');
      });
  }, [visitId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <Link href="/school/visits" className="text-text-dim hover:text-gold text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Visits
      </Link>

      <PageHeader 
        title={`Session ${data.visitInfo.sessionNumber}`}
        description={`Executed on ${new Date(data.visitInfo.date).toLocaleDateString()} by ${data.trainersInvolved?.[0]?.name || 'Trainer'}`}
      />

      <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center justify-between bg-gradient-to-r from-gold/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Total Students Covered</p>
            <p className="font-syne font-black text-2xl text-white">{data.totalAttendance}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h3 className="font-syne font-black text-xl text-white">Class Execution Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim">Class</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim">Topic Taught</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim text-right">Strength</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim text-right">Present</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim text-right">Absents</th>
              </tr>
            </thead>
            <tbody>
              {data.classWiseAttendance.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-text-dim">No class sessions logged yet.</td>
                </tr>
              ) : (
                data.classWiseAttendance.map((session: any, idx: number) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{session.className}</td>
                    <td className="py-4 px-4 text-sm font-medium text-text-primary">{session.topicName}</td>
                    <td className="py-4 px-4 text-right font-black text-text-dim">{session.totalStrength}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-black text-emerald-400 text-lg">{session.attendanceCount}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-red-400 font-bold">{session.absentCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
