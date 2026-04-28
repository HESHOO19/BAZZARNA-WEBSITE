import { TalentApplicationForm } from "@/components/forms/talent-application-form";
import { selectionProcess } from "@/lib/site-data";

export default function TalentPage() {
  return (
    <main className="section-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-border bg-panel p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Talent acquisition</p>
          <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">Apply to work with BAZZARNA.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            This replaces the external form with a full on-site workflow backed by Supabase, admin review, and decision emails.
          </p>
          <div className="mt-8 space-y-4">
            {selectionProcess.map((step, index) => (
              <article className="rounded-2xl border border-border bg-card p-5" key={step}>
                <p className="text-sm uppercase tracking-[0.2em] text-primary">Step {index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{step}</p>
              </article>
            ))}
          </div>
        </div>
        <TalentApplicationForm />
      </div>
    </main>
  );
}

