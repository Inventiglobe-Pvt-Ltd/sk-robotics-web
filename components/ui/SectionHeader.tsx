'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Badge from './Badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'mb-20 md:mb-32',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <motion.div variants={fadeUp} className="mb-8">
          <Badge variant="gold" dot>{badge}</Badge>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="heading-section mb-8 max-w-[20ch] mx-auto"
        style={align === 'left' ? { marginLeft: 0, marginRight: 'auto' } : {}}
        dangerouslySetInnerHTML={{
          __html: title.replace(
            /<em>(.*?)<\/em>/g,
            '<span class="text-gold-gradient">$1</span>'
          ),
        }}
      />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'body-large text-text-secondary mx-auto',
            align === 'center' ? 'mx-auto' : 'ml-0 mr-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
