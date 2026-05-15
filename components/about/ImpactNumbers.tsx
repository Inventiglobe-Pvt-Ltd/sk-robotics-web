'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import CountUp from '@/components/ui/CountUp';

const STATS = [
  { value: 50, suffix: '+', label: 'Schools Partnered' },
  { value: 10000, suffix: '+', label: 'Students Impacted' },
  { value: 4, suffix: '', label: 'Specialized Labs' },
  { value: 200, suffix: '+', label: 'Content Modules' },
];

export default function ImpactNumbers() {
  return (
    <section className="bg-bg-black section-spacing border-y border-border-subtle relative z-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 items-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="relative group text-center lg:px-12"
              >
                {/* Vertical Divider */}
                {i > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-border-medium" />
                )}
                
                <div className="flex flex-col">
                  <div className="flex items-baseline justify-center">
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      className="font-syne font-extrabold text-5xl md:text-6xl text-text-primary tracking-tighter"
                    />
                  </div>
                  <p className="label-caps text-text-muted mt-4 text-[0.75rem]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
