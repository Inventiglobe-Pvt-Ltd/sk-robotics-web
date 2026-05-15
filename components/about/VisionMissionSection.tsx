'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { Target, Lightbulb, Rocket, CheckCircle2 } from 'lucide-react';

const MISSION_POINTS = [
  'Delivering immersive VR and Robotics learning experiences',
  'Making complex concepts easy to understand through interactive education',
  'Encouraging innovation, creativity, and critical thinking',
  'Building future technology skills at an early stage',
  'Supporting schools with modern STEM learning ecosystems',
  'Preparing students for AI-driven careers and industries',
];

export default function VisionMissionSection() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Vision Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="h-full group hover:border-gold/30 transition-all duration-700">
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-10 group-hover:bg-gold/20 transition-colors">
                  <Lightbulb className="w-8 h-8 text-gold" />
                </div>
                
                <h2 className="heading-section mb-8">Our <span className="text-gold">Vision</span></h2>
                
                <p className="body-base text-text-secondary mb-8 leading-relaxed">
                  To revolutionize education through immersive technologies that prepare students for the future of innovation, creativity, and intelligent problem-solving.
                </p>
                
                <p className="body-base text-text-muted leading-relaxed">
                  We envision a world where every student experiences learning beyond textbooks through Virtual Reality (VR), Artificial Intelligence (AI), Robotics, and hands-on STEM education. Our goal is to bridge the gap between traditional education and future technology.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:mt-24"
          >
            <Card className="h-full group hover:border-blue-500/30 transition-all duration-700">
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-10 group-hover:bg-blue-500/20 transition-colors">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                
                <h2 className="heading-section mb-8">Our <span className="text-blue-400">Mission</span></h2>
                
                <div className="space-y-6">
                  {MISSION_POINTS.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <p className="body-base text-text-secondary">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
