import { StatCard } from "@/components/dashboard/stat-card";
import { getDashboardMetrics, getEvents, getTalentApplications } from "@/lib/repositories";
import { formatDateTime } from "@/lib/utils";

export default async function DashboardOverviewPage() {
  const [metrics, eventList, applications] = await Promise.all([
    getDashboardMetrics(),
    getEvents(),
    getTalentApplications()
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Overview</p>
        <h1 className="mt-3 text-4xl font-semibold text-text">BAZZARNA command center</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          A CMS-like dashboard for event content, sponsors, media, users, roles, and talent applications with Supabase-backed workflows.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-border bg-panel p-6">
          <h2 className="text-2xl font-semibold text-text">Upcoming events</h2>
          <div className="mt-5 space-y-3">
            {eventList.map((event) => (
              <article className="rounded-xl border border-border bg-card p-4" key={event.id}>
                <p className="font-semibold text-text">{event.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {event.locationName} · {formatDateTime(event.startAt)}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-panel p-6">
          <h2 className="text-2xl font-semibold text-text">Talent review queue</h2>
          <div className="mt-5 space-y-3">
            {applications.map((application) => (
              <article className="rounded-xl border border-border bg-card p-4" key={application.id}>
                <p className="font-semibold text-text">{application.fullName}</p>
                <p className="mt-1 text-sm text-muted">
                  {application.category} · {application.status}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

