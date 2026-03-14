import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryImagesByCategory, getGalleryCategories } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import HeroBanner from "@/components/HeroBanner";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let categories: Array<{ _id: string; title: string; slug: string; description: string; coverImage?: any }> = [];

  try {
    categories = (await getGalleryCategories()) || [];
  } catch {
    // Sanity not configured
  }

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Gallery" };
  }

  return {
    title: category.title,
    description: `${category.description} — Francesca Trerotola Photography, Southern Maine.`,
  };
}

export default async function CategoryGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let categories: Array<{ _id: string; title: string; slug: string; description: string; coverImage?: any }> = [];
  let images: Array<{ _id: string; title: string; image: any; date: string }> = [];

  try {
    categories = (await getGalleryCategories()) || [];
    images = (await getGalleryImagesByCategory(slug)) || [];
  } catch {
    // Sanity not configured
  }

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  return (
    <>
      <HeroBanner
        image={category.coverImage}
        subtitle="Portfolio"
        title={category.title}
        description={category.description}
      />

      {/* Gallery grid */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="relative break-inside-avoid overflow-hidden group"
                >
                  <Image
                    src={urlFor(img.image).width(600).url()}
                    alt={img.title || `${category.title} photography`}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {img.title && (
                    <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/30 transition-colors duration-300 flex items-end">
                      <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-warm-50 text-sm font-medium">
                          {img.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-warm-500 text-lg mb-2">Photos coming soon!</p>
              <p className="text-warm-400 text-sm">
                Check back soon for {category.title.toLowerCase()} galleries.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Back + CTA */}
      <section className="py-24 bg-warm-800 text-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Love What You See?
          </h2>
          <p className="text-warm-300 text-lg mb-10">
            Let&apos;s create beautiful images together. I&apos;d love to hear
            about your vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="bg-warm-50 text-warm-800 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-100 transition-colors w-full sm:w-auto"
            >
              Book Your Session
            </Link>
            <Link
              href="/portfolio"
              className="border border-warm-400 text-warm-200 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-700 transition-colors w-full sm:w-auto"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
