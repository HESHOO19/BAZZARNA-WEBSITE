import { getCurrentRole } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

const entityMap: Record<string, string> = {
  events: "events",
  brands: "brands",
  sponsors: "sponsors",
  media_assets: "media_assets"
};

function parseJsonIfNeeded(key: string, value: string) {
  if (["stock_preview", "gallery", "body", "zone_summary", "brand_ids", "sponsor_ids"].includes(key)) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}

async function canManageEntity(entity: string) {
  const role = await getCurrentRole();

  switch (entity) {
    case "events":
      return hasPermission(role, "events.manage");
    case "brands":
      return hasPermission(role, "brands.manage");
    case "sponsors":
      return hasPermission(role, "sponsors.manage");
    case "media_assets":
      return hasPermission(role, "media.manage");
    default:
      return false;
  }
}

function normalizePayload(payload: Record<string, string>) {
  const entries = Object.entries(payload).map(([key, value]) => [key, parseJsonIfNeeded(key, value)]);
  const normalized = Object.fromEntries(entries);

  if (typeof normalized.title === "string" && !normalized.slug) {
    normalized.slug = slugify(String(normalized.title));
  }

  if (typeof normalized.name === "string" && !normalized.slug) {
    normalized.slug = slugify(String(normalized.name));
  }

  return normalized;
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    entity?: string;
    payload?: Record<string, string>;
  };

  if (!body.entity || !body.payload) {
    return NextResponse.json({ message: "Entity and payload are required." }, { status: 400 });
  }

  if (!(await canManageEntity(body.entity))) {
    return NextResponse.json({ message: "You do not have permission to create this content." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const table = entityMap[body.entity];
  if (!table) {
    return NextResponse.json({ message: "Unsupported entity." }, { status: 400 });
  }

  const role = await getCurrentRole();
  const payload = normalizePayload(body.payload);

  if (table === "brands" && !hasPermission(role, "brands.stock")) {
    delete payload.stock_preview;
  }

  const { data, error } = await admin.from(table).insert(payload).select("*").single();
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Created successfully.", item: data });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    entity?: string;
    id?: string;
    payload?: Record<string, string>;
  };

  if (!body.entity || !body.id || !body.payload) {
    return NextResponse.json({ message: "Entity, id, and payload are required." }, { status: 400 });
  }

  if (!(await canManageEntity(body.entity))) {
    return NextResponse.json({ message: "You do not have permission to update this content." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const table = entityMap[body.entity];
  if (!table) {
    return NextResponse.json({ message: "Unsupported entity." }, { status: 400 });
  }

  const role = await getCurrentRole();
  const payload = normalizePayload(body.payload);

  if (table === "brands" && !hasPermission(role, "brands.stock")) {
    delete payload.stock_preview;
  }

  const { data, error } = await admin.from(table).update(payload).eq("id", body.id).select("*").single();
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Updated successfully.", item: data });
}

export async function DELETE(request: Request) {
  const body = (await request.json()) as {
    entity?: string;
    id?: string;
  };

  if (!body.entity || !body.id) {
    return NextResponse.json({ message: "Entity and id are required." }, { status: 400 });
  }

  if (!(await canManageEntity(body.entity))) {
    return NextResponse.json({ message: "You do not have permission to delete this content." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const table = entityMap[body.entity];
  if (!table) {
    return NextResponse.json({ message: "Unsupported entity." }, { status: 400 });
  }

  const { error } = await admin.from(table).delete().eq("id", body.id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully." });
}

