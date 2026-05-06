import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Careers at Cindral",
  description: "Explore career opportunities and future roles at Cindral.",
};

export default function CareersPage() {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="Careers"
        title="Work on clear, useful, thoughtful systems."
        description="We are building the foundation for future roles. If your work fits the way Cindral thinks, start a conversation with us."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Open roles
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            No public openings right now.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            We still welcome thoughtful introductions from people who care about
            design quality, engineering discipline, operations, and clear
            communication.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            Introduce yourself
          </Link>
        </div>
      </section>
    </main>
  );
}
