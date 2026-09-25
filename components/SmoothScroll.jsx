"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Keeps section titles below the floating navbar. Lenis reads the same value
// from `scroll-padding-top` in globals.css, so it is only used for the fallback.
export const NAV_OFFSET = 96;

// Sends every same-page "#section" link through Lenis so it glides and lands below the navbar.
function AnchorLinks() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      const target = hash === "#top" || hash === "#" ? document.body : document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(lenis, target, hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  // Expose for scripts/tests and for components outside the React tree
  useEffect(() => {
    window.__lenis = lenis;
  }, [lenis]);

  return null;
}

export function scrollToTarget(lenis, target, hash) {
  const toTop = target === document.body;
  const done = () => {
    // Move keyboard focus to the section too (important for the skip link)
    const focusEl = toTop ? document.getElementById("top") : target;
    if (focusEl && !focusEl.hasAttribute("tabindex")) focusEl.setAttribute("tabindex", "-1");
    focusEl?.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(toTop ? 0 : target, { force: true, onComplete: done });
  } else {
    const y = toTop ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y });
    done();
  }
  history.replaceState(null, "", toTop ? window.location.pathname : hash);
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
      <AnchorLinks />
      {children}
    </ReactLenis>
  );
}
