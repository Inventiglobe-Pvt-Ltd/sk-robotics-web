'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HistorySection() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/grid.svg')] bg-repeat" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            badge="OUR JOURNEY"
            title="The Story of <em>Innovation</em>"
            align="left"
          />

          <div className="relative mt-20 pl-8 md:pl-16 border-l border-border-medium">
            {/* History Content Blocks */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-24"
            >
              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-0 w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_rgba(245,197,24,0.5)]" />
                <h3 className="text-2xl font-syne font-extrabold text-text-primary mb-6">Foundation & Vision</h3>
                <p className="body-large text-text-secondary leading-relaxed">
                  SK Robotics & VR Science Labs was founded with a vision to transform the way students learn and interact with technology. What began as a passion for robotics and immersive education evolved into a mission-driven initiative focused on bringing advanced STEM learning into schools.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-border-medium" />
                <h3 className="text-2xl font-syne font-extrabold text-text-primary mb-6">Solving the Gap</h3>
                <p className="body-large text-text-secondary leading-relaxed">
                  We recognized that traditional classroom methods often limit imagination and practical understanding. To solve this, we introduced hands-on Robotics, Virtual Reality (VR), Artificial Intelligence (AI), and interactive STEM programs that make learning engaging, memorable, and future-focused.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-[41px] md:-left-[73px] top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-border-medium" />
                <h3 className="text-2xl font-syne font-extrabold text-text-primary mb-6">Today & Beyond</h3>
                <p className="body-large text-text-secondary leading-relaxed">
                  Today, SK Robotics & VR Science Labs continues to collaborate with educational institutions to build innovation-driven learning environments that empower students with real-world technological skills.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
