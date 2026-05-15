'use client';
import { TableSkeleton } from '@/components/dashboard/SkeletonLoader';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
}

export default function DataTable({ columns, data, loading }: DataTableProps) {
  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-text-dim text-[0.65rem] uppercase font-black tracking-[0.2em]">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="space-y-4">
          {data.map((item, index) => (
            <tr 
              key={index} 
              className="group hover:bg-white/5 transition-colors duration-300"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-6 first:rounded-l-2xl last:rounded-r-2xl bg-bg-surface-2/30 border-y border-white/5 group-hover:border-white/10 first:border-l last:border-r">
                  {col.render ? col.render(item[col.key], item) : (
                    <span className="text-sm font-bold text-text-primary">{item[col.key] || '—'}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-3xl mt-4">
          <p className="text-text-dim font-bold tracking-widest uppercase text-xs">No records found</p>
        </div>
      )}
    </div>
  );
}
