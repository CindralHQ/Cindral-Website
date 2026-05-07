import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/resources/brand-assets", label: "Brand Assets" },
  { href: "/resources/blogs", label: "Blog" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-slate-200 bg-white text-slate-950">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <Link href="/" aria-label="Cindral home" className="inline-flex">
            <Image
              src="/Black.png"
              alt="Cindral"
              width={90}
              height={81}
              className="h-auto w-[72px]"
            />
          </Link>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950">
            Cindral
          </p>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
            Software, infrastructure, and spatial experiences shaped with
            clarity, restraint, and intent.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Website
            </p>
            <div className="mt-4 grid gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer resources">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Resources
            </p>
            <div className="mt-4 grid gap-3">
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-5 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} Cindral. All rights reserved.</p>
          <Link href="/contact" className="transition hover:text-slate-950">
            Start a conversation
          </Link>
        </div>
      </div>
    </footer>
  );
}
