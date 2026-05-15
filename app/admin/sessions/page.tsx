'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function SessionsPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-syne font-black text-text-primary">VR Sessions</h1>
        <Link 
          href="/admin/sessions/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-bg-black font-bold text-sm hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Record New Session
        </Link>
      </div>
      <div className="glass-panel p-8 rounded-3xl border-white/5">
        <p className="text-text-muted">History of all VR educational sessions across the network.</p>
        <div className="mt-8 p-12 border-2 border-dashed border-white/5 rounded-2xl text-center">
          <p className="text-text-dim">Session history feed coming soon.</p>
        </div>
      </div>
    </motion.div>
  );
}
