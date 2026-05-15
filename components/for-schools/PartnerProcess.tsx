'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const STEPS = [
  {
    day: 'Phase 01',
    title: 'Initial Consultation',
    body: 'We respond to your inquiry within 4 hours to schedule a diagnostic school visit.',
  },
  {
    day: 'Phase 02',
    title: 'Site Assessment',
    body: "Our specialist audits your space, student demographics, and infrastructure — completely free.",
  },
  {
    day: 'Phase 03',
    title: 'Strategic Planning',
    body: 'A customized proposal covering lab layout, program selection, and investment roadmap.',
  },
  {
    day: 'Phase 04',
    title: 'Lab Deployment',
    body: 'Technical installation and teacher certification. We ensure Day 1 readiness.',
  },
  {
    day: 'Phase 05',
    title: 'Active Lifecycle',
    body: 'Continuous trainer support and annual curriculum updates to keep the lab future-proof.',
  },
];

export default function PartnerProcess() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="ADOPTION ROADMAP"
          title="The Path to a <em>Smart School</em>"
          subtitle="A transparent, high-touch partnership model from initial audit to active student learning."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line with gradient */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-16 md:space-y-24"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 md:ml-[-12px] w-6 h-6 rounded-full bg-bg-black border-2 border-gold z-20 shadow-[0_0_15px_rgba(245,197,24,0.4)]" />

                {/* Content Side */}
                <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="label-caps text-gold text-[0.7rem] mb-2 block">
                    {step.day}
                  </span>
                  <h3 className="heading-card mb-4">{step.title}</h3>
                  <p className="body-base text-text-muted max-w-md ml-auto mr-0">
                    {step.body}
                  </p>
                </div>

                {/* Empty Side for balance */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
