import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCurrentRole } from "@/lib/auth";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const role = await getCurrentRole();
  const roleLabel = role === "guest" ? "Guest view (connect Supabase auth for protection)" : role;

  return <DashboardShell roleLabel={roleLabel}>{children}</DashboardShell>;
}
