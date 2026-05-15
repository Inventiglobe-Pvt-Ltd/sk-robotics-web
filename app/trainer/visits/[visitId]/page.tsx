'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { ArrowLeft, Plus, Trash2, Save, Loader2, CheckCircle, School } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VisitExecution({ params }: { params: Promise<{ visitId: string }> }) {
  const { visitId } = use(params);
  const [visit, setVisit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const [entries, setEntries] = useState([
    { className: '', topicName: '', attendanceCount: '', totalStrength: '', absentCount: '' }
  ]);

  useEffect(() => {
    fetchVisitDetails();
  }, [visitId]);

  const fetchVisitDetails = async () => {
    try {
      const res = await fetch(`/api/trainer/visits?visitId=${visitId}`);
      if (res.ok) {
        const data = await res.json();
        const found = data.visit;
        
        if (found) {
          setVisit(found);
          if (found.sessionEntries && found.sessionEntries.length > 0) {
            setEntries(found.sessionEntries.map((s: any) => ({
              className: s.className,
              topicName: s.topicName,
              attendanceCount: s.attendanceCount.toString(),
              totalStrength: (s.totalStrength || 0).toString(),
              absentCount: (s.absentCount || 0).toString()
            })));
          }
        } else {
          router.push('/trainer/dashboard');
        }
      } else {
        router.push('/trainer/dashboard');
      }
    } catch (err) {
      console.error('Failed to fetch visit details:', err);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = () => {
    setEntries([...entries, { className: '', topicName: '', attendanceCount: '', totalStrength: '', absentCount: '' }]);
  };

  const removeEntry = (index: number) => {
    if (entries.length === 1) return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: string, value: string) => {
    const newEntries = [...entries];
    (newEntries[index] as any)[field] = value;
    
    // Auto-calculate absents and enforce present <= strength
    const strength = Number(newEntries[index].totalStrength) || 0;
    const present = Number(newEntries[index].attendanceCount) || 0;
    
    if (field === 'attendanceCount' && present > strength && strength > 0) {
      newEntries[index].attendanceCount = strength.toString();
      newEntries[index].absentCount = "0";
    } else if (field !== 'absentCount') {
      newEntries[index].absentCount = Math.max(0, strength - present).toString();
    }
    
    setEntries(newEntries);
  };

  const getFormValidationError = () => {
    for (const e of entries) {
      if (!e.className.trim()) return "Please enter the Class Name.";
      if (!e.topicName.trim()) return "Please enter the Topic Covered.";
      
      const strength = Number(e.totalStrength) || 0;
      const present = Number(e.attendanceCount) || 0;
      
      if (strength <= 0) return `Enter total strength for class ${e.className || ''}.`;
      if (present > strength) return `Present count cannot exceed total strength for class ${e.className}.`;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errorMsg = getFormValidationError();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/trainer/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitId: visitId,
          entries: entries
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => router.push('/trainer/dashboard'), 2000);
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-black flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-12 rounded-[3rem] border-gold/20 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-syne font-black text-text-primary">Visit Submitted!</h2>
            <p className="text-text-dim mt-2">Your report has been received and is pending finalization.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const isLocked = visit?.status === 'FINALIZED';

  return (
    <div className="min-h-screen bg-bg-black pb-12">
      {/* Mobile Header */}
      <div className="glass-panel sticky top-0 z-40 p-6 border-b border-white/5 rounded-b-3xl bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/trainer/visits" className="p-2 bg-white/5 rounded-xl text-text-dim">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-syne font-black text-text-primary truncate max-w-[200px]">
              {visit?.school?.name || 'Loading...'}
            </h1>
            <p className="text-[0.65rem] uppercase font-black tracking-widest text-gold flex items-center gap-2">
              <span className="opacity-50">Visit Date:</span>
              {visit?.date ? new Date(visit.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '...'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {(visit?.status as string) === 'FINALIZED' && (
          <div className="mb-6 p-4 rounded-2xl bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.2em] text-center">
            Visit finalized and locked by Admin.
          </div>
        )}
        
        {(visit?.status as string) === 'SUBMITTED' && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">
            Report Submitted: Still editable until finalized by Admin.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-text-dim">Session Details</h2>
            {!isLocked && (
              <button 
                type="submit" 
                disabled={submitting || getFormValidationError() !== null}
                className="text-[0.65rem] font-black uppercase text-gold flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-xl border border-gold/20 hover:bg-gold hover:text-bg-black transition-all disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Save className="w-3 h-3" /> Submit Report</>}
              </button>
            )}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {entries.map((entry, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-6 rounded-[2rem] border-white/5 space-y-5 relative"
                >
                  {entries.length > 1 && !isLocked && (
                    <button 
                      type="button"
                      onClick={() => removeEntry(index)}
                      className="absolute top-4 right-4 p-2 text-red-400/50 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-text-muted">Class Name</label>
                      <input 
                        required
                        placeholder="e.g. 8th Grade"
                        value={entry.className}
                        onChange={e => updateEntry(index, 'className', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70"
                        disabled={isLocked}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-text-muted">Topic Covered</label>
                      <input 
                        required
                        placeholder="e.g. Robotics Basics"
                        value={entry.topicName}
                        onChange={e => updateEntry(index, 'topicName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70"
                        disabled={isLocked}
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                      <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gold/80 block">Attendance Metrics</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[0.55rem] font-black uppercase tracking-widest text-text-dim">Strength</label>
                          <input 
                            required
                            type="number"
                            value={entry.totalStrength}
                            onChange={e => updateEntry(index, 'totalStrength', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:border-gold outline-none transition-all"
                            disabled={isLocked}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[0.55rem] font-black uppercase tracking-widest text-text-dim">Present</label>
                          <input 
                            required
                            type="number"
                            value={entry.attendanceCount}
                            onChange={e => updateEntry(index, 'attendanceCount', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:border-gold outline-none transition-all"
                            disabled={isLocked}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[0.55rem] font-black uppercase tracking-widest text-text-dim">Absents</label>
                          <input 
                            readOnly
                            value={entry.absentCount}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {!isLocked && (
              <button
                type="button"
                onClick={addEntry}
                className="w-full py-5 bg-white/5 border border-dashed border-white/10 text-text-dim rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/10 hover:border-gold/30 hover:text-gold transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Another Class
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
