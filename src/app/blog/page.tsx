import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getBlogPageContent } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Photography tips, session highlights, and behind-the-scenes stories from Francesca Trerotola Photography in Southern Maine.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = getAllPosts();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageContent: any = null;

  try {
    pageContent = await getBlogPageContent();
  } catch {
    // Sanity not configured yet
  }

  const heroSubtitle = pageContent?.heroSubtitle || "Blog";
  const heroTitle = pageContent?.heroTitle || "Stories & Tips";
  const heroDescription = pageContent?.heroDescription || "Session highlights, photography tips, behind-the-scenes moments, and a peek into life as a Maine photographer.";
  const newsletterTitle = pageContent?.newsletterTitle || "Stay in the Loop";
  const newsletterDescription = pageContent?.newsletterDescription || "Get photography tips, mini session announcements, and seasonal specials delivered to your inbox.";

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
            {heroSubtitle}
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warm-900 mb-6">
            {heroTitle}
          </h1>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-warm-500 text-lg mb-4">
                Blog posts coming soon!
              </p>
              <p className="text-warm-400 text-sm">
                In the meantime, follow me on{" "}
                <a
                  href="https://www.instagram.com/francescatrerotolaphotography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-warm-600"
                >
                  Instagram
                </a>{" "}
                for the latest updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white group">
                  <div className="bg-warm-200 aspect-[16/10] flex items-center justify-center text-warm-400">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-warm-500 mb-3">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.category}</span>
                    </div>
                    <h2 className="font-heading text-xl text-warm-900 mb-3 group-hover:text-warm-700 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-warm-600 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-warm-700 text-sm tracking-wide uppercase border-b border-warm-400 hover:border-warm-700 transition-colors pb-0.5"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-warm-900 mb-6">
            {newsletterTitle}
          </h2>
          <p className="text-warm-600 mb-8">
            {newsletterDescription}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400"
            />
            <button
              type="submit"
              className="bg-warm-700 text-warm-50 px-6 py-3 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
