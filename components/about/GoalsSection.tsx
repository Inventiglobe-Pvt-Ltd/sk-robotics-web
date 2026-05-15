'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import CountUp from '@/components/ui/CountUp';

const GOAL_STATS = [
  { value: 20, suffix: '%', label: 'Retention from Reading' },
  { value: 30, suffix: '%', label: 'Retention from Seeing' },
  { value: 90, suffix: '%', label: 'Retention from Immersive Experience', highlight: true },
];

const STRETCH_GOALS = [
  'Increase student engagement',
  'Improve concept understanding',
  'Enhance creativity and imagination',
  'Develop future technology skills',
  'Make education interactive and enjoyable',
];

export default function GoalsSection() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Cinematic Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="OUR GOAL"
          title="Transforming <em>Passive Education</em> into Experiential Learning"
          subtitle="Studies show that students remember significantly more when they experience concepts through immersive technology."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Stats Display */}
          <div className="lg:col-span-7 space-y-12">
            {GOAL_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-3xl border ${stat.highlight ? 'bg-gold/5 border-gold/30 shadow-[0_0_40px_rgba(245,197,24,0.1)]' : 'bg-bg-surface-2 border-border-medium'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`label-caps mb-2 ${stat.highlight ? 'text-gold' : 'text-text-dim'}`}>
                      {stat.highlight ? 'The SK Advantage' : 'Traditional Learning'}
                    </p>
                    <h3 className="text-xl md:text-2xl font-syne font-bold text-text-primary">
                      {stat.label}
                    </h3>
                  </div>
                  <div className="text-right">
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      className={`text-5xl md:text-6xl font-syne font-extrabold ${stat.highlight ? 'text-gold' : 'text-text-primary opacity-40'}`}
                    />
                  </div>
                </div>
                
                {/* Progress Bar placeholder */}
                <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className={`h-full ${stat.highlight ? 'bg-gold' : 'bg-text-dim opacity-40'}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <h3 className="text-3xl font-syne font-extrabold text-text-primary leading-tight">
              Striving for Excellence in <span className="text-gold">Every Lab</span>
            </h3>
            
            <p className="body-base text-text-secondary">
              By combining technology with practical learning experiences, we help students become active learners, innovators, and future leaders.
            </p>

            <ul className="space-y-6">
              {STRETCH_GOALS.map((goal, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 text-text-secondary font-medium"
                >
                  <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(245,197,24,0.8)]" />
                  {goal}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
