import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Cindral Resources",
  description: "Official Cindral resources, brand assets, and reference links.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="Resources"
        title="Official references for Cindral."
        description="Use these resources for public mentions, promotional material, and consistent visual execution across future pages."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href="/resources/brand-assets"
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/6 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-950/8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Brand assets
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Logo, colors, typography, and UI rules.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Public-facing design guidance for promoters, partners, and future
              site work.
            </p>
          </Link>

          <Link
            href="/resources/blogs"
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/6 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-950/8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Blog
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Posts fetched from Blogger.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Latest updates and notes can be published in Blogger and displayed
              automatically on the website.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
