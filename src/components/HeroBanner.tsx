import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface HeroBannerProps {
  image?: unknown;
  subtitle?: string;
  title: string;
  description?: string;
}

export default function HeroBanner({
  image,
  subtitle,
  title,
  description,
}: HeroBannerProps) {
  const imageUrl = image ? urlFor(image)?.width(1920).height(700).quality(80).url() : null;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-warm-900/55" />
        </>
      ) : (
        <div className="absolute inset-0 bg-warm-100" />
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {subtitle && (
          <p
            className={`tracking-[0.3em] uppercase text-sm mb-4 ${
              imageUrl ? "text-warm-200" : "text-warm-500"
            }`}
          >
            {subtitle}
          </p>
        )}
        <h1
          className={`font-heading text-5xl md:text-6xl mb-6 ${
            imageUrl ? "text-white" : "text-warm-900"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`text-lg max-w-2xl mx-auto ${
              imageUrl ? "text-warm-100" : "text-warm-600"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
