export function CardSkeleton() {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/5 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3 w-full">
          <div className="h-3 w-1/3 bg-white/10 rounded-full" />
          <div className="h-8 w-1/2 bg-white/10 rounded-xl" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0" />
      </div>
      <div className="mt-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-1/4 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="glass-panel rounded-[2.5rem] p-4 border-white/5 overflow-hidden animate-pulse">
      <div className="p-6 border-b border-white/5 mb-2 flex justify-between">
        <div className="h-6 w-1/4 bg-white/10 rounded-xl" />
        <div className="h-6 w-16 bg-white/10 rounded-xl" />
      </div>
      <div className="space-y-4 p-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl">
            <div className="flex items-center gap-4 w-1/2">
              <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0" />
              <div className="space-y-2 w-full">
                <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                <div className="h-2 w-1/3 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="h-4 w-1/4 bg-white/10 rounded-full hidden md:block" />
            <div className="h-8 w-8 bg-white/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
