"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const exitDuration = 260;

export function RouteTransitionController() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.querySelector(".page-transition")?.classList.remove("is-exiting");
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: globalThis.MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      if (anchor.target || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const nextUrl = new URL(href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentPath = `${window.location.pathname}${window.location.search}`;
      const nextPath = `${nextUrl.pathname}${nextUrl.search}`;
      if (nextPath === currentPath) return;

      event.preventDefault();
      document.querySelector(".page-transition")?.classList.add("is-exiting");

      window.setTimeout(() => {
        router.push(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
      }, exitDuration);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [router]);

  return null;
}
