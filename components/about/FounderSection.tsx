'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Image from 'next/image';

export default function FounderSection() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Portrait Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-border-medium group">
              {/* Background Glow within frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-black via-transparent to-transparent z-10 opacity-60" />
              
              {/* Placeholder for Founder Image */}
              <div className="w-full h-full bg-bg-surface-2 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.1),transparent)]" />
                <span className="font-syne font-extrabold text-white/10 text-3xl tracking-[0.2em] uppercase rotate-90">
                  Mr. Saikiran Goud
                </span>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <h4 className="text-3xl font-syne font-extrabold text-text-primary mb-2">Saikiran Goud</h4>
                <p className="label-caps text-gold/80 text-xs">CEO & Founder</p>
              </div>
            </div>
            
            {/* Out-of-frame decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 blur-[60px] rounded-full" />
          </motion.div>

          {/* Quote Side */}
          <div className="flex flex-col gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="label-caps mb-8 block">Founder's Message</span>
              
              <blockquote className="relative">
                {/* Large Quotation Mark */}
                <span className="absolute -top-16 -left-12 text-[12rem] font-syne font-extrabold text-gold/10 select-none">“</span>
                
                <p className="text-3xl md:text-4xl lg:text-5xl font-syne font-extrabold text-text-primary leading-[1.1] tracking-tight relative z-10 italic">
                  At SK Robotics & VR Science Labs, we believe education should inspire <span className="text-gold">curiosity</span>, creativity, and innovation.
                </p>
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="body-large text-text-secondary">
                Through Robotics, Virtual Reality, and Artificial Intelligence, we are creating immersive learning experiences that prepare students for the future.
              </p>
              
              <div className="h-px w-24 bg-gold/50 shadow-[0_0_10px_rgba(245,197,24,0.5)]" />
              
              <div>
                <p className="text-xl font-syne font-bold text-text-primary">SK Robotics & VR Science Labs</p>
                <p className="text-sm text-text-dim uppercase tracking-[0.2em] font-extrabold mt-1">Leading Future-Tech Education</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
