import type { Metadata } from "next";
import Link from "next/link";
import { getBookingPageContent } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Check availability and book your photography session with Francesca Trerotola Photography in Southern Maine.",
};

export const dynamic = "force-dynamic";

const fallbackSteps = [
  {
    title: "Reach Out",
    description:
      "Fill out the inquiry form or send me an email with your session details and preferred dates.",
  },
  {
    title: "Let's Chat",
    description:
      "We'll discuss your vision, choose the perfect package, and lock in your date with a retainer.",
  },
  {
    title: "Show Up & Shine",
    description:
      "On session day, just bring yourselves (and maybe some snacks for the little ones). I'll handle the rest!",
  },
];

const fallbackMonths = [
  {
    month: "April 2026",
    status: "limited" as const,
    note: "A few weekend slots remaining",
  },
  {
    month: "May 2026",
    status: "limited" as const,
    note: "Peak season — booking fast",
  },
  {
    month: "June 2026",
    status: "available" as const,
    note: "Weekday and weekend availability",
  },
  {
    month: "July 2026",
    status: "available" as const,
    note: "Summer sessions available",
  },
  {
    month: "August 2026",
    status: "available" as const,
    note: "Great for senior portraits",
  },
  {
    month: "September 2026",
    status: "available" as const,
    note: "Beautiful fall light begins",
  },
];

const fallbackFaqs = [
  {
    question: "How far in advance should I book?",
    answer: "For portrait sessions, I recommend booking 2\u20134 weeks in advance. For weddings, 6\u201312 months is ideal, especially during peak season (May\u2013October).",
  },
  {
    question: "What happens if it rains?",
    answer: "No worries! We'll reschedule to the next available date at no extra charge. I monitor the weather closely and will reach out in advance if we need to adjust.",
  },
  {
    question: "Do you travel outside of Southern Maine?",
    answer: "Absolutely! I love traveling throughout New England for sessions. A travel fee applies for locations beyond Southern Maine (starting at $0.60/mile).",
  },
  {
    question: "How long until I receive my photos?",
    answer: "Portrait sessions are typically delivered within 2\u20133 weeks. Weddings take 6\u20138 weeks. Sneak peeks are available within 24\u201348 hours!",
  },
  {
    question: "What should we wear?",
    answer: "I send a detailed style guide after booking! Generally, I recommend coordinating (not matching) outfits in soft, neutral tones. Avoid large logos and neon colors.",
  },
  {
    question: "Is a deposit required to book?",
    answer: "Yes, a non-refundable retainer (typically 30% of your package) is required to secure your date. The remaining balance is due one week before your session.",
  },
];

const statusColors: Record<string, string> = {
  available: "bg-sage-100 text-sage-700 border-sage-300",
  limited: "bg-warm-100 text-warm-700 border-warm-300",
  booked: "bg-warm-200 text-warm-500 border-warm-300",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  limited: "Limited",
  booked: "Fully Booked",
};

export default async function BookingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageContent: any = null;

  try {
    pageContent = await getBookingPageContent();
  } catch {
    // Sanity not configured yet
  }

  const heroSubtitle = pageContent?.heroSubtitle || "Booking";
  const heroTitle = pageContent?.heroTitle || "Book Your Session";
  const heroDescription = pageContent?.heroDescription || "Ready to create some beautiful memories? Check my availability below and let's find the perfect date for your session.";
  const availabilityTitle = pageContent?.availabilityTitle || "Current Availability";
  const availabilityNote = pageContent?.availabilityNote || "Updated regularly — reach out to confirm specific dates";
  const availabilityFootnote = pageContent?.availabilityFootnote || "Don't see your preferred month? I book up to 12 months in advance for weddings.";

  const steps = pageContent?.steps && pageContent.steps.length > 0
    ? pageContent.steps
    : fallbackSteps;

  const months = pageContent?.months && pageContent.months.length > 0
    ? pageContent.months
    : fallbackMonths;

  const faqs = pageContent?.faqs && pageContent.faqs.length > 0
    ? pageContent.faqs
    : fallbackFaqs;

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
            {heroSubtitle}
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warm-900 mb-6">
            {heroTitle}
          </h1>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-warm-900 text-center mb-16">
            How Booking Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step: { title: string; description: string }, i: number) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 bg-warm-200 flex items-center justify-center font-heading text-warm-700 text-2xl mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="font-heading text-xl text-warm-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability calendar */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-warm-900 mb-4">
              {availabilityTitle}
            </h2>
            <p className="text-warm-600">
              {availabilityNote}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {months.map((m: { month: string; status: string; note: string }) => (
              <div
                key={m.month}
                className={`border p-6 ${statusColors[m.status] || statusColors.available}`}
              >
                <h3 className="font-heading text-lg mb-1">{m.month}</h3>
                <span className="text-xs tracking-widest uppercase font-semibold">
                  {statusLabels[m.status] || m.status}
                </span>
                <p className="text-sm mt-2 opacity-80">{m.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-warm-500 text-sm mt-8">
            {availabilityFootnote}{" "}
            <Link href="/contact" className="underline">
              Ask about future dates
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Quick inquiry */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-warm-900 mb-6">
            Ready to Book?
          </h2>
          <p className="text-warm-600 text-lg mb-10">
            Head over to my contact page to send me the details of your dream
            session. I can&apos;t wait to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-warm-700 text-warm-50 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors w-full sm:w-auto"
            >
              Send an Inquiry
            </Link>
            <Link
              href="/services"
              className="border border-warm-700 text-warm-700 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-700 hover:text-warm-50 transition-colors w-full sm:w-auto"
            >
              View Pricing First
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-warm-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-warm-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq: { question: string; answer: string }) => (
              <div key={faq.question} className="bg-white p-6">
                <h3 className="font-heading text-lg text-warm-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
