import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getBloggerPosts } from "@/lib/blogger";

export const metadata: Metadata = {
  title: "Cindral Blog",
  description: "Latest Cindral posts fetched from Blogger.",
};

export default async function BlogsPage() {
  const { configured, posts, error } = await getBloggerPosts(6);

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="Resources / Blog"
        title="Notes and updates from Cindral."
        description="This page pulls Cindral posts from Blogger so updates can be published from one place and displayed here automatically."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/resources"
            className="inline-flex h-10 items-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Resources
          </Link>
          <Link
            href="/resources/brand-assets"
            className="inline-flex h-10 items-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Brand assets
          </Link>
        </div>

        <div className="mt-10">
          {!configured ? (
            <SetupState />
          ) : error ? (
            <MessageState title="Blog posts could not load." body={error} />
          ) : posts.length === 0 ? (
            <MessageState
              title="No posts published yet."
              body="When Cindral publishes posts in Blogger, they will appear here."
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/resources/blogs/${post.id}`}
                  className="group flex min-h-[22rem] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-950/8 sm:p-7"
                >
                  <article className="flex h-full flex-col">
                    <div className="mb-6 h-32 rounded-md border border-slate-200 bg-[linear-gradient(135deg,#168db8,#67e8f9_50%,#a78bfa)]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {formatDate(post.published)}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {post.excerpt || "Read the latest update from Cindral."}
                    </p>
                    {post.labels.length ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {post.labels.slice(0, 3).map((label) => (
                          <span
                            key={label}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <span className="mt-auto inline-flex h-10 w-fit items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition group-hover:bg-slate-800">
                      Read post
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SetupState() {
  return (
    <div className="rounded-lg border border-dashed border-cyan-400 bg-white p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        Blogger setup
      </p>
      <h2 className="mt-3 text-2xl font-semibold">
        Add the Blogger blog ID to enable posts.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Set `BLOGGER_BLOG_ID` in the environment. The page uses the existing
        Google service account credentials to fetch published posts from
        Blogger automatically.
      </p>
    </div>
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
