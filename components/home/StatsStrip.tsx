'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import CountUp from '@/components/ui/CountUp';

const STATS = [
  { value: 50, suffix: '+', label: 'Schools' },
  { value: 10000, suffix: '+', label: 'Students' },
  { value: 400, suffix: '+', label: 'Simulations' },
  { value: 100, suffix: '%', label: 'Curriculum' },
];

export default function StatsStrip() {
  return (
    <section className="bg-bg-black border-y border-border-medium relative z-20 overflow-hidden">
      {/* Premium Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="py-[120px] px-6 md:px-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-16 sm:gap-x-8 xl:gap-x-0 items-center justify-between">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="relative group flex flex-col items-center xl:items-start xl:px-12 first:pl-0 last:pr-0"
              >
                {/* Vertical Divider (Desktop Only) */}
                {i > 0 && (
                  <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-border-strong to-transparent opacity-40" />
                )}
                
                <div className="flex flex-col gap-4 text-center xl:text-left min-w-0 w-full">
                  <div className="flex items-baseline justify-center xl:justify-start overflow-hidden">
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      className="font-syne font-extrabold text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] text-text-primary tracking-[-0.04em] whitespace-nowrap"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-jakarta text-[0.8rem] md:text-[0.95rem] uppercase tracking-[0.25em] font-extrabold text-gold/90 truncate">
                      {stat.label}
                    </p>
                    <div className="mt-2 h-0.5 w-10 bg-gold/20 group-hover:w-full transition-all duration-700 mx-auto xl:mx-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
