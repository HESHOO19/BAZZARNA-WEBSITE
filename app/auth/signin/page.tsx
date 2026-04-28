import { AuthPanel } from "@/components/forms/auth-panel";

export default function SignInPage() {
  return (
    <main className="section-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_0.85fr]">
        <div className="rounded-[2rem] border border-border bg-panel p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Authentication</p>
          <h1 className="mt-4 text-5xl font-black uppercase leading-none text-text">Email and Google sign-in.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            Accounts are managed through Supabase Auth with a welcome email trigger, dashboard access, and role-aware permissions once the user is assigned.
          </p>
        </div>
        <AuthPanel />
      </div>
    </main>
  );
}

