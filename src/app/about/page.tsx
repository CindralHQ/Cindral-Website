import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About Cindral",
  description:
    "A short introduction to Cindral's working principles and point of view.",
};

const principles = [
  {
    title: "Clear before complex",
    body: "We prefer direct structure, readable interfaces, and decisions that make the next step obvious.",
  },
  {
    title: "Useful before decorative",
    body: "Visual polish matters, but it should support the work instead of becoming the work.",
  },
  {
    title: "Specific before loud",
    body: "Cindral should feel precise and distinctive without relying on exaggerated messaging.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="About"
        title="Cindral builds with clarity, restraint, and intent."
        description="We are shaping a company around useful systems, precise presentation, and digital work that can carry forward."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Point of view
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              The work should be easy to understand and hard to confuse.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Cindral is still keeping its public language deliberately focused.
            Instead of filling the site with claims before they are ready, we
            use a small set of principles to guide how each page, product, and
            experience should feel.
          </p>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/6"
              >
                <h3 className="text-2xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/58">
              Direction
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              A brand system first, then the pages grow from it.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/68">
            The site is being built from the same visual language as the
            business card: calm contrast, glass-like surfaces, measured spacing,
            and the animated grain field as the first identity signal.
          </p>
        </div>
      </section>
    </main>
  );
}
