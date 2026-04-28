import Link from "next/link";
import { getBrands } from "@/lib/repositories";

export default async function BrandsPage() {
  const brandList = await getBrands();

  return (
    <main className="section-shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Brands</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">Browse attending brands.</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {brandList.map((brand) => (
          <Link className="rounded-2xl border border-border bg-panel p-6 transition hover:border-primary" href={`/brands/${brand.slug}`} key={brand.id}>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Zone {brand.zone}</p>
            <h2 className="mt-3 text-2xl font-semibold text-text">{brand.name}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{brand.bio}</p>
            <p className="mt-4 text-sm text-slate-200">{brand.boothLocation}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

