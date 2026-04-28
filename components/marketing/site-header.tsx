import Link from "next/link";
import { getCurrentRole, getCurrentSession } from "@/lib/auth";
import { HeaderClient } from "./header-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/brands", label: "Brands" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/talent", label: "Talent" },
];

export async function SiteHeader() {
  const [session, role] = await Promise.all([getCurrentSession(), getCurrentRole()]);
  const isAdmin = role === "main_admin" || role === "operations_staff";
  const userEmail = session?.user?.email ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-[0.22em] text-text transition hover:text-primary">
          BAZZARNA
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative py-1 transition hover:text-text after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/dashboard" className="relative py-1 text-primary transition hover:text-primaryDark after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <HeaderClient userEmail={userEmail} isAdmin={isAdmin} />
          ) : (
            <>
              <Link href="/auth/signin" className="rounded-xl border border-border bg-panel px-4 py-2 text-sm font-semibold text-text transition hover:border-primary hover:text-primary">
                Sign In
              </Link>
              <Link href="/events" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-primaryDark hover:shadow-[0_0_20px_rgba(244,197,66,0.35)]">
                Explore events
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
