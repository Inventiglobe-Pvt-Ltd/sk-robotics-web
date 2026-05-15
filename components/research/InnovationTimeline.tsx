'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const STAGES = [
  {
    year: 'Phase 01',
    title: 'Traditional Learning',
    description: 'Passive reception of information through textbooks and lectures. 20% retention rate.',
    status: 'Legacy'
  },
  {
    year: 'Phase 02',
    title: 'Interactive Digital',
    description: 'Introduction of computers and basic digital content. Improved engagement but still screen-bound.',
    status: 'Transition'
  },
  {
    year: 'Phase 03',
    title: 'Immersive VR/AR',
    description: 'Hands-on experiential learning in 3D. 90% retention rate and high emotional engagement.',
    status: 'Current'
  },
  {
    year: 'Phase 04',
    title: 'AI-Powered Education',
    description: 'Personalized AI mentors and dynamic robotics labs that adapt to individual student pace.',
    status: 'Emerging'
  },
  {
    year: 'Phase 05',
    title: 'Smart Hub Classrooms',
    description: 'Fully integrated ecosystems where physical and digital boundaries disappear for total immersion.',
    status: 'Future'
  }
];

export default function InnovationTimeline() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="THE EVOLUTION"
          title="Mapping the <em>Educational Frontier</em>"
          subtitle="Our research timeline follows the transition from passive classroom observation to active technological immersion."
        />

        <div className="mt-24 relative">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-medium to-transparent hidden lg:block" />
          
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
          >
            {STAGES.map((stage, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                {/* Connector Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-bg-black border-2 border-border-medium z-10 hidden lg:flex items-center justify-center group-hover:border-gold group-hover:scale-125 transition-all duration-500">
                   <div className="w-1 h-1 rounded-full bg-transparent group-hover:bg-gold transition-colors" />
                </div>

                <div className="flex flex-col gap-6 text-center lg:pt-16">
                  <span className="label-caps text-[0.6rem] text-gold/60">{stage.year}</span>
                  <div>
                    <h3 className="text-lg font-syne font-extrabold text-text-primary mb-3 group-hover:text-gold transition-colors duration-300">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed max-w-[200px] mx-auto">
                      {stage.description}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[0.55rem] font-bold uppercase tracking-widest text-text-dim">
                      {stage.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
