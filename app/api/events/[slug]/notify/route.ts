import { sendNotifyMeEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  const { email } = (await request.json()) as { email?: string };

  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return NextResponse.json(
      { message: "Supabase service role is required to save notifications." },
      { status: 503 }
    );
  }

  const { data: event } = await admin
    .from("events")
    .select("id, title, location_name, google_maps_url")
    .eq("slug", slug)
    .maybeSingle();

  if (!event) {
    return NextResponse.json({ message: "Event not found." }, { status: 404 });
  }

  await admin.from("event_notifications").insert({
    event_id: event.id,
    email
  });

  await sendNotifyMeEmail(email, event.title, event.location_name, event.google_maps_url);

  return NextResponse.json({
    message: `You're set. ${event.title} details will be sent to ${email}.`
  });
}
