import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

async function sendEmail(payload: EmailPayload) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return {
      sent: false,
      reason: "Email provider is not configured."
    };
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    ...payload
  });

  return { sent: true };
}

export async function sendWelcomeEmail(email: string, fullName: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to BAZZARNA",
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>Welcome to BAZZARNA, ${fullName || "there"}.</h2>
      <p>Your account is ready. You can now browse events, save reminders, and stay close to new brand drops.</p>
    </div>`
  });
}

export async function sendNotifyMeEmail(email: string, eventTitle: string, location: string, mapsUrl: string) {
  return sendEmail({
    to: email,
    subject: `Your BAZZARNA reminder for ${eventTitle}`,
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>${eventTitle}</h2>
      <p>You're on the list for updates.</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><a href="${mapsUrl}">Open Google Maps</a></p>
    </div>`
  });
}

export async function sendEventReminderEmail(email: string, eventTitle: string, startAt: string, location: string) {
  return sendEmail({
    to: email,
    subject: `Reminder: ${eventTitle} starts in 3 days`,
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>${eventTitle} is almost here.</h2>
      <p><strong>Starts:</strong> ${new Date(startAt).toLocaleString()}</p>
      <p><strong>Location:</strong> ${location}</p>
    </div>`
  });
}

export async function sendTalentAdminNotification(name: string, email: string, category: string) {
  const adminEmail = process.env.BAZZARNA_ADMIN_EMAIL;

  if (!adminEmail) {
    return {
      sent: false,
      reason: "Admin email is not configured."
    };
  }

  return sendEmail({
    to: adminEmail,
    subject: `New talent application: ${name}`,
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Category:</strong> ${category}</p>
    </div>`
  });
}

export async function sendTalentStatusEmail(
  email: string,
  fullName: string,
  status: "accepted" | "rejected"
) {
  const subject =
    status === "accepted"
      ? "Your BAZZARNA application has been accepted"
      : "Update on your BAZZARNA application";

  const body =
    status === "accepted"
      ? "We'd love to move forward with you. The team will follow up with next steps shortly."
      : "Thank you for applying. We won't be moving forward this time, but we appreciate your interest.";

  return sendEmail({
    to: email,
    subject,
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>Hello ${fullName},</h2>
      <p>${body}</p>
    </div>`
  });
}

