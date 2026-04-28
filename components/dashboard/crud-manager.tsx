"use client";

import { useMemo, useState, type FormEvent } from "react";

export type CrudField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "select";
  options?: string[];
};

type CrudManagerProps = {
  title: string;
  description: string;
  entity: string;
  fields: CrudField[];
  initialItems: Record<string, unknown>[];
};

function defaultState(fields: CrudField[]) {
  return fields.reduce<Record<string, string>>((accumulator, field) => {
    accumulator[field.name] = "";
    return accumulator;
  }, {});
}

export function CrudManager({ title, description, entity, fields, initialItems }: CrudManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const emptyState = useMemo(() => defaultState(fields), [fields]);
  const [form, setForm] = useState<Record<string, string>>(emptyState);

  function startEdit(item: Record<string, unknown>) {
    setEditingId(String(item.id));
    setForm(
      fields.reduce<Record<string, string>>((accumulator, field) => {
        const value = item[field.name];
        accumulator[field.name] = value == null ? "" : String(value);
        return accumulator;
      }, {})
    );
  }

  function reset() {
    setEditingId(null);
    setForm(emptyState);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    const method = editingId ? "PATCH" : "POST";
    const response = await fetch("/api/admin/content", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity,
        id: editingId,
        payload: form
      })
    });

    const data = await response.json();
    setBusy(false);
    setMessage(data.message ?? "Saved.");

    if (response.ok && data.item) {
      const updatedItem = data.item as Record<string, unknown>;
      setItems((current) => {
        if (editingId) {
          return current.map((item) => (String(item.id) === editingId ? updatedItem : item));
        }
        return [updatedItem, ...current];
      });
      reset();
    }
  }

  async function handleDelete(id: string) {
    setBusy(true);
    const response = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity,
        id
      })
    });
    const data = await response.json();
    setBusy(false);
    setMessage(data.message ?? "Deleted.");
    if (response.ok) {
      setItems((current) => current.filter((item) => String(item.id) !== id));
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-border bg-panel p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">{title}</h2>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </div>
          {editingId ? (
            <button className="text-sm text-primary" onClick={reset} type="button">
              Cancel edit
            </button>
          ) : null}
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-card">
              <tr>
                {fields.slice(0, 4).map((field) => (
                  <th className="px-4 py-3 font-medium text-muted" key={field.name}>
                    {field.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={String(item.id)}>
                  {fields.slice(0, 4).map((field) => (
                    <td className="px-4 py-3 text-text" key={field.name}>
                      {String(item[field.name] ?? "-")}
                    </td>
                  ))}
                  <td className="flex gap-3 px-4 py-3">
                    <button className="text-primary" onClick={() => startEdit(item)} type="button">
                      Edit
                    </button>
                    <button className="text-danger" onClick={() => handleDelete(String(item.id))} type="button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form className="rounded-2xl border border-border bg-panel p-6" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold text-text">{editingId ? "Edit item" : "Create item"}</h3>
        <div className="mt-6 space-y-4">
          {fields.map((field) => (
            <label className="block" key={field.name}>
              <span className="mb-2 block text-sm text-muted">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  className="min-h-24 w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  value={form[field.name] ?? ""}
                />
              ) : field.type === "select" ? (
                <select
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  value={form[field.name] ?? ""}
                >
                  <option value="">Select</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text"
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  type={field.type === "date" ? "datetime-local" : "text"}
                  value={form[field.name] ?? ""}
                />
              )}
            </label>
          ))}
        </div>
        <button
          className="mt-6 rounded-xl bg-primary px-5 py-3 font-semibold text-black transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
          disabled={busy}
          type="submit"
        >
          {busy ? "Saving..." : editingId ? "Update" : "Create"}
        </button>
        {message ? <p className="mt-3 text-sm text-mint">{message}</p> : null}
      </form>
    </div>
  );
}
