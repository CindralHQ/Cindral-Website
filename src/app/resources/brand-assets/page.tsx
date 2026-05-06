import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyColorCard } from "@/components/copy-color-card";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Cindral Brand Assets",
  description:
    "Official Cindral brand assets, visual guidance, and design system references for partners, promoters, and future pages.",
};

const colorSwatches = [
  {
    name: "Cindral Slate",
    value: "#020617",
    role: "Primary text, dark buttons, high-contrast anchors",
  },
  {
    name: "Soft Surface",
    value: "#f8fafc",
    role: "Light page bands, card interiors, readable surfaces",
  },
  {
    name: "Mist Border",
    value: "#cbd5e1",
    role: "Quiet dividers, field borders, low-contrast structure",
  },
  {
    name: "Cyan Focus",
    value: "#06b6d4",
    role: "Focus rings, active states, small interaction accents",
  },
  {
    name: "Grain Blue",
    value: "#67e8f9",
    role: "Atmospheric gradient and hero highlights",
  },
  {
    name: "Grain Violet",
    value: "#a78bfa",
    role: "Secondary atmospheric accent from the animated field",
  },
];

const usageGuidelines = [
  "Use the official logo without redrawing, stretching, rotating, or adding effects.",
  "Keep the Cindral name clear, calm, and direct in public material.",
  "Pair the logo with generous space, restrained type, and strong contrast.",
  "Use glass surfaces for focused content only, such as forms, assets, and compact reference cards.",
];

const avoidGuidelines = [
  "Do not place the logo on busy imagery that reduces legibility.",
  "Do not recolor the logo or use the colored mark as the default identity treatment.",
  "Do not overuse gradients, oversized cards, or decorative shapes outside the Cindral visual system.",
  "Do not invent unofficial taglines, seals, badges, or alternate marks.",
];

const spacingGuidelines = [
  {
    label: "Page margin",
    value: "20px / 32px / 40px",
    body: "Use 20px on mobile, 32px on tablet, and 40px on desktop page edges.",
  },
  {
    label: "Section padding",
    value: "64px / 80px",
    body: "Use 64px vertical padding for standard sections and 80px for major desktop bands.",
  },
  {
    label: "Card padding",
    value: "20px / 28px",
    body: "Use 20px for compact cards and 28px for glass panels or larger content groups.",
  },
  {
    label: "Grid gap",
    value: "20px / 32px",
    body: "Use 20px between related cards and 32px between section intro copy and content.",
  },
];

const radiusGuidelines = [
  {
    label: "Controls",
    value: "6px",
    body: "Buttons, inputs, selects, and compact controls should use modest rounding.",
  },
  {
    label: "Cards",
    value: "8px",
    body: "Cards, panels, and previews should stay precise with a restrained radius.",
  },
  {
    label: "Badges",
    value: "6px",
    body: "Code labels and small tags should align with the control radius.",
  },
];

