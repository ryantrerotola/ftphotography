"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  categorySlug: string;
}

interface Category {
  _id: string;
  title: string;
  slug: string;
}

export default function GalleryGrid({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.categorySlug === activeCategory);

  return (
    <>
      {/* Category filter buttons */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
              activeCategory === "all"
                ? "bg-warm-700 text-warm-50"
                : "bg-warm-200 text-warm-700 hover:bg-warm-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
                activeCategory === cat.slug
                  ? "bg-warm-700 text-warm-50"
                  : "bg-warm-200 text-warm-700 hover:bg-warm-300"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      {/* Image grid */}
      {filtered.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img) => (
            <div
              key={img._id}
              className="relative break-inside-avoid overflow-hidden group"
            >
              <Image
                src={img.imageUrl}
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
          <svg
            className="w-16 h-16 mx-auto mb-4 text-warm-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-warm-500 text-lg mb-2">No photos in this category yet!</p>
          <p className="text-warm-400 text-sm">
            Try selecting a different category above.
          </p>
        </div>
      )}
    </>
  );
}
