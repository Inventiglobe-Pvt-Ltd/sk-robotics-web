import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-[2.5rem] border-white/5 border-dashed border-2"
    >
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-gold opacity-50" />
      </div>
      <h3 className="text-2xl font-syne font-black text-text-primary mb-2">{title}</h3>
      <p className="text-text-muted mb-8 max-w-sm text-sm">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </motion.div>
  );
}
