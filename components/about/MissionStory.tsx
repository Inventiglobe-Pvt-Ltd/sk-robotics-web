'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Card from '@/components/ui/Card';

export default function MissionStory() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Mission Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <Card variant="featured" className="p-8 lg:p-12 border-gold/20 bg-gold/[0.02]">
              <h2 className="heading-card text-gold mb-6 uppercase tracking-wider">Our Mission</h2>
              <p className="body-large text-text-primary leading-tight">
                To democratize access to immersive STEM education by equipping
                every school with VR, AR, AI, and Robotics labs that are 
                curriculum-aligned and built for the Indian classroom.
              </p>
            </Card>
          </motion.div>

          {/* Story Side */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7"
          >
            <motion.h2 variants={fadeUp} className="heading-section mb-8">
              Born to <em>Transform</em>
            </motion.h2>

            <div className="space-y-6">
              <motion.p variants={fadeUp} className="body-large text-text-secondary">
                SK Robotics & VR Science Labs emerged from a simple observation in Hyderabad: 
                while the world was racing ahead, students were still being taught with methods 
                from a century ago.
              </motion.p>

              <motion.p variants={fadeUp} className="body-large text-text-secondary">
                We saw firsthand how a single VR headset could turn a disengaged student 
                into a passionate explorer. That spark ignited our mission to scale 
                this transformation to every school in India.
              </motion.p>

              <motion.p variants={fadeUp} className="body-large text-text-secondary">
                Today, we partner with over 50 schools, impacting thousands of students 
                daily through hands-on, future-critical technology.
              </motion.p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
