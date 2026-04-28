import { sendTalentAdminNotification } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    phone?: string;
    category?: string;
    city?: string;
    portfolioUrl?: string;
    notes?: string;
  };

  if (!body.fullName || !body.email || !body.phone || !body.category || !body.city) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return NextResponse.json(
      { message: "Supabase service role is required to save applications." },
      { status: 503 }
    );
  }

  const { error } = await admin.from("talent_applications").insert({
    full_name: body.fullName,
    email: body.email,
    phone: body.phone,
    category: body.category,
    city: body.city,
    portfolio_url: body.portfolioUrl ?? "",
    notes: body.notes ?? ""
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await sendTalentAdminNotification(body.fullName, body.email, body.category);

  return NextResponse.json({
    message: "Thanks. Your application has been received and sent to the BAZZARNA admin team."
  });
}

