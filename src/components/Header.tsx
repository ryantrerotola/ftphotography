"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-warm-50/95 backdrop-blur-sm sticky top-0 z-50 border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col">
            <span className="font-heading text-2xl md:text-3xl font-semibold text-warm-900 tracking-wide">
              Francesca Trerotola
            </span>
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-warm-600">
              Photography
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-warm-700 hover:text-warm-900 transition-colors text-sm tracking-wide uppercase font-light"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-warm-700 text-warm-50 px-5 py-2.5 text-sm tracking-wide uppercase hover:bg-warm-800 transition-colors"
            >
              Book a Session
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-warm-700 p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-warm-50 border-t border-warm-200 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-warm-700 hover:text-warm-900 transition-colors text-sm tracking-wide uppercase font-light"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-warm-700 text-warm-50 px-5 py-2.5 text-sm tracking-wide uppercase hover:bg-warm-800 transition-colors"
          >
            Book a Session
          </Link>
        </nav>
      )}
    </header>
  );
}
