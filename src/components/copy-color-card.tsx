"use client";

import { useState } from "react";

type CopyColorCardProps = {
  name: string;
  value: string;
  role: string;
};

export function CopyColorCard({ name, value, role }: CopyColorCardProps) {
  const [copied, setCopied] = useState(false);

  async function copyColor() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyColor}
      className="group flex h-full min-h-[332px] flex-col rounded-lg border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-950/8 focus:outline-none focus:ring-4 focus:ring-cyan-500/15"
      aria-label={`Copy ${name} color value ${value}`}
    >
      <span
        aria-hidden="true"
        className="block h-32 w-full shrink-0 rounded-md border border-slate-200 shadow-inner"
        style={{ backgroundColor: value }}
      />
      <span className="flex flex-1 flex-col pt-5">
        <span className="grid grid-cols-[1fr_5.5rem] items-start gap-4">
          <span className="text-base font-semibold text-slate-950">{name}</span>
          <code className="justify-self-end rounded-md bg-white px-2 py-1 text-right text-xs font-semibold text-slate-600">
            {value}
          </code>
        </span>
        <span className="mt-3 block text-sm leading-6 text-slate-600">
          {role}
        </span>
        <span className="mt-auto inline-flex h-8 w-fit items-center rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition group-hover:text-cyan-700">
          {copied ? "Copied" : "Click to copy"}
        </span>
      </span>
    </button>
  );
}
