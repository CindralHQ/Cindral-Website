"use client";

import {
  cookieConsentEventName,
  cookieConsentStorageKey,
  useCookieConsentChoice,
} from "@/components/google-analytics";

type ConsentChoice = "accepted" | "declined";

export function CookieConsentBanner() {
  const consentChoice = useCookieConsentChoice();

  function saveConsent(choice: ConsentChoice) {
    window.localStorage.setItem(cookieConsentStorageKey, choice);
    window.dispatchEvent(new Event(cookieConsentEventName));
  }

  if (consentChoice) return null;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-950 shadow-2xl shadow-slate-950/18 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          We use cookies to keep the site reliable and to understand website
          traffic through Google Analytics. Analytics runs only if you accept.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveConsent("declined")}
            className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
