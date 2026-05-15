'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const STEPS = [
  {
    number: '01',
    title: 'Consultation',
    body: 'Our education specialist schedules a free visit within 48 hours to assess your school’s unique curriculum needs and infrastructure.',
  },
  {
    number: '02',
    title: 'Lab Design',
    body: "We survey your space and budget to design a custom AR/VR lab. Our solutions are modular and require zero costly renovations.",
  },
  {
    number: '03',
    title: 'Deployment',
    body: 'Rapid installation within 7 days. We provide comprehensive teacher training and 30 days of high-touch onboarding support.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="THE PROCESS"
          title="From First Call to <em>Lab Launch</em>"
          subtitle="A streamlined 3-step deployment process designed for busy school administrators and educators."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative group"
            >
              <div className="flex flex-col">
                {/* Large Background Number */}
                <span className="font-syne font-extrabold text-[7rem] lg:text-[10rem] leading-none text-white/[0.02] absolute -top-12 lg:-top-24 -left-4 lg:-left-12 pointer-events-none group-hover:text-gold/[0.04] transition-colors duration-700">
                  {step.number}
                </span>

                <div className="relative z-10 pt-10">
                  {/* Decorative line with reveal animation */}
                  <div className="h-1 bg-border-strong mb-10 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      whileInView={{ x: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className="absolute inset-0 bg-gold w-16 group-hover:w-full transition-all duration-700" 
                    />
                  </div>
                  
                  <h3 className="heading-card mb-6 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="body-base text-text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
