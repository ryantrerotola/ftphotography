import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, sessionType, message } = body;

    // Basic validation
    if (!name || !email || !sessionType || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // In production, integrate with your email service (e.g., SendGrid, Resend, Mailgun)
    // or a CRM system. For now, we log the inquiry.
    console.log("New inquiry received:", {
      name,
      email,
      phone: body.phone,
      sessionType,
      preferredDate: body.preferredDate,
      message,
      howDidYouHear: body.howDidYouHear,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email notification
    // await sendEmail({
    //   to: "hello@francescatrerotolaphotography.com",
    //   subject: `New Inquiry from ${name}`,
    //   body: `...`,
    // });

    return NextResponse.json(
      { success: true, message: "Inquiry received! I'll be in touch soon." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
