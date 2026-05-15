'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import DataTable from '@/components/dashboard/DataTable';
import PageHeader from '@/components/dashboard/PageHeader';
import { Plus, Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function VisitsPage() {
  const [visits, setVisits] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisits();
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await fetch('/api/trainers');
      const data = await res.json();
      setTrainers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch trainers:', err);
    }
  };

  const fetchVisits = async () => {
    try {
      const res = await fetch('/api/visits');
      const data = await res.json();
      setVisits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch visits:', err);
      setVisits([]);
    } finally {
      setLoading(false);
    }
  };

  const [editingVisit, setEditingVisit] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleDelete = async (id: string, sessionNumber: number) => {
    if (!confirm(`Are you sure you want to delete Session ${sessionNumber}? This action cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/visits?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchVisits();
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/visits?id=${editingVisit.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionNumber: editingVisit.sessionNumber,
          date: editingVisit.date,
          status: editingVisit.status,
          trainerId: editingVisit.trainerId
        })
      });
      if (res.ok) {
        setEditingVisit(null);
        fetchVisits();
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const columns = [
    { 
      key: 'school', 
      label: 'Partner School',
      render: (_: any, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-text-primary leading-tight">{item.school?.name || 'Unknown'}</p>
            <div className="flex items-center gap-1 text-[0.65rem] uppercase tracking-widest text-text-dim mt-1 font-black">
              <MapPin className="w-3 h-3" />
              {item.school?.address || 'No Location'}
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'sessionNumber', 
      label: 'Session',
      render: (val: number) => (
        <span className="text-sm font-semibold text-text-primary">Session {val}</span>
      )
    },
    { 
      key: 'date', 
      label: 'Date Scheduled',
      render: (val: string) => (
        <div className="flex items-center gap-2 text-text-muted">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-bold">{new Date(val).toLocaleDateString()}</span>
        </div>
      )
    },
    { 
      key: 'trainer', 
      label: 'Trainer Assigned',
      render: (_: any, item: any) => (
        <div className="flex items-center gap-2">
          {item.trainer ? (
            <span className="text-xs font-bold text-text-primary px-2 py-1 bg-white/5 rounded-md border border-white/5">
              {item.trainer.name}
            </span>
          ) : (
            <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md border border-dashed border-white/10">
              Unassigned
            </span>
          )}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: string) => {
        const statusColors: any = {
          ASSIGNED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
          IN_PROGRESS: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
          SUBMITTED: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
          COMPLETED: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        };
        return (
          <span className={cn(
            "px-2 py-1 rounded-md text-[0.6rem] font-black uppercase tracking-widest border",
            statusColors[val] || 'bg-gold/10 text-gold border-gold/20'
          )}>
            {val || 'ASSIGNED'}
          </span>
        );
      }
    },
    {
      key: 'actions',
      label: '',
      render: (_: any, item: any) => (
        <div className="flex items-center gap-2 justify-end">
          <Link href={`/admin/visits/${item.id}`} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold hover:bg-purple-500 hover:text-white transition-colors">
            View
          </Link>
          <button onClick={() => setEditingVisit(item)} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors">
            Edit
          </button>
          <button onClick={() => handleDelete(item.id, item.sessionNumber)} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <PageHeader 
        title="Scheduled Visits"
        description="Monitor official school visits and track session completion."
        action={
          <Link href="/admin/visits/create" className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-500 text-white rounded-2xl font-black text-sm hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.3)] transition-all duration-500 w-fit">
            <Plus className="w-5 h-5" />
            Schedule Visit
          </Link>
        }
      />

      <div className="glass-panel rounded-[2.5rem] p-4 border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 mb-2">
          <h3 className="font-syne font-black text-xl">Visit Roster</h3>
        </div>
        <DataTable columns={columns} data={visits} loading={loading} />
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingVisit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingVisit(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-lg p-8 rounded-[2.5rem] border-white/10 relative z-10"
            >
              <h3 className="text-2xl font-syne font-black mb-2">Edit Visit Schedule</h3>
              <p className="text-text-dim text-sm mb-8 font-medium">
                {editingVisit.school?.name} • Session {editingVisit.sessionNumber}
              </p>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">Session No.</label>
                    <input 
                      type="number" 
                      value={editingVisit.sessionNumber}
                      onChange={e => setEditingVisit({...editingVisit, sessionNumber: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">Status</label>
                    <select 
                      value={editingVisit.status || 'ASSIGNED'}
                      onChange={e => setEditingVisit({...editingVisit, status: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all [color-scheme:dark]"
                    >
                      <option value="ASSIGNED">Assigned</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="SUBMITTED">Submitted</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-dim">Assign Trainer</label>
                  <select 
                    value={editingVisit.trainerId || ''}
                    onChange={e => setEditingVisit({...editingVisit, trainerId: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all [color-scheme:dark]"
                  >
                    <option value="">Unassigned</option>
                    {trainers.map((t: any) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-dim">Date of Visit</label>
                  <input 
                    type="date" 
                    value={new Date(editingVisit.date).toISOString().split('T')[0]}
                    onChange={e => setEditingVisit({...editingVisit, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-purple-500 transition-all [color-scheme:dark]"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setEditingVisit(null)}
                    className="flex-1 py-4 rounded-xl border border-white/10 text-text-dim font-bold text-sm hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 py-4 bg-purple-500 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    {updateLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Schedule'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
