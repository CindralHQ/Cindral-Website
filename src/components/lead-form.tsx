"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const communicationModes = ["Mail", "Phone", "Whatsapp"] as const;

export function LeadForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

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
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg border border-white/50 bg-white/72 p-5 shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:p-7"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-950">
          Contact Information
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Fields marked with an asterisk are required.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Organization Name"
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

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-slate-800">
          Preferred Mode of Communication *
        </span>
        <select
          name="preferredMode"
          required
          defaultValue=""
          className="h-12 w-full rounded-md border border-slate-300/80 bg-white/82 px-3 text-base text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
        >
          <option value="" disabled>
            Select a channel
          </option>
          {communicationModes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-slate-800">
          Additional Notes
        </span>
        <textarea
          name="additionalNotes"
          rows={4}
          placeholder="Add context, requirements, timeline, or next steps."
          className="w-full resize-y rounded-md border border-slate-300/80 bg-white/82 px-3 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-100"
      >
        {status === "submitting" ? "Submitting..." : "Submit details"}
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
  inputMode?: "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";
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
        className="h-12 w-full rounded-md border border-slate-300/80 bg-white/82 px-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
      />
    </label>
  );
}
