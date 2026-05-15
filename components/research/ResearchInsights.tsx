'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Focus, Brain, Users, Lightbulb } from 'lucide-react';

const INSIGHTS = [
  {
    icon: Focus,
    title: '4x Faster Training',
    description: 'Immersive VR allows students to train up to 4 times faster than in a traditional classroom setting.',
    color: 'text-blue-400'
  },
  {
    icon: Brain,
    title: '275% More Confident',
    description: 'Students are significantly more confident in applying skills learned through immersive simulations.',
    color: 'text-gold'
  },
  {
    icon: Users,
    title: '4x More Focused',
    description: 'VR learners are 4 times more focused than their e-learning peers, with less cognitive load and distractions.',
    color: 'text-purple-400'
  },
  {
    icon: Lightbulb,
    title: '3.75x More Connected',
    description: 'Students feel more emotionally connected to the content when experienced in 3D immersive environments.',
    color: 'text-emerald-400'
  }
];

export default function ResearchInsights() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="section-container relative z-10">
        <SectionHeader
          badge="SCIENTIFIC INSIGHTS"
          title="The Cognitive Impact of <em>Immersive Technology</em>"
          subtitle="Research data consistently demonstrates that immersive environments lead to superior educational outcomes."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
        >
          {INSIGHTS.map((insight, i) => (
            <motion.div key={i} variants={fadeUp} className="group">
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-bg-surface border border-border-medium group-hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                
                <div className={`w-14 h-14 rounded-2xl bg-bg-surface-2 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <insight.icon className={`w-7 h-7 ${insight.color}`} />
                </div>
                
                <h3 className="text-xl font-syne font-extrabold text-text-primary group-hover:text-gold transition-colors duration-300">
                  {insight.title}
                </h3>
                
                <p className="body-base text-text-muted leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="mt-auto pt-6">
                  <div className={`h-1 w-12 rounded-full ${insight.color} opacity-40`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
