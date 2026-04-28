"use client";

import type { RoleName, TeamMember } from "@/lib/types";
import { useState, type FormEvent } from "react";

export function UserManagement({ initialUsers }: { initialUsers: TeamMember[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ fullName: "", email: "", role: "operations_staff" as RoleName });
  const [message, setMessage] = useState<string | null>(null);

  async function inviteUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setMessage(data.message ?? "User invited.");
    if (response.ok && data.item) {
      setUsers((current) => [data.item as TeamMember, ...current]);
      setForm({ fullName: "", email: "", role: "operations_staff" });
    }
  }

  async function updateRole(id: string, role: RoleName) {
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role })
    });
    const data = await response.json();
    setMessage(data.message ?? "Role updated.");
    if (response.ok) {
      setUsers((current) => current.map((item) => (item.id === id ? { ...item, role } : item)));
    }
  }

  async function deleteUser(id: string) {
    const response = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    const data = await response.json();
    setMessage(data.message ?? "User removed.");
    if (response.ok) {
      setUsers((current) => current.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-2xl font-semibold text-text">Team access</h2>
        <p className="mt-2 text-sm text-muted">
          Main admin controls users, roles, and permissions. Operations staff are limited to content workflows.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-card">
              <tr>
                <th className="px-4 py-3 text-muted">Name</th>
                <th className="px-4 py-3 text-muted">Email</th>
                <th className="px-4 py-3 text-muted">Role</th>
                <th className="px-4 py-3 text-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-text">{user.fullName}</td>
                  <td className="px-4 py-3 text-text">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded-lg border border-border bg-card px-3 py-2 text-text"
                      onChange={(event) => updateRole(user.id, event.target.value as RoleName)}
                      value={user.role}
                    >
                      <option value="main_admin">main_admin</option>
                      <option value="operations_staff">operations_staff</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-danger" onClick={() => deleteUser(user.id)} type="button">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form className="rounded-2xl border border-border bg-panel p-6" onSubmit={inviteUser}>
        <h3 className="text-xl font-semibold text-text">Invite user</h3>
        <div className="mt-6 space-y-4">
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            placeholder="Full name"
            required
            value={form.fullName}
          />
          <input
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="Email"
            required
            type="email"
            value={form.email}
          />
          <select
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value as RoleName }))}
            value={form.role}
          >
            <option value="operations_staff">operations_staff</option>
            <option value="main_admin">main_admin</option>
          </select>
        </div>
        <button className="mt-6 rounded-xl bg-primary px-5 py-3 font-semibold text-black" type="submit">
          Send invite
        </button>
        {message ? <p className="mt-4 text-sm text-mint">{message}</p> : null}
      </form>
    </div>
  );
}
