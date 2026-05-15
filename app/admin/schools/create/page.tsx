'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { School as SchoolIcon, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateSchool() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    principalName: '',
    contactEmail: '',
    username: '',
    password: '',
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create school');
      }

      setMessage({ type: 'success', text: `School "${data.name}" added successfully!` });
      setFormData({ 
        name: '', 
        address: '', 
        principalName: '', 
        contactEmail: '', 
        username: '', 
        password: '',
        registrationDate: new Date().toISOString().split('T')[0]
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8 max-w-2xl mx-auto pb-12">
      <Link href="/admin/schools" className="text-text-dim hover:text-gold text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Schools
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-syne font-black text-text-primary tracking-tight">
            Register Institution
          </h1>
          <p className="text-text-dim mt-2 text-sm font-medium">
            Add a new partner school to the SK Robotics network.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
          <SchoolIcon className="w-6 h-6 text-gold" />
        </div>
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-dim">Institution Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Heritage International School"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-dim">Address Location</label>
            <input
              required
              type="text"
              placeholder="e.g. Jubilee Hills, Hyderabad"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Principal Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. A. Sharma"
                value={formData.principalName}
                onChange={e => setFormData({ ...formData, principalName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Contact Email</label>
              <input
                type="email"
                placeholder="contact@school.edu"
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-dim">Registration Date</label>
              <input
                required
                type="date"
                value={formData.registrationDate}
                onChange={e => setFormData({ ...formData, registrationDate: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h4 className="text-xs font-black uppercase tracking-widest text-gold mb-4">Portal Login Credentials</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-dim">Portal Username</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. heritage_admin"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-dim">Portal Password</label>
                <input
                  required
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-text-primary focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>
            <p className="text-[10px] text-text-dim mt-4 font-medium italic">
              These credentials will be used by the school to log in to their management dashboard.
            </p>
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
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register School'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
