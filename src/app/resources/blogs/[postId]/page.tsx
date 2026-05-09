import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogScrollTop } from "@/components/blog-scroll-top";
import { PageHero } from "@/components/page-hero";
import { getBloggerPost } from "@/lib/blogger";

type BlogPostPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const { post } = await getBloggerPost(postId);

  if (!post) {
    return {
      title: "Blog Post",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = await params;
  const { configured, post, error } = await getBloggerPost(postId);

  if (!configured) {
    return (
      <main className="min-h-dvh bg-slate-50 text-slate-950">
        <BlogScrollTop />
        <PageHero
          eyebrow="Resources / Blog"
          title="Blog setup required."
          description="Set the Blogger blog ID and Google service account credentials to load posts on the website."
        />
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <MessageState
            title="Blogger is not configured yet."
            body="Add BLOGGER_BLOG_ID and the existing Google service account credentials in the environment."
          />
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-dvh bg-slate-50 text-slate-950">
        <BlogScrollTop />
        <PageHero
          eyebrow="Resources / Blog"
          title="Post unavailable."
          description="We could not load this Blogger post right now."
        />
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <MessageState title="Post could not load." body={error} />
        </section>
      </main>
    );
  }

  if (!post) notFound();

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <BlogScrollTop />
      <PageHero
        eyebrow={formatDate(post.published)}
        title={post.title}
        description={post.excerpt || "Read the latest update from Cindral."}
      >
        <Link
          href="/resources/blogs"
          className="inline-flex h-12 items-center justify-center rounded-md border border-white/55 bg-white/16 px-5 text-base font-semibold text-white shadow-sm backdrop-blur-md transition hover:bg-white/25 active:scale-[0.99]"
        >
          Back to blog
        </Link>
      </PageHero>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Post details
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Published {formatDate(post.published)}
              </p>
            </div>
            <Link
              href="/resources/blogs"
              className="inline-flex h-10 w-fit items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to blog
            </Link>
          </div>
          {post.labels.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600"
                >
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <article
          className="blog-content w-full rounded-lg border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 shadow-xl shadow-slate-900/6 sm:p-8 lg:p-10"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
      </section>
    </main>
  );
}

function MessageState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "Latest";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
