import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/talent", label: "Talent" },
  { href: "/auth/signin", label: "Sign In" },
  { href: "/dashboard", label: "Dashboard" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link className="text-2xl font-black tracking-[0.22em] text-text" href="/">
          BAZZARNA
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-muted md:flex">
          {links.map((link) => (
            <Link className="transition hover:text-text" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-primaryDark"
          href="/events"
        >
          Explore events
        </Link>
      </div>
    </header>
  );
}

