import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'surface' | 'success';
  className?: string;
  dot?: boolean;
}

export default function Badge({
  children,
  variant = 'gold',
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 label-caps bg-white/5 border border-white/10 transition-colors',
        variant === 'gold' &&
          'bg-gold/8 border-gold/30 text-gold shadow-[0_8px_24px_-12px_rgba(245,197,24,0.4)]',
        variant === 'outline' &&
          'bg-transparent border-white/20 text-text-secondary',
        variant === 'surface' &&
          'bg-bg-surface-2 border-border-medium text-text-secondary',
        variant === 'success' &&
          'bg-emerald-500/5 border-emerald-500/20 text-emerald-500',
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
