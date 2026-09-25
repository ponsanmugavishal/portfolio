"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useTheme } from "next-themes";
import { ArrowUp, Copy, CornerDownLeft, Download, Hash, Moon, Search, Sun } from "lucide-react";
import { nav, site } from "@/lib/site";
import { themeColors } from "@/lib/theme";
import { ease } from "@/lib/motion";
import { scrollToTarget } from "./SmoothScroll";

export const OPEN_EVENT = "open-quick-menu";

// Quick menu (Ctrl/⌘ + K): jump to a section, copy the email, get the resume or switch theme.
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.({ preventScroll: true });
  }, []);

  // Keyboard shortcut + "open" event from the navbar button
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Reset, focus the search box and lock page scroll while open
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    setQuery("");
    setActive(0);
    setNote("");
    requestAnimationFrame(() => inputRef.current?.focus());
    lenis?.stop();
    return () => lenis?.start();
  }, [open, lenis]);

  const isDark = resolvedTheme === "dark";

  const actions = useMemo(() => {
    const go = (hash) => () => {
      const target = hash === "#top" ? document.body : document.querySelector(hash);
      setOpen(false);
      if (target) scrollToTarget(lenis, target, hash);
    };
    return [
      { id: "top", label: "Top", hint: "Section", icon: ArrowUp, run: go("#top") },
      ...nav.map((l) => ({ id: l.href, label: l.label, hint: "Section", icon: Hash, run: go(l.href) })),
      {
        id: "copy",
        label: "Copy email address",
        hint: site.email,
        icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setNote("Email copied");
            setTimeout(close, 700);
          } catch {
            setNote("Couldn't copy — email is " + site.email);
          }
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = site.resume;
          a.download = "";
          a.click();
          close();
        },
      },
      {
        id: "theme",
        label: isDark ? "Switch to light theme" : "Switch to dark theme",
        hint: "Theme",
        icon: isDark ? Sun : Moon,
        run: () => {
          const next = isDark ? "light" : "dark";
          setTheme(next);
          document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[next]);
        },
      },
    ];
  }, [lenis, isDark, setTheme, close]);

  const results = actions.filter((a) => `${a.label} ${a.hint}`.toLowerCase().includes(query.trim().toLowerCase()));
  const current = Math.min(active, Math.max(results.length - 1, 0));

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[current]?.run();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus in the search box; arrows move through the list
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[95] flex items-start justify-center bg-page/50 px-4 pt-[12vh]"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="glass-strong w-full max-w-lg overflow-hidden"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search size={18} className="shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a section or run an action…"
                role="combobox"
                aria-expanded="true"
                aria-controls="quick-menu-list"
                aria-activedescendant={results[current] ? `qm-${results[current].id}` : undefined}
                aria-autocomplete="list"
                className="h-14 w-full bg-transparent text-[16px] text-fg outline-none placeholder:text-muted focus-visible:shadow-none"
              />
              <kbd className="chip shrink-0 !px-2 !py-0.5 font-mono !text-[11px] !text-muted">Esc</kbd>
            </div>

            <ul id="quick-menu-list" role="listbox" aria-label="Actions" className="max-h-[min(62vh,480px)] overflow-y-auto p-2" data-lenis-prevent>
              {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted">No matches</li>}
              {results.map((a, i) => {
                const Icon = a.icon;
                const selected = i === current;
                return (
                  <li
                    key={a.id}
                    id={`qm-${a.id}`}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => setActive(i)}
                    onClick={() => a.run()}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${
                      selected ? "bg-accent/12 text-fg" : "text-fg"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                        selected ? "btn-gradient" : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Icon size={15} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{a.label}</span>
                    <span className="hidden max-w-[45%] truncate text-xs text-muted sm:block">{a.hint}</span>
                    {selected && <CornerDownLeft size={15} className="shrink-0 text-muted" aria-hidden />}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-xs text-muted">
              <span>↑ ↓ to move · Enter to select</span>
              <span aria-live="polite" className="font-medium text-success">
                {note}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
