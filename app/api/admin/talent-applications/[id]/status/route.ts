import { getCurrentRole } from "@/lib/auth";
import { sendTalentStatusEmail } from "@/lib/email";
import { hasPermission } from "@/lib/permissions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const role = await getCurrentRole();
  if (!hasPermission(role, "talent.review")) {
    return NextResponse.json({ message: "You do not have permission to review talent." }, { status: 403 });
  }

  const { id } = context.params;
  const { status } = (await request.json()) as { status?: "accepted" | "rejected" };

  if (!status || !["accepted", "rejected"].includes(status)) {
    return NextResponse.json({ message: "A valid status is required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase service role is not configured." }, { status: 503 });
  }

  const { data, error } = await admin
    .from("talent_applications")
    .update({ status })
    .eq("id", id)
    .select("email, full_name")
    .single();

  if (error || !data) {
    return NextResponse.json({ message: error?.message ?? "Application not found." }, { status: 500 });
  }

  await sendTalentStatusEmail(data.email, data.full_name, status);

  return NextResponse.json({
    message:
      status === "accepted"
        ? "Application accepted and confirmation email sent."
        : "Application rejected and rejection email sent."
  });
}
