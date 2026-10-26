export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 py-16 text-slate-500" role="status">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-navy-900/20" />
        <div className="h-9 w-9 animate-spin rounded-full border-3 border-navy-950 border-t-accent" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="aspect-[4/3] shimmer-bg" />
      <div className="space-y-3.5 p-5">
        <div className="h-5 w-2/3 rounded-lg shimmer-bg" />
        <div className="h-3.5 w-1/3 rounded-lg shimmer-bg" />
        <div className="h-4 w-full rounded-lg shimmer-bg" />
        <div className="pt-2">
          <div className="h-10 w-full rounded-2xl shimmer-bg" />
        </div>
      </div>
    </div>
  );
}
