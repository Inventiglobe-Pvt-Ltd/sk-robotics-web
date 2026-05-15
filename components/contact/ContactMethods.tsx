'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const CONTACT_CARDS = [
  {
    icon: '📞',
    title: 'Call / WhatsApp',
    content: '+91 85019 24576',
    sub: 'Immediate support for school leaders.',
    buttons: [
      { label: 'Call Now', href: 'tel:+918501924576', variant: 'primary' as const },
      {
        label: 'WhatsApp Us',
        href: 'https://wa.me/918501924576?text=Hi%20SK%20Robotics%2C%20I%27d%20like%20to%20know%20more%20about%20your%20labs',
        variant: 'secondary' as const,
      },
    ],
  },
  {
    icon: '✉️',
    title: 'Official Email',
    content: 'saikirani999@gmail.com',
    sub: 'Detailed inquiries & partnerships.',
    buttons: [
      { label: 'Send Email', href: 'mailto:saikirani999@gmail.com', variant: 'secondary' as const },
    ],
  },
  {
    icon: '📍',
    title: 'Headquarters',
    content: 'Shamshabad, Hyderabad',
    sub: 'Telangana, India — 501218',
    buttons: [
      {
        label: 'Get Directions',
        href: 'https://maps.google.com/?q=Shamshabad+Hyderabad',
        variant: 'secondary' as const,
      },
    ],
  },
];

export default function ContactMethods() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {CONTACT_CARDS.map((card) => (
        <motion.div key={card.title} variants={fadeUp}>
          <Card variant="glass" className="p-8 group">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-bg-surface-2 border border-border-medium flex items-center justify-center text-2xl shrink-0 group-hover:border-gold/30 transition-all duration-500">
                {card.icon}
              </div>
              <div className="flex-1">
                <h4 className="label-caps text-text-dim mb-2">
                  {card.title}
                </h4>
                <p className="font-syne font-bold text-text-primary text-xl mb-1 tracking-tight">
                  {card.content}
                </p>
                <p className="body-base text-text-muted mb-6">
                  {card.sub}
                </p>
                <div className="flex flex-wrap gap-3">
                  {card.buttons.map((btn) => (
                    <Button
                      key={btn.label}
                      href={btn.href}
                      variant={btn.variant}
                      size="sm"
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
