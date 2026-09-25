"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 400 && !open);
  });

  // Highlight the section currently on screen
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? "mx-3 border border-line bg-page/70 shadow-2xl shadow-black/40 backdrop-blur-xl sm:mx-auto" : "border border-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-display text-sm font-bold text-white transition-transform duration-500 group-hover:rotate-[360deg]">
            PV
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">
            {site.shortName}<span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${isActive ? "text-fg" : "text-muted hover:text-fg"}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
            className="hidden items-center gap-2 rounded-full btn-gradient px-4 py-2 text-sm font-medium text-white transition hover:bg-accent sm:inline-flex"
          >
            <Download size={15} /> Resume
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-page/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-semibold tracking-tight text-fg"
                  >
                    <span className="mr-3 font-mono text-sm text-accent">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={site.resume}
              download
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full btn-gradient px-5 py-3 font-medium text-white"
            >
              <Download size={16} /> Download resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
