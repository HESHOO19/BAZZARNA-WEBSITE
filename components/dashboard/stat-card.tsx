import type { DashboardMetric } from "@/lib/types";

export function StatCard({ metric }: { metric: DashboardMetric }) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-primary">{metric.label}</p>
      <p className="mt-3 text-4xl font-semibold text-text">{metric.value}</p>
      <p className="mt-2 text-sm text-muted">{metric.detail}</p>
    </div>
  );
}

