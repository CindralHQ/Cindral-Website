import Link from "next/link";
import { GrainyBackground } from "@/components/grainy-background";
import { SiteHeader } from "@/components/site-header";

const offerings = [
  {
    label: "Software",
    title: "Websites, interfaces, and useful systems.",
    body: "We build digital surfaces that feel considered from the first visit and practical after repeated use.",
    examples: [
      "Websites and web experiences",
      "Client-facing interfaces",
      "Internal tools and workflows",
    ],
    visual: "software",
  },
  {
    label: "Infrastructure",
    title: "Foundations for dependable operation.",
    body: "We shape the technical and operational layers that let software run, evolve, and stay maintainable.",
    examples: [
      "System foundations",
      "Deployment-ready structure",
      "Operational clarity",
    ],
    visual: "infrastructure",
  },
  {
    label: "Spatial experiences",
    title: "Digital experiences shaped around place.",
    body: "We create spatial concepts where physical context and digital interaction work together.",
    examples: [
      "Art gallery experiences",
      "Vehicle preview environments",
      "Place-aware digital journeys",
    ],
    visual: "spatial",
  },
];

const spatialHighlights = [
  {
    title: "Art Gallery",
    body: "Guided digital layers for exhibitions, collections, room context, and visitor movement.",
  },
  {
    title: "Vehicle Preview",
    body: "Focused preview environments for form, detail, variants, and configuration before a physical viewing.",
  },
];

const featuredClients = [
  {
    name: "YGPT",
    status: "Featured client",
  },
  {
    name: "More soon",
    status: "Client logo placeholder",
  },
  {
    name: "More soon",
    status: "Client logo placeholder",
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
              We build across websites, systems, and spatial concepts, keeping
              every surface clear, useful, and visually restrained.
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
                Learn more
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-950">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                  What we offer
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  Three connected areas of work.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 lg:justify-self-end">
                Cindral moves between digital products, the systems that
                support them, and spatial experiences that make technology feel
                connected to a real environment.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {offerings.map((offering) => (
                <OfferingCard key={offering.label} {...offering} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
                Spatial experiences
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Built for previews, places, and presence.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/64">
                Spatial work gives digital products a sense of environment:
                the visitor can move, inspect, compare, and understand context
                without the interface becoming louder than the subject.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {spatialHighlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-lg border border-white/12 bg-white/[0.07] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-md"
                >
                  <div className="mb-5 h-32 overflow-hidden rounded-md border border-white/10 bg-[#071827]">
                    <div className="grid h-full grid-cols-4 gap-px p-3 opacity-90">
                      {Array.from({ length: 24 }).map((_, index) => (
                        <span
                          key={index}
                          className={
                            index % 5 === 0
                              ? "bg-cyan-300/70"
                              : index % 7 === 0
                                ? "bg-violet-300/65"
                                : "bg-white/12"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold">{highlight.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    {highlight.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 text-slate-950">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                  Featured clients
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  Logos we can point to.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 lg:justify-self-end">
                YGPT is our first featured client here. More client logos will
                be added as soon as they are ready for public display.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {featuredClients.map((client, index) => (
                <ClientLogoCard
                  key={`${client.name}-${index}`}
                  name={client.name}
                  status={client.status}
                  muted={index > 0}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-950">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                Approach
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Clear systems, restrained surfaces.
              </h2>
            </div>
            <div className="grid gap-3">
              {["Useful before decorative", "Specific before loud", "Built to carry forward"].map(
                (principle) => (
                  <div
                    key={principle}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-lg font-semibold"
                  >
                    {principle}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function OfferingCard({
  label,
  title,
  body,
  examples,
  visual,
}: {
  label: string;
  title: string;
  body: string;
  examples: string[];
  visual: string;
}) {
  return (
    <article className="flex min-h-full flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/8">
      <OfferingVisual visual={visual} />
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        {label}
      </p>
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
      <div className="mt-6 grid gap-2">
        {examples.map((example) => (
          <div
            key={example}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          >
            {example}
          </div>
        ))}
      </div>
    </article>
  );
}

function OfferingVisual({ visual }: { visual: string }) {
  const isSoftware = visual === "software";
  const isInfrastructure = visual === "infrastructure";

  return (
    <div className="h-36 rounded-md border border-slate-200 bg-white p-3">
      {isSoftware ? (
        <div className="grid h-full grid-rows-[1fr_0.8fr] gap-2">
          <div className="rounded bg-slate-950" />
          <div className="grid grid-cols-3 gap-2">
            <span className="rounded bg-cyan-500/70" />
            <span className="rounded bg-slate-200" />
            <span className="rounded bg-violet-400/70" />
          </div>
        </div>
      ) : isInfrastructure ? (
        <div className="grid h-full grid-cols-3 gap-2">
          {[0, 1, 2].map((column) => (
            <div key={column} className="grid gap-2">
              {[0, 1, 2].map((row) => (
                <span
                  key={`${column}-${row}`}
                  className={
                    row === column
                      ? "rounded bg-cyan-500/70"
                      : "rounded bg-slate-200"
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="relative h-full overflow-hidden rounded bg-slate-950">
          <div className="absolute inset-4 grid grid-cols-5 gap-1 opacity-80">
            {Array.from({ length: 25 }).map((_, index) => (
              <span
                key={index}
                className={
                  index % 6 === 0
                    ? "bg-cyan-300/80"
                    : index % 8 === 0
                      ? "bg-violet-300/80"
                      : "bg-white/12"
                }
              />
            ))}
          </div>
          <div className="absolute inset-x-5 bottom-5 h-8 rounded border border-white/20 bg-white/12 backdrop-blur-sm" />
        </div>
      )}
    </div>
  );
}

function ClientLogoCard({
  name,
  status,
  muted,
}: {
  name: string;
  status: string;
  muted: boolean;
}) {
  return (
    <article
      className={
        muted
          ? "rounded-lg border border-dashed border-slate-300 bg-white/60 p-5"
          : "rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6"
      }
    >
      <div className="flex h-28 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
        <span
          className={
            muted
              ? "text-xl font-semibold text-slate-300"
              : "text-4xl font-semibold tracking-[0.08em] text-slate-950"
          }
        >
          {name}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-950">{status}</p>
    </article>
  );
}
