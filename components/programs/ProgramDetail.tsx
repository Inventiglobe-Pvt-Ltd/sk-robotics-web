'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { ProgramData } from '@/types';

interface ProgramDetailProps {
  program: ProgramData;
  index: number;
}

export default function ProgramDetail({ program, index }: ProgramDetailProps) {
  const isReversed = index % 2 === 1;

  return (
    <section
      id={program.id}
      className={`section-spacing relative ${index % 2 === 0 ? 'bg-bg-black' : 'bg-bg-surface-2'}`}
    >
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass-panel flex items-center justify-center">
              <div className="text-center p-12">
                <div className="text-[6rem] mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {program.icon}
                </div>
                <h3 className="heading-card mb-4">{program.title}</h3>
                <p className="body-base text-text-muted">
                  Interactive curriculum content library and hardware kit.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="gold" className="mb-8">{program.badge}</Badge>
            </motion.div>

            <motion.h2 variants={fadeUp} className="heading-section mb-8">
              {program.title}
            </motion.h2>

            <motion.p variants={fadeUp} className="body-large mb-10 whitespace-pre-line text-text-secondary">
              {program.description}
            </motion.p>

            {/* Feature List Grid */}
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
              {program.features.map((feature) => (
                <motion.div
                  key={feature}
                  variants={fadeUp}
                  className="flex items-start gap-3 body-base"
                >
                  <span className="text-gold mt-1 shrink-0 text-sm">✦</span>
                  <span className="text-text-secondary">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Equipment Card */}
            <motion.div variants={fadeUp}>
              <Card variant="glass" className="p-6 border-white/5 bg-white/[0.02]">
                <h4 className="label-caps mb-3 text-text-dim">Equipment Includes</h4>
                <p className="body-base text-text-secondary font-medium tracking-tight">
                  {program.equipment}
                </p>
              </Card>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
