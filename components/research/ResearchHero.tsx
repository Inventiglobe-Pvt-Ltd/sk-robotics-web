'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { Beaker, Sparkles } from 'lucide-react';

export default function ResearchHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
        {/* Cinematic Grid */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <span className="label-caps bg-white/5 border border-white/10 px-6 py-2 rounded-full flex items-center gap-2">
              <Beaker className="w-4 h-4 text-gold" />
              Evidence-Based Innovation
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="heading-hero mb-8"
          >
            Research-Driven <span className="text-gold-gradient">Innovation</span> in Education
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="body-large mx-auto mb-12 text-text-secondary"
          >
            Transforming traditional classrooms into immersive future-ready learning environments through Robotics, VR, AI, and STEM education.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-black bg-bg-surface-2 flex items-center justify-center text-[0.6rem] font-bold text-gold">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-dim font-medium tracking-tight">
              Trusted by <span className="text-text-primary">50+ Institutions</span> across India
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-text-dim">Discover the Impact</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
