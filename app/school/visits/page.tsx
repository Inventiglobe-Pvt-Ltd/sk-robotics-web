'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { Calendar, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SchoolVisitsList() {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const schoolId = localStorage.getItem('schoolId');
    if (!schoolId) {
      router.push('/school/login');
      return;
    }

    fetch(`/api/schools/${schoolId}`)
      .then(res => res.json())
      .then(json => {
        setVisits(json.school?.visits || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <PageHeader 
        title="Training Visits"
        description="Complete history of all VR execution sessions at your institution."
      />

      <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim">Date</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim">Trainer</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim">Classes Taught</th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-text-dim text-right">Students</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {visits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-text-dim">No visits recorded yet.</td>
                </tr>
              ) : (
                visits.map((visit: any) => {
                  const totalStudents = visit.sessionEntries.reduce((acc: number, session: any) => acc + session.attendanceCount, 0);
                  
                  return (
                    <tr key={visit.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            <Calendar className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <span className="text-sm font-bold text-white">{new Date(visit.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-text-primary">{visit.trainer?.name || 'Assigned'}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-text-primary">
                            {visit.sessionEntries.length} {visit.sessionEntries.length === 1 ? 'Class' : 'Classes'}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">
                            {visit.sessionEntries.map((s: any) => `${s.className} (${s.topicName})`).join(', ') || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-black text-white text-right">{totalStudents}</td>
                      <td className="py-4 px-4 text-right">
                        <Link href={`/school/visits/${visit.id}`}>
                          <button className="p-2 rounded-xl bg-white/5 text-text-dim hover:text-gold hover:bg-gold/10 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
