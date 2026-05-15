'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const CTA_CARDS = [
  {
    icon: '🚀',
    title: 'Book Free Demo',
    body: 'Schedule a 30-min presentation at your school. No obligation.',
    buttonText: 'Get Started',
    buttonVariant: 'primary' as const,
    href: '/contact',
    recommended: true,
  },
  {
    icon: '📱',
    title: 'Call Specialist',
    body: 'Speak to our education specialist right now on +91 85019 24576',
    buttonText: 'Call Now',
    buttonVariant: 'secondary' as const,
    href: 'tel:+918501924576',
    recommended: false,
  },
  {
    icon: '📋',
    title: 'Program Catalog',
    body: 'Download our full catalog with pricing and curriculum maps.',
    buttonText: 'Download PDF',
    buttonVariant: 'secondary' as const,
    href: '#',
    recommended: false,
  },
];

export default function HomeCTA() {
  return (
    <section className="bg-bg-surface-2 section-spacing relative overflow-hidden">
      {/* Cinematic background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <Badge variant="gold" dot>Limited availability</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="heading-section mb-6">
            Ready to Transform <br /> Your School?
          </motion.h2>
          <motion.p variants={fadeUp} className="body-large mx-auto text-text-secondary">
            Join the elite circle of 50+ schools in Hyderabad leading the immersive education revolution.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {CTA_CARDS.map((card) => (
            <motion.div key={card.title} variants={fadeUp} className="relative group h-full">
              {card.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gold text-[#050508] text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(245,197,24,0.4)]">
                    Most Popular
                  </span>
                </div>
              )}
              <Card
                variant={card.recommended ? 'featured' : 'glass'}
                className="p-8 lg:p-10 text-center h-full flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-surface-2 border border-border-medium flex items-center justify-center text-3xl mb-8 group-hover:border-gold/30 transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="heading-card mb-4">{card.title}</h3>
                <p className="body-base text-text-muted mb-10 flex-1">{card.body}</p>
                <Button
                  href={card.href}
                  variant={card.buttonVariant}
                  className="w-full"
                  size="md"
                >
                  {card.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
