import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About Cindral",
  description: "Learn about Cindral, our point of view, and how we work.",
};

const principles = [
  {
    title: "Clarity before volume",
    body: "We prefer fewer, sharper messages over noisy presentation.",
  },
  {
    title: "Systems over one-offs",
    body: "Good work should create reusable language, structure, and patterns.",
  },
  {
    title: "Useful by default",
    body: "Every page, asset, and workflow should help someone take the next step.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="About"
        title="Cindral builds with precision, restraint, and intent."
        description="We care about how organizations communicate in public and how their internal systems support that promise. The result should feel calm, distinctive, and useful."
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-16 sm:px-8 lg:grid-cols-3 lg:px-10 lg:py-20">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <h2 className="text-2xl font-semibold">{principle.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
