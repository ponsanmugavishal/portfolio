"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { Download, Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { ease, spring, stagger } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5 rounded-full" aria-label={`${site.shortName} — back to top`}>
      <span className="btn-gradient grid h-9 w-9 place-items-center rounded-full font-display text-sm font-bold transition-transform duration-500 group-hover:rotate-[360deg]">
        PV
      </span>
      <span className="hidden font-display text-[15px] font-semibold tracking-tight text-fg sm:block">
        {site.shortName}
        <span className="text-accent">.</span>
      </span>
    </a>
  );
}

// Full-screen glass sheet for phones and tablets. Rendered into <body> so no
// transformed parent can shrink it.
function MobileMenu({ open, onClose, active }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    sheet?.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !sheet) return;
      // keep keyboard focus inside the menu while it's open
      const items = sheet.querySelectorAll("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={sheetRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="glass-strong fixed inset-0 z-[80] flex flex-col overflow-y-auto rounded-none px-6 pb-10 pt-6 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                className="glass-pill grid h-10 w-10 place-items-center text-fg"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <ul className="mt-auto space-y-1 pt-10">
            {nav.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * stagger, duration: 0.5, ease }}
              >
                <a
                  href={l.href}
                  onClick={onClose}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  className={`flex items-baseline gap-4 rounded-2xl py-2 font-display text-[2.6rem] font-semibold leading-tight tracking-tight ${
                    active === l.href.slice(1) ? "text-accent" : "text-fg"
                  }`}
                >
                  <span className="font-mono text-sm font-normal text-faint">0{i + 1}</span>
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href={site.resume}
            download
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + nav.length * stagger, duration: 0.5, ease }}
            className="btn-gradient mb-auto mt-10 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 font-medium"
          >
            <Download size={17} /> Download resume
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);
  const menuBtn = useRef(null);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 400);
  });

  // Highlight the section currently in the middle of the screen
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...nav.map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, lenis]);

  const closeMenu = () => {
    setOpen(false);
    menuBtn.current?.focus({ preventScroll: true });
  };

  // Close the menu if the window grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.4, ease }}
        className="fixed inset-x-0 top-4 z-50 px-3 sm:px-4"
      >
        <nav
          aria-label="Main"
          className={`${scrolled ? "glass-strong" : "glass"} glass-refract-soft mx-auto flex max-w-[1180px] items-center justify-between gap-3 rounded-full py-2 pl-3 pr-2 transition-shadow duration-300 sm:pl-4 ${
            scrolled ? "" : "nav-top"
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[15px] transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-bubble"
                        aria-hidden
                        className="glass-pill absolute inset-0 -z-10"
                        transition={spring}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={site.resume}
              download
              className="btn-gradient hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition hover:brightness-110 sm:inline-flex"
            >
              <Download size={15} /> Resume
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              className="glass-pill grid h-10 w-10 place-items-center text-fg lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      {mounted && <MobileMenu open={open} onClose={closeMenu} active={active} />}
    </>
  );
}
