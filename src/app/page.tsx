import Link from "next/link";
import { GreenBackground } from "@/components/green-gradient";
import { GrainyBackground } from "@/components/grainy-background";


import { SiteHeader } from "@/components/site-header";

const offerings = [
  {
    label: "Computer Software",
    title: "Websites, interfaces, and useful systems.",
    body: "We build digital surfaces that feel considered from the first visit and practical after repeated use.",
    examples: [
      "Website Design & Development",
      "Business Applications",
      "Internal Tools & Dashboards",
      "Process Automation",
    ],
    visual: "software",
  },
  {
    label: "Computer Hardware",
    title: "Reliable technology infrastructure.",
    body: "We supply, install, maintain, and upgrade computer systems and IT hardware to keep organizations running smoothly and securely.",
    examples: [
      "Hardware Procurement",
      "Workstations & Laptops",
      "Network Equipment",
      "Annual Maintenance & Support",
    ],
    visual: "Hardware",
  },
  {
    label: "CCTV & SECURITY SYSTEMS",
    title: "Intelligent surveillance and security solutions.",
    body: "From small offices to large facilities, we provide end-to-end CCTV installation, monitoring, maintenance, and security infrastructure services.",
    examples: [
      "CCTV Installation",
      "Surveillance System Design",
      "Maintenance & AMC",
      "Remote Monitoring Solutions",
    ],
    visual: "security",
  },
  {
    label: "Extended Reality (XR)",
    title: "Immersive experiences that connect people and technology.",
    body: "We create interactive experiences using Extended Reality (AR, VR, and Mixed Reality) for education, exhibitions, training, marketing, and customer engagement.",
    examples: [
      "Augmented Reality (AR)",
      "Virtual Reality (VR)",
      "Mixed Reality Experiences",
      "Interactive Installations",
    ],
    visual: "spatial",
  },
];


const featuredClients = [
  {
    name: "YGPT",
    status: "Youth For Global Peace and Transformation",
    href: "https://ygpt.cindral.org",
  },
  {
    name: "DWAI",
    status: "Discover Who Am I",
    href: "https://dwai.cindral.org",
  },
  {
    name: "MAYBU",
    status: "Maybe You",
    href: "https://cindral.org/contact",
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
                  Our connected areas of work.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 lg:justify-self-end">
                Cindral combines software engineering, IT infrastructure, security technology, and extended reality to deliver integrated solutions for businesses, institutions, and public-facing environments.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {offerings.map((offering) => (
                <OfferingCard key={offering.label} {...offering} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 text-white ">
          <GreenBackground />
          <div className="z-10 relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20 items-center ">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100/80">
                CINDRAL ENERGY
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Powering a sustainable future.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-6 text-white">
                Cindral Energy helps homes, businesses, and institutions adopt cleaner, more efficient energy solutions through solar systems, wind energy, consulting, and sustainable infrastructure.              </p>
              <Link
                href="https://energy.cindral.org"
                className="inline-flex h-10 mt-5 items-center justify-center rounded-md bg-white px-5 text-base font-semibold text-slate-950 shadow-lg text-[15px] shadow-slate-900/12 transition hover:bg-slate-50 active:scale-[0.99]"
              >
                Visit Website
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 relative">
<div className="col-span-1 sm:col-span-2">
    <img
      src="/CindralEnergyBanner.png"
      alt="Cindral Energy"
      className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 block"
    />
  </div>            </div>
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
                  Organizations we’ve worked with
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 lg:justify-self-end">
                A growing list of organizations that have collaborated with Cindral across software, infrastructure, and spatial experiences.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {featuredClients.map((client, index) => (
                <ClientLogoCard
                  key={`${client.name}-${index}`}
                  name={client.name}
                  status={client.status}
                  href={client.href}
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
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
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



function ClientLogoCard({
  name,
  status,
  href,
  muted,
}: {
  name: string;
  status: string;
  href?: string;
  muted: boolean;
}) {
  const cardClassName = "rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6";
  const cardContent = (
    <>
      <div className="flex h-28 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
        <span
          className="text-4xl font-semibold tracking-[0.08em] text-slate-950">
          {name}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-950">{status}</p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name}`}
        className={`${cardClassName} block transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/10 focus:outline-none focus:ring-4 focus:ring-cyan-500/20`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article className={cardClassName}>{cardContent}</article>
  );
}
