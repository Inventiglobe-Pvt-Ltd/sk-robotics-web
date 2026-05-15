'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Save, Loader2, CheckCircle, School } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VisitExecution({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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
  }, [id]);

  const fetchVisitDetails = async () => {
    try {
      const res = await fetch('/api/trainer/visits');
      if (res.ok) {
        const data = await res.json();
        const found = (data.allVisits || []).find((v: any) => v.id === id);
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

  const isFormValid = () => {
    return entries.every(e => {
      const strength = Number(e.totalStrength) || 0;
      const present = Number(e.attendanceCount) || 0;
      return (
        e.className.trim() !== '' && 
        e.topicName.trim() !== '' && 
        strength > 0 && 
        present <= strength
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !isFormValid()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/trainer/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitId: id,
          entries: entries
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => router.push('/trainer/dashboard'), 2000);
      } else {
        const data = await res.json();
        console.log('[DEBUG] Submission error data:', data);
        alert(data.details ? `Error: ${data.details}` : (data.message || 'Submission failed'));
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
            <h2 className="text-2xl font-syne font-black text-text-primary">Visit Completed!</h2>
            <p className="text-text-dim mt-2">Your execution report has been submitted to admin.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-black pb-12">
      {/* Mobile Header */}
      <div className="glass-panel sticky top-0 z-40 p-6 border-b border-white/5 flex items-center gap-4 rounded-b-3xl">
        <Link href="/trainer/dashboard" className="p-2 bg-white/5 rounded-xl text-text-dim">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-syne font-black text-text-primary truncate max-w-[200px]">
            {visit?.school?.name}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-[0.6rem] uppercase font-black tracking-widest text-gold">Execute Session</p>
            {visit?.trainerAttendances?.[0] && (
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-widest">
                {visit.trainerAttendances[0].status}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {visit?.trainerAttendances?.[0] && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">
            Report Locked: Attendance has been marked as {visit.trainerAttendances[0].status}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-text-dim">Session Reports</h2>
                <button 
                type="submit" 
                disabled={submitting || visit?.trainerAttendances?.length > 0 || !isFormValid()}
                className="text-[0.65rem] font-black uppercase text-gold flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-lg border border-gold/20 hover:bg-gold hover:text-bg-black transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : (
                  <>
                    <Save className="w-3 h-3" /> {visit?.trainerAttendances?.length > 0 ? 'Report Locked' : 'Submit Report'}
                  </>
                )}
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {entries.map((entry, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="glass-panel p-6 rounded-3xl border-white/5 space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6rem] font-black text-gold/50 uppercase tracking-widest">Entry #{index + 1}</span>
                    {entries.length > 1 && !visit?.trainerAttendances?.[0] && (
                      <button 
                        type="button" 
                        onClick={() => removeEntry(index)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-text-muted">Class Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. 8th Grade A"
                        value={entry.className}
                        onChange={e => updateEntry(index, 'className', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={visit?.trainerAttendances?.length > 0}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-text-muted">Topic Covered</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Introduction to Robotics"
                        value={entry.topicName}
                        onChange={e => updateEntry(index, 'topicName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={visit?.trainerAttendances?.length > 0}
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                      <div className="flex items-center justify-between px-1">
                        <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gold/80">Attendance Metrics</label>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[0.55rem] font-black uppercase tracking-widest text-text-dim">Strength</label>
                          <input 
                            required
                            type="number"
                            placeholder="0"
                            value={entry.totalStrength}
                            onChange={e => updateEntry(index, 'totalStrength', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70"
                            disabled={visit?.trainerAttendances?.length > 0}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[0.55rem] font-black uppercase tracking-widest text-text-dim">Present</label>
                          <input 
                            required
                            type="number"
                            placeholder="0"
                            value={entry.attendanceCount}
                            onChange={e => updateEntry(index, 'attendanceCount', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70"
                            disabled={visit?.trainerAttendances?.length > 0}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[0.55rem] font-black uppercase tracking-widest text-text-dim">Absents</label>
                          <input 
                            required
                            type="number"
                            placeholder="0"
                            value={entry.absentCount}
                            onChange={e => updateEntry(index, 'absentCount', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:border-gold outline-none transition-all disabled:opacity-70"
                            disabled={visit?.trainerAttendances?.length > 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pt-4 px-2">
            {!visit?.trainerAttendances?.[0] && (
              <button
                type="button"
                onClick={addEntry}
                className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white/10 active:scale-95 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Another Row
              </button>
            )}
            <p className="text-center text-[10px] text-text-dim mt-4 font-medium italic">
              By submitting, you confirm that the session was conducted and attendance is accurate.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
