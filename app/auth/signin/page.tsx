import { AuthPanel } from "@/components/forms/auth-panel";

export default function SignInPage() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-80px)] items-center py-16">
        <div className="grid w-full gap-12 lg:grid-cols-[1fr_480px] lg:items-center">
          {/* Left: copy */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Authentication</p>
            <h1 className="mt-4 text-6xl font-black uppercase leading-none text-text">
              Sign in to<br />BAZZARNA.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">
              Accounts are managed through Supabase Auth with role-based permissions, welcome emails, and dashboard access once your role is assigned.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Role-based access control",
                "Google OAuth or email + password",
                "Welcome email on signup",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: auth panel */}
          <AuthPanel />
        </div>
      </div>
    </main>
  );
}
