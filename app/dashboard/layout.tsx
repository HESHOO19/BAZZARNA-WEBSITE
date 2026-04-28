import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCurrentRole, getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const [session, role] = await Promise.all([getCurrentSession(), getCurrentRole()]);

  // Not signed in → send to sign-in
  if (!session) {
    redirect("/auth/signin");
  }

  // Signed in but not admin/staff → send home
  if (role !== "main_admin" && role !== "operations_staff") {
    redirect("/");
  }

  return <DashboardShell roleLabel={role}>{children}</DashboardShell>;
}
