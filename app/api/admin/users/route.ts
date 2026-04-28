import { getCurrentRole } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { RoleName } from "@/lib/types";
import { NextResponse } from "next/server";

async function ensureMainAdmin() {
  const role = await getCurrentRole();
  return hasPermission(role, "users.manage");
}

export async function POST(request: Request) {
  if (!(await ensureMainAdmin())) {
    return NextResponse.json({ message: "Only the main admin can invite users." }, { status: 403 });
  }

  const { fullName, email, role } = (await request.json()) as {
    fullName?: string;
    email?: string;
    role?: RoleName;
  };

  if (!email || !role) {
    return NextResponse.json({ message: "Email and role are required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: fullName ?? ""
    }
  });

  if (error || !data.user) {
    return NextResponse.json({ message: error?.message ?? "Unable to invite user." }, { status: 500 });
  }

  await admin.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: fullName ?? ""
  });

  await admin.from("user_roles").upsert({
    user_id: data.user.id,
    role_name: role
  });

  return NextResponse.json({
    message: "Invitation sent.",
    item: {
      id: data.user.id,
      fullName: fullName ?? "",
      email,
      role
    }
  });
}

export async function PATCH(request: Request) {
  if (!(await ensureMainAdmin())) {
    return NextResponse.json({ message: "Only the main admin can update users." }, { status: 403 });
  }

  const { id, role } = (await request.json()) as { id?: string; role?: RoleName };

  if (!id || !role) {
    return NextResponse.json({ message: "User id and role are required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const { error } = await admin.from("user_roles").upsert({
    user_id: id,
    role_name: role
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User role updated." });
}

export async function DELETE(request: Request) {
  if (!(await ensureMainAdmin())) {
    return NextResponse.json({ message: "Only the main admin can remove users." }, { status: 403 });
  }

  const { id } = (await request.json()) as { id?: string };

  if (!id) {
    return NextResponse.json({ message: "User id is required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User removed." });
}

