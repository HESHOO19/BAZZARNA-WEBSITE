"use client";

import { formatDateTime } from "@/lib/utils";
import type { TalentApplication } from "@/lib/types";
import { useState } from "react";

export function TalentApplicationsBoard({
  initialApplications
}: {
  initialApplications: TalentApplication[];
}) {
  const [applications, setApplications] = useState(initialApplications);
  const [message, setMessage] = useState<string | null>(null);

  async function updateStatus(id: string, status: "accepted" | "rejected") {
    const response = await fetch(`/api/admin/talent-applications/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    setMessage(data.message ?? "Application updated.");

    if (response.ok) {
      setApplications((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item))
      );
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-text">Talent pipeline</h2>
          <p className="mt-2 text-sm text-muted">
            Review, accept, or reject on-site submissions from the internal form.
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {applications.map((application) => (
          <article className="rounded-2xl border border-border bg-card p-5" key={application.id}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-lg font-semibold text-text">{application.fullName}</p>
                <p className="text-sm text-muted">
                  {application.category} · {application.city} · {application.email}
                </p>
                <p className="mt-3 text-sm text-muted">{application.notes}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-primary">
                  <span>{application.status}</span>
                  <span>{formatDateTime(application.createdAt)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="rounded-xl bg-mint px-4 py-2 text-sm font-semibold text-black"
                  onClick={() => updateStatus(application.id, "accepted")}
                  type="button"
                >
                  Accept
                </button>
                <button
                  className="rounded-xl bg-danger px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => updateStatus(application.id, "rejected")}
                  type="button"
                >
                  Reject
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {message ? <p className="mt-4 text-sm text-mint">{message}</p> : null}
    </div>
  );
}

