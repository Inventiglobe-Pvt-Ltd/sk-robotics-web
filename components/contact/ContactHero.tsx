'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Badge from '@/components/ui/Badge';

export default function ContactHero() {
  return (
    <section className="relative bg-bg-black pt-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10 py-24 lg:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="gold" className="mb-8">CONTACT US</Badge>
          </motion.div>

          <motion.h1 variants={fadeUp} className="heading-hero mb-8">
            Let&apos;s Bring the Future <br />
            to <span className="text-gold">Your School</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="body-large mx-auto text-text-secondary">
            Fill out the form below and our education specialist will contact you 
            within 24 hours to schedule a free immersive lab demonstration.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
