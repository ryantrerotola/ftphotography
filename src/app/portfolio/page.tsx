import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryCategories, getFeaturedImages } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse the portfolio of Francesca Trerotola Photography — families, weddings, engagements, senior portraits, headshots, and pets in Southern Maine.",
};

const fallbackCategories = [
  {
    _id: "1",
    title: "Families",
    slug: "families",
    description: "Joyful, authentic family sessions in beautiful Maine locations.",
    coverImage: null,
    count: 0,
  },
  {
    _id: "2",
    title: "Weddings",
    slug: "weddings",
    description: "Every heartfelt moment from your most special day.",
    coverImage: null,
    count: 0,
  },
  {
    _id: "3",
    title: "Engagements & Proposals",
    slug: "engagements",
    description: "Celebrating love stories in their most exciting chapter.",
    coverImage: null,
    count: 0,
  },
  {
    _id: "4",
    title: "Senior Portraits",
    slug: "seniors",
    description: "Milestone portraits full of personality and style.",
    coverImage: null,
    count: 0,
  },
  {
    _id: "5",
    title: "Headshots",
    slug: "headshots",
    description: "Professional, approachable portraits for your brand.",
    coverImage: null,
    count: 0,
  },
  {
    _id: "6",
    title: "Pets",
    slug: "pets",
    description: "Because your furry family members deserve the spotlight too.",
    coverImage: null,
    count: 0,
  },
];

export default async function PortfolioPage() {
  let categories = fallbackCategories;
  let featuredImages: Array<{
    _id: string;
    title: string;
    image: { asset: { _ref: string } };
    category: string;
  }> = [];

  try {
    const sanityCategories = await getGalleryCategories();
    if (sanityCategories && sanityCategories.length > 0) {
      categories = sanityCategories;
    }
    const sanityFeatured = await getFeaturedImages();
    if (sanityFeatured && sanityFeatured.length > 0) {
      featuredImages = sanityFeatured;
    }
  } catch {
    // Sanity not configured yet, use fallback data
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
            Portfolio
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warm-900 mb-6">
            My Work
          </h1>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            A collection of real moments, genuine emotions, and beautiful light.
            Browse by category to see my latest work.
          </p>
        </div>
      </section>

      {/* Gallery categories */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="group relative bg-warm-200 aspect-[4/5] flex items-end overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              >
                {cat.coverImage ? (
                  <Image
                    src={urlFor(cat.coverImage).width(600).height(750).url()}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-warm-400">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs">Add {cat.title.toLowerCase()} photos</p>
                    </div>
                  </div>
                )}
                <div className="relative z-10 w-full bg-gradient-to-t from-warm-900/80 to-transparent p-8 pt-24">
                  <h3 className="font-heading text-2xl text-warm-50 mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-warm-200 text-sm">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured gallery */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sage-600 tracking-[0.3em] uppercase text-sm mb-4">
              Recent Work
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-warm-900 mb-6">
              Latest Sessions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredImages.length > 0
              ? featuredImages.map((img, i) => (
                  <div
                    key={img._id}
                    className={`relative bg-warm-200 ${
                      i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                    } overflow-hidden`}
                  >
                    <Image
                      src={urlFor(img.image).width(400).height(i % 3 === 0 ? 533 : 400).url()}
                      alt={img.title || "Gallery image"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-warm-200 ${
                      i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                    } flex items-center justify-center text-warm-400`}
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-warm-800 text-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Love What You See?
          </h2>
          <p className="text-warm-300 text-lg mb-10">
            Let&apos;s create beautiful images together. I&apos;d love to hear
            about your vision.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-warm-50 text-warm-800 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-100 transition-colors"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </>
  );
}
