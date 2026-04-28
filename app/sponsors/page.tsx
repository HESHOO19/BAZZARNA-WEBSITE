import Link from "next/link";
import { getSponsors } from "@/lib/repositories";

export default async function SponsorsPage() {
  const sponsorList = await getSponsors();

  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Sponsors</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">Sponsor pages with media and story-led content.</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {sponsorList.map((sponsor) => (
          <Link className="overflow-hidden rounded-[2rem] border border-border bg-panel transition hover:border-primary" href={`/sponsors/${sponsor.slug}`} key={sponsor.id}>
            <div
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.6)), url(${sponsor.heroImage})`
              }}
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-text">{sponsor.name}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{sponsor.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

