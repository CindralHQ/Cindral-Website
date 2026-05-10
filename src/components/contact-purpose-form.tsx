"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";
type PurposeId = "inquire" | "partner" | "careers";

const communicationModes = ["Mail", "Phone", "Whatsapp"] as const;

const purposes: Record<
  PurposeId,
  {
    label: string;
    eyebrow: string;
    description: string;
    heading: string;
    organizationLabel: string;
    interestLabel: string;
    interests: string[];
    notesLabel: string;
    notesPlaceholder: string;
    submitLabel: string;
  }
> = {
  inquire: {
    label: "Inquire",
    eyebrow: "General inquiries",
    description: "Questions, project context, or first conversations.",
    heading: "General inquiry",
    organizationLabel: "Organization Name",
    interestLabel: "What is this about?",
    interests: [
      "Website / digital presence",
      "Operations / systems",
      "Brand or communication",
      "General question",
    ],
    notesLabel: "How can we help?",
    notesPlaceholder: "Add context, requirements, timeline, or next steps.",
    submitLabel: "Send inquiry",
  },
  partner: {
    label: "Partner / Collaborate",
    eyebrow: "Partnerships",
    description: "Collaborations, implementation work, or aligned services.",
    heading: "Partnership conversation",
    organizationLabel: "Organization / Firm Name",
    interestLabel: "Collaboration type",
    interests: [
      "Strategic partnership",
      "Client collaboration",
      "Implementation partner",
      "Vendor relationship",
    ],
    notesLabel: "Tell us about the collaboration",
    notesPlaceholder:
      "Share the opportunity, role expectations, project context, and timeline.",
    submitLabel: "Start collaboration",
  },
  careers: {
    label: "Careers / Opportunities",
    eyebrow: "Work with Cindral",
    description: "Roles, internships, portfolios, and future opportunities.",
    heading: "Career opportunity",
    organizationLabel: "Current Organization / College",
    interestLabel: "Opportunity type",
    interests: [
      "Full-time role",
      "Internship",
      "Freelance / contract",
      "Future opportunity",
    ],
    notesLabel: "Tell us about your background",
    notesPlaceholder:
      "Share your skills, portfolio link, preferred role, availability, and why Cindral fits.",
    submitLabel: "Share profile",
  },
};

export function ContactPurposeForm() {
  const [purposeId, setPurposeId] = useState<PurposeId>("inquire");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const purpose = purposes[purposeId];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const interests = formData.getAll("interest").join(", ");
    const notes = String(formData.get("notes") ?? "").trim();
    const payload = {
      name: formData.get("name"),
      organizationName: formData.get("organizationName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      preferredMode: formData.get("preferredMode"),
      purpose: purpose.label,
      additionalNotes: [
        interests ? `Category: ${interests}` : "",
        notes ? `Notes: ${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Submission failed.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thank you. Your details have been shared with Cindral.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/8">
      <div className="grid lg:grid-cols-[0.52fr_1fr]">
        <aside className="border-b border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="grid gap-3">
            {(Object.keys(purposes) as PurposeId[]).map((id) => {
              const item = purposes[id];
              const active = id === purposeId;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setPurposeId(id);
                    setStatus("idle");
                    setMessage("");
                  }}
                  className={`rounded-lg p-4 text-left transition ${
                    active
                      ? "bg-white shadow-md shadow-slate-900/6"
                      : "hover:bg-white"
                  }`}
                >
                  <span
                    className={`block text-base font-semibold ${
                      active ? "text-cyan-700" : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Contact info
            </p>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
              <p>admin@cindral.org</p>
              <p>Preferred response channel selected in form</p>
            </div>
            <a
              href="/api/contact-card"
              aria-label="Add Cindral to your phone contacts"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 sm:hidden"
            >
              <span
                aria-hidden="true"
                className="grid h-5 w-5 place-items-center rounded-full bg-white text-base leading-none text-slate-950"
              >
                +
              </span>
              Add to Contacts
            </a>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="p-5 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
            {purpose.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold">{purpose.heading}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Fields marked with an asterisk are required.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" required />
            <Field
              label={purpose.organizationLabel}
              name="organizationName"
              autoComplete="organization"
              required
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              title="Enter a valid phone number using digits, spaces, +, -, or brackets only."
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <fieldset className="mt-5">
            <legend className="mb-3 text-sm font-medium text-slate-800">
              Preferred Mode of Communication *
            </legend>
            <div className="flex flex-wrap gap-3">
              {communicationModes.map((mode) => (
                <label
                  key={mode}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="preferredMode"
                    value={mode}
                    required
                    className="h-4 w-4 border-slate-300 accent-cyan-600"
                  />
                  {mode}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="mb-3 text-sm font-medium text-slate-800">
              {purpose.interestLabel}
            </legend>
            <div className="flex flex-wrap gap-3">
              {purpose.interests.map((interest) => (
                <label
                  key={interest}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="interest"
                    value={interest}
                    className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
                  />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-800">
              {purpose.notesLabel}
            </span>
            <textarea
              name="notes"
              rows={5}
              placeholder={purpose.notesPlaceholder}
              className="w-full resize-y rounded-md border border-slate-300/80 bg-white px-3 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-100"
          >
            {status === "submitting" ? "Submitting..." : purpose.submitLabel}
          </button>

          {message ? (
            <p
              className={`mt-4 rounded-md border px-4 py-3 text-sm ${
                status === "success"
                  ? "border-emerald-500/30 bg-emerald-50/80 text-emerald-900"
                  : "border-red-500/30 bg-red-50/80 text-red-900"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  title,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  title?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-800">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        title={title}
        required={required}
        className="h-12 w-full rounded-md border border-slate-300/80 bg-white px-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
      />
    </label>
  );
}
