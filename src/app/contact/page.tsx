import type { Metadata } from "next";
import { ContactPurposeForm } from "@/components/contact-purpose-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact Cindral",
  description: "Share your inquiry, collaboration, or career interest with Cindral.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-slate-100 text-slate-950">
      <PageHero
        eyebrow="Contact"
        title="Start the right conversation."
        description="Choose the purpose that fits best so your message reaches the right context, whether it is an inquiry, a collaboration, or a future opportunity."
      />

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <ContactPurposeForm />
        </div>
      </section>
    </main>
  );
}
