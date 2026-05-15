'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import DataTable from '@/components/dashboard/DataTable';
import PageHeader from '@/components/dashboard/PageHeader';
import { Plus, Users, Mail, Phone, MoreHorizontal, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await fetch('/api/trainers');
      const data = await res.json();
      setTrainers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch trainers:', err);
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  const [editingTrainer, setEditingTrainer] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete Trainer ${name}? This action cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/trainers?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTrainers();
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
      const res = await fetch(`/api/trainers?id=${editingTrainer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingTrainer.name,
          email: editingTrainer.email,
          phone: editingTrainer.phone
        })
      });
      if (res.ok) {
        setEditingTrainer(null);
        fetchTrainers();
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
      key: 'name', 
      label: 'Trainer Profile',
      render: (val: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-bg-black flex items-center justify-center">
              <span className="text-xs font-black text-white">{val.substring(0, 2).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <p className="font-bold text-text-primary leading-tight">{val}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-text-dim mt-1 font-black">
              Joined {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Contact',
      render: (val: string, item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-text-muted">
            <Mail className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold truncate max-w-[150px]">{val}</span>
          </div>
          {item.phone && (
            <div className="flex items-center gap-2 text-text-muted">
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{item.phone}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_: any, item: any) => (
        <div className="flex items-center gap-2 justify-end">
          <Link href={`/admin/trainers/${item.id}`} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors">
            View
          </Link>
          <button onClick={() => setEditingTrainer(item)} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors">
            Edit
          </button>
          <button onClick={() => handleDelete(item.id, item.name)} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <PageHeader 
        title="Trainer Network"
        description="Manage your VR lab instructors and monitor their field performance."
        action={
          <Link href="/admin/trainers/create" className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-sm hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] transition-all duration-500 w-fit">
            <Plus className="w-5 h-5" />
            Onboard Trainer
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-blue-400 mb-1">Active Roster</p>
            <h3 className="text-3xl font-syne font-black">{trainers.length} Trainers</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] p-4 border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 mb-2">
          <h3 className="font-syne font-black text-xl">Instructor Directory</h3>
        </div>
        <DataTable columns={columns} data={trainers} loading={loading} />
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingTrainer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingTrainer(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-lg p-8 rounded-[2.5rem] border-white/10 relative z-10"
            >
              <h3 className="text-2xl font-syne font-black mb-2">Edit Trainer Profile</h3>
              <p className="text-text-dim text-sm mb-8 font-medium">Update instructor contact details.</p>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-dim">Full Name</label>
                  <input 
                    type="text" 
                    value={editingTrainer.name}
                    onChange={e => setEditingTrainer({...editingTrainer, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-dim">Email Address</label>
                  <input 
                    type="email" 
                    value={editingTrainer.email}
                    onChange={e => setEditingTrainer({...editingTrainer, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-dim">Phone Number</label>
                  <input 
                    type="tel" 
                    value={editingTrainer.phone || ''}
                    onChange={e => setEditingTrainer({...editingTrainer, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setEditingTrainer(null)}
                    className="flex-1 py-4 rounded-xl border border-white/10 text-text-dim font-bold text-sm hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 py-4 bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    {updateLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
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
