export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-text">BAZZARNA</p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Premium pop-up retail experiences with curated brands, sponsors, and operational tooling built for the team behind them.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Core features</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Role-based admin dashboard</li>
            <li>Supabase auth, database, and storage</li>
            <li>Event reminders and Notify Me emails</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Operations</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Talent application review workflow</li>
            <li>Sponsor and media management</li>
            <li>Brand discovery and zone-level details</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

