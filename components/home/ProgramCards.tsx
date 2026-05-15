'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { 
  Monitor, 
  Smartphone, 
  Cpu, 
  Settings, 
  ArrowUpRight 
} from 'lucide-react';

const PROGRAMS = [
  {
    icon: Monitor,
    title: 'VR Science Lab',
    body: "Immersive 3D experiences that turn abstract textbook concepts into unforgettable learning moments. Students explore biology, physics and geography from the inside out.",
    tags: ['Biology', 'Physics', 'Geography'],
    link: '/programs#vr-science',
  },
  {
    icon: Smartphone,
    title: 'AR Learning Station',
    body: 'Overlaying digital content on the real world. Interact with complex 3D models and simulations using just a tablet or phone, right on the classroom desk.',
    tags: ['Chemistry', 'Engineering', 'Math'],
    link: '/programs#ar-learning',
  },
  {
    icon: Cpu,
    title: 'AI & Computer Science',
    body: "Comprehensive curriculum from foundational block coding to advanced Python and machine learning. Preparing students for the intelligence-driven future.",
    tags: ['Coding', 'AI Basics', 'Data Science'],
    link: '/programs#ai-cs',
  },
  {
    icon: Settings,
    title: 'Robotics Lab',
    body: 'State-of-the-art robotics kits for building, programming, and competing. Students learn real-world engineering logic through hands-on creation.',
    tags: ['STEM', 'Electronics', 'Logic'],
    link: '/programs#robotics',
  },
];

export default function ProgramCards() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="OUR PROGRAMS"
          title="Everything Schools Need to <em>Lead Tomorrow</em>"
          subtitle="Four complete lab programs — designed for Indian school budgets, curriculum standards, and classroom realities."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {PROGRAMS.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div key={program.title} variants={fadeUp}>
                <Link href={program.link} className="block h-full group">
                  <Card className="h-full flex flex-col">
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-2xl bg-bg-surface-2 border border-border-medium flex items-center justify-center mb-10 group-hover:border-gold/30 transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon className="w-8 h-8 text-gold relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="heading-card group-hover:text-gold transition-colors duration-300">
                          {program.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-text-dim group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                      <p className="body-base text-text-muted mb-10 line-clamp-3 leading-relaxed">
                        {program.body}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-8 border-t border-border-subtle">
                      {program.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.65rem] font-jakarta font-extrabold uppercase tracking-widest text-text-dim px-4 py-1.5 bg-bg-surface-2 rounded-lg border border-border-subtle group-hover:border-gold/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
