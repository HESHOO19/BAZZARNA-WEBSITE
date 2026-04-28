import { getSponsorBySlug } from "@/lib/repositories";
import { notFound } from "next/navigation";

export default async function SponsorDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const sponsor = await getSponsorBySlug(slug);

  if (!sponsor) {
    notFound();
  }

  return (
    <main className="section-shell py-16">
      <div
        className="rounded-[2rem] border border-border bg-cover bg-center p-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,17,21,0.92), rgba(15,17,21,0.45)), url(${sponsor.heroImage})`
        }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Sponsor profile</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">{sponsor.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{sponsor.summary}</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-2xl border border-border bg-panel p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Media gallery</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sponsor.gallery.map((image, index) => (
              <div
                className="h-56 rounded-2xl border border-border bg-cover bg-center"
                key={`${image}-${index}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-panel p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Full content</p>
          <div className="mt-6 space-y-5 text-sm leading-8 text-slate-200">
            {sponsor.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
