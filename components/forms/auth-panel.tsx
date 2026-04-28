"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useState, type FormEvent } from "react";

export function AuthPanel() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
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
        setMessage("Signed in successfully. You can head to the dashboard now.");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        });

        if (error) throw error;

        await fetch("/api/auth/welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            fullName,
            userId: data.user?.id
          })
        });

        setMessage("Account created. Check your email for confirmation if your project requires it.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
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
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-panel p-8 shadow-soft">
      <div className="flex gap-2 rounded-xl border border-border bg-background p-1 text-sm">
        <button
          className={`flex-1 rounded-lg px-4 py-2 ${mode === "signin" ? "bg-primary text-black" : "text-muted"}`}
          onClick={() => setMode("signin")}
          type="button"
        >
          Sign in
        </button>
        <button
          className={`flex-1 rounded-lg px-4 py-2 ${mode === "signup" ? "bg-primary text-black" : "text-muted"}`}
          onClick={() => setMode("signup")}
          type="button"
        >
          Create account
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleEmailAuth}>
        {mode === "signup" ? (
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Full name</span>
            <input
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none ring-0 placeholder:text-muted/60"
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              required
              value={fullName}
            />
          </label>
        ) : null}
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Email</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none ring-0 placeholder:text-muted/60"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@domain.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Password</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none ring-0 placeholder:text-muted/60"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
            required
            type="password"
            value={password}
          />
        </label>
        <button
          className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-black transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
          disabled={busy}
          type="submit"
        >
          {busy ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-sm text-muted">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        className="w-full rounded-xl border border-border bg-card px-4 py-3 font-medium text-text transition hover:border-primary"
        disabled={busy}
        onClick={handleGoogleAuth}
        type="button"
      >
        Continue with Google
      </button>

      {message ? <p className="mt-4 text-sm text-mint">{message}</p> : null}
    </div>
  );
}
