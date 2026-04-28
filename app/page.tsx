import Link from "next/link";
import { getBrands, getEvents, getMediaAssets, getSponsors } from "@/lib/repositories";
import { formatDateRange } from "@/lib/utils";
import { HeroCarousel } from "@/components/marketing/hero-carousel";

export default async function HomePage() {
  const [eventList, brandList, sponsorList] = await Promise.all([
    getEvents(),
    getBrands(),
    getSponsors(),
    getMediaAssets()
  ]);

  return (
    <main>
      <HeroCarousel events={eventList} brands={brandList} sponsors={sponsorList} />

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-panel/60 py-3 backdrop-blur">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...Array(3)].flatMap((_, arrIdx) =>
            ["Premium Pop-Up Retail", "Curated Brands", "Sponsor Stories", "Live Events", "Talent Acquisition", "Role-Based Admin"].map((t, i) => (
              <span key={`${arrIdx}-${i}`} className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* FEATURE CARDS */}
      <section className="section-shell py-24">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Platform</p>
            <h2 className="mt-3 text-4xl font-black uppercase text-text">Built for real operations</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { tag: "Admin Roles", title: "Main admin + operations staff", body: "Main admin controls users, roles, permissions, and full CRUD. Operations staff manage events, sponsors, media, and brand participation without stock editing.", icon: "🔐" },
            { tag: "Audience Features", title: "Event reminders and brand discovery", body: "Users can sign in, browse attending brands, inspect stock previews and booth locations, and use Notify Me to receive event details by email.", icon: "🎯" },
            { tag: "Internal Workflow", title: "On-site talent acquisition", body: "Applications stored in Supabase, routed to the admin dashboard, sent to BAZZARNA email, and supported with accept or reject responses.", icon: "✦" },
          ].map((card) => (
            <div key={card.tag} className="group relative overflow-hidden rounded-2xl border border-border bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_48px_rgba(244,197,66,0.12)]">
              <div className="absolute -right-6 -top-6 select-none text-7xl opacity-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-20">{card.icon}</div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{card.tag}</p>
              <h3 className="mt-3 text-xl font-bold text-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="section-shell pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Upcoming</p>
            <h2 className="mt-3 text-4xl font-black uppercase text-text">Featured events</h2>
          </div>
          <Link href="/events" className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-primary hover:text-primary">
            See all <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {eventList.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`} className="group relative overflow-hidden rounded-3xl border border-border bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <div className="relative h-72 overflow-hidden">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.65)),url(${event.heroImage})` }} />
                <div className="absolute left-5 top-5">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${event.status === "live" ? "bg-green-500/20 text-green-400 border border-green-500/30" : event.status === "upcoming" ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/10 text-muted border border-white/20"}`}>
                    {event.status === "live" && <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />}
                    {event.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{formatDateRange(event.startAt, event.endAt)} · {event.locationName}</p>
                <h3 className="mt-2 text-2xl font-bold text-text">{event.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{event.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.zoneSummary.slice(0, 4).map((z) => (
                    <span key={z} className="rounded-md bg-border px-2 py-0.5 text-xs font-mono font-semibold text-muted">Zone {z}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="section-shell pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Brands</p>
            <h2 className="mt-3 text-4xl font-black uppercase text-text">Attending highlights</h2>
          </div>
          <Link href="/brands" className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-primary hover:text-primary">
            All brands <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {brandList.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} className="group relative overflow-hidden rounded-2xl border border-border bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_40px_rgba(244,197,66,0.1)]">
              {brand.heroImage && (
                <div className="h-40 w-full overflow-hidden">
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(180deg,transparent 40%,rgba(15,17,21,0.9)),url(${brand.heroImage})` }} />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">Zone {brand.zone}</span>
                  <span className="text-xs text-muted/60">{brand.boothLocation}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-text">{brand.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">{brand.bio}</p>
                {brand.stockPreview.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {brand.stockPreview.slice(0, 2).map((item) => (
                      <span key={item.name} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted/70">{item.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section className="section-shell pb-28">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Partners</p>
            <h2 className="mt-3 text-4xl font-black uppercase text-text">Sponsor spotlight</h2>
          </div>
          <Link href="/sponsors" className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-primary hover:text-primary">
            All sponsors <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {sponsorList.map((sponsor) => (
            <Link key={sponsor.id} href={`/sponsors/${sponsor.slug}`} className="group relative overflow-hidden rounded-2xl border border-border bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_40px_rgba(244,197,66,0.1)]">
              {sponsor.heroImage && (
                <div className="h-52 w-full overflow-hidden">
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(180deg,transparent 30%,rgba(15,17,21,0.95)),url(${sponsor.heroImage})` }} />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Official sponsor</p>
                <h3 className="mt-2 text-2xl font-bold text-text">{sponsor.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{sponsor.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">View sponsor page →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>
    </main>
  );
}
