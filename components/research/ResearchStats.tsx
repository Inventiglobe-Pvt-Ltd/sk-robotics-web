'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import CountUp from '@/components/ui/CountUp';
import Card from '@/components/ui/Card';
import { BookOpen, Eye, Zap } from 'lucide-react';

const STATS = [
  {
    icon: BookOpen,
    value: 20,
    suffix: '%',
    label: 'Retention through Reading',
    description: 'Traditional text-based learning relies on passive memorization.',
    color: 'text-text-dim'
  },
  {
    icon: Eye,
    value: 30,
    suffix: '%',
    label: 'Retention through Seeing',
    description: 'Visual aids improve engagement but still lack deep interaction.',
    color: 'text-blue-400'
  },
  {
    icon: Zap,
    value: 90,
    suffix: '%',
    label: 'Retention through Immersion',
    description: 'Immersive VR/AR experiences create lasting neurological connections.',
    color: 'text-gold',
    highlight: true
  }
];

export default function ResearchStats() {
  return (
    <section className="bg-bg-black section-spacing relative">
      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {STATS.map((stat, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className={`h-full border-white/5 ${stat.highlight ? 'bg-gold/5 border-gold/20' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${stat.highlight ? 'bg-gold/20' : 'bg-white/5'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                
                <div className="mb-6">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    className={`text-6xl font-syne font-extrabold tracking-tighter ${stat.color}`} 
                  />
                </div>
                
                <h3 className="text-xl font-syne font-bold text-text-primary mb-4">{stat.label}</h3>
                <p className="body-base text-text-muted">{stat.description}</p>
                
                {stat.highlight && (
                  <div className="mt-8 pt-8 border-t border-gold/10">
                    <p className="text-[0.7rem] uppercase tracking-widest font-bold text-gold">The SK Robotics Advantage</p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
