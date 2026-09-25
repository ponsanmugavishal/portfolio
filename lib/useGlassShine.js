"use client";

import { useCallback } from "react";

// Only real mouse/trackpad users who haven't asked for reduced motion get the shine.
let allowed;
function shineAllowed() {
  if (allowed === undefined) {
    allowed =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return allowed;
}

// Returns a pointermove handler that moves the glass shine under the cursor.
export default function useGlassShine() {
  return useCallback((e) => {
    if (e.pointerType !== "mouse" || !shineAllowed()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}
