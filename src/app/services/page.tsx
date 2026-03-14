import type { Metadata } from "next";
import Link from "next/link";
import { getServicesPageContent, getBookingSchedule, getBookingExceptions } from "@/sanity/queries";
import PackageCards from "./PackageCards";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Photography packages and pricing for family portraits, weddings, engagements, senior portraits, headshots, and pet photography in Southern Maine.",
};

export const dynamic = "force-dynamic";

const fallbackPackages = [
  {
    name: "Mini Session",
    price: "Starting at $250",
    duration: "30 minutes",
    description: "Perfect for quick updates, holiday cards, or single-subject sessions.",
    features: [
      "30-minute session",
      "1 location",
      "15+ edited digital images",
      "Online gallery for sharing & downloading",
      "Print-ready high-resolution files",
    ],
    popular: false,
  },
  {
    name: "Standard Session",
    price: "Starting at $450",
    duration: "1 hour",
    description: "Our most popular package — ideal for families, couples, seniors, and headshots.",
    features: [
      "1-hour session",
      "Up to 2 locations",
      "40+ edited digital images",
      "Online gallery for sharing & downloading",
      "Print-ready high-resolution files",
      "Outfit change included",
      "Location scouting assistance",
    ],
    popular: true,
  },
  {
    name: "Extended Session",
    price: "Starting at $650",
    duration: "2 hours",
    description: "Great for larger families, multi-generational sessions, or when you want more variety.",
    features: [
      "2-hour session",
      "Up to 3 locations",
      "75+ edited digital images",
      "Online gallery for sharing & downloading",
      "Print-ready high-resolution files",
      "Multiple outfit changes",
      "Location scouting assistance",
      "Sneak peek within 48 hours",
    ],
    popular: false,
  },
];

const fallbackWeddingPackages = [
  {
    name: "Elopement / Intimate",
    price: "Starting at $1,500",
    duration: "Up to 4 hours",
    features: [
      "Up to 4 hours of coverage",
      "200+ edited digital images",
      "Online gallery",
      "Engagement session included",
      "Timeline planning assistance",
    ],
  },
  {
    name: "Full Wedding",
    price: "Starting at $3,000",
    duration: "Up to 8 hours",
    features: [
      "Up to 8 hours of coverage",
      "500+ edited digital images",
      "Online gallery",
      "Engagement session included",
      "Second photographer option",
      "Timeline planning assistance",
      "Sneak peek within 48 hours",
    ],
  },
  {
    name: "Premium Wedding",
    price: "Starting at $4,500",
    duration: "Full day",
    features: [
      "Full-day coverage (10+ hours)",
      "800+ edited digital images",
      "Online gallery",
      "Engagement session included",
      "Second photographer included",
      "Bridal session included",
      "Timeline planning assistance",
      "Sneak peek within 24 hours",
      "Premium wedding album",
    ],
  },
];

const fallbackAddOns = [
  { name: "Additional edited images (per 10)", price: "$75" },
  { name: "Rush delivery (48-hour turnaround)", price: "$150" },
  { name: "Print package (assorted sizes)", price: "$200+" },
  { name: "Photo album (custom designed)", price: "$350+" },
  { name: "Travel fee (outside Southern Maine)", price: "$0.60/mile" },
  { name: "Second photographer (weddings)", price: "$500" },
];

export default async function ServicesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageContent: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let schedule: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let exceptions: any[] = [];

  try {
    const results = await Promise.all([
      getServicesPageContent(),
      getBookingSchedule(),
      getBookingExceptions(),
    ]);
    pageContent = results[0];
    schedule = results[1];
    exceptions = results[2] || [];
  } catch {
    // Sanity not configured yet
  }

  const heroSubtitle = pageContent?.heroSubtitle || "Services & Pricing";
  const heroTitle = pageContent?.heroTitle || "Investment in Your Memories";
  const heroDescription = pageContent?.heroDescription || "Every session is customized to fit your needs. Below are starting prices — reach out for a personalized quote.";
  const portraitSectionTitle = pageContent?.portraitSectionTitle || "Portrait Sessions";
  const portraitSectionSubtitle = pageContent?.portraitSectionSubtitle || "Families \u2022 Seniors \u2022 Headshots \u2022 Couples \u2022 Pets \u2022 Maternity";
  const weddingSectionTitle = pageContent?.weddingSectionTitle || "Wedding Collections";
  const weddingSectionSubtitle = pageContent?.weddingSectionSubtitle || "Every love story deserves to be told beautifully";
  const ctaTitle = pageContent?.ctaTitle || "Not Sure Which Package Is Right?";
  const ctaDescription = pageContent?.ctaDescription || "I'm happy to create a custom package that fits your needs and budget. Let's chat!";

  const packages = pageContent?.portraitPackages && pageContent.portraitPackages.length > 0
    ? pageContent.portraitPackages
    : fallbackPackages;

  const weddingPackages = pageContent?.weddingPackages && pageContent.weddingPackages.length > 0
    ? pageContent.weddingPackages
    : fallbackWeddingPackages;

  const addOns = pageContent?.addOns && pageContent.addOns.length > 0
    ? pageContent.addOns
    : fallbackAddOns;

  const availableDays = (schedule?.availableDays || ["0", "6"]).map(Number);
  const weeksOut = schedule?.weeksOut || 12;

  return (
    <>
      <HeroBanner
        image={pageContent?.heroImage}
        subtitle={heroSubtitle}
        title={heroTitle}
        description={heroDescription}
      />

      {/* Package cards + booking modal */}
      <PackageCards
        packages={packages}
        weddingPackages={weddingPackages}
        portraitSectionTitle={portraitSectionTitle}
        portraitSectionSubtitle={portraitSectionSubtitle}
        weddingSectionTitle={weddingSectionTitle}
        weddingSectionSubtitle={weddingSectionSubtitle}
        availableDays={availableDays}
        weeksOut={weeksOut}
        exceptions={exceptions}
      />

      {/* Add-ons */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-warm-900 text-center mb-12">
            Add-Ons &amp; Extras
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {addOns.map((addon: { name: string; price: string }) => (
              <div
                key={addon.name}
                className="flex items-center justify-between bg-white p-6"
              >
                <span className="text-warm-700 text-sm">{addon.name}</span>
                <span className="font-heading text-warm-800 font-semibold ml-4 whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-warm-800 text-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            {ctaTitle}
          </h2>
          <p className="text-warm-300 text-lg mb-10 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-warm-50 text-warm-800 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-100 transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  );
}
