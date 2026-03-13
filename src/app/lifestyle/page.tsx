import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLifestyleImages, getLifestyleCategories } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Lifestyle Gallery",
  description:
    "Browse the lifestyle photography gallery of Francesca Trerotola — families, engagements, senior portraits, headshots, and pets in Southern Maine.",
};

export const dynamic = "force-dynamic";

export default async function LifestyleGalleryPage() {
  let images: Array<{
    _id: string;
    title: string;
    image: { asset: { _ref: string } };
    category: string;
    categorySlug: string;
  }> = [];
  let categories: Array<{ _id: string; title: string; slug: string }> = [];

  try {
    images = (await getLifestyleImages()) || [];
    categories = (await getLifestyleCategories()) || [];
  } catch {
    // Sanity not configured yet
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
            Gallery
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warm-900 mb-6">
            Lifestyle Gallery
          </h1>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            Real moments, genuine emotions, and beautiful light — families,
            engagements, seniors, headshots, and pets.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter labels */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <span className="bg-warm-700 text-warm-50 px-5 py-2 text-xs tracking-widest uppercase">
                All
              </span>
              {categories.map((cat) => (
                <span
                  key={cat._id}
                  className="bg-warm-200 text-warm-700 px-5 py-2 text-xs tracking-widest uppercase"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {images.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="relative break-inside-avoid overflow-hidden group"
                >
                  <Image
                    src={urlFor(img.image).width(600).url()}
                    alt={img.title || "Lifestyle photography"}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/30 transition-colors duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {img.title && (
                        <p className="text-warm-50 text-sm font-medium">
                          {img.title}
                        </p>
                      )}
                      <p className="text-warm-200 text-xs">{img.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-warm-500 text-lg mb-2">Gallery coming soon!</p>
              <p className="text-warm-400 text-sm">
                Photos will appear here once they&apos;re uploaded to the CMS.
              </p>
            </div>
          )}
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
