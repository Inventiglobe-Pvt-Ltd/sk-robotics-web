'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { School, Calendar, MapPin, Users, Loader2, PlayCircle, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SchoolDetailPage() {
  const params = useParams();
  const schoolId = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/schools/${schoolId}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [schoolId]);

  const [payments, setPayments] = useState<any[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [paymentNotes, setPaymentNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/admin/payments?schoolId=${schoolId}`)
      .then(res => res.json())
      .then(json => {
        const p = Array.isArray(json) ? json : [];
        setPayments(p);
        // Initialize dates and notes
        const dates: Record<string, string> = {};
        const notes: Record<string, string> = {};
        p.forEach(pay => {
          if (pay.status !== 'PAID') {
            dates[pay.id] = new Date().toISOString().split('T')[0];
          }
          notes[pay.id] = pay.notes || '';
        });
        setSelectedDates(dates);
        setPaymentNotes(notes);
      })
      .catch(console.error)
      .finally(() => setPaymentsLoading(false));
  }, [schoolId]);

  const addInstallment = async () => {
    const num = payments.length + 1;
    const res = await fetch('/api/admin/payments', {
      method: 'POST',
      body: JSON.stringify({ schoolId, installmentNumber: num }),
    });
    if (res.ok) {
      const newPay = await res.json();
      setPayments([...payments, newPay]);
      setSelectedDates({ ...selectedDates, [newPay.id]: new Date().toISOString().split('T')[0] });
    }
  };

  const markAsPaid = async (id: string) => {
    const date = selectedDates[id];
    const notes = paymentNotes[id];
    if (!date) return;
    
    const res = await fetch(`/api/admin/payments?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'PAID', paidDate: date, notes }),
    });
    if (res.ok) {
      setPayments(payments.map(p => p.id === id ? { ...p, status: 'PAID', paidDate: date, notes } : p));
    }
  };

  const notifySchool = async (id: string) => {
    const notes = paymentNotes[id];
    const res = await fetch(`/api/admin/payments?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'PENDING_NOTIFIED', notes }),
    });
    if (res.ok) {
      setPayments(payments.map(p => p.id === id ? { ...p, status: 'PENDING_NOTIFIED', notes } : p));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!data || !data.school) return <div className="p-12 text-center text-text-dim">School not found</div>;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <div className="flex items-center gap-4 text-text-dim mb-4">
        <Link href="/admin/schools" className="hover:text-gold text-xs font-black uppercase tracking-widest transition-colors">
          ← Back to Schools
        </Link>
      </div>

      <PageHeader 
        title={data.school.name}
        description={`Principal: ${data.school.principalName || 'N/A'} • Contact: ${data.school.contactEmail || 'N/A'}`}
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
            <MapPin className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Location</p>
            <p className="font-syne font-bold text-lg">{data.school.address || 'Not specified'}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <PlayCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Total Visits</p>
            <p className="font-syne font-bold text-lg">{data.totalVisits}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold">Students Reached</p>
            <p className="font-syne font-bold text-lg">{data.totalStudents}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visit History */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-gold" />
            <h3 className="font-syne font-black text-xl text-white">Visit History</h3>
          </div>

          <div className="space-y-4">
            {data.school.visits?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl text-text-dim text-sm font-bold">
                No visits recorded yet.
              </div>
            ) : (
              data.school.visits.map((visit: any) => {
                const statusColors: any = {
                  ASSIGNED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
                  IN_PROGRESS: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                  SUBMITTED: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
                  COMPLETED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                };

                return (
                  <Link key={visit.id} href={`/admin/visits/${visit.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                          <Clock className="w-4 h-4 text-text-dim group-hover:text-gold" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">Session {visit.sessionNumber}</p>
                          <p className="text-[10px] text-text-dim font-black uppercase tracking-widest">
                            {new Date(visit.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className={cn("px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border", statusColors[visit.status])}>
                        {visit.status}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Payment Management */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5 h-fit">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-syne font-black text-xl text-white">Payment Plan</h3>
            </div>
            <button 
              onClick={addInstallment}
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Add Installment
            </button>
          </div>

          <div className="space-y-4">
            {paymentsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
              </div>
            ) : payments.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl text-text-dim text-sm font-bold">
                No installments configured.
              </div>
            ) : (
              payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div>
                    <h4 className="font-bold text-white">Installment {p.installmentNumber}</h4>
                    {p.status === 'PAID' ? (
                      <div>
                        <p className="text-xs text-emerald-400 font-bold mt-1">
                          Paid on {new Date(p.paidDate).toLocaleDateString()}
                        </p>
                        {p.notes && (
                          <p className="text-[10px] text-text-dim mt-1 italic italic">" {p.notes} "</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-amber-400 font-bold mt-1">Pending Payment</p>
                        <input 
                          type="text"
                          placeholder="Add note (e.g. Paid via UPI)"
                          value={paymentNotes[p.id] || ''}
                          onChange={(e) => setPaymentNotes({...paymentNotes, [p.id]: e.target.value})}
                          className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                    )}
                  </div>
                  
                  {p.status !== 'PAID' && (
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2">
                        {p.status === 'PENDING' && (
                          <button 
                            onClick={() => notifySchool(p.id)}
                            className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                          >
                            Send Pending
                          </button>
                        )}
                        {p.status === 'PENDING_NOTIFIED' && (
                          <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest">
                            Sent to School
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <input 
                          type="date"
                          value={selectedDates[p.id] || ''}
                          onChange={(e) => setSelectedDates({...selectedDates, [p.id]: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] font-bold text-white focus:outline-none focus:border-emerald-500 transition-all [color-scheme:dark]"
                        />
                        <button 
                          onClick={() => markAsPaid(p.id)}
                          className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all whitespace-nowrap"
                        >
                          Mark as Paid
                        </button>
                      </div>
                    </div>
                  )}

                  {p.status === 'PAID' && (
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
