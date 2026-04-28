import { sendEventReminderEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const reminderDate = new Date();
  reminderDate.setDate(reminderDate.getDate() + 3);

  const isoDate = reminderDate.toISOString().slice(0, 10);

  const { data: events, error } = await admin
    .from("events")
    .select("id, title, start_at, location_name, event_notifications(email)")
    .gte("start_at", `${isoDate}T00:00:00.000Z`)
    .lt("start_at", `${isoDate}T23:59:59.999Z`);

  if (error || !events) {
    return NextResponse.json({ message: error?.message ?? "No events found." }, { status: 500 });
  }

  for (const event of events) {
    const recipients = Array.isArray(event.event_notifications) ? event.event_notifications : [];
    for (const recipient of recipients) {
      if (recipient?.email) {
        await sendEventReminderEmail(recipient.email, event.title, event.start_at, event.location_name);
      }
    }
  }

  return NextResponse.json({ message: `Processed reminders for ${events.length} event(s).` });
}

