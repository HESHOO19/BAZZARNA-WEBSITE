import Link from "next/link";
import type { ReactNode } from "react";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/brands", label: "Brands" },
  { href: "/dashboard/sponsors", label: "Sponsors" },
  { href: "/dashboard/media", label: "Media" },
  { href: "/dashboard/talent", label: "Talent" },
  { href: "/dashboard/users", label: "Users" }
];

export function DashboardShell({
  children,
  roleLabel
}: {
  children: ReactNode;
  roleLabel: string;
}) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-border bg-panel p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Admin access</p>
        <p className="mt-2 text-lg font-semibold text-text">{roleLabel}</p>
        <nav className="mt-6 space-y-2">
          {dashboardLinks.map((item) => (
            <Link
              className="block rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-card hover:text-text"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}

