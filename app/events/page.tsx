import Link from "next/link";
import { getBrands, getEvents } from "@/lib/repositories";
import { formatDateRange } from "@/lib/utils";

export default async function EventsPage() {
  const [eventList, brandList] = await Promise.all([getEvents(), getBrands()]);

  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Events and brands</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">Curated events with brand-level detail.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Visitors can browse event info, open Google Maps locations, inspect attending brands, and save email reminders with Notify Me.
        </p>
      </div>
      <div className="mt-12 grid gap-8">
        {eventList.map((event) => {
          const attendingBrands = brandList.filter((brand) => event.brandIds.includes(brand.id));

          return (
            <article className="overflow-hidden rounded-3xl border border-border bg-panel" key={event.id}>
              <div className="grid lg:grid-cols-[0.7fr_1fr]">
                <div
                  className="min-h-80 bg-cover bg-center"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55)), url(${event.heroImage})` }}
                />
                <div className="p-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-primary">{formatDateRange(event.startAt, event.endAt)}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-text">{event.title}</h2>
                  <p className="mt-2 text-sm text-muted">{event.locationName}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200">{event.longDescription}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {event.zoneSummary.map((zone) => (
                      <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted" key={zone}>
                        Zone {zone}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">Attending brands</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {attendingBrands.map((brand) => (
                        <Link className="rounded-xl border border-border bg-card p-4 transition hover:border-primary" href={`/brands/${brand.slug}`} key={brand.id}>
                          <p className="text-lg font-semibold text-text">{brand.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Zone {brand.zone}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link className="mt-8 inline-flex rounded-xl bg-primary px-4 py-3 font-semibold text-black" href={`/events/${event.slug}`}>
                    Open event
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