export default function BrandAssetsPage() {
  return (
    <main className="min-h-dvh bg-slate-100 text-slate-950">
      <PageHero
        eyebrow="Official identity guide"
        title="Cindral Brand Assets"
        description="A public reference for presenting Cindral consistently across promotions, partnerships, media mentions, and future website pages."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/Black.png"
            download
            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-5 text-base font-semibold text-slate-950 shadow-lg shadow-slate-900/12 transition hover:bg-slate-50 active:scale-[0.99]"
          >
            Download black logo
          </a>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/55 bg-white/16 px-5 text-base font-semibold text-white shadow-sm backdrop-blur-md transition hover:bg-white/25 active:scale-[0.99]"
          >
            Request brand approval
          </Link>
        </div>
      </PageHero>

        <section className="bg-slate-50 text-slate-950">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="max-w-2xl">
              <SectionIntro
                eyebrow="Logo"
                title="Start with the mark."
                description="Use the black logo on light surfaces and the white logo on dark surfaces. Use the colored logo selectively when a placement needs emphasis."
              />
            </div>

            <div className="mt-10 grid gap-6">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6 sm:p-7">
                <div className="grid gap-6 lg:grid-cols-2">
                  <LogoPreview
                    label="Light surface"
                    note="Black mark"
                    src="/Black.png"
                    surface="light"
                    featured
                  />
                  <LogoPreview
                    label="Dark surface"
                    note="White mark"
                    src="/White.png"
                    surface="dark"
                    featured
                  />
                </div>

                <div className="mt-6 rounded-lg border border-dashed border-cyan-400/60 bg-cyan-50/60 p-4 sm:p-5">
                  <div className="grid gap-5 sm:grid-cols-[1fr_220px] sm:items-center">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                        Highlight use
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        Colored logo is an accent, not the default.
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Use the colored mark when the brand needs a more
                        expressive moment, such as a feature callout, launch
                        asset, or selected promotional placement.
                      </p>
                    </div>
                    <div className="grid aspect-[4/3] place-items-center rounded-md border border-slate-200 bg-white">
                      <Image
                        src="/cindral-logo.png"
                        alt="Cindral colored logo"
                        width={112}
                        height={112}
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <GuidanceCard
                  label="Clear space"
                  value="1x logo width"
                  body="Leave at least the width of the logo around all sides when placing it with other elements."
                />
                <GuidanceCard
                  label="Minimum size"
                  value="40px screen"
                  body="Keep the mark large enough to remain crisp and recognizable in digital placements."
                />
                <GuidanceCard
                  label="Preferred use"
                  value="Black or white PNG"
                  body="Use contrast-first marks as the default. Use the colored PNG only for highlighted moments."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-950">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="max-w-2xl">
              <SectionIntro
                eyebrow="Color"
                title="Quiet contrast, atmospheric accents."
                description="Cindral should feel clear and precise. Use slate and white as the system base, then bring in cyan, blue, and violet as controlled accents from the animated grain field."
              />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colorSwatches.map((color) => (
                <CopyColorCard
                  key={color.name}
                  name={color.name}
                  value={color.value}
                  role={color.role}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
            <SectionIntro
              eyebrow="Typography"
              title="Sharp, readable, restrained."
              description="The site uses Geist Sans for interface and editorial text, with Geist Mono reserved for code, tokens, and technical labels."
              inverted
            />

            <div className="rounded-lg border border-white/14 bg-white/8 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
              <div className="grid gap-4 border-b border-white/14 pb-6 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/62">
                    Font family
                  </p>
                  <p className="mt-3 text-2xl font-semibold sm:text-3xl">
                    Geist Sans
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/68">
                    Primary font for headings, body text, labels, buttons, and
                    navigation. Use Geist Mono only for asset codes, values, and
                    technical references.
                  </p>
                </div>
                <code className="rounded-md border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold text-white/70">
                  --font-geist-sans
                </code>
              </div>
              <div className="border-b border-white/14 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/62">
                  Hero
                </p>
                <p className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                  Share Cindral with clarity.
                </p>
              </div>
              <div className="grid gap-6 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                    Section heading
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    Design language
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                    Body
                  </p>
                  <p className="mt-2 text-base leading-7 text-white/72">
                    Use short paragraphs, plain labels, and enough space for
                    each message to stand on its own.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                    Label
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/84">
                    Preferred channel
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                    Button
                  </p>
                  <button className="mt-2 h-11 rounded-md bg-white px-4 text-sm font-semibold text-slate-950">
                    Primary action
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 text-slate-950">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
            <SectionIntro
              eyebrow="UI language"
              title="Reusable patterns for future pages."
              description="Use full-width bands for page structure and reserve glass panels for focused content. This keeps the site premium without becoming decorative."
            />

            <div className="grid gap-5">
              <div className="rounded-lg border border-white/70 bg-white/74 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                      Glass panel
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Focused, readable, and intentional.
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                      Use this treatment for forms, downloadable assets, and
                      compact reference modules over atmospheric backgrounds.
                    </p>
                  </div>
                  <button className="h-11 w-full shrink-0 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto sm:min-w-36">
                    Example action
                  </button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-800">
                      Input style
                    </span>
                    <input
                      readOnly
                      value="hello@cindral.org"
                      className="h-12 w-full rounded-md border border-slate-300/80 bg-white/82 px-3 text-base text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                    />
                  </label>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <p className="text-sm font-medium text-slate-800">
                    Divider style
                  </p>
                  <div className="my-4 h-px bg-slate-200" />
                  <p className="text-sm leading-6 text-slate-600">
                    Use thin dividers and structured spacing instead of heavy
                    borders or nested cards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-950">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="max-w-2xl">
              <SectionIntro
                eyebrow="Spacing"
                title="Give every element room to work."
                description="Cindral layouts should feel calm and precise. Use generous page edges, clear section separation, and consistent gaps instead of dense stacking."
              />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {spacingGuidelines.map((item) => (
                <SpacingReference
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  body={item.body}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-100 text-slate-950">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <div className="max-w-2xl">
              <SectionIntro
                eyebrow="Radius"
                title="Keep corners modest."
                description="Rounded corners should support usability without making the system feel soft or generic."
              />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {radiusGuidelines.map((item) => (
                <RadiusReference
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  body={item.body}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-950">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
            <SectionIntro
              eyebrow="Usage"
              title="Promote Cindral consistently."
              description="These rules keep public references aligned while leaving enough flexibility for partner and media placements."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <RuleList title="Do" items={usageGuidelines} tone="positive" />
              <RuleList title="Do not" items={avoidGuidelines} tone="caution" />
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-6 rounded-lg border border-white/14 bg-white/8 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/58">
                Downloads
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Official logo file
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                The current public assets are black, white, and colored PNG
                marks. Vector and campaign-specific formats are available on
                request.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="/Black.png"
                download
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-5 text-base font-semibold text-slate-950 transition hover:bg-slate-50"
              >
                Black PNG
              </a>
              <a
                href="/White.png"
                download
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/45 px-5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                White PNG
              </a>
              <a
                href="/cindral-logo.png"
                download
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/45 px-5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Color PNG
              </a>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white/12 px-5 text-base font-semibold text-white transition hover:bg-white/18"
              >
                Contact Cindral
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  inverted?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.24em] ${
          inverted ? "text-white/58" : "text-cyan-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${
          inverted ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 max-w-md text-sm leading-6 ${
          inverted ? "text-white/66" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function LogoPreview({
  label,
  note,
  src,
  surface,
  featured = false,
}: {
  label: string;
  note: string;
  src: string;
  surface: "light" | "dark";
  featured?: boolean;
}) {
  const dark = surface === "dark";

  return (
    <div
      className={`rounded-lg border p-5 ${
        dark
          ? "border-slate-800 bg-slate-950 text-white"
          : "border-slate-200 bg-slate-50 text-slate-950"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-sm font-semibold ${
            dark ? "text-white/70" : "text-slate-600"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${
            dark ? "text-white/42" : "text-slate-400"
          }`}
        >
          {note}
        </p>
      </div>
      <div className="mt-5 grid aspect-[4/3] place-items-center rounded-md border border-dashed border-current/20">
        <Image
          src={src}
          alt="Cindral logo"
          width={112}
          height={112}
          className={`object-contain ${featured ? "h-32 w-32" : "h-24 w-24"}`}
        />
      </div>
    </div>
  );
}

function SpacingReference({
  label,
  value,
  body,
}: {
  label: string;
  value: string;
  body: string;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {label}
        </p>
        <h3 className="mt-3 text-xl font-semibold">{value}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
      </div>
      <div className="p-5">
        <div className="rounded-lg border border-dashed border-cyan-400 bg-cyan-50 p-5">
          <div className="grid gap-4 rounded-md border border-slate-200 bg-white p-4">
            <div className="h-3 w-20 rounded-sm bg-slate-950" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
              <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
            </div>
            <div className="h-px bg-cyan-300" />
            <div className="h-3 w-28 rounded-sm bg-slate-300" />
          </div>
        </div>
      </div>
    </article>
  );
}

function RadiusReference({
  label,
  value,
  body,
}: {
  label: string;
  value: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-semibold">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
      <div className="mt-5 rounded-md bg-slate-50 p-5">
        <div
          className="grid h-28 place-items-center border-2 border-dashed border-cyan-500 bg-white"
          style={{ borderRadius: value }}
        >
          <div
            className="h-12 w-24 border-2 border-dashed border-cyan-400 bg-cyan-50"
            style={{ borderRadius: value }}
          />
        </div>
      </div>
    </article>
  );
}

function GuidanceCard({
  label,
  value,
  body,
}: {
  label: string;
  value: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-semibold">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}

function RuleList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "caution";
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <span
              aria-hidden="true"
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                tone === "positive" ? "bg-cyan-500" : "bg-slate-400"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
