'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, stagger, fadeIn } from '@/lib/motion';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-black pt-28 pb-20"
    >
      {/* Background Cinematic Lighting */}
      <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[70%] bg-gold/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-gold/3 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-20 pointer-events-none" />

      <div className="section-container w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left: Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="gold" dot className="mb-10">
                <Sparkles className="w-3 h-3 mr-1" />
                Hyderabad's Premier EdTech Partner
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="heading-hero mb-10"
            >
              The Future of <br />
              <span className="text-gold-gradient">Education</span> is <br />
              Now Immersive
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="body-large mb-12 text-text-secondary leading-relaxed"
            >
              Transforming K-12 classrooms into hubs of innovation. 
              We install world-class VR, AR, and Robotics labs that empower 
              students to visualize the invisible and create the impossible.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-6 mb-16"
            >
              <Button href="/contact" size="lg" variant="primary">
                Book a Free Demo <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/programs" variant="secondary" size="lg">
                Explore Programs
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-10 border-t border-border-medium pt-10"
            >
              {[
                { label: 'Partner Schools', value: '50+' },
                { label: 'Students Taught', value: '10k+' },
                { label: 'VR Simulations', value: '200+' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-syne font-extrabold text-3xl text-text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-text-dim text-[0.7rem] uppercase font-bold tracking-[0.2em] mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Immersive Visual Showcase */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            style={{ y: y2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Main Visual Container */}
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-border-strong bg-bg-surface-2 shadow-2xl">
                <Image
                  src="/images/hero-vr.png"
                  alt="Student using VR Headset"
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-black via-transparent to-transparent opacity-60" />

                {/* Floating UI Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 glass-panel py-3 px-5 rounded-2xl flex items-center gap-3 border-gold/20"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[0.8rem] font-bold tracking-tight text-white">Curriculum Aligned</span>
                </motion.div>

                <div className="absolute bottom-10 left-10 right-10">
                  <div className="glass-panel p-6 rounded-3xl border-white/10 backdrop-blur-3xl">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-bg-black">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gold uppercase tracking-widest">Live Preview</p>
                        <p className="text-sm font-syne font-bold text-white">Cell Biology Immersion</p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-gold shadow-[0_0_10px_rgba(245,197,24,0.5)]" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Card */}
              <motion.div
                style={{ y: y1 }}
                className="absolute -bottom-10 -right-10 hidden xl:block glass-panel p-8 rounded-3xl border-gold/30 shadow-2xl z-20"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-surface-2 bg-bg-surface-3" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-bg-surface-2 bg-gold flex items-center justify-center text-[0.7rem] font-bold text-bg-black">
                      +50
                    </div>
                  </div>
                  <p className="text-[0.8rem] font-bold text-text-secondary">
                    Trusted by <span className="text-white">Top Schools</span> in India
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
