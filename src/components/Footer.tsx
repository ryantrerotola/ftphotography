import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-warm-50 mb-4">
              Francesca Trerotola
            </h3>
            <p className="text-warm-300 text-sm leading-relaxed">
              Lifestyle & portrait photographer based in Cumberland, Maine.
              Capturing authentic joy, love, and laughter throughout New England.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg text-warm-50 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/portfolio", label: "Portfolio" },
                { href: "/services", label: "Services & Pricing" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About Francesca" },
                { href: "/contact", label: "Get in Touch" },
                { href: "/booking", label: "Book a Session" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-warm-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-heading text-lg text-warm-50 mb-4">
              Let&apos;s Connect
            </h4>
            <ul className="space-y-3 text-sm text-warm-300">
              <li>Cumberland, Maine</li>
              <li>Serving Southern Maine &amp; New England</li>
              <li>
                <a
                  href="mailto:hello@francescatrerotolaphotography.com"
                  className="hover:text-warm-100 transition-colors"
                >
                  hello@francescatrerotolaphotography.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/francescatrerotola_photo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-400 hover:text-warm-100 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-12 pt-8 text-center text-xs text-warm-400">
          <p>&copy; {new Date().getFullYear()} Francesca Trerotola Photography LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
