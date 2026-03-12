import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="py-24 bg-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-warm-500 text-sm hover:text-warm-700 transition-colors"
            >
              &larr; Back to Blog
            </Link>
          </div>
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-warm-500 mb-4">
              <span>{post.date}</span>
              <span>&bull;</span>
              <span>{post.category}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-warm-900 mb-6">
              {post.title}
            </h1>
            <p className="text-warm-600 text-lg">{post.excerpt}</p>
          </header>
          <div className="prose prose-warm max-w-none">
            <div
              className="text-warm-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-warm-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl text-warm-900 mb-4">
            Inspired by This Story?
          </h2>
          <p className="text-warm-600 mb-8">
            Let&apos;s create beautiful moments together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-warm-700 text-warm-50 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
