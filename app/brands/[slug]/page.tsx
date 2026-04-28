import { getBrandBySlug } from "@/lib/repositories";
import { notFound } from "next/navigation";

export default async function BrandDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return (
    <main className="section-shell py-16">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div
          className="min-h-[460px] rounded-[2rem] border border-border bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,17,21,0.18), rgba(15,17,21,0.62)), url(${brand.heroImage})`
          }}
        />
        <div className="rounded-[2rem] border border-border bg-panel p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Brand detail</p>
          <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">{brand.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">{brand.bio}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Assigned zone</p>
              <p className="mt-3 text-2xl font-semibold text-text">Zone {brand.zone}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Booth location</p>
              <p className="mt-3 text-lg font-semibold text-text">{brand.boothLocation}</p>
            </div>
          </div>
          <section className="mt-8">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Stock preview</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {brand.stockPreview.map((item) => (
                <article className="rounded-2xl border border-border bg-card p-4" key={item.name}>
                  <p className="text-sm text-muted">{item.name}</p>
                  <p className="mt-2 text-2xl font-semibold text-text">{item.quantity}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
