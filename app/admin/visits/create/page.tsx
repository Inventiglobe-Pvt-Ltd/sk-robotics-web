'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { CalendarPlus, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateVisit() {
  const [schools, setSchools] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    schoolId: '',
    trainerId: '',
    sessionNumber: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetch('/api/schools').then(res => res.json()).then(setSchools);
    fetch('/api/trainers').then(res => res.json()).then(setTrainers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create visit');
      }

      setMessage({ type: 'success', text: `Visit (Session ${data.sessionNumber}) created successfully!` });
      setFormData({ ...formData, sessionNumber: '' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8 max-w-2xl mx-auto pb-12">
      <Link href="/admin" className="text-text-dim hover:text-gold text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-syne font-black text-text-primary tracking-tight">
            Schedule Visit
          </h1>
          <p className="text-text-dim mt-2 text-sm font-medium">
            Create an official visit slot for trainers to log sessions.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
          <CalendarPlus className="w-6 h-6 text-gold" />
        </div>
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Target School</label>
              <select
                required
                value={formData.schoolId}
                onChange={e => setFormData({ ...formData, schoolId: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
              >
                <option value="" disabled className="bg-bg-black">Select a partner school...</option>
                {schools.map((s: any) => (
                  <option key={s.id} value={s.id} className="bg-bg-black">{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Assign Lead Trainer</label>
              <select
                required
                value={formData.trainerId}
                onChange={e => setFormData({ ...formData, trainerId: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
              >
                <option value="" disabled className="bg-bg-black">Select a trainer...</option>
                {trainers.map((t: any) => (
                  <option key={t.id} value={t.id} className="bg-bg-black">{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Session Number (1-10)</label>
              <input
                required
                type="number"
                min="1"
                max="10"
                placeholder="e.g. 1"
                value={formData.sessionNumber}
                onChange={e => setFormData({ ...formData, sessionNumber: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Date of Visit</label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold text-bg-black rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Official Visit'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
