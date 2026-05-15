'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import PageHeader from '@/components/dashboard/PageHeader';
import { CreditCard, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SchoolPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const schoolId = localStorage.getItem('schoolId');
    if (!schoolId) {
      router.push('/school/login');
      return;
    }

    fetch(`/api/school/payments?schoolId=${schoolId}`)
      .then(res => res.json())
      .then(json => {
        setPayments(Array.isArray(json) ? json : []);
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
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12 max-w-3xl mx-auto">
      <PageHeader 
        title="Financial Records"
        description="Transparent overview of your completed service payments."
      />

      <motion.div variants={fadeUp} className="glass-panel p-6 rounded-3xl border-white/5 flex items-start gap-4 bg-emerald-500/5 mb-8">
        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
        <div>
          <h4 className="text-sm font-bold text-emerald-400 mb-1">Secure & Verified</h4>
          <p className="text-xs text-text-dim leading-relaxed">
            This dashboard displays only finalized, completed payments for transparency. Pending or upcoming installments are managed directly with your SK Robotics account executive.
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <CreditCard className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-syne font-black text-2xl text-white">Payments Completed</h3>
        </div>

        <div className="space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-text-dim text-sm font-medium">No completed payments on record yet.</p>
            </div>
          ) : (
            payments.map((payment) => {
              const isPaid = payment.status === 'PAID';
              
              return (
                <div key={payment.id} className={cn(
                  "flex items-center justify-between p-6 rounded-2xl border transition-colors group",
                  isPaid 
                    ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]" 
                    : "bg-amber-500/5 border-amber-500/10 hover:bg-amber-500/10"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center",
                      isPaid 
                        ? "bg-emerald-500/10 border-emerald-500/20" 
                        : "bg-amber-500/10 border-amber-500/20"
                    )}>
                      {isPaid ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Installment {payment.installmentNumber}</h4>
                      <p className="text-xs text-text-dim font-medium flex flex-col gap-1 mt-1">
                        {isPaid ? (
                          <span>Paid on {new Date(payment.paidDate).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-amber-400/80 uppercase tracking-widest font-black text-[9px]">Payment Pending / Due</span>
                        )}
                        {payment.notes && (
                          <span className="text-[10px] text-text-muted italic">Note: {payment.notes}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest",
                    isPaid 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  )}>
                    {isPaid ? 'Verified' : 'Due'}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
