import Link from "next/link";
import { NotifyMeForm } from "@/components/forms/notify-me-form";
import { getBrands, getEventBySlug, getSponsors } from "@/lib/repositories";
import { formatDateRange } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const [brandList, sponsorList] = await Promise.all([getBrands(), getSponsors()]);
  const attendingBrands = brandList.filter((brand) => event.brandIds.includes(brand.id));
  const eventSponsors = sponsorList.filter((sponsor) => event.sponsorIds.includes(sponsor.id));

  return (
    <main className="section-shell py-16">
      <div
        className="overflow-hidden rounded-[2rem] border border-border bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,17,21,0.92), rgba(15,17,21,0.45)), url(${event.heroImage})`
        }}
      >
        <div className="grid gap-8 px-8 py-16 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">{formatDateRange(event.startAt, event.endAt)}</p>
            <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">{event.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{event.longDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {event.zoneSummary.map((zone) => (
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200" key={zone}>
                  Zone {zone}
                </span>
              ))}
            </div>
          </div>
          <NotifyMeForm eventTitle={event.title} slug={event.slug} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-border bg-panel p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Event details</p>
              <p className="mt-3 text-lg font-semibold text-text">{event.locationName}</p>
              <p className="mt-2 text-sm text-muted">Google Maps enabled for on-site navigation.</p>
              <a className="mt-5 inline-flex text-sm font-medium text-primary" href={event.googleMapsUrl} target="_blank">
                Open Google Maps
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Attending brands</p>
              <div className="mt-4 space-y-3">
                {attendingBrands.map((brand) => (
                  <Link className="block rounded-xl border border-border bg-card p-4 transition hover:border-primary" href={`/brands/${brand.slug}`} key={brand.id}>
                    <p className="font-semibold text-text">{brand.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      Zone {brand.zone} · {brand.boothLocation}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-panel p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Sponsors</p>
            <div className="mt-4 space-y-3">
              {eventSponsors.map((sponsor) => (
                <Link className="block rounded-xl border border-border bg-card p-4 transition hover:border-primary" href={`/sponsors/${sponsor.slug}`} key={sponsor.id}>
                  <p className="font-semibold text-text">{sponsor.name}</p>
                  <p className="mt-1 text-sm text-muted">{sponsor.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
