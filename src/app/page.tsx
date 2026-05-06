import Link from "next/link";
import { GrainyBackground } from "@/components/grainy-background";
import { SiteHeader } from "@/components/site-header";

const focusAreas = [
  {
    label: "Presence",
    title: "Digital identity that feels deliberate.",
    body: "We shape public surfaces that communicate clearly without becoming loud.",
  },
  {
    label: "Systems",
    title: "Operational tools with less friction.",
    body: "We care about the workflows behind the interface as much as the interface itself.",
  },
  {
    label: "Growth",
    title: "Communication built for continuity.",
    body: "We create patterns that can carry across pages, launches, teams, and future work.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-slate-100 text-slate-950">
      <GrainyBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-slate-950/12" />

      <div className="relative z-10">
        <SiteHeader inverted />

        <section className="mx-auto flex min-h-[76dvh] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-10 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/86 drop-shadow-sm">
              Cindral
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] text-white drop-shadow-sm sm:text-7xl">
              Software, infrastructure, and spatial experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/84 drop-shadow-sm sm:text-lg">
              We help modern organizations communicate clearly, operate with
              less friction, and build digital surfaces that feel considered
              from the first interaction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-5 text-base font-semibold text-slate-950 shadow-lg shadow-slate-900/12 transition hover:bg-slate-50 active:scale-[0.99]"
              >
                Start a conversation
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/55 bg-white/16 px-5 text-base font-semibold text-white shadow-sm backdrop-blur-md transition hover:bg-white/25 active:scale-[0.99]"
              >
                Learn about Cindral
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-950">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-3 lg:px-10 lg:py-20">
            <FeatureCard
              label={focusAreas[0].label}
              title={focusAreas[0].title}
              body={focusAreas[0].body}
            />
            <FeatureCard
              label={focusAreas[1].label}
              title={focusAreas[1].title}
              body={focusAreas[1].body}
            />
            <FeatureCard
              label={focusAreas[2].label}
              title={focusAreas[2].title}
              body={focusAreas[2].body}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        {label}
      </p>
      <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}
