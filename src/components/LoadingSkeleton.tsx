import React from 'react';

export const CardSkeleton = () => (
  <div className="glass-card border-surface-border rounded-xl p-6 relative overflow-hidden">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
    <div className="h-6 w-1/3 bg-slate-800/50 rounded-md mb-4" />
    <div className="space-y-3">
      <div className="h-4 w-full bg-slate-800/50 rounded-md" />
      <div className="h-4 w-5/6 bg-slate-800/50 rounded-md" />
      <div className="h-4 w-4/6 bg-slate-800/50 rounded-md" />
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b border-surface-border relative overflow-hidden">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
    <div className="flex items-center gap-4 w-1/3">
      <div className="w-10 h-10 rounded-full bg-slate-800/50 shrink-0" />
      <div className="space-y-2 w-full">
        <div className="h-4 w-3/4 bg-slate-800/50 rounded-md" />
        <div className="h-3 w-1/2 bg-slate-800/50 rounded-md" />
      </div>
    </div>
    <div className="h-4 w-1/6 bg-slate-800/50 rounded-md" />
    <div className="h-4 w-1/6 bg-slate-800/50 rounded-md" />
    <div className="h-8 w-8 bg-slate-800/50 rounded-md" />
  </div>
);

export const KPISkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="glass-card border-surface-border rounded-xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 w-1/2 bg-slate-800/50 rounded-md" />
          <div className="h-8 w-8 rounded-lg bg-slate-800/50" />
        </div>
        <div className="h-8 w-3/4 bg-slate-800/50 rounded-md mb-2" />
        <div className="h-3 w-1/3 bg-slate-800/50 rounded-md" />
      </div>
    ))}
  </div>
);

export const ViewSkeleton = () => (
  <div className="flex flex-col gap-6 w-full">
    {/* Header Skeleton */}
    <div className="glass-card border-surface-border p-6 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
      <div className="h-8 w-1/3 bg-slate-800/50 rounded-md mb-3" />
      <div className="h-4 w-1/4 bg-slate-800/50 rounded-md" />
    </div>

    {/* KPIs Skeleton */}
    <KPISkeleton />

    {/* List/Table Skeleton */}
    <div className="glass-card border-surface-border rounded-2xl flex flex-col relative overflow-hidden">
      <div className="p-6 border-b border-surface-border">
        <div className="h-6 w-1/4 bg-slate-800/50 rounded-md" />
      </div>
      <div>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);
