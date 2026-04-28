"use client";

import { useState, type FormEvent } from "react";

type Props = {
  slug: string;
  eventTitle: string;
};

export function NotifyMeForm({ slug, eventTitle }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    const response = await fetch(`/api/events/${slug}/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    setBusy(false);
    setMessage(data.message ?? `You'll receive updates for ${eventTitle}.`);
  }

  return (
    <form className="space-y-3 rounded-2xl border border-border bg-panel p-6" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Notify Me</p>
        <p className="mt-2 text-sm text-muted">
          Save this event and receive time and location details by email.
        </p>
      </div>
      <input
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text outline-none placeholder:text-muted/60"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        required
        type="email"
        value={email}
      />
      <button
        className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-black transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
        disabled={busy}
        type="submit"
      >
        {busy ? "Saving..." : "Notify me"}
      </button>
      {message ? <p className="text-sm text-mint">{message}</p> : null}
    </form>
  );
}
