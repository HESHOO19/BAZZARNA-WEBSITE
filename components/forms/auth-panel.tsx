"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useState, type FormEvent } from "react";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthPanel() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleEmailAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/dashboard";
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });

        if (error) throw error;

        await fetch("/api/auth/welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, fullName, userId: data.user?.id })
        });

        setMessage({ text: "Account created! Check your email to confirm.", ok: true });
      }
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Something went wrong.", ok: false });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleAuth() {
    setBusy(true);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/api/auth/callback` }
      });

      if (error) throw error;
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Google sign-in failed.", ok: false });
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-panel p-8 shadow-soft">

      {/* Google button — always on top */}
      <button
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 font-medium text-text transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-70"
        disabled={busy}
        onClick={handleGoogleAuth}
        type="button"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Sign In / Register tab switcher */}
      <div className="flex gap-2 rounded-xl border border-border bg-background p-1 text-sm">
        <button
          className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
            mode === "signin" ? "bg-primary text-black" : "text-muted hover:text-text"
          }`}
          onClick={() => { setMode("signin"); setMessage(null); }}
          type="button"
        >
          Sign In
        </button>
        <button
          className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
            mode === "signup" ? "bg-primary text-black" : "text-muted hover:text-text"
          }`}
          onClick={() => { setMode("signup"); setMessage(null); }}
          type="button"
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form className="mt-5 space-y-4" onSubmit={handleEmailAuth}>
        {mode === "signup" && (
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Full name</span>
            <input
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none placeholder:text-muted/50 focus:border-primary"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
              value={fullName}
            />
          </label>
        )}
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Email</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none placeholder:text-muted/50 focus:border-primary"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Password</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none placeholder:text-muted/50 focus:border-primary"
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            type="password"
            value={password}
          />
        </label>
        <button
          className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={busy}
          type="submit"
        >
          {busy ? "Working…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <p className={`mt-4 text-sm ${message.ok ? "text-green-400" : "text-red-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
