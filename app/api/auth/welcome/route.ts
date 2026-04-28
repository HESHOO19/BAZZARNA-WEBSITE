import { sendWelcomeEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, fullName, userId } = (await request.json()) as {
    email?: string;
    fullName?: string;
    userId?: string;
  };

  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  if (admin && userId) {
    await admin.from("profiles").upsert({
      id: userId,
      email,
      full_name: fullName ?? ""
    });
  }

  await sendWelcomeEmail(email, fullName ?? "there");

  return NextResponse.json({ message: "Welcome email processed." });
}

