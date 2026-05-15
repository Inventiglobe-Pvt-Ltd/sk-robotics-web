'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Box, Globe, Cpu, Microscope } from 'lucide-react';

const FEATURES = [
  {
    icon: Microscope,
    title: 'Visualizing the Microscopic',
    description: 'Travel inside a human cell or explore the atomic structure of elements with breathtaking 3D detail.',
  },
  {
    icon: Globe,
    title: 'Global Field Trips',
    description: 'Visit the Great Wall of China or the depths of the Mariana Trench without leaving the classroom.',
  },
  {
    icon: Cpu,
    title: 'Future-Ready AI',
    description: 'Understand machine learning and neural networks through interactive visual simulations.',
  },
];

export default function ImmersiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="IMMERSIVE EXPERIENCE"
          title="Learning That Feels <em>Like Magic</em>"
          subtitle="Our VR/AR labs don't just teach science; they allow students to experience it. Higher engagement leads to 4x faster learning retention."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Interactive Visual */}
          <motion.div 
            style={{ scale, opacity }}
            className="relative aspect-square rounded-[3rem] glass-panel border-gold/20 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--bg-surface-2),transparent)] opacity-50" />
            
            {/* Animated 3D-like Box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  rotateX: [10, -10, 10],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-64 h-64 relative preserve-3d"
              >
                <div className="absolute inset-0 bg-gold/10 border-2 border-gold/40 rounded-3xl backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(245,197,24,0.2)]">
                  <Box className="w-32 h-32 text-gold opacity-80" />
                </div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -40, 0],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3 + i, 
                      repeat: Infinity, 
                      delay: i * 0.5 
                    }}
                    className="absolute w-2 h-2 bg-gold rounded-full blur-[2px]"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <div className="absolute bottom-12 left-12 right-12 text-center">
              <p className="font-syne font-bold text-2xl mb-2">The SK Virtual Hub</p>
              <p className="text-sm text-text-muted">A library of 200+ curriculum-aligned modules</p>
            </div>
          </motion.div>

          {/* Right: Features List */}
          <div className="flex flex-col gap-12">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group flex gap-8"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-bg-surface-2 border border-border-medium flex items-center justify-center group-hover:border-gold/40 transition-colors duration-500">
                  <feature.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-xl mb-3 group-hover:text-gold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
