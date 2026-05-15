'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { 
  BookOpen, 
  Settings2, 
  IndianRupee, 
  Users2, 
  Zap, 
  LifeBuoy 
} from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Curriculum Aligned',
    body: "Content precisely mapped to CBSE, ICSE, and State Board syllabi. We enhance your lesson plans, not replace them.",
  },
  {
    icon: Settings2,
    title: 'Zero IT Burden',
    body: 'We handle all hardware maintenance and software updates. No technical expertise required from school staff.',
  },
  {
    icon: IndianRupee,
    title: 'Budget Friendly',
    body: "Flexible payment plans and low-cost EMI options ensure every school can afford futuristic infrastructure.",
  },
  {
    icon: Users2,
    title: 'Expert Trainers',
    body: "Qualified EdTech trainers visit regularly to run sessions and upskill your existing teaching staff.",
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    body: 'From agreement to launch in under 10 days. No major infrastructure changes or renovations needed.',
  },
  {
    icon: LifeBuoy,
    title: 'Lifecycle Support',
    body: 'Continuous on-site and remote support. Annual content updates keep your lab fresh and relevant.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-bg-black section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="WHY SK ROBOTICS"
          title="Built for <em>Indian Schools</em>"
          subtitle="Designed with local infrastructure, budget realities, and specific board curriculum standards in mind."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card className="h-full group">
                  <div className="w-14 h-14 rounded-2xl bg-bg-surface-2 border border-border-medium flex items-center justify-center mb-8 group-hover:border-gold/30 group-hover:bg-bg-surface-3 transition-all duration-500">
                    <Icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="heading-card mb-4 group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="body-base text-text-muted leading-relaxed">
                    {feature.body}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
