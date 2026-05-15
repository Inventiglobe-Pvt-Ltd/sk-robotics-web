'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export default function StatsCard({ label, value, icon: Icon, trend, trendType, color = 'gold' }: StatsCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-panel p-6 rounded-3xl border-white/5 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-${color}/10 text-${color} border border-${color}/20 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-[0.65rem] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
            trendType === 'up' ? 'bg-green-500/10 text-green-400' : 
            trendType === 'down' ? 'bg-red-500/10 text-red-400' : 
            'bg-white/10 text-text-dim'
          }`}>
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-text-dim mb-1">{label}</p>
        <h3 className="text-3xl font-syne font-black text-text-primary tracking-tight">{value}</h3>
      </div>

      {/* Decorative Glow */}
      <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-${color}/5 blur-2xl rounded-full group-hover:bg-${color}/10 transition-all duration-500`} />
    </motion.div>
  );
}
