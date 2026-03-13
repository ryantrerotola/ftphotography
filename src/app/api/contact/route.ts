import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SESSION_TYPE_LABELS: Record<string, string> = {
  family: "Family Portraits",
  wedding: "Wedding",
  engagement: "Engagement / Proposal",
  senior: "Senior Portraits",
  headshot: "Headshots",
  pet: "Pet Photography",
  maternity: "Maternity",
  other: "Other",
};

const REFERRAL_LABELS: Record<string, string> = {
  google: "Google Search",
  instagram: "Instagram",
  facebook: "Facebook",
  referral: "Friend / Family Referral",
  "wedding-wire": "Wedding Wire",
  "the-knot": "The Knot",
  other: "Other",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, sessionType, message } = body;

    if (!name || !email || !sessionType || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const sessionLabel = SESSION_TYPE_LABELS[sessionType] || sessionType;
    const referralLabel = body.howDidYouHear
      ? REFERRAL_LABELS[body.howDidYouHear] || body.howDidYouHear
      : "Not specified";

    await resend.emails.send({
      from: `Website Contact <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: process.env.CONTACT_EMAIL || "hello@francescatrerotolaphotography.com",
      replyTo: email,
      subject: `New Inquiry from ${name} — ${sessionLabel}`,
      html: `
        <h2>New Photography Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px;">${escapeHtml(name)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Email</td>
            <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Phone</td>
            <td style="padding: 8px 12px;">${escapeHtml(body.phone || "Not provided")}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Session Type</td>
            <td style="padding: 8px 12px;">${escapeHtml(sessionLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Preferred Date</td>
            <td style="padding: 8px 12px;">${escapeHtml(body.preferredDate || "Not specified")}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 8px 12px;">${escapeHtml(message).replace(/\n/g, "<br>")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">How They Found You</td>
            <td style="padding: 8px 12px;">${escapeHtml(referralLabel)}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Inquiry received! I'll be in touch soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
