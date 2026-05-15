'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';

export default function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span className="label-caps bg-white/5 border border-white/10 px-6 py-2 rounded-full">
              Our Story
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="heading-hero mb-8"
          >
            Transforming Education Through <span className="text-gold-gradient">Robotics & VR</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="body-large mx-auto mb-12 text-text-secondary"
          >
            Future-ready immersive learning experiences designed to inspire innovation, creativity, and technological excellence.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            <p className="text-[0.7rem] uppercase tracking-[0.3em] font-bold text-text-dim">
              Established 2024
            </p>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-black to-transparent z-10" />
    </section>
  );
}
