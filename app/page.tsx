import Link from "next/link";
import { getBrands, getEvents, getMediaAssets, getSponsors } from "@/lib/repositories";
import { formatDateRange } from "@/lib/utils";

export default async function HomePage() {
  const [eventList, brandList, sponsorList, mediaList] = await Promise.all([
    getEvents(),
    getBrands(),
    getSponsors(),
    getMediaAssets()
  ]);

  const heroMedia = mediaList[0];

  return (
    <main>
      <section
        className="border-b border-border bg-mesh"
        style={{
          backgroundImage: heroMedia
            ? `linear-gradient(90deg, rgba(15, 17, 21, 0.92), rgba(15, 17, 21, 0.55)), url(${heroMedia.imageUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="section-shell grid min-h-[78vh] items-center gap-12 py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">BAZZARNA marketplace system</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">
              Premium pop-up retail with a real operations engine behind it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Built for curated events, role-based content management, sponsor storytelling, brand discovery, and internal talent acquisition with Supabase at the core.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link className="rounded-xl bg-primary px-5 py-3 font-semibold text-black" href="/events">
                Explore events
              </Link>
              <Link className="rounded-xl border border-text/20 px-5 py-3 font-semibold text-text" href="/dashboard">
                Open dashboard
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {eventList.slice(0, 2).map((event) => (
              <article className="rounded-2xl border border-border bg-panel/90 p-6 backdrop-blur" key={event.id}>
                <p className="text-sm uppercase tracking-[0.2em] text-primary">{formatDateRange(event.startAt, event.endAt)}</p>
                <h2 className="mt-3 text-2xl font-semibold text-text">{event.title}</h2>
                <p className="mt-2 text-sm text-muted">{event.locationName}</p>
                <p className="mt-4 text-sm leading-7 text-slate-200">{event.shortDescription}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-panel p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Admin roles</p>
            <h3 className="mt-3 text-2xl font-semibold text-text">Main admin + operations staff</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Main admin controls users, roles, permissions, and full CRUD. Operations staff manage events, sponsors, media, and brand participation without stock editing.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-panel p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Audience features</p>
            <h3 className="mt-3 text-2xl font-semibold text-text">Event reminders and brand discovery</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Users can sign in, browse attending brands, inspect stock previews and booth locations, and use Notify Me to receive event details by email.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-panel p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Internal workflow</p>
            <h3 className="mt-3 text-2xl font-semibold text-text">On-site talent acquisition</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Applications are stored in Supabase, routed to the admin dashboard, sent to BAZZARNA email, and supported with accept or reject responses.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Upcoming</p>
            <h2 className="mt-3 text-4xl font-semibold text-text">Featured events</h2>
          </div>
          <Link className="text-sm font-medium text-primary" href="/events">
            See all events
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {eventList.map((event) => (
            <article className="overflow-hidden rounded-3xl border border-border bg-panel" key={event.id}>
              <div
                className="h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55)), url(${event.heroImage})`
                }}
              />
              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">{event.zoneSummary.join(" · ")}</p>
                <h3 className="mt-3 text-3xl font-semibold text-text">{event.title}</h3>
                <p className="mt-2 text-sm text-muted">{event.locationName}</p>
                <p className="mt-4 text-sm leading-7 text-slate-200">{event.shortDescription}</p>
                <Link className="mt-6 inline-flex rounded-xl bg-primary px-4 py-3 font-semibold text-black" href={`/events/${event.slug}`}>
                  View event
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-panel p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Brands</p>
            <h2 className="mt-3 text-4xl font-semibold text-text">Attending brand highlights</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Every brand detail page includes assigned zone, stock preview, bio, and booth location so visitors know exactly what to expect.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {brandList.map((brand) => (
              <Link
                className="rounded-2xl border border-border bg-panel p-5 transition hover:border-primary"
                href={`/brands/${brand.slug}`}
                key={brand.id}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-primary">Zone {brand.zone}</p>
                <h3 className="mt-2 text-2xl font-semibold text-text">{brand.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{brand.bio}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Partners</p>
            <h2 className="mt-3 text-4xl font-semibold text-text">Sponsor spotlight</h2>
          </div>
          <Link className="text-sm font-medium text-primary" href="/sponsors">
            Browse sponsors
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sponsorList.map((sponsor) => (
            <Link className="rounded-2xl border border-border bg-panel p-6 transition hover:border-primary" href={`/sponsors/${sponsor.slug}`} key={sponsor.id}>
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Dedicated page</p>
              <h3 className="mt-3 text-2xl font-semibold text-text">{sponsor.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{sponsor.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

