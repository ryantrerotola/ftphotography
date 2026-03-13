import type { Metadata } from "next";
import Link from "next/link";
import { getLifestyleImages, getLifestyleCategories } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import GalleryGrid from "@/components/GalleryGrid";

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
    imageUrl: string;
    category: string;
    categorySlug: string;
  }> = [];
  let categories: Array<{ _id: string; title: string; slug: string }> = [];

  try {
    const rawImages = (await getLifestyleImages()) || [];
    images = rawImages.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (img: { _id: string; title: string; image: any; category: string; categorySlug: string }) => ({
        _id: img._id,
        title: img.title,
        imageUrl: urlFor(img.image).width(600).url(),
        category: img.category,
        categorySlug: img.categorySlug,
      })
    );
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
          <GalleryGrid images={images} categories={categories} />
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
