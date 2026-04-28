"use client";

import { useState, type FormEvent } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  category: "",
  city: "",
  portfolioUrl: "",
  notes: ""
};

export function TalentApplicationForm() {
  const [form, setForm] = useState(initialState);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    const response = await fetch("/api/talent-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setBusy(false);
    setMessage(data.message ?? "Application received.");

    if (response.ok) {
      setForm(initialState);
    }
  }

  return (
    <form className="space-y-4 rounded-2xl border border-border bg-panel p-8" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Full name</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            required
            value={form.fullName}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Email</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
            type="email"
            value={form.email}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Phone</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            required
            value={form.phone}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Category</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            placeholder="Host, photographer, stylist..."
            required
            value={form.category}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">City</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
            required
            value={form.city}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Portfolio URL</span>
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, portfolioUrl: event.target.value }))}
            placeholder="https://"
            value={form.portfolioUrl}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Why should we contact you?</span>
        <textarea
          className="min-h-32 w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
          onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
          placeholder="Tell us about your experience, availability, and how you can help at BAZZARNA."
          value={form.notes}
        />
      </label>
      <button
        className="rounded-xl bg-primary px-5 py-3 font-semibold text-black transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
        disabled={busy}
        type="submit"
      >
        {busy ? "Submitting..." : "Apply / Contact"}
      </button>
      {message ? <p className="text-sm text-mint">{message}</p> : null}
    </form>
  );
}
