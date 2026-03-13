"use client";

import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import type { BookingException } from "@/components/CalendarGrid";

interface Package {
  name: string;
  price: string;
  duration: string;
  description?: string;
  features?: string[];
  popular?: boolean;
}

interface WeddingPackage {
  name: string;
  price: string;
  duration: string;
  features?: string[];
}

interface Props {
  packages: Package[];
  weddingPackages: WeddingPackage[];
  portraitSectionTitle: string;
  portraitSectionSubtitle: string;
  weddingSectionTitle: string;
  weddingSectionSubtitle: string;
  availableDays: number[];
  weeksOut: number;
  exceptions: BookingException[];
}

export default function PackageCards({
  packages,
  weddingPackages,
  portraitSectionTitle,
  portraitSectionSubtitle,
  weddingSectionTitle,
  weddingSectionSubtitle,
  availableDays,
  weeksOut,
  exceptions,
}: Props) {
  const [modalPkg, setModalPkg] = useState<{
    name: string;
    price: string;
    duration: string;
  } | null>(null);

  return (
    <>
      {/* Portrait packages */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-warm-900 mb-4">
              {portraitSectionTitle}
            </h2>
            <p className="text-warm-600">{portraitSectionSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-white p-8 relative ${
                  pkg.popular ? "ring-2 ring-warm-500 shadow-lg" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-warm-500 text-white text-xs tracking-widest uppercase px-4 py-1">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading text-2xl text-warm-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-warm-500 text-sm mb-2">{pkg.duration}</p>
                <p className="font-heading text-3xl text-warm-800 mb-4">
                  {pkg.price}
                </p>
                {pkg.description && (
                  <p className="text-warm-600 text-sm mb-6">{pkg.description}</p>
                )}
                <ul className="space-y-3 mb-8">
                  {(pkg.features || []).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-warm-700">
                      <svg className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    setModalPkg({
                      name: pkg.name,
                      price: pkg.price,
                      duration: pkg.duration,
                    })
                  }
                  className={`block w-full text-center py-3 text-sm tracking-widest uppercase transition-colors ${
                    pkg.popular
                      ? "bg-warm-700 text-warm-50 hover:bg-warm-800"
                      : "border border-warm-700 text-warm-700 hover:bg-warm-700 hover:text-warm-50"
                  }`}
                >
                  Book This Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding packages */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-warm-900 mb-4">
              {weddingSectionTitle}
            </h2>
            <p className="text-warm-600">{weddingSectionSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {weddingPackages.map((pkg) => (
              <div key={pkg.name} className="bg-white p-8">
                <h3 className="font-heading text-2xl text-warm-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-warm-500 text-sm mb-2">{pkg.duration}</p>
                <p className="font-heading text-3xl text-warm-800 mb-6">
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {(pkg.features || []).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-warm-700">
                      <svg className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    setModalPkg({
                      name: pkg.name,
                      price: pkg.price,
                      duration: pkg.duration,
                    })
                  }
                  className="block w-full text-center border border-warm-700 text-warm-700 py-3 text-sm tracking-widest uppercase hover:bg-warm-700 hover:text-warm-50 transition-colors"
                >
                  Book This Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <BookingModal
        isOpen={!!modalPkg}
        onClose={() => setModalPkg(null)}
        pkg={modalPkg}
        availableDays={availableDays}
        weeksOut={weeksOut}
        exceptions={exceptions}
      />
    </>
  );
}
