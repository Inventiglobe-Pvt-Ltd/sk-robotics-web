'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import DataTable from '@/components/dashboard/DataTable';
import { Plus, School as SchoolIcon, Users, MapPin, MoreHorizontal, Loader2 } from 'lucide-react';
import Link from 'next/link';
import NoSSR from '@/components/ui/NoSSR';

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await fetch('/api/schools');
      const data = await res.json();
      setSchools(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch schools:', err);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const [editingSchool, setEditingSchool] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/schools?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSchools();
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/schools?id=${editingSchool.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingSchool.name,
          address: editingSchool.address,
          principalName: editingSchool.principalName,
          contactEmail: editingSchool.contactEmail,
          username: editingSchool.username,
          password: editingSchool.password,
          registrationDate: editingSchool.registrationDate
        })
      });
      if (res.ok) {
        setEditingSchool(null);
        fetchSchools();
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
      label: 'School Institution',
      render: (val: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
            <SchoolIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-text-primary leading-tight">{val}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-text-dim mt-1 font-black">
              {item.address || 'No location set'}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_: any, item: any) => (
        <div className="flex items-center gap-2 justify-end">
          <Link href={`/admin/schools/${item.id}`} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold hover:bg-gold hover:text-bg-black transition-colors">
            View
          </Link>
          <button onClick={() => setEditingSchool(item)} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors">
            Edit
          </button>
          <button 
            disabled={deletingId === item.id}
            onClick={() => handleDelete(item.id, item.name)} 
            className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            {deletingId === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Delete'}
          </button>
        </div>
      )
    }
  ];

  return (
    <NoSSR>
      <div className="space-y-8 pb-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-syne font-black text-text-primary tracking-tight">
                Educational Institutions
              </h1>
              <p className="text-text-dim mt-2 text-sm font-medium">
                Manage your network of partner schools and institutional learning centers.
              </p>
            </div>
            
            <Link href="/admin/schools/create" className="flex items-center justify-center gap-3 px-8 py-4 bg-gold text-bg-black rounded-2xl font-black text-sm hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(245,197,24,0.3)] transition-all duration-500 w-fit">
              <Plus className="w-5 h-5" />
              Register New Institution
            </Link>
          </div>

          {/* Stats Summary - Cleaned up and Clutter Free */}
          <div className="flex flex-wrap gap-6">
            <div className="glass-panel p-6 px-10 rounded-3xl border-white/5 bg-gradient-to-br from-gold/5 to-transparent min-w-[240px]">
              <p className="text-[0.65rem] uppercase font-black tracking-[0.2em] text-gold mb-1">Total Network</p>
              <h3 className="text-3xl font-syne font-black">{schools.length} Schools</h3>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="glass-panel rounded-[2.5rem] p-4 border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 mb-2">
              <h3 className="font-syne font-black text-xl">Institutional Roster</h3>
            </div>
            <DataTable columns={columns} data={schools} loading={loading} />
          </div>

          {/* Edit Modal */}
          <AnimatePresence>
            {editingSchool && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setEditingSchool(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glass-panel w-full max-w-lg p-8 rounded-[2.5rem] border-white/10 relative z-10"
                >
                  <h3 className="text-2xl font-syne font-black mb-2">Edit Institution</h3>
                  <p className="text-text-dim text-sm mb-8 font-medium">Modify school profile details.</p>

                  <form onSubmit={handleUpdate} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-dim">Institution Name</label>
                      <input 
                        type="text" 
                        value={editingSchool.name}
                        onChange={e => setEditingSchool({...editingSchool, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-dim">Address</label>
                      <input 
                        type="text" 
                        value={editingSchool.address || ''}
                        onChange={e => setEditingSchool({...editingSchool, address: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-dim">Principal</label>
                        <input 
                          type="text" 
                          value={editingSchool.principalName || ''}
                          onChange={e => setEditingSchool({...editingSchool, principalName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm font-bold focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-dim">Email</label>
                        <input 
                          type="email" 
                          value={editingSchool.contactEmail || ''}
                          onChange={e => setEditingSchool({...editingSchool, contactEmail: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm font-bold focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-dim">Reg. Date</label>
                        <input 
                          type="date" 
                          value={editingSchool.registrationDate ? new Date(editingSchool.registrationDate).toISOString().split('T')[0] : ''}
                          onChange={e => setEditingSchool({...editingSchool, registrationDate: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm font-bold focus:outline-none focus:border-gold transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gold">Username</label>
                        <input 
                          type="text" 
                          value={editingSchool.username || ''}
                          onChange={e => setEditingSchool({...editingSchool, username: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gold">Password</label>
                        <input 
                          type="text" 
                          value={editingSchool.password || ''}
                          onChange={e => setEditingSchool({...editingSchool, password: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button" 
                        onClick={() => setEditingSchool(null)}
                        className="flex-1 py-4 rounded-xl border border-white/10 text-text-dim font-bold text-sm hover:bg-white/5 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={updateLoading}
                        className="flex-1 py-4 bg-gold text-bg-black rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
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
      </div>
    </NoSSR>
  );
}
