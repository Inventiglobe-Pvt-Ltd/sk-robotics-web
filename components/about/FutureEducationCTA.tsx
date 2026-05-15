'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FutureEducationCTA() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-[100%] rotate-12" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[4rem] bg-gradient-to-b from-bg-surface-2 to-bg-black border border-white/5 p-12 md:p-24 text-center overflow-hidden relative group"
        >
          {/* Animated Particles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-10 left-10 text-gold/20 animate-pulse"><Sparkles className="w-8 h-8" /></div>
             <div className="absolute bottom-20 right-20 text-gold/20 animate-bounce"><Sparkles className="w-6 h-6" /></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <span className="label-caps px-8 py-3 bg-white/5 rounded-full border border-white/10">
              Join the Revolution
            </span>
          </motion.div>

          <h2 className="heading-section mb-10 max-w-4xl mx-auto">
            Ready to Build the <em>Future of Learning</em> Together?
          </h2>

          <p className="body-large mx-auto mb-16 text-text-secondary opacity-80">
            Partner with SK Robotics to bring world-class VR and AR technology to your classroom. Empower your students with the tools of tomorrow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
            <Button href="/contact" size="lg" variant="primary" className="group">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/programs" size="lg" variant="outline">
              Explore Programs
            </Button>
          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
      </div>
    </section>
  );
}
