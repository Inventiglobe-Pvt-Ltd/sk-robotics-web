'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function SettingsPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
      <h1 className="text-3xl font-syne font-black text-text-primary">System Settings</h1>
      <div className="glass-panel p-8 rounded-3xl border-white/5">
        <p className="text-text-muted">Configure platform parameters, security, and integration options.</p>
        <div className="mt-8 p-12 border-2 border-dashed border-white/5 rounded-2xl text-center">
          <p className="text-text-dim">Settings configuration coming soon.</p>
        </div>
      </div>
    </motion.div>
  );
}
