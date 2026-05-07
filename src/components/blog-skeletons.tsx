import { PageHero } from "@/components/page-hero";

export function BlogListSkeleton() {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="Resources / Blog"
        title="Notes and updates from Cindral."
        description="This page pulls Cindral posts from Blogger so updates can be published from one place and displayed here automatically."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <SkeletonCard featured />
          <div className="grid gap-5">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
    </main>
  );
}

export function BlogPostSkeleton() {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <PageHero
        eyebrow="Resources / Blog"
        title="Loading the latest post."
        description="Fetching the post from Blogger and preparing it for the Cindral website."
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <SkeletonLine width="w-24" />
              <SkeletonLine width="mt-4 w-40" />
            </div>
            <div className="h-10 w-28 rounded-md bg-slate-200" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <div className="h-7 w-20 rounded-md bg-slate-200" />
            <div className="h-7 w-24 rounded-md bg-slate-200" />
            <div className="h-7 w-16 rounded-md bg-slate-200" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6 sm:p-8 lg:p-10">
          <SkeletonLine width="w-4/5" />
          <SkeletonLine width="mt-6 w-full" />
          <SkeletonLine width="mt-3 w-11/12" />
          <SkeletonLine width="mt-3 w-10/12" />
          <SkeletonLine width="mt-8 w-full" />
          <SkeletonLine width="mt-3 w-9/12" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="h-36 rounded-md bg-slate-100" />
            <div className="h-36 rounded-md bg-slate-100" />
          </div>
          <div className="mt-8">
            <SkeletonLine width="w-24" />
            <SkeletonLine width="mt-4 w-full" />
            <SkeletonLine width="mt-3 w-2/3" />
          </div>
        </div>
      </section>
    </main>
  );
}

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/6 ${
        featured ? "min-h-[25rem] sm:p-7" : "min-h-48"
      }`}
    >
      <div className="h-32 rounded-md bg-slate-100" />
      <SkeletonLine width="mt-6 w-24" />
      <SkeletonLine width="mt-5 w-4/5" />
      <SkeletonLine width="mt-3 w-full" />
      <SkeletonLine width="mt-3 w-2/3" />
    </div>
  );
}

function SkeletonLine({ width }: { width: string }) {
  return (
    <div
      className={`h-3 animate-pulse rounded-full bg-slate-200 ${width}`}
      aria-hidden="true"
    />
  );
}
