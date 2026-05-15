'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'featured';
  className?: string;
  id?: string;
}

export default function Card({
  children,
  variant = 'default',
  className,
  id,
}: CardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      id={id}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative rounded-3xl border border-border-medium bg-bg-surface p-8 transition-all duration-500 hover:border-gold/30 hover:bg-bg-surface-2 overflow-hidden',
        variant === 'glass' && 'glass-panel',
        variant === 'featured' && 'border-gold/30 bg-bg-surface-2',
        className
      )}
    >
      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 197, 24, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      
      {/* Subtle corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
