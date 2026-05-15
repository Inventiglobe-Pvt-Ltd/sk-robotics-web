'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

const VALUES = [
  {
    icon: '🌍',
    title: 'Access for All',
    body: "Quality EdTech shouldn't be exclusive to elite schools. We design for every budget.",
  },
  {
    icon: '🤲',
    title: 'Hands-on Learning',
    body: 'We believe in learning by doing. Immersive experiences turn concepts into reality.',
  },
  {
    icon: '👩‍🏫',
    title: 'Teacher Power',
    body: 'Technology amplifies great educators. We provide the tools and training to lead.',
  },
  {
    icon: '📘',
    title: 'Curriculum First',
    body: "We don't sell novelty. Everything we build is mapped to core learning standards.",
  },
  {
    icon: '🏙️',
    title: 'Local Roots',
    body: "Based in Hyderabad, we understand the unique infrastructure of Indian classrooms.",
  },
  {
    icon: '🤝',
    title: 'Life Partnership',
    body: "We don't just install labs. We provide ongoing support, training, and updates.",
  },
];

export default function ValuesGrid() {
  return (
    <section className="bg-bg-black section-spacing relative">
      <div className="section-container relative z-10">
        <SectionHeader
          badge="OUR VALUES"
          title="The Principles That <em>Drive Us</em>"
          subtitle="How we maintain excellence and integrity while scaling immersive technology to every classroom."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {VALUES.map((value) => (
            <motion.div key={value.title} variants={fadeUp}>
              <Card className="h-full group">
                <div className="w-12 h-12 rounded-xl bg-bg-surface-2 border border-border-medium flex items-center justify-center text-2xl mb-6 group-hover:border-gold/30 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="heading-card mb-4">{value.title}</h3>
                <p className="body-base text-text-muted">{value.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
