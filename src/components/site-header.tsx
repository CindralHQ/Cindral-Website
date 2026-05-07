"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  {
    href: "/resources/brand-assets",
    label: "Brand Assets",
    description: "Logo, colors, typography, and UI rules",
  },
  {
    href: "/resources/blogs",
    label: "Blog",
    description: "Notes and updates from Cindral",
  },
];

export function SiteHeader({ inverted = false }: { inverted?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="Go to Cindral home"
          className="inline-flex items-center"
        >
          <Image
            src={inverted ? "/White.png" : "/Black.png"}
            alt=""
            width={100}
            height={90}
            priority
            className="h-auto w-[75px] object-contain"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className={`hidden items-center gap-5 text-sm font-semibold md:flex ${
            inverted ? "text-white/76" : "text-slate-600"
          }`}
        >
          {navItems.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`transition ${
                  inverted ? "hover:text-white" : "hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
              {item.href === "/resources" ? (
                <div className="invisible absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 pt-4 opacity-0 transition duration-150 ease-out group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg border border-slate-200 bg-white p-2 text-slate-950 shadow-2xl shadow-slate-950/14">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-md px-4 py-3 transition hover:bg-slate-50"
                      >
                        <span className="block text-sm font-semibold">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {link.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden h-10 items-center rounded-md px-4 text-sm font-semibold transition sm:inline-flex ${
              inverted
                ? "border border-white/55 bg-white/18 text-white shadow-sm backdrop-blur-md hover:bg-white/28"
                : "bg-slate-950 text-white hover:bg-slate-800"
            }`}
          >
            Start a conversation
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-md border transition md:hidden ${
              inverted
                ? "border-white/45 bg-white/16 text-white backdrop-blur-md"
                : "border-slate-200 bg-white text-slate-950"
            }`}
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            <span className="grid gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className={`absolute inset-0 bg-slate-950/35 transition-opacity duration-300 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          data-mobile-menu-sheet
          className={`absolute z-5000 inset-y-0 right-0 w-[calc(100vw-2rem)] max-w-[22rem] border-l border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/24 transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Navigation
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-xl leading-none text-slate-600"
              aria-label="Close navigation menu"
            >
              ×
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-8 grid gap-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-50"
                >
                  {item.label}
                </Link>
                {item.href === "/resources" ? (
                  <div className="ml-3 grid border-l border-slate-200 pl-3">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </>
  );
}
