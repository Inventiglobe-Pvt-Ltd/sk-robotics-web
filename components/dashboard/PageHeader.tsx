import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
            <Icon className="w-6 h-6 text-gold" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-syne font-black text-text-primary tracking-tight">
            {title}
          </h1>
          <p className="text-text-dim mt-1 text-sm font-medium">
            {description}
          </p>
        </div>
      </div>
      {action && (
        <div className="flex items-center gap-4">
          {action}
        </div>
      )}
    </div>
  );
}
