'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Button from '@/components/ui/Button';
import { ArrowRight, FileText } from 'lucide-react';

export default function ResearchCTA() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative rounded-[3.5rem] bg-gradient-to-br from-bg-surface-2 to-bg-black border border-white/5 p-16 md:p-24 text-center overflow-hidden"
        >
          {/* Cinematic Background Decoration */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                <FileText className="w-8 h-8" />
              </div>
            </motion.div>

            <h2 className="heading-section mb-10 max-w-4xl mx-auto">
              Ready to Transform Your <span className="text-gold">Educational Ecosystem?</span>
            </h2>

            <p className="body-large mx-auto mb-16 text-text-secondary opacity-80">
              Partner with SK Robotics to implement evidence-based immersive learning labs. Let's build the future of education together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button href="/contact" size="lg" variant="primary" className="group">
                Partner With Us <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/programs" size="lg" variant="outline">
                Explore Programs
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
