import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getAboutContent } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Francesca Trerotola — a lifestyle photographer, mom of two, and your biggest fan behind the camera. Based in Cumberland, Maine.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let aboutContent = null;

  try {
    aboutContent = await getAboutContent();
  } catch {
    // Sanity not configured yet
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
            About
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warm-900 mb-6">
            Hey, I&apos;m Francesca!
          </h1>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            Photographer, mom of two, and professional moment-catcher based in
            Cumberland, Maine.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-warm-200 aspect-[3/4] flex items-center justify-center text-warm-400 order-2 md:order-1 relative overflow-hidden">
              {aboutContent?.headshot ? (
                <Image
                  src={urlFor(aboutContent.headshot).width(700).height(933).url()}
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
                  <p className="text-sm">Add your headshot here</p>
                </div>
              )}
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-heading text-4xl text-warm-900 mb-8">
                My Story
              </h2>
              <div className="space-y-5 text-warm-700 leading-relaxed">
                {aboutContent?.bio && aboutContent.bio.length > 0 ? (
                  <PortableText value={aboutContent.bio} />
                ) : (
                  <>
                    <p>
                      Nothing thrills me more than capturing authentic joy, wonder,
                      love, and laughter. As a mom of two, I know firsthand how
                      quickly these precious moments pass — and how important it is
                      to hold onto them.
                    </p>
                    <p>
                      My specialty is portraits: from families and pets to proposals
                      and weddings, headshots, senior portraits, and beyond. I create
                      flattering and emotional lifestyle photographs that you&apos;ll
                      treasure for a lifetime.
                    </p>
                    <p>
                      Based in Cumberland, Maine, I primarily photograph in Southern
                      Maine but love traveling throughout New England for sessions.
                      Every shoot is an adventure, and I&apos;m always up for exploring
                      new and beautiful locations.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sage-600 tracking-[0.3em] uppercase text-sm mb-4">
              My Approach
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-warm-900 mb-6">
              What It&apos;s Like to Work With Me
            </h2>
          </div>
          <div className="space-y-12">
            {[
              {
                title: "Finding the Perfect Light",
                description:
                  "I start every session by scouting out the most beautiful, flattering light. Whether we're shooting golden hour at the beach or soft window light indoors, the right light makes all the difference.",
              },
              {
                title: "Making You Feel Natural",
                description:
                  "I'll help you with gentle direction on positioning and posing, but the goal is always to make you feel like yourself. No awkward, stiff poses here — just you being you.",
              },
              {
                title: "Keeping Things Fun",
                description:
                  "I might put on some music, wear a funny hat, or pull out a squeaky toy (especially if kids or dogs are involved!). I want to catch you dancing, laughing, playing, and moving — because that's who you really are.",
              },
              {
                title: "Delivering Images You'll Love",
                description:
                  "After our session, I carefully curate and edit your images with a warm, natural editing style. You'll receive a beautiful online gallery to share with family and friends.",
              },
            ].map((step, i) => (
              <div key={step.title} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-warm-200 flex items-center justify-center font-heading text-warm-700 text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading text-xl text-warm-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warm-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun facts */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-warm-900 text-center mb-12">
            A Few Fun Facts
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Mom to two amazing kiddos who keep me on my toes",
              "I always have a squeaky toy in my camera bag",
              "Golden hour is my absolute favorite time to shoot",
              "Coffee fuels my editing sessions",
              "I believe the best photos come from genuine moments",
              "I've been known to wear a funny hat to make kids laugh",
            ].map((fact) => (
              <div
                key={fact}
                className="bg-warm-100 p-6 flex items-start gap-3"
              >
                <span className="text-warm-500 mt-0.5">&#10047;</span>
                <p className="text-warm-700 text-sm">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-warm-800 text-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Let&apos;s Create Together
          </h2>
          <p className="text-warm-300 text-lg mb-10 max-w-2xl mx-auto">
            I&apos;d love to hear about what you have in mind. Whether you know
            exactly what you want or need a little guidance, I&apos;m here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-warm-50 text-warm-800 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
