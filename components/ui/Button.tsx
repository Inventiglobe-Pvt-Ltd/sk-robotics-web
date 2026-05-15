'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold-outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  external?: boolean;
  id?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className,
  external = false,
  id,
}: ButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-full font-jakarta font-bold transition-all duration-500 cursor-pointer select-none group overflow-hidden',
    /* Sizes */
    size === 'sm' && 'px-6 py-2.5 text-[0.8rem] tracking-tight',
    size === 'md' && 'px-8 py-4 text-[0.9375rem] tracking-tight',
    size === 'lg' && 'px-10 py-5 text-base tracking-tight',
    /* Variants */
    variant === 'primary' &&
      'bg-gold text-[#050508] hover:shadow-[0_20px_40px_-12px_rgba(245,197,24,0.4)] border-0',
    variant === 'secondary' &&
      'bg-bg-surface-2 text-text-primary border border-border-medium hover:border-gold/30 hover:bg-bg-surface-3',
    variant === 'gold-outline' &&
      'bg-transparent border border-gold/40 text-gold hover:bg-gold/5',
    variant === 'outline' &&
      'bg-transparent border border-border-strong text-text-primary hover:border-text-primary hover:bg-white/5',
    variant === 'ghost' &&
      'bg-transparent text-text-primary hover:bg-white/5',
    /* States */
    (disabled || loading) && 'opacity-50 pointer-events-none',
    className
  );

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {loading ? <Spinner /> : children}
      </span>
      {/* Premium Shine Effect */}
      <motion.span 
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '100%', opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 500, damping: 25 } as const,
  };

  if (href) {
    const isExternal = external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    
    if (isExternal) {
      return (
        <motion.a
          {...motionProps}
          id={id}
          href={href}
          className={baseClasses}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {innerContent}
        </motion.a>
      );
    }
    
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link id={id} href={href} className={baseClasses}>
          {innerContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {innerContent}
    </motion.button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
