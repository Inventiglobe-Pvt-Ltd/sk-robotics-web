'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

const PHYSICAL = [
  'Lab equipment installed and configured',
  'Branded lab space design (no civil work)',
  'Student and teacher VR headsets / tablets',
  'Content server / offline data access',
  'Operational manuals & safety guides',
];

const SERVICES = [
  'Weekly or bi-weekly expert trainer visits',
  'Monthly content and curriculum updates',
  'Parent demo day & community support',
  'WhatsApp/phone support 6 days a week',
  'Annual maintenance & hardware audits',
];

export default function WhatSchoolsGet() {
  return (
    <section className="bg-bg-black section-spacing relative">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="VALUE PROPOSITION"
          title="What Your School <em>Gets</em>"
          subtitle="A complete turnkey solution including hardware, software, curriculum, and ongoing expert support."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Physical Deliverables */}
          <motion.div variants={fadeUp}>
            <Card className="h-full border-white/5 bg-white/[0.02] p-8 md:p-12">
              <h3 className="heading-card mb-8 flex items-center gap-3">
                <span className="text-gold">📦</span> Physical Infrastructure
              </h3>
              <ul className="space-y-4">
                {PHYSICAL.map((item) => (
                  <li key={item} className="flex items-start gap-4 body-base">
                    <span className="text-gold mt-1.5 shrink-0 text-xs">✦</span>
                    <span className="text-text-secondary font-medium tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Ongoing Services */}
          <motion.div variants={fadeUp}>
            <Card className="h-full border-white/5 bg-white/[0.02] p-8 md:p-12">
              <h3 className="heading-card mb-8 flex items-center gap-3">
                <span className="text-gold">🔄</span> Managed Services
              </h3>
              <ul className="space-y-4">
                {SERVICES.map((item) => (
                  <li key={item} className="flex items-start gap-4 body-base">
                    <span className="text-gold mt-1.5 shrink-0 text-xs">✦</span>
                    <span className="text-text-secondary font-medium tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
