import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getTestimonials, getAboutContent, getHomePageContent } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const fallbackServices = [
  {
    title: "Family Portraits",
    description:
      "Relaxed, joyful sessions that capture your family's unique connection — laughing, playing, and being yourselves.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Weddings",
    description:
      "Documenting every heartfelt moment of your big day — from getting ready to the last dance.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Engagements & Proposals",
    description:
      "Whether it's a surprise proposal or a celebration session, I'll make sure these moments last forever.",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  {
    title: "Senior Portraits",
    description:
      "Celebrate this milestone with portraits that show off your personality, style, and excitement for what's ahead.",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    title: "Headshots",
    description:
      "Professional, approachable headshots for your business, LinkedIn, or creative portfolio.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    title: "Pet Photography",
    description:
      "Your furry family members deserve to be immortalized too. Let's capture their personality!",
    icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
  },
];

const serviceIcons: Record<string, string> = {
  "Family Portraits": "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  "Weddings": "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "Engagements & Proposals": "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  "Senior Portraits": "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  "Headshots": "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  "Pet Photography": "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
};

const defaultIcon = "M13 10V3L4 14h7v7l9-11h-7z";

const fallbackTestimonials = [
  {
    _id: "1",
    quote:
      "Francesca made our whole family feel so comfortable — even our toddler who never sits still! The photos turned out absolutely beautiful.",
    clientName: "Sarah M.",
    sessionType: "Family Session",
  },
  {
    _id: "2",
    quote:
      "She captured our engagement so naturally. We were laughing the entire time and the photos reflect that genuine joy. Couldn't recommend her more!",
    clientName: "Emily & Jake",
    sessionType: "Engagement Session",
  },
  {
    _id: "3",
    quote:
      "I've never felt so relaxed in front of a camera. Francesca has this gift of making you forget you're even being photographed.",
    clientName: "Rachel T.",
    sessionType: "Senior Portraits",
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  let testimonials = fallbackTestimonials;
  let aboutContent = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageContent: any = null;

  try {
    const sanityTestimonials = await getTestimonials();
    if (sanityTestimonials && sanityTestimonials.length > 0) {
      testimonials = sanityTestimonials;
    }
    aboutContent = await getAboutContent();
    pageContent = await getHomePageContent();
  } catch {
    // Sanity not configured yet, use fallback data
  }

  const heroSubtitle = pageContent?.heroSubtitle || "Southern Maine Portrait & Lifestyle Photographer";
  const heroTitle = pageContent?.heroTitle || "Capturing Authentic Joy & Love";
  const heroDescription = pageContent?.heroDescription || "Nothing thrills me more than capturing authentic joy, wonder, love, and laughter. Based in Cumberland, Maine — I create flattering and emotional lifestyle photographs throughout New England.";
  const aboutSubtitle = pageContent?.aboutSubtitle || "Meet Francesca";
  const aboutTitle = pageContent?.aboutTitle || "A Mom, an Artist, & Your Biggest Fan";
  const servicesSubtitle = pageContent?.servicesSubtitle || "What I Offer";
  const servicesTitle = pageContent?.servicesTitle || "Photography Services";
  const servicesDescription = pageContent?.servicesDescription || "Every session is tailored to you. Whether it's a wedding, a family reunion, or a headshot for your business — I bring the same warmth and dedication to every shoot.";
  const testimonialsSubtitle = pageContent?.testimonialsSubtitle || "Kind Words";
  const testimonialsTitle = pageContent?.testimonialsTitle || "What Clients Are Saying";
  const ctaTitle = pageContent?.ctaTitle || "Ready to Create Something Beautiful?";
  const ctaDescription = pageContent?.ctaDescription || "Let's capture the moments that matter most to you. Whether it's your wedding day, a family milestone, or simply celebrating who you are — I'd love to be part of it.";

  const services = pageContent?.services && pageContent.services.length > 0
    ? pageContent.services.map((s: { title: string; description: string }) => ({
        title: s.title,
        description: s.description,
        icon: serviceIcons[s.title] || defaultIcon,
      }))
    : fallbackServices;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        {pageContent?.heroImage ? (
          <Image
            src={urlFor(pageContent.heroImage).width(1920).height(1080).url()}
            alt="Francesca Trerotola Photography"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-warm-100" />
        )}
        <div className="absolute inset-0 bg-warm-900/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-warm-100 tracking-[0.4em] uppercase text-sm mb-6 drop-shadow-sm">
            {heroSubtitle}
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-8 leading-tight drop-shadow-md">
            {heroTitle.includes("&") ? (
              <>
                {heroTitle.split("&")[0].trim()}
                <br />
                <span className="italic text-warm-200">&amp; {heroTitle.split("&").slice(1).join("&").trim()}</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>
          <p className="text-lg md:text-xl text-warm-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-sm">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="bg-warm-50 text-warm-800 px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition-colors w-full sm:w-auto"
            >
              Book Your Session
            </Link>
            <Link
              href="/portfolio"
              className="border border-warm-100 text-warm-50 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-50/20 transition-colors w-full sm:w-auto"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-warm-200 aspect-[4/5] flex items-center justify-center text-warm-400 relative overflow-hidden">
              {aboutContent?.homePhoto ? (
                <Image
                  src={urlFor(aboutContent.homePhoto).width(800).height(1000).url()}
                  alt="Francesca Trerotola"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Add your photo here</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
                {aboutSubtitle}
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-warm-900 mb-6">
                {aboutTitle}
              </h2>
              <div className="space-y-4 text-warm-700 leading-relaxed">
                {aboutContent?.homeBio && aboutContent.homeBio.length > 0 ? (
                  <PortableText value={aboutContent.homeBio} />
                ) : (
                  <>
                    <p>
                      Hi there! I&apos;m Francesca — a photographer, a mom of two, and
                      someone who genuinely believes that the best photos come from
                      the most real moments.
                    </p>
                    <p>
                      My approach is simple: I find the most flattering light, help
                      you feel natural in front of the camera, and then let the magic
                      happen. I might put on some music, wear a funny hat, or break
                      out a squeaky toy — whatever it takes to get those genuine
                      smiles.
                    </p>
                    <p>
                      I want to catch you dancing, laughing, playing, and moving.
                      Because <em>that&apos;s</em> who you really are.
                    </p>
                  </>
                )}
              </div>
              <Link
                href="/about"
                className="inline-block mt-8 text-warm-700 border-b border-warm-400 hover:border-warm-700 transition-colors text-sm tracking-wide uppercase pb-1"
              >
                More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sage-600 tracking-[0.3em] uppercase text-sm mb-4">
              {servicesSubtitle}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-warm-900 mb-6">
              {servicesTitle}
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              {servicesDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: { title: string; description: string; icon: string }) => (
              <div
                key={service.title}
                className="bg-white p-8 hover:shadow-lg transition-shadow group"
              >
                <svg
                  className="w-10 h-10 text-warm-500 mb-6 group-hover:text-warm-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={service.icon}
                  />
                </svg>
                <h3 className="font-heading text-xl text-warm-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-warm-700 text-warm-50 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
            >
              View Packages &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
              {testimonialsSubtitle}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-warm-900">
              {testimonialsTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t._id} className="bg-white p-8">
                <svg
                  className="w-8 h-8 text-warm-300 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="text-warm-700 italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading text-warm-900 font-semibold">
                    {t.clientName}
                  </p>
                  <p className="text-warm-500 text-sm">{t.sessionType}</p>
                </div>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="bg-warm-50 text-warm-800 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-100 transition-colors w-full sm:w-auto"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="border border-warm-400 text-warm-200 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-700 transition-colors w-full sm:w-auto"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Francesca Trerotola Photography",
            description:
              "Lifestyle & portrait photographer based in Cumberland, Maine. Specializing in family portraits, weddings, engagements, senior portraits, headshots, and pet photography.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Cumberland",
              addressRegion: "ME",
              addressCountry: "US",
            },
            areaServed: [
              { "@type": "State", name: "Maine" },
              { "@type": "Place", name: "New England" },
            ],
            url: "https://www.francescatrerotolaphotography.com",
            priceRange: "$$",
            image: "https://www.francescatrerotolaphotography.com/images/og.jpg",
          }),
        }}
      />
    </>
  );
}
