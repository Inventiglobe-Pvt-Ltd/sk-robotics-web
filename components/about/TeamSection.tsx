'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Button from '@/components/ui/Button';

export default function TeamSection() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="heading-section mb-6">
            Ready to Lead the <br /> <span className="text-gold">Education Revolution?</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="body-large text-text-secondary mb-12 max-w-2xl mx-auto">
            Join the 50+ visionary principals in Hyderabad who have already transformed 
            their schools into world-class immersive learning hubs.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-wrap gap-6 justify-center">
            <Button href="/contact" size="lg" variant="primary">
              Book a Free Demo Visit
            </Button>
            <Button href="tel:+918501924576" size="lg" variant="secondary">
              Speak to a Specialist
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
