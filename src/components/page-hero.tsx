import type { ReactNode } from "react";
import { GrainyBackground } from "@/components/grainy-background";
import { SiteHeader } from "@/components/site-header";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#168db8] text-white">
      <GrainyBackground fixed={false} />
      <div className="pointer-events-none absolute inset-0 bg-[#168db8]/42" />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/10" />
      <div className="relative z-10">
        <SiteHeader inverted />
      </div>
      <div className="relative mx-auto flex h-[540px] w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-12 sm:h-[500px] sm:px-8 lg:h-[460px] lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/82">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.04] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
