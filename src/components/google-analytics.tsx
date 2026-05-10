"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export const cookieConsentStorageKey = "cindral_cookie_consent_v1";
export const cookieConsentEventName = "cindral-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({
  measurementId,
}: {
  measurementId: string;
}) {
  const pathname = usePathname();
  const consentChoice = useCookieConsentChoice();
  const analyticsAllowed = consentChoice === "accepted";
  const initializedMeasurementId = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsAllowed) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    if (initializedMeasurementId.current !== measurementId) {
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: false });
      initializedMeasurementId.current = measurementId;
    }

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_title: document.title,
      send_to: measurementId,
    });
  }, [analyticsAllowed, measurementId, pathname]);

  if (!analyticsAllowed) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  );
}

export function useCookieConsentChoice() {
  return useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  );
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  window.addEventListener(cookieConsentEventName, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(cookieConsentEventName, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getCookieConsentSnapshot() {
  return normalizeCookieConsentChoice(
    window.localStorage.getItem(cookieConsentStorageKey),
  );
}

function getCookieConsentServerSnapshot() {
  return null;
}

function normalizeCookieConsentChoice(value: string | null) {
  return value === "accepted" || value === "declined" ? value : null;
}
